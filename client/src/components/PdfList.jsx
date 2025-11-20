import React, { useEffect, useState } from "react";
import "./PdfList.css";

export default function PdfList() {
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/pdfs")
      .then(res => res.json())
      .then(data => setPdfs(data));
  }, []);

  const deletePdf = async (id) => {
    if (!window.confirm("Delete this writeup?")) return;

    const res = await fetch(`http://localhost:5000/api/pdfs/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setPdfs(prev => prev.filter(p => p._id !== id));
    }
  };

  return (
    <div className="pdf-list">
      {pdfs.map(pdf => (
        <div key={pdf._id} className="pdf-card">
          <h3>{pdf.ctfName}</h3>
          <p><strong>Challenge:</strong> {pdf.challengeName}</p>

          <a
            href={`http://localhost:5000/uploads/${pdf.filename}`}
            target="_blank"
            rel="noreferrer"
          >
            View Writeup
          </a>

          <button onClick={() => deletePdf(pdf._id)} className="delete-btn">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
