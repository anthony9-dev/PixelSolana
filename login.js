const users = {
  "joueur": "motdepasse",
  "admin": "admin123"
};

const loginContainer = document.getElementById('login-container');
const gameContainer = document.getElementById('game-container');
const loginButton = document.getElementById('login-button');

let currentUser = null;

loginButton.addEventListener('click', () => {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (users[username] && users[username] === password) {
    currentUser = username;
    loginContainer.classList.replace('visible', 'hidden');
    gameContainer.classList.replace('hidden', 'visible');
    // Charge les données du jeu pour cet utilisateur
    loadGame(currentUser);
    startGameLoop();
  } else {
    alert("Identifiants incorrects");
  }
});
