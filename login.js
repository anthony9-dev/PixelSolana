// login.js

// Utilisateurs autorisés
const users = {
  "joueur": "motdepasse",

};

let currentUser = null;

// Fonction pour afficher/masquer les conteneurs
function showContainer(idToShow) {
  const containers = ['login-container', 'game-container'];
  containers.forEach(id => {
    const el = document.getElementById(id);
    if(id === idToShow) {
      el.classList.add('visible');
      el.classList.remove('hidden');
    } else {
      el.classList.remove('visible');
      el.classList.add('hidden');
    }
  });
}

// Variables du jeu (peux être déplacées ailleurs si besoin)
let pixels = 0;
let pps = 0;
let saveInterval = null;

// Éléments DOM utiles
const pixelCounter = document.getElementById('pixel-counter');
const ppsCounter = document.getElementById('pps');
const clickButton = document.getElementById('click-button');

// Tableau upgrades (exemple simple)
const upgrades = [
  { cost: 10, gain: 1 },
  { cost: 100, gain: 5 },
  { cost: 1000, gain: 20 }
];

// Mise à jour affichage pixels et production/sec
function updateDisplay() {
  pixelCounter.textContent = `Pixels : ${pixels}`;
  ppsCounter.textContent = pps;
}

// Sauvegarder les données dans localStorage
function saveGame() {
  if(!currentUser) return;
  localStorage.setItem(`${currentUser}_pixels`, pixels);
  localStorage.setItem(`${currentUser}_pps`, pps);
}

// Charger les données depuis localStorage
function loadGame() {
  if(!currentUser) return;
  pixels = parseInt(localStorage.getItem(`${currentUser}_pixels`)) || 0;
  pps = parseInt(localStorage.getItem(`${currentUser}_pps`)) || 0;
}

// Fonction de connexion
function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if(users[username] && users[username] === password) {
    currentUser = username;
    showContainer('game-container');
    loadGame();
    updateDisplay();

    // Lancer l'incrémentation automatique
    if(saveInterval) clearInterval(saveInterval);
    saveInterval = setInterval(() => {
      pixels += pps;
      updateDisplay();
      saveGame();
    }, 1000);

    // Ajouter gestion du clic sur bouton +1 pixel
    clickButton.onclick = () => {
      pixels++;
      pixelCounter.style.transform = 'scale(1.2)';
      setTimeout(() => pixelCounter.style.transform = 'scale(1)', 100);
      updateDisplay();
      saveGame();
    };

    // Dessiner la map (appel à la fonction définie dans game.js)
    if(typeof drawMap === 'function') {
      drawMap();
    }

  } else {
    alert("Identifiants incorrects");
  }
}

// Optionnel : déconnexion (à appeler si besoin)
function logout() {
  currentUser = null;
  pixels = 0;
  pps = 0;
  if(saveInterval) clearInterval(saveInterval);
  showContainer('login-container');
}

