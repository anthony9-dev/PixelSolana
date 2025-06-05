const users = {
  "joueur": "motdepasse",
  "admin": "admin123"
};

let currentUser = null;
let pixels = 0;
let pps = 0;
let saveInterval = null;

function showContainer(id) {
  document.getElementById('login-container').style.display = id === 'login-container' ? 'block' : 'none';
  document.getElementById('game-container').style.display = id === 'game-container' ? 'block' : 'none';
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

    document.getElementById('click-button').addEventListener('click', () => {
      pixels++;
      const pixelCounter = document.getElementById('pixel-counter');
      pixelCounter.style.transform = 'scale(1.2)';
      setTimeout(() => {
        pixelCounter.style.transform = 'scale(1)';
      }, 100);
      updateDisplay();
      saveGame();
    });

  } else {
    alert('Identifiants incorrects');
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("login-button").addEventListener("click", login);
  showContainer("login-container");
});
