import React from "react";
import { makepuzzle, solvepuzzle } from "sudoku";
import "./board.scss";

const puzzle = makepuzzle();
const solved = solvepuzzle(puzzle);
const pzlBoard: number[][] = [];
while (puzzle.length) pzlBoard.push(puzzle.splice(0, 9));

export default function Board() {
  return (
    <div className="tes">
      {pzlBoard.map((row, idx) => (
        <div className="row" key={idx}>
          {row.map((tile, idy) => (
            <div
              className={
                "tile" +
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
              {tile ? tile + 1 : ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
