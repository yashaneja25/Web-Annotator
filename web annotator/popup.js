document.getElementById("highlight-btn").addEventListener("click", () => {
    chrome.tabs.executeScript({
      file: "content.js"
    });
  });
  
  document.getElementById("export-btn").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "export_annotations" }, (response) => {
      const blob = new Blob([JSON.stringify(response.annotations)], {
        type: "application/json"
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "annotations.json";
      a.click();
    });
  });