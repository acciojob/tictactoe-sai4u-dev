const submitBtn = document.getElementById("submit");
const playerInput = document.getElementById("player-input");
const gameSection = document.getElementById("game");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "x"; // always lowercase
let gameOver = false;

const winningCombos = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player1").value.trim();
  player2 = document.getElementById("player2").value.trim();

  if (player1 === "" || player2 === "") {
    alert("Please enter both player names!");
    return;
  }

  currentPlayer = player1;
  currentSymbol = "x"; // reset to x
  playerInput.classList.add("hidden");
  gameSection.classList.remove("hidden");
  message.textContent = `${currentPlayer}, you're up`;
});

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (gameOver || cell.textContent !== "") return;

    cell.textContent = currentSymbol;
    cell.classList.add("taken");

    if (checkWin(currentSymbol)) {
      message.textContent = `${currentPlayer} congratulations you won!`; // no comma
      gameOver = true;
      return;
    }

    if ([...cells].every(c => c.textContent !== "")) {
      message.textContent = "It's a draw!";
      gameOver = true;
      return;
    }

    if (currentPlayer === player1) {
      currentPlayer = player2;
      currentSymbol = "o"; // lowercase o
    } else {
      currentPlayer = player1;
      currentSymbol = "x"; // lowercase x
    }

    message.textContent = `${currentPlayer}, you're up`;
  });
});

function checkWin(symbol) {
  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    if (
      document.getElementById(a).textContent === symbol &&
      document.getElementById(b).textContent === symbol &&
      document.getElementById(c).textContent === symbol
    ) {
      document.getElementById(a).classList.add("highlight");
      document.getElementById(b).classList.add("highlight");
      document.getElementById(c).classList.add("highlight");
      return true;
    }
    return false;
  });
}
