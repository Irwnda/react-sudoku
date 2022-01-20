import React from "react";
import "./App.css";
import Game from "./Game";

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
  const rightClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };
  return (
    <div className="App" onContextMenu={(e) => rightClick(e)}>
      <header className="App-header">
        <h1>Sudoku</h1>
      </header>
      <Game />
    </div>
  );
}

export default App;
