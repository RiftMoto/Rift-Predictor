// Listener for requests sent from the Extension Popup UI
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "highlight_mines") {
    simulateMinesHighlight();
  }
});

/**
 * Finds game grids on the webpage layout and injects mock visual helpers
 */
function simulateMinesHighlight() {
  // Target class names would depend entirely on the active DOM layout of the page
  // This uses a standard generic query selector approach
  const grids = document.querySelectorAll('[class*="mine"], [class*="tile"], button');
  
  if(grids.length === 0) {
    console.log("Rift: Active board elements not detected on current viewport.");
    return;
  }

  // Clear previous mockup elements if existing
  document.querySelectorAll('.rift-highlight').forEach(el => el.remove());

  // Randomly select 3 items to visually highlight as a layout demonstration
  let itemsCount = 0;
  grids.forEach((tile) => {
    if (Math.random() > 0.85 && itemsCount < 3) {
      tile.style.position = 'relative';
      
      const overlay = document.createElement('div');
      overlay.className = 'rift-highlight';
      overlay.style.position = 'absolute';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.border = '3px solid #10b981';
      overlay.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
      overlay.style.borderRadius = 'inherit';
      overlay.style.pointerEvents = 'none';
      overlay.style.transition = 'all 0.3s ease';
      
      tile.appendChild(overlay);
      itemsCount++;
    }
  });
}
