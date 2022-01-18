import React from "react";
import { makepuzzle, solvepuzzle } from "sudoku";
import "./board.scss";
import { difficulty, theme } from "./App";

interface gameSetting {
  difficulty: difficulty;
  theme: theme;
}

const puzzle = makepuzzle();
const solved = solvepuzzle(puzzle);
const pzlBoard: number[][] = [];
for (let i = 0; i < solved.length; i += 9) {
  pzlBoard.push(solved.slice(i, i + 9));
}
const hidden: boolean[][] = [];

// Beginner = 26-30
// Easy = 36-40
// Medium = 46-50
// Hard = 56-60
function setHidden(dif: number) {
  let num: number = Math.floor(Math.random() * 5) + 26 + dif * 10;
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
}

export default function Board(prop: gameSetting) {
  setHidden(prop.difficulty);

  return (
    <div className="game">
      {pzlBoard.map((row, idx) => (
        <div className="row" key={idx}>
          {row.map((tile, idy) => (
            <div
              className={
                "tile" +
                (hidden[idx][idy] ? " disable" : "") +
                (idx % 3 === 2 && idy % 3 === 2 && idx !== 8 && idy !== 8
                  ? " border_hv"
                  : idx % 3 === 2 && idx !== 8
                  ? " border_h"
                  : idy % 3 === 2 && idy !== 8
                  ? " border_v"
                  : "")
              }
              key={idy}
            >
              {hidden[idx][idy] ? tile + 1 : ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
