let pixels = 0;
let pps = 0;
const upgrades = [
  { cost: 10, gain: 1 },
  { cost: 100, gain: 5 },
  { cost: 1000, gain: 20 }
];

function updateDisplay() {
  document.getElementById('pixel-counter').textContent = `Pixels : ${pixels}`;
  document.getElementById('pps').textContent = pps;
}

function saveGame(username) {
  localStorage.setItem(`${username}_pixels`, pixels);
  localStorage.setItem(`${username}_pps`, pps);
}

function loadGame(username) {
  pixels = parseInt(localStorage.getItem(`${username}_pixels`)) || 0;
  pps = parseInt(localStorage.getItem(`${username}_pps`)) || 0;
}

function initGame(username) {
  updateDisplay();
  setInterval(() => {
    pixels += pps;
    updateDisplay();
    saveGame(username);
  }, 1000);

  document.getElementById('click-button').addEventListener('click', () => {
    pixels++;
    document.getElementById('pixel-counter').style.transform = 'scale(1.2)';
    setTimeout(() => {
      document.getElementById('pixel-counter').style.transform = 'scale(1)';
    }, 100);
    updateDisplay();
    saveGame(username);
  });
}

function buyUpgrade(index) {
  const upgrade = upgrades[index];
  if (pixels >= upgrade.cost) {
    pixels -= upgrade.cost;
    pps += upgrade.gain;
    upgrade.cost = Math.floor(upgrade.cost * 1.5);
    updateDisplay();
    const btn = document.getElementsByClassName('upgrade')[index];
    btn.textContent = `Acheter (+${upgrade.gain}/s) - ${upgrade.cost} Pixels`;
  }
}
