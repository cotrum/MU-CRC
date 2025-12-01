import React, { useEffect, useState } from "react";
import "./PdfList.css";

export default function PdfList() {
  const [pdfs, setPdfs] = useState([]);
  const [groupedPdfs, setGroupedPdfs] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/pdfs");
        
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        
        const data = await res.json();
        
        // Check if data is an array
        if (Array.isArray(data)) {
          setPdfs(data);
          // Group PDFs by CTF name
          const grouped = data.reduce((acc, pdf) => {
            const ctfName = pdf.ctfName || 'Unknown CTF';
            if (!acc[ctfName]) {
              acc[ctfName] = [];
            }
            acc[ctfName].push(pdf);
            return acc;
          }, {});
          setGroupedPdfs(grouped);
        } else {
          throw new Error('Invalid data format received from server');
        }
      } catch (err) {
        console.error('Error fetching PDFs:', err);
        setError(err.message);
        setPdfs([]);
        setGroupedPdfs({});
      } finally {
        setLoading(false);
      }
    };

    fetchPdfs();
  }, []);

  const deletePdf = async (id) => {
    if (!window.confirm("Delete this writeup?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/pdfs/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setPdfs(prev => prev.filter(p => p._id !== id));
        // Also update grouped PDFs
        const updatedGrouped = { ...groupedPdfs };
        for (const ctfName in updatedGrouped) {
          updatedGrouped[ctfName] = updatedGrouped[ctfName].filter(p => p._id !== id);
          // Remove empty CTF groups
          if (updatedGrouped[ctfName].length === 0) {
            delete updatedGrouped[ctfName];
          }
        }
        setGroupedPdfs(updatedGrouped);
      } else {
        alert('Failed to delete writeup');
      }
    } catch (err) {
      console.error('Error deleting PDF:', err);
      alert('Error deleting writeup');
    }
  };

  if (loading) {
    return (
      <div className="pdf-list-container loading">
        <div className="loading-state">Loading writeups...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pdf-list-container error">
        <div className="error-state">
          <h3>Error Loading Writeups</h3>
          <p>{error}</p>
          <p>Please check if the server is running on port 5000.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pdf-list-container">
      {Object.keys(groupedPdfs).length === 0 ? (
        <div className="empty-state">
          No writeups available yet. Upload one to get started!
        </div>
      ) : (
        Object.entries(groupedPdfs).map(([ctfName, ctfPdfs]) => (
          <div key={ctfName} className="ctf-group">
            <h3 className="ctf-group-title">{ctfName}</h3>
            <div className="ctf-writeups-grid">
              {ctfPdfs.map(pdf => (
                <div key={pdf._id} className="pdf-card">
                  <h4>{pdf.challengeName}</h4>
                  <p><strong>Challenge:</strong> {pdf.challengeName}</p>
                  <p><strong>CTF:</strong> {pdf.ctfName}</p>

                  <a
                  href={`http://localhost:5000/api/pdfs/view/${pdf.filename}`}
                    target="_blank"
                    rel="noreferrer"
                    className="view-writeup-btn"
                  >
                    View Writeup
                  </a>

                  <button 
                    onClick={() => deletePdf(pdf._id)} 
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}