import React from "react";
import "./App.css";
import Board from "./Board";

export enum theme {
  dark,
  light,
}
export enum difficulty {
  beginner,
  easy,
  medium,
  hard,
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sudoku</h1>
      </header>
      <Board difficulty={difficulty.beginner} theme={theme.dark} />
    </div>
  );
}

export default App;
