import React, { useState } from 'react';
import './PdfUpload.css';

export default function PdfUpload() {
  const [pdfFile, setPdfFile] = useState(null);
  const [ctfName, setCtfName] = useState("");
  const [challengeName, setChallengeName] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!pdfFile || !ctfName || !challengeName) {
      alert("Please fill in all fields and select a PDF file");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("pdf", pdfFile);
    formData.append("ctfName", ctfName);
    formData.append("challengeName", challengeName);

    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Uploaded successfully!");
        // Reset form
        setPdfFile(null);
        setCtfName("");
        setChallengeName("");
        document.querySelector('input[type="file"]').value = "";
        window.location.reload();
      } else {
        const data = await res.json();
        alert(data.error || "Upload failed");
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Upload failed. Please check if the server is running.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-card">
      <h2>Upload CTF Writeup</h2>

      <div className="form-group">
        <label>CTF Name</label>
        <input 
          type="text"
          value={ctfName}
          onChange={e => setCtfName(e.target.value)}
          placeholder="Enter CTF name"
        />
      </div>

      <div className="form-group">
        <label>Challenge Name</label>
        <input 
          type="text"
          value={challengeName}
          onChange={e => setChallengeName(e.target.value)}
          placeholder="Enter challenge name"
        />
      </div>

      <div className="form-group">
        <label>PDF file</label>
        <input 
          type="file"
          accept="application/pdf"
          onChange={e => setPdfFile(e.target.files[0])}
        />
      </div>

      <button 
        onClick={handleUpload} 
        disabled={uploading}
        className="upload-button"
      >
        {uploading ? "Uploading..." : "UPLOAD"}
      </button>

      {pdfFile && (
        <div className="file-info">
          <p><strong>Selected file:</strong> {pdfFile.name}</p>
          <p><strong>Size:</strong> {(pdfFile.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      )}
    </div>
  );
}