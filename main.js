let campoMinado = document.getElementById("campo-minado");
let td = campoMinado.getElementsByTagName("td");
let minas = [];
let gameOver = false;
let audio = new Audio();
let audio2 = new Audio();
audio.src = "Efeitos Sonoros/Risada de fantasma.m4a";
audio2.src = "Efeitos Sonoros/Win.m4a";
let passosCertos = 0;
let passosCertosElement = document.getElementById("passos-certos");
let vitoriaIndex;
let tentativas = 3;
let vitorias = 0;
let vitoriaMines = [3, 10, 17, 30, 78];

if (!passosCertosElement) {
  console.error("Element with id 'passos-certos' not found!");
  passosCertosElement = document.createElement("div");
  passosCertosElement.id = "passos-certos";
  document.body.appendChild(passosCertosElement);
}

for (let i = 0; i < 20; i++) {
  let randomIndex = Math.floor(Math.random() * td.length);
  while (minas.includes(randomIndex) || vitoriaMines.includes(randomIndex)) {
    randomIndex = Math.floor(Math.random() * td.length);
  }
  minas.push(randomIndex);
}

for (let i = 0; i < vitoriaMines.length; i++) {
  minas.push(vitoriaMines[i]);
}

function displayVictoryImage(tdIndex) {
  const victoryImage = document.createElement("img");
  victoryImage.src = "https://media.forgecdn.net/avatars/50/855/636096999468033500.gif";
  victoryImage.style.position = "absolute";
  victoryImage.style.top = "50%";
  victoryImage.style.left = "50%";
  victoryImage.style.transform = "translate(-50%, -50%)";
  victoryImage.style.zIndex = "1000";
  victoryImage.style.width = "400px";
  victoryImage.style.height = "400px";
  document.body.appendChild(victoryImage);
}

const cubos = document.querySelectorAll('#campo-minado td');
cubos.forEach(cubo => {
  cubo.style.backgroundSize = 'cover';
  cubo.style.height = '40px';
  cubo.style.width = '40px';
});

for (let i = 0; i < td.length; i++) {
  td[i].addEventListener("click", function() {
    if (gameOver) return;
    let tdIndex = Array.prototype.indexOf.call(td, this);
    switch (true) {
      case minas.includes(tdIndex) && vitoriaMines.includes(tdIndex):
        vitorias++;
        displayVictoryImage(tdIndex);
        if (vitorias === 5) {
          gameOver = true;
          alert(`VOCÊ GANHOU!\nSua pontuação final é: ${passosCertos} passos certos!`);
          setTimeout(function() {
            location.reload();
          }, 3000);
        } else {
          audio2.play();
          alert("Você encontrou o portal!");
        }
        break;
      case minas.includes(tdIndex):
        gameOver = true;
        audio.play();
        alert(`Você foi pego, tente novamente!\nSua pontuação final é: ${passosCertos} passos corretos!`);
        audio.play();
        for (let j = 0; j < minas.length; j++) {
          if (vitoriaMines.includes(minas[j])) {
            td[minas[j]].style.backgroundImage = 0;
          } else {
            td[minas[j]].style.backgroundImage = "url('https://1000logos.net/wp-content/uploads/2023/01/Ghostbusters-Logo-1984-2048x1152.png')";
          }
        }
        setTimeout(function() {
          location.reload();
        }, 3000);
        break;
      default:
        if (!this.clicked) {
          passosCertos++;
          passosCertosElement.textContent = `Passos certos: ${passosCertos}`;
          this.clicked = true;
        }
        this.style.backgroundImage = "url('img/pet.gif')";
    }
  });
}