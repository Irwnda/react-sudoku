import React, { useState, useEffect } from "react";
import { makepuzzle, solvepuzzle } from "sudoku";
import "./board.scss";
import { difficulty, theme } from "./App";
import classNames from "classnames";

interface GameProps {
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
      board[i][j] = !hidden[i][j] ? 0 : pzlBoard[i][j] + 1;

  return board;
}

function isSameNumber(board: number[][], idx: number, idy: number) {
  if (board[idx][idy] === 0) return false;
  for (let i = 0; i < 9; i++)
    if (
      (board[idx][i] === board[idx][idy] && idy !== i) ||
      (board[i][idy] === board[idx][idy] && idx !== i)
    )
      return true;

  const xAwal = Math.floor(idx / 3) * 3,
    yAwal = Math.floor(idy / 3) * 3;
  for (let i = xAwal; i < xAwal + 3; i++)
    for (let j = yAwal; j < yAwal + 3; j++)
      if (board[i][j] === board[idx][idy] && i !== idx && j !== idy) {
        return true;
      }

  return false;
}

export default function Board(prop: GameProps) {
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
    if (newArray.length && !hidden[x][y] && prop.number !== 0) {
      newArray[x][y] = prop.number;
      setBoard(newArray);
      prop.setInput(0);
    }
  }, [prop.number]);

  return (
    <div className="board">
      {gameBoard.map((row, idx) => (
        <div className="row" key={idx}>
          {row.map((tile, idy) => {
            const isHidden = hidden[idx][idy];
            const isSelectedTile = selected[0] === idx && selected[1] === idy;
            const isRightBottom =
              idx % 3 === 2 && idy % 3 === 2 && idx !== 8 && idy !== 8;
            const isHaveSame = isSameNumber(gameBoard, idx, idy);

            return (
              <div
                className={classNames(
                  "tile",
                  { disable: isHidden },
                  { selected: isSelectedTile },
                  { "same-number": isHaveSame && !isSelectedTile },
                  {
                    area:
                      !isSelectedTile &&
                      !isHaveSame &&
                      isSameArea(selected, [idx, idy]),
                  },
                  { border_hv: isRightBottom },
                  { border_h: !isRightBottom && idx % 3 === 2 && idx !== 8 },
                  { border_v: !isRightBottom && idy % 3 === 2 && idy !== 8 }
                )}
                key={idy}
                onClick={() => setSelected([idx, idy])}
                onContextMenu={() => setSelected([idx, idy])}
              >
                {gameBoard[idx][idy] !== 0 ? tile : ""}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
