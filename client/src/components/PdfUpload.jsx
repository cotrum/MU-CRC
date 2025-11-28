import React, { useState, useEffect } from 'react';
import './PdfUpload.css';

export default function PdfUpload() {
  const [pdfFile, setPdfFile] = useState(null);
  const [ctfName, setCtfName] = useState("");
  const [challengeName, setChallengeName] = useState("");
  const [existingCtfs, setExistingCtfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCtfNames = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/ctf-names");
        
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        
        const data = await res.json();
        
        // Check if data is an array
        if (Array.isArray(data)) {
          setExistingCtfs(data);
        } else {
          // If not array but has data, try to extract CTF names from PDFs
          if (data && Array.isArray(data.pdfs)) {
            const ctfs = [...new Set(data.pdfs.map(pdf => pdf.ctfName).filter(Boolean))];
            setExistingCtfs(ctfs);
          } else {
            setExistingCtfs([]);
          }
        }
      } catch (err) {
        console.error('Error fetching CTF names:', err);
        setError(err.message);
        setExistingCtfs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCtfNames();
  }, []);

  const handleUpload = async () => {
    if (!pdfFile || !ctfName || !challengeName) {
      return alert("Please fill in all fields and select a PDF file");
    }

    try {
      const formData = new FormData();
      formData.append("pdf", pdfFile);
      formData.append("ctfName", ctfName);
      formData.append("challengeName", challengeName);

      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Uploaded successfully!");
        // Reset form
        setPdfFile(null);
        setCtfName("");
        setChallengeName("");
        // Reload the page to refresh the list
        window.location.reload();
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert("Upload failed - check console for details");
    }
  };

  return (
    <div className="upload-card">
      <h2>Upload CTF Writeup</h2>

      {error && (
        <div className="error-message">
          <p>Warning: Could not load existing CTF names: {error}</p>
        </div>
      )}

      <label>CTF Name</label>
      <input 
        type="text"
        list="ctf-list"
        value={ctfName}
        onChange={e => setCtfName(e.target.value)}
        placeholder="Start typing..."
      />
      <datalist id="ctf-list">
        {existingCtfs.map((ctf, index) => (
          <option key={index} value={ctf} />
        ))}
      </datalist>

      <label>Challenge Name</label>
      <input 
        type="text"
        value={challengeName}
        onChange={e => setChallengeName(e.target.value)}
        placeholder="Enter challenge name"
      />

      <label>PDF file</label>
      <input 
        type="file"
        accept="application/pdf"
        onChange={e => setPdfFile(e.target.files[0])}
      />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Loading...' : 'UPLOAD'}
      </button>
    </div>
  );
}