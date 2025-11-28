import React, { useEffect, useState } from "react";
import "./PdfList.css";

export default function PdfList() {
  const [pdfs, setPdfs] = useState([]);
  const [groupedPdfs, setGroupedPdfs] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/pdfs")
      .then(res => res.json())
      .then(data => {
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
      });
  }, []);

  const deletePdf = async (id) => {
    if (!window.confirm("Delete this writeup?")) return;

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
    }
  };

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
                    href={`http://localhost:5000/uploads/${pdf.filename}`}
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