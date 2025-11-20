import React, { useState, useEffect } from 'react';
import './PdfUpload.css';

export default function PdfUpload() {
  const [pdfFile, setPdfFile] = useState(null);
  const [ctfName, setCtfName] = useState("");
  const [challengeName, setChallengeName] = useState("");
  const [existingCtfs, setExistingCtfs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/ctf-names")
      .then(res => res.json())
      .then(data => setExistingCtfs(data));
  }, []);

  const handleUpload = async () => {
    if (!pdfFile || !ctfName || !challengeName) return alert("Missing fields");

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
      alert("Uploaded!");
      window.location.reload();
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="upload-card">
      <h2>Upload CTF Writeup</h2>

      <label>CTF Name</label>
      <input 
        type="text"
        list="ctf-list"
        value={ctfName}
        onChange={e => setCtfName(e.target.value)}
        placeholder="Start typing..."
      />
      <datalist id="ctf-list">
        {existingCtfs.map(ctf => (
          <option key={ctf} value={ctf} />
        ))}
      </datalist>

      <label>Challenge Name</label>
      <input 
        type="text"
        value={challengeName}
        onChange={e => setChallengeName(e.target.value)}
      />

      <label>PDF file</label>
      <input 
        type="file"
        accept="application/pdf"
        onChange={e => setPdfFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>UPLOAD</button>
    </div>
  );
}
