const board = document.getElementById("board");
        const messageScreen = document.getElementById("message-screen");
        const messageText = document.getElementById("message-text");
        const resetButton = document.getElementById("reset");
        let currentPlayer = "X";
        let gameBoard = ["", "", "", "", "", "", "", "", ""];

        function checkWinner() {
            const winCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];

            for (const combo of winCombinations) {
                const [a, b, c] = combo;
                if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                    messageText.textContent = `Player ${gameBoard[a]} wins!`;
                    messageScreen.style.display = "flex";
                    return true;
                }
            }

            if (!gameBoard.includes("")) {
                messageText.textContent = "It's a draw!";
                messageScreen.style.display = "flex";
                return true;
            }

            return false;
        }

        function cellClick(e) {
            const cellIndex = e.target.dataset.index;
            if (gameBoard[cellIndex] === "" && !checkWinner()) {
                gameBoard[cellIndex] = currentPlayer;
                e.target.textContent = currentPlayer;
                e.target.style.backgroundColor = "transparent";

                if (!checkWinner()) {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                }
            }
        }

        function resetBoard() {
            gameBoard = ["", "", "", "", "", "", "", "", ""];
            currentPlayer = "X";
            board.innerHTML = "";
            messageScreen.style.display = "none";
            createBoard();
        }

        function createBoard() {
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.index = i;
                cell.addEventListener("click", cellClick);
                board.appendChild(cell);
            }
        }

        createBoard();
        resetButton.addEventListener("click", resetBoard);