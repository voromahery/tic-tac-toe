import React from "react";
import cross from "../images/cross.svg";
import circle from "../images/circle.svg";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { start } from "../features/startScreenSlice";
import { addNewFirstPlayer, newFirstPlayer } from "../features/addFirstPlayer";
import { newSecondPlayer, addSecondPlayer } from "../features/addSecondPlayer";
import { addTimer, gameTimer } from "../features/timer";
export default function Home() {
  const dispatch = useAppDispatch();
  const firstPlayer = useAppSelector(newFirstPlayer);
  const secondPlayer = useAppSelector(newSecondPlayer);
  const timer = useAppSelector(gameTimer);

  return (
    <div className="board">
      <div className="player-option">
        <img className="piece cross" src={cross} alt="cross" />
        <input
          type="text"
          placeholder="leave empty to use AI or enter player name"
          value={firstPlayer}
          onChange={(e) => dispatch(addNewFirstPlayer(e.target.value))}
          name="first player name"
        />
      </div>
      <div className="player-option">
        <img className="piece circle" src={circle} alt="circle" />
        <input
          type="text"
          placeholder="leave empty to use AI or enter player name"
          value={secondPlayer}
          onChange={(e) => dispatch(addSecondPlayer(e.target.value))}
          name="second player name"
        />
      </div>
      <div className="time-limit">
        <p>turn Time limit in seconds:</p>
        <input
          type="number"
          name="time-limit"
          value={timer}
          min={0}
          max={60}
          onChange={(e) => dispatch(addTimer(Number(e.target.value)))}
          placeholder="3s"
        />
      </div>
      <button
        className="start-button restart"
        onClick={() => dispatch(start())}
      >
        Start
      </button>
    </div>
  );
}
