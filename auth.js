const users = {
  "joueur": "motdepasse",
  "admin": "admin123"
};

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if (users[username] && users[username] === password) {
    document.getElementById('login-container').classList.remove('visible');
    document.getElementById('game-container').classList.add('visible');
    loadGame(username);
    initGame(username);
  } else {
    alert("Identifiants incorrects");
  }
}
