chrome.contextMenus.create({
    "id": "wikit",
    "title": "Wikit",
    "contexts": ["selection"]
  });
  
  function fixedEncodeURI(str) {
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
  }
  
  let width, height;
  
  chrome.contextMenus.onClicked.addListener(function(clickData) {
    if (clickData.menuItemId == "wikit" && clickData.selectionText) {
      const wikiUrl = "https://en.wikipedia.org/wiki/" + fixedEncodeURI(clickData.selectionText);
      const createData = {
        "url": wikiUrl,
        "type": "popup",
        "top": 5,
        "left": 5,
      };
  
      chrome.windows.getCurrent((window) => {
        width = window.width / 2;
        height = Math.floor(window.height / 2); // Convert to integer
        createData.width = width;
        createData.height = height;
        chrome.windows.create(createData, function() {});
      });
    }
  });
  