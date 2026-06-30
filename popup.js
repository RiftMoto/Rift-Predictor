document.addEventListener('DOMContentLoaded', () => {
  const buttons = {
    mines: document.getElementById('btn-mines'),
    blackjack: document.getElementById('btn-blackjack'),
    towers: document.getElementById('btn-towers'),
    slide: document.getElementById('btn-slide')
  };
  const output = document.getElementById('output-text');

  function resetTabs() {
    Object.values(buttons).forEach(btn => btn.classList.remove('active'));
  }

  buttons.mines.addEventListener('click', () => {
    resetTabs();
    buttons.mines.classList.add('active');
    output.innerText = "Overlay Active: Check Board";
    // Sends a message to the content script to execute visualization
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if(tabs[0]) chrome.tabs.sendMessage(tabs[0].id, { action: "highlight_mines" });
    });
  });

  buttons.blackjack.addEventListener('click', () => {
    resetTabs();
    buttons.blackjack.classList.add('active');
    const choices = ["HIT", "STAND", "DOUBLE DOWN", "SPLIT"];
    // Simplified simulation random choice
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    output.innerHTML = `<span style="color: #3b82f6;">${randomChoice}</span>`;
  });

  buttons.towers.addEventListener('click', () => {
    resetTabs();
    buttons.towers.classList.add('active');
    const rowChoices = ["Left Tile", "Middle Tile", "Right Tile"];
    const choice = rowChoices[Math.floor(Math.random() * rowChoices.length)];
    output.innerHTML = `Next Safe: <span style="color: #10b981;">${choice}</span>`;
  });

  buttons.slide.addEventListener('click', () => {
    resetTabs();
    buttons.slide.classList.add('active');
    
    // Weight configuration: Red/Purple high probability, Gold extremely low
    const rand = Math.random();
    let recommendation = "";
    
    if (rand < 0.49) {
      recommendation = "<span style='color: #ef4444;'>RED</span>";
    } else if (rand < 0.98) {
      recommendation = "<span style='color: #a855f7;'>PURPLE</span>";
    } else {
      recommendation = "<span style='color: #eab308;'>GOLD</span>";
    }
    output.innerHTML = `Recommendation: ${recommendation}`;
  });
});
