// login.js

const users = {
  "joueur": "motdepasse",
  "admin": "admin123"
};

let currentUser = null;
let pixels = 0;
let pps = 0;
let saveInterval = null;

function showContainer(idToShow) {
  const containers = ['login-container', 'game-container'];
  containers.forEach(id => {
    const el = document.getElementById(id);
    if(id === idToShow) {
      el.style.display = 'block';
    } else {
      el.style.display = 'none';
    }
  });
}

function updateDisplay() {
  document.getElementById('pixel-counter').textContent = `Pixels : ${pixels}`;
  document.getElementById('pps').textContent = pps;
}

function saveGame() {
  if (!currentUser) return;
  localStorage.setItem(`${currentUser}_pixels`, pixels);
  localStorage.setItem(`${currentUser}_pps`, pps);
}

function loadGame() {
  if (!currentUser) return;
  pixels = parseInt(localStorage.getItem(`${currentUser}_pixels`)) || 0;
  pps = parseInt(localStorage.getItem(`${currentUser}_pps`)) || 0;
}

function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (users[username] && users[username] === password) {
    currentUser = username;
    showContainer('game-container');
    loadGame();
    updateDisplay();

    if (saveInterval) clearInterval(saveInterval);
    saveInterval = setInterval(() => {
      pixels += pps;
      updateDisplay();
      saveGame();
    }, 1000);

    const clickButton = document.getElementById('click-button');
    clickButton.onclick = () => {
      pixels++;
      const pixelCounter = document.getElementById('pixel-counter');
      pixelCounter.style.transform = 'scale(1.2)';
      setTimeout(() => {
        pixelCounter.style.transform = 'scale(1)';
      }, 100);
      updateDisplay();
      saveGame();
    };

    // Appelle drawMap si disponible (pour dessiner la map)
    if (typeof drawMap === 'function') {
      drawMap();
    }
  } else {
    alert('Identifiants incorrects');
  }
}

// Au chargement, afficher le login
showContainer('login-container');
