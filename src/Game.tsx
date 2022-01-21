import React from "react";
import { difficulty, theme } from "./App";
import "./game.scss";
import Board from "./Board";
import Control from "./Control";

export default function Game() {
  const [inputNumber, setInputNumber] = React.useState(0);

  return (
    <div className="game">
      <Board
        difficulty={difficulty.beginner}
        theme={theme.dark}
        number={inputNumber}
        setInput={setInputNumber}
      />
      <Control setInput={setInputNumber} />
    </div>
  );
}
