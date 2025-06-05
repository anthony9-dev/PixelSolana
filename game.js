let pixels = 0;
let pps = 0;
let gameInterval = null;

const pixelCounter = document.getElementById('pixel-counter');
const ppsDisplay = document.getElementById('pps');
const clickButton = document.getElementById('click-button');
const upgradeButtons = document.querySelectorAll('.upgrade');

const upgrades = [
  { cost: 10, gain: 1 },
  { cost: 100, gain: 5 },
  { cost: 1000, gain: 20 }
];

function updateDisplay() {
  pixelCounter.textContent = `Pixels : ${pixels}`;
  ppsDisplay.textContent = pps;
}

function saveGame(username) {
  localStorage.setItem(`${username}_pixels`, pixels);
  localStorage.setItem(`${username}_pps`, pps);
}

function loadGame(username) {
  pixels = parseInt(localStorage.getItem(`${username}_pixels`)) || 0;
  pps = parseInt(localStorage.getItem(`${username}_pps`)) || 0;
  updateDisplay();
}

function startGameLoop() {
  if (gameInterval) clearInterval(gameInterval);
  gameInterval = setInterval(() => {
    pixels += pps;
    updateDisplay();
    saveGame(currentUser);
  }, 1000);
}

clickButton.addEventListener('click', () => {
  pixels++;
  pixelCounter.style.transform = 'scale(1.2)';
  setTimeout(() => pixelCounter.style.transform = 'scale(1)', 100);
  updateDisplay();
  saveGame(currentUser);
});

upgradeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const index = parseInt(button.getAttribute('data-index'));
    const upgrade = upgrades[index];

    if (pixels >= upgrade.cost) {
      pixels -= upgrade.cost;
      pps += upgrade.gain;
      upgrade.cost = Math.floor(upgrade.cost * 1.5);
      button.textContent = `Acheter (+${upgrade.gain}/s) - ${upgrade.cost} Pixels`;
      updateDisplay();
      saveGame(currentUser);
    } else {
      alert("Pas assez de pixels");
    }
  });
});
