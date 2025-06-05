let pixels = 0;
let pps = 0;
let gameInterval = null;


const tileSize = 32; // taille d’une case en pixels
const mapWidth = 10;
const mapHeight = 10;

// 0 = vide, 1 = bâtiment niveau 1, 2 = bâtiment niveau 2, 3 = bâtiment niveau 3
let map = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,1,0,0,0,0,0,2,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,3,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
];

const images = {
  0: null, // vide, pas d’image
  1: new Image(),
  2: new Image(),
  3: new Image()
};

images[1].src = 'images/building_lvl1.png';
images[2].src = 'images/building_lvl2.png';
images[3].src = 'images/building_lvl3.png';


const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

function drawMap() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for(let y=0; y < mapHeight; y++) {
    for(let x=0; x < mapWidth; x++) {
      const tile = map[y][x];
      
      // dessiner un fond simple (ex: vert clair)
      ctx.fillStyle = '#90ee90';
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      
      // dessiner le bâtiment si présent
      if(tile !== 0 && images[tile].complete) {
        ctx.drawImage(images[tile], x * tileSize, y * tileSize, tileSize, tileSize);
      }
      
      // dessiner la grille pour mieux voir les cases
      ctx.strokeStyle = '#333';
      ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
}

canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((event.clientX - rect.left) / tileSize);
  const y = Math.floor((event.clientY - rect.top) / tileSize);
  
  const tile = map[y][x];
  
  if(tile === 0) {
    alert("Case vide : tu peux construire ici !");
  } else {
    alert(`Bâtiment niveau ${tile} à cette position.`);
  }
});


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
