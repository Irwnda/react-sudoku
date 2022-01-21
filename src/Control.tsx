import React from "react";
import "./control.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEraser,
  faLightbulb,
  faPencilAlt,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";

interface Prop {
  setInput: React.Dispatch<React.SetStateAction<number>>;
}

library.add(faUndo, faEraser, faPencilAlt, faLightbulb);

export default function Control(prop: Prop) {
  const numItems = Array.from({ length: 9 }, (_, i) => i + 1);

  return (
    <div className="control">
      <div className="new-game-button">New Game</div>
      <div className="game-control">
        <div className="game-control-item">
          <div className="icon">
            <FontAwesomeIcon icon="undo" />
          </div>
          Undo
        </div>
        <div className="game-control-item">
          <div className="icon">
            <FontAwesomeIcon icon="eraser" />
          </div>
          Erase
        </div>
        <div className="game-control-item">
          <div className="icon">
            <FontAwesomeIcon icon="pencil-alt" />
          </div>
          Note
        </div>
        <div className="game-control-item">
          <div className="icon">
            <FontAwesomeIcon icon="lightbulb" />
          </div>
          Hint
        </div>
      </div>
      <div className="numpad">
        {numItems.map((num) => (
          <div
            className="numpad-item"
            key={num}
            onClick={() => prop.setInput(num)}
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
}
