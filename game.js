let pixels = 0;
let pps = 0;
let gameInterval = null;

const tileSize = 64;
const mapWidth = 10;
const mapHeight = 10;
let buildings = 0;

let map = Array.from({ length: mapHeight }, () => Array(mapWidth).fill(0));

const images = {
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
  
  ctx.fillStyle = '#90ee90'; // Fond plein écran
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  for (let y = 0; y < mapHeight; y++) {
    for (let x = 0; x < mapWidth; x++) {
      const tile = map[y][x];

      if (tile !== 0 && images[tile].complete) {
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

  if (map[y][x] >= 1 && map[y][x] < 3 && pixels >= 50) {
    pixels -= 50;
    map[y][x]++;
    drawMap();
  } else if (map[y][x] === 3) {
    alert("Ce bâtiment est au niveau maximum !");
  }
});

document.getElementById('click-button').addEventListener('click', () => {
  pixels++;
  drawMap();
});

document.getElementById('buy-building').addEventListener('click', () => {
  if (pixels >= 100) {
    pixels -= 100;
    let placed = false;

    for (let y = 0; y < mapHeight && !placed; y++) {
      for (let x = 0; x < mapWidth && !placed; x++) {
        if (map[y][x] === 0) {
          map[y][x] = 1;
          placed = true;
        }
      }
    }

    if (!placed) {
      alert("Plus de place pour un nouveau bâtiment !");
    } else {
      drawMap();
    }
  } else {
    alert("Pas assez de pixels !");
  }
});

setInterval(() => {
  pixels += pps;
  drawMap();
}, 1000);
