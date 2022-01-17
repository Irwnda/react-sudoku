import React from "react";
import { makepuzzle, solvepuzzle } from "sudoku";

export default function Board() {
  const puzzle = makepuzzle();
  const solved = solvepuzzle(puzzle);
  const pzlBoard: number[][] = [];
  while (puzzle.length) pzlBoard.push(puzzle.splice(0, 9));

  return (
    <div className="tes">
      {pzlBoard.map((row, idx) => (
        <div className="row" key={idx}>
          {row.map((tile, idy) => (
            <div className="tile" key={idy}></div>
          ))}
        </div>
      ))}
    </div>
  );
}
