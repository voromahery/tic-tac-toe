import React from "react";
import cross from "../images/cross.svg";
import circle from "../images/circle.svg";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { start, extraFeature, addExtraFeature } from "../features/startScreenSlice";
import {
  addNewFirstPlayer,
  newFirstPlayer,
  newFirstPlayerScore,
  firstPlayerScore
} from "../features/addFirstPlayerSlice";
import {
  newSecondPlayer,
  addSecondPlayer,
  newSecondPlayerScore,
  addSecondPlayerScore
} from "../features/addSecondPlayerSlice";

import { addTimer, gameTimer } from "../features/timerSlice";
export default function Home() {
  const dispatch = useAppDispatch();
  const firstPlayer = useAppSelector(newFirstPlayer);
  const secondPlayer = useAppSelector(newSecondPlayer);
  const timer = useAppSelector(gameTimer);
  const displayPlayerStatus = useAppSelector(extraFeature);
  const firstPlayerScores = useAppSelector(newFirstPlayerScore);
  const secondPlayerScores = useAppSelector(newSecondPlayerScore);

  const player: { player: string; score: number }[] = [
    { player: firstPlayer, score: firstPlayerScores },
    { player: secondPlayer, score: secondPlayerScores },
  ];

  console.log(player, displayPlayerStatus);

  function rebootGame(){
    dispatch(addNewFirstPlayer(''))
    dispatch(addSecondPlayer(''))
    dispatch(addExtraFeature(false));
    dispatch(firstPlayerScore(0))
    dispatch(addSecondPlayerScore(0))
  }

  return (
    <div className="board">
      <div className="player-option">
        <img className="piece cross" src={cross} alt="cross" />
        {!displayPlayerStatus ? (
          <input
            type="text"
            placeholder="leave empty to use AI or enter player name"
            value={firstPlayer}
            onChange={(e) => dispatch(addNewFirstPlayer(e.target.value))}
            name="first player name"
          />
        ) : (
          <p className="player-status">
            {player[0].score}
            {player[0].player && ` - ${player[0].player}`}
          </p>
        )}
      </div>
      <div className="player-option">
        <img className="piece circle" src={circle} alt="circle" />
        {!displayPlayerStatus ? (
          <input
            type="text"
            placeholder="leave empty to use AI or enter player name"
            value={secondPlayer}
            onChange={(e) => dispatch(addSecondPlayer(e.target.value))}
            name="second player name"
          />
        ) : (
          <p className="player-status">
            {player[1].score}
            {player[1].player && ` - ${player[1].player}`}
          </p>
        )}
      </div>
      <div className="time-limit">
        <p>turn Time limit in seconds:</p>
        {!displayPlayerStatus ? (
          <input
            type="number"
            name="time-limit"
            value={timer}
            min={0}
            max={60}
            onChange={(e) => dispatch(addTimer(Number(e.target.value)))}
            placeholder="3s"
          />
        ) : (
          <p className='timer'>{timer}s</p>
        )}
      </div>

      {!displayPlayerStatus ? (
        <button className="start-button" onClick={() => dispatch(start())}>
          Start
        </button>
      ) : (
        <div>
          <button className="start-button" onClick={() => dispatch(start())}>
            Play again
          </button>
          <button className="start-button" onClick={rebootGame}>Reboot</button>
        </div>
      )}
    </div>
  );
}
