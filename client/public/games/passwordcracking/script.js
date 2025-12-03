function checkRockyouHash() {
    const inputHash = document.getElementById("rockyouInput").value;
    const output = document.getElementById("output");
    
    if (rockyouHashes.includes(inputHash)) {
      output.innerText = `Rockyou Hash Matched: ${inputHash}`;
    } else {
      output.innerText = `Rockyou Hash Not Found: ${inputHash}`;
    }
  }
  
  function checkWindowsHash() {
    const inputHash = document.getElementById("windowsInput").value;
    const output = document.getElementById("output");
    
    if (windowsHashes.includes(inputHash)) {
      output.innerText = `Windows Hash Matched: ${inputHash}`;
    } else {
      output.innerText = `Windows Hash Not Found: ${inputHash}`;
    }
  }
  
  function checkBruteForceHash() {
    const inputHash = document.getElementById("bruteForceInput").value;
    const output = document.getElementById("output");
    
    if (bruteForceHashes.includes(inputHash)) {
      output.innerText = `Brute Force Hash Matched: ${inputHash}`;
    } else {
      output.innerText = `Brute Force Hash Not Found: ${inputHash}`;
    }
  }
  