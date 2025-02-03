function createBoard() {
    return Array(9).fill(null); // Creates an array with 9 `null` values
}

function createPlayer(name, symbol) {
    return { name, symbol };
}

function gameLogic() {
    let board = createBoard();
    let player1 = createPlayer("Player 1", "X");
    let player2 = createPlayer("Player 2", "O");
    let currentPlayer = player1;
    let gameOver = false;
    let winner = null;
    let movesLeft = 9;
    let winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    function play(position) {
        if (gameOver || board[position] !== null) return;

        board[position] = currentPlayer.symbol;
        movesLeft--;

        if (checkWin()) {
            gameOver = true;
            winner = currentPlayer;
            setTimeout(() => alert(`${currentPlayer.name} wins!`), 100);
        } else if (movesLeft === 0) {
            gameOver = true;
            setTimeout(() => alert("It's a draw!"), 100);
        } else {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
        }

        renderBoard(); // Update UI after move
    }

    function checkWin() {
        return winningCombos.some(([a, b, c]) => 
            board[a] && board[a] === board[b] && board[a] === board[c]
        );
    }

    function getCurrentPlayer() {
        return gameOver ? 
            (winner ? `${winner.name} wins!` : "It's a draw!") : 
            `Turn: ${currentPlayer.name} (${currentPlayer.symbol})`;
    }

    return { play, board, gameOver, winner, getCurrentPlayer };
}

// Creates and updates the game board in HTML
function renderBoard() {
    let boardElement = document.getElementById("game-interface");
    let turnIndicator = document.getElementById("turn-indicator");

    boardElement.innerHTML = ""; // Clear previous board
    game.board.forEach((cell, index) => {
        let cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.textContent = cell || "";
        cellElement.dataset.index = index;

        if (!game.gameOver) {
            cellElement.addEventListener("click", () => game.play(index));
        }

        boardElement.appendChild(cellElement);
    });

    turnIndicator.textContent = game.getCurrentPlayer();
}

// Setup the game
let game = gameLogic();
document.addEventListener("DOMContentLoaded", renderBoard);
