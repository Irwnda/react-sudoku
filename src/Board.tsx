import React, { useState, useEffect } from "react";
import { makepuzzle, solvepuzzle } from "sudoku";
import "./board.scss";
import { difficulty, theme } from "./App";

interface gameProps {
  difficulty: difficulty;
  theme: theme;
  number: number;
  setInput: React.Dispatch<React.SetStateAction<number>>;
}

const puzzle = makepuzzle();
const solved = solvepuzzle(puzzle);
const pzlBoard: number[][] = [];
for (let i = 0; i < solved.length; i += 9) {
  pzlBoard.push(solved.slice(i, i + 9));
}
// Beginner = 26-30
// Easy = 36-40
// Medium = 46-50
// Hard = 56-60

function initial2d() {
  const hidden: boolean[][] = [];
  for (let i = 0; i < 9; i++) {
    hidden[i] = Array(9).fill(true);
  }
  return hidden;
}
function getHidden(dif: number) {
  let num: number = Math.floor(Math.random() * 5) + 26 + dif * 10;
  const hidden: boolean[][] = [];
  for (let i = 0; i < 9; i++) {
    hidden[i] = Array(9).fill(true);
  }

  while (num > 0) {
    let idx = Math.floor(Math.random() * 9);
    let idy = Math.floor(Math.random() * 9);
    if (hidden[idx][idy]) {
      hidden[idx][idy] = false;
      num--;
    }
  }
  return hidden;
}

function isSameArea(selected: number[], current: number[]) {
  return (
    selected[0] / 3 === current[0] / 3 ||
    selected[1] / 3 === current[1] / 3 ||
    (Math.floor(selected[0] / 3) === Math.floor(current[0] / 3) &&
      Math.floor(selected[1] / 3) === Math.floor(current[1] / 3))
  );
}

function getBoard(hidden: boolean[][]) {
  let board: number[][] = [];
  for (let i = 0; i < 9; i++) board[i] = Array(9).fill(0);

  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 9; j++)
      !hidden[i][j] ? (board[i][j] = 0) : (board[i][j] = pzlBoard[i][j] + 1);

  return board;
}

export default function Board(prop: gameProps) {
  const [selected, setSelected] = useState([0, 0]);
  const [hidden, setHid] = useState(initial2d);
  const [gameBoard, setBoard] = useState<number[][]>([]);

  useEffect(() => {
    setHid(getHidden(prop.difficulty));
  }, [prop.difficulty]);

  useEffect(() => {
    setBoard(getBoard(hidden));
  }, [hidden]);

  useEffect(() => {
    const [x, y] = selected;
    let newArray = [...gameBoard];
    if (newArray.length && !hidden[x][y]) {
      newArray[x][y] = prop.number;
      setBoard(newArray);
    }
    // if (!hidden[x][y] && gameBoard.length) gameBoard[x][y] = prop.number;
  }, [prop.number]);

  return (
    <div className="board">
      {gameBoard.map((row, idx) => (
        <div className="row" key={idx}>
          {row.map((tile, idy) => (
            <div
              className={
                "tile" +
                (hidden[idx][idy] ? " disable" : "") +
                (selected[0] === idx && selected[1] === idy
                  ? " selected"
                  : isSameArea(selected, [idx, idy])
                  ? " area"
                  : "") +
                (idx % 3 === 2 && idy % 3 === 2 && idx !== 8 && idy !== 8
                  ? " border_hv"
                  : idx % 3 === 2 && idx !== 8
                  ? " border_h"
                  : idy % 3 === 2 && idy !== 8
                  ? " border_v"
                  : "")
              }
              key={idy}
              onClick={() => setSelected([idx, idy])}
              onContextMenu={() => setSelected([idx, idy])}
            >
              {gameBoard[idx][idy] ? tile : ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
