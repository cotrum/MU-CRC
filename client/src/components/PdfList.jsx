import React, { useEffect, useState } from "react";
import "./PdfList.css";

export default function PdfList() {
  const [pdfs, setPdfs] = useState([]);
  const [groupedPdfs, setGroupedPdfs] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [toggling, setToggling] = useState({});

  useEffect(() => {
    // Get user role properly from localStorage
    const getUserRole = () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || '{}');
        const role = user.role || localStorage.getItem("role");
        return role;
      } catch (err) {
        return null;
      }
    };

    const role = getUserRole();
    if (role) {
      setUserRole(role);
    }

    fetchPdfs();
  }, []);

  const fetchPdfs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const res = await fetch("http://localhost:5000/api/pdfs", {
        headers
      });
      
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

  const deletePdf = async (id) => {
    if (!window.confirm("Are you sure you want to delete this writeup?")) return;

    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        alert("You must be logged in to delete writeups.");
        window.location.href = "/login";
        return;
      }

      const res = await fetch(`http://localhost:5000/api/pdfs/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();

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
        alert("Writeup deleted successfully!");
      } else {
        alert(data.error || 'Failed to delete writeup');
        if (res.status === 401 || res.status === 403) {
          window.location.href = "/login";
        }
      }
    } catch (err) {
      console.error('Error deleting PDF:', err);
      alert('Error deleting writeup. Please try again.');
    }
  };

  const toggleVisibility = async (id, currentVisibility) => {
    try {
      setToggling(prev => ({ ...prev, [id]: true }));
      
      const token = localStorage.getItem("token");
      
      if (!token) {
        alert("You must be logged in to toggle visibility.");
        window.location.href = "/login";
        return;
      }

      const newVisibility = !currentVisibility;
      
      const res = await fetch(`http://localhost:5000/api/pdfs/${id}/visibility`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ visible: newVisibility })
      });

      const data = await res.json();

      if (res.ok) {
        // Update local state
        setPdfs(prev => prev.map(pdf => 
          pdf._id === id ? { ...pdf, visible: newVisibility } : pdf
        ));
        
        // Update grouped PDFs
        const updatedGrouped = { ...groupedPdfs };
        for (const ctfName in updatedGrouped) {
          updatedGrouped[ctfName] = updatedGrouped[ctfName].map(pdf => 
            pdf._id === id ? { ...pdf, visible: newVisibility } : pdf
          );
        }
        setGroupedPdfs(updatedGrouped);
        
        alert(data.message);
      } else {
        alert(data.error || 'Failed to toggle visibility');
      }
    } catch (err) {
      console.error('Error toggling visibility:', err);
      alert('Error toggling visibility. Please try again.');
    } finally {
      setToggling(prev => ({ ...prev, [id]: false }));
    }
  };

  // Check if user can manage writeups (ONLY member or admin)
  // Nonmembers should NOT see any management controls
  const canManageWriteups = userRole === 'member' || userRole === 'admin';

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
                  <div className="pdf-card-header">
                    <h4>{pdf.challengeName}</h4>
                    {/* Only show visibility badge for members/admins */}
                    {canManageWriteups && (
                      <div className="visibility-badge">
                        <span className={`visibility-indicator ${pdf.visible ? 'visible' : 'hidden'}`}>
                          {pdf.visible ? 'Visible' : 'Hidden'}
                        </span>
                      </div>
                    )}
                  </div>
                  <p><strong>Challenge:</strong> {pdf.challengeName}</p>
                  <p><strong>CTF:</strong> {pdf.ctfName}</p>

                  <div className="pdf-card-actions">
                    <a
                      href={`http://localhost:5000/api/pdfs/view/${pdf.filename}`}
                      target="_blank"
                      rel="noreferrer"
                      className="view-writeup-btn"
                    >
                      View Writeup
                    </a>

                    {/* Only show action buttons for members/admins */}
                    {canManageWriteups ? (
                      <div className="action-buttons">
                        <button 
                          onClick={() => toggleVisibility(pdf._id, pdf.visible)}
                          className={`visibility-toggle-btn ${pdf.visible ? 'hide-btn' : 'show-btn'}`}
                          disabled={toggling[pdf._id]}
                        >
                          {toggling[pdf._id] ? '...' : (pdf.visible ? 'Hide' : 'Show')}
                        </button>

                        <button 
                          onClick={() => deletePdf(pdf._id)} 
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      // Nonmembers see only the view button - no action buttons
                      <div className="action-buttons-placeholder"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}