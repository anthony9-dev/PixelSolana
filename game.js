let pixels = 0;
let pps = 0;
let gameInterval = null;

const tileSize = 32; 
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
  0: null,
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
  ctx.fillStyle = '#87CEEB'; // Fond bleu ciel
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  for(let y=0; y < mapHeight; y++) {
    for(let x=0; x < mapWidth; x++) {
      const tile = map[y][x];
      
      ctx.fillStyle = '#90ee90'; // Terrain vert
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      
      if(tile !== 0 && images[tile].complete) {
        ctx.drawImage(images[tile], x * tileSize, y * tileSize, tileSize, tileSize);
      }
      
      ctx.strokeStyle = '#333';
      ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }

  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.fillText(`Pixels : ${pixels}`, 10, 30);
}

canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((event.clientX - rect.left) / tileSize);
  const y = Math.floor((event.clientY - rect.top) / tileSize);
  
  const tile = map[y][x];
  
  if(tile >= 1 && tile < 3 && pixels >= 50) {
    pixels -= 50;
    map[y][x]++;
    drawMap();
  } else if(tile === 3) {
    alert("Ce bâtiment est déjà au niveau maximum !");
  } else {
    alert("Case vide : tu peux construire ici !");
  }
});

function updateDisplay() {
  document.getElementById('pixel-counter').textContent = `Pixels : ${pixels}`;
  document.getElementById('pps').textContent = pps;
}

document.getElementById('click-button').addEventListener('click', () => {
  pixels++;
  updateDisplay();
  drawMap();
});

setInterval(() => {
  pixels += pps;
  updateDisplay();
  drawMap();
}, 1000);
