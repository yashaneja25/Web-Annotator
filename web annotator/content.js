// Highlight selected text
document.addEventListener("mouseup", () => {
    const selection = window.getSelection().toString();
    if (selection) {
      const note = prompt("Add a note to this highlight:");
      if (note !== null) {
        const annotation = {
          text: selection,
          note: note,
          timestamp: new Date().toISOString()
        };
        chrome.runtime.sendMessage(
          {
            action: "save_annotation",
            url: window.location.href,
            annotation: annotation
          },
          (response) => {
            if (response.status === "saved") {
              highlightText(selection);
            }
          }
        );
      }
    }
  });
  
  function highlightText(text) {
    const range = window.getSelection().getRangeAt(0);
    const span = document.createElement("span");
    span.style.backgroundColor = "yellow";
    span.textContent = text;
    range.deleteContents();
    range.insertNode(span);
  }
  
  // Load existing annotations
  window.addEventListener("load", () => {
    chrome.runtime.sendMessage(
      { action: "get_annotations", url: window.location.href },
      (response) => {
        response.annotations.forEach((annotation) => {
          highlightText(annotation.text);
          // Optional: Add code to display notes
        });
      }
    );
  });