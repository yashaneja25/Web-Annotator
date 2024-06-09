document.getElementById("save-btn").addEventListener("click", () => {
    const color = document.getElementById("highlight-color").value;
    chrome.storage.sync.set({ highlightColor: color });
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get("highlightColor", (data) => {
      if (data.highlightColor) {
        document.getElementById("highlight-color").value = data.highlightColor;
      }
    });
  });