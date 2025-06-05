let solana = 0;

function authenticate() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    if (username === "admin" && password === "admin") {
        document.getElementById("auth-container").style.display = "none";
        document.getElementById("game-container").style.display = "block";
    } else {
        alert("Identifiants incorrects !");
    }
}

document.getElementById("mine-btn").addEventListener("click", function() {
    solana += 1;
    console.log("Solana miné : " + solana);
});

// Ajout des bâtiments aléatoirement sur la carte
const map = document.getElementById("map");
for (let i = 0; i < 10; i++) {
    let building = document.createElement("div");
    building.className = "building";
    building.style.left = Math.random() * 750 + "px";
    building.style.top = Math.random() * 450 + "px";
    map.appendChild(building);
}
