chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ annotations: {} });
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "save_annotation") {
      chrome.storage.sync.get("annotations", (data) => {
        const annotations = data.annotations;
        const url = message.url;
        if (!annotations[url]) {
          annotations[url] = [];
        }
        annotations[url].push(message.annotation);
        chrome.storage.sync.set({ annotations: annotations });
        sendResponse({ status: "saved" });
      });
    } else if (message.action === "get_annotations") {
      chrome.storage.sync.get("annotations", (data) => {
        sendResponse({ annotations: data.annotations[message.url] || [] });
      });
    }
    return true;
  });
