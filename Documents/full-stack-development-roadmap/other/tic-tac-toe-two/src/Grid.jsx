import { use, useState } from "react";
import Tile from "./Tile";

export default function Grid() {

  const [turn, setTurn] = useState(1);

  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);

  const validWins = [
    [
      [1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1],
    ],
    [
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
    ],
    [
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
    ],
    [
      [0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0],
    ],
    [
      [0, 0, 0, 0, 1],
      [0, 0, 0, 0, 1],
      [0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1],
      [0, 0, 0, 0, 1],
      [0, 0, 0, 0, 1],
    ],
    [
      [1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 1, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 1],
    ],
    [
      [0, 0, 1, 0, 0],
      [0, 1, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 1],
      [0, 0, 0, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 0, 0, 0],
      [1, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1],
      [0, 0, 0, 1, 0],
      [0, 0, 1, 0, 0],
    ],
  ];

  function checkWin() {

    for (let i = 0; i < 34; i++) {

      let count = 0;
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 5; c++) {
          if (board[r][c] == 1 && validWins[i][r][c] == 1) count++;
        }
      }

      if (count == 3) document.getElementById("message").textContent = "X WINS!";

    }

    for (let i = 0; i < 34; i++) {

      let count = 0;
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 5; c++) {
          if (board[r][c] == 2 && validWins[i][r][c] == 1) count++;
        }
      }

      if (count == 3) document.getElementById("message").textContent = "O WINS!";

    }

    for (let i = 0; i < 34; i++) {

      let count = 0;
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 5; c++) {
          if (board[r][c] == 3 && validWins[i][r][c] == 1) count++;
        }
      }

      if (count == 3) document.getElementById("message").textContent = "△ WINS!";

    }

  }

  function handleClick(event) {

    if (!event.target.textContent) {

      if (turn == 1) {
        event.target.textContent = "X";
      } else if (turn == 2) {
        event.target.textContent = "O";
      } else {
        event.target.textContent = "△";
      }

      const row = event.target.value[0];
      const col = event.target.value[2];
      const newBoard = board;
      newBoard[row][col] = turn;

      setBoard(newBoard);
      checkWin();

      setTurn(turn == 3 ? 1 : turn + 1);

    }

  }

  return (
    <div>
      <h1 id="message" className="mx-auto mt-12 w-100 text-center text-3xl font-serif">TIC-TAC-TOE-TWO</h1>
      <div className="flex flex-col h-80 w-100 mx-auto border-1 my-12">
        <div className="flex">
          <Tile r={0} c={0} fn={handleClick}></Tile>
          <Tile r={0} c={1} fn={handleClick}></Tile>
          <Tile r={0} c={2} fn={handleClick}></Tile>
          <Tile r={0} c={3} fn={handleClick}></Tile>
          <Tile r={0} c={4} fn={handleClick}></Tile>
        </div>
        <div className="flex">
          <Tile r={1} c={0} fn={handleClick}></Tile>
          <Tile r={1} c={1} fn={handleClick}></Tile>
          <Tile r={1} c={2} fn={handleClick}></Tile>
          <Tile r={1} c={3} fn={handleClick}></Tile>
          <Tile r={1} c={4} fn={handleClick}></Tile>
        </div>
        <div className="flex">
          <Tile r={2} c={0} fn={handleClick}></Tile>
          <Tile r={2} c={1} fn={handleClick}></Tile>
          <Tile r={2} c={2} fn={handleClick}></Tile>
          <Tile r={2} c={3} fn={handleClick}></Tile>
          <Tile r={2} c={4} fn={handleClick}></Tile>
        </div>
        <div className="flex">
          <Tile r={3} c={0} fn={handleClick}></Tile>
          <Tile r={3} c={1} fn={handleClick}></Tile>
          <Tile r={3} c={2} fn={handleClick}></Tile>
          <Tile r={3} c={3} fn={handleClick}></Tile>
          <Tile r={3} c={4} fn={handleClick}></Tile>
        </div>
      </div>
    </div>
  );

}
