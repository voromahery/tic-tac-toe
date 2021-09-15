import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  firstPlayerScore,
  newFirstPlayer,
} from "../features/addFirstPlayerSlice";
import {
  newSecondPlayer,
  secondPlayerScore,
} from "../features/addSecondPlayerSlice";
import { gameTimer } from "../features/timerSlice";
import { start, addExtraFeature } from "../features/startScreenSlice";
import { next, isNext } from "../features/nextPlayerSlice";
import cross from "../images/cross.svg";
import circle from "../images/circle.svg";

export default function StartedGame() {
  const dispatch = useAppDispatch();
  const firstPlayer = useAppSelector(newFirstPlayer);
  const secondPlayer = useAppSelector(newSecondPlayer);
  const timer = useAppSelector(gameTimer);
  const nextPlayer = useAppSelector(next);
  
  const [countDown, setCountDown] = useState(timer);
  const [squares, setSquares] = React.useState(Array(9).fill(null));

  const circlePiece = <img src={circle} alt="circle" />;
  const crossPiece = <img src={cross} alt="cross" />;

  const piecesCollector: number = squares.filter(
    (item) => item !== null
  ).length;

  const winner = calculateWinner(squares);

  function calculateNextValue(squares: any) {
    return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
  }

  useEffect(() => {
    let myInterval = setInterval(() => {
      countDown > 0 && setCountDown(countDown - 1);
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [countDown]);

  useEffect(() => {
    countDown !== 0 && winner === "X" && dispatch(firstPlayerScore());
    countDown !== 0 && winner === "O" && dispatch(secondPlayerScore());
    if (countDown === 0 && nextPlayer && !winner && piecesCollector !== 9) {
      dispatch(secondPlayerScore());
    }
    if (countDown === 0 && !nextPlayer && !winner && piecesCollector !== 9) {
      dispatch(firstPlayerScore());
    }
  }, [nextPlayer, countDown, dispatch, winner, piecesCollector]);

  useEffect(() => {
    (winner === "X" || winner === "O") && setCountDown(0);
    ((piecesCollector === 9 &&
      winner !== "X" &&
      winner !== "O" &&
      winner !== "X") ||
      (piecesCollector === 9 &&
        winner !== "X" &&
        winner !== "O" &&
        winner !== "O")) &&
      setCountDown(0);
  }, [winner, piecesCollector]);

  function calculateWinner(square: any) {
    const possibility = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < possibility.length; i++) {
      const [a, b, c] = possibility[i];
      if (square[a] && square[a] === square[b] && square[a] === square[c]) {
        return square[a];
      }
    }
  }

  function selectCell(square: number) {
    const squaresCopy = [...squares];
    squaresCopy[square] = calculateNextValue(squares);
    setSquares(squaresCopy);
  }

  function renderCell(i: number) {
    return (
      <button
        className="cell"
        disabled={countDown === 0}
        key={i}
        onClick={() => {
          dispatch(isNext());
          return selectCell(i);
        }}
      >
        {squares[i] === "X" && squares[i] !== null
          ? crossPiece
          : squares[i] === "O" && squares[i] !== null && circlePiece}
      </button>
    );
  }

  function drawLine() {
    const top =
      [squares[0], squares[1], squares[2]].join("") === "XXX" ||
      [squares[0], squares[1], squares[2]].join("") === "OOO";
    const center =
      [squares[3], squares[4], squares[5]].join("") === "XXX" ||
      [squares[3], squares[4], squares[5]].join("") === "OOO";
    const bottom =
      [squares[6], squares[7], squares[8]].join("") === "XXX" ||
      [squares[6], squares[7], squares[8]].join("") === "OOO";
    const leftDraw =
      [squares[2], squares[4], squares[6]].join("") === "XXX" ||
      [squares[2], squares[4], squares[6]].join("") === "OOO";
    const rightDraw =
      [squares[0], squares[4], squares[8]].join("") === "XXX" ||
      [squares[0], squares[4], squares[8]].join("") === "OOO";
    const verticalLeftDraw =
      [squares[0], squares[3], squares[6]].join("") === "XXX" ||
      [squares[0], squares[3], squares[6]].join("") === "OOO";
    const verticalMiddleDraw =
      [squares[1], squares[4], squares[7]].join("") === "XXX" ||
      [squares[1], squares[4], squares[7]].join("") === "OOO";
    const verticalRightDraw =
      [squares[2], squares[5], squares[8]].join("") === "XXX" ||
      [squares[2], squares[5], squares[8]].join("") === "OOO";

    if (top) {
      return "top-draw";
    }
    if (center) {
      return "center-draw";
    }
    if (bottom) {
      return "bottom-draw";
    }
    if (leftDraw) {
      return "left-draw";
    }
    if (rightDraw) {
      return "right-draw";
    }
    if (verticalLeftDraw) {
      return "vertical-left-draw";
    }
    if (verticalMiddleDraw) {
      return "vertical-center-draw";
    }
    if (verticalRightDraw) {
      return "vertical-right-draw";
    }
  }

  function textToDisplay() {
    if (piecesCollector === 9 && winner !== "X" && winner !== "O") {
      return <p className="player-to-play">Draw!</p>;
    }
    if (winner === "X") {
      return <p className="player-to-play">{firstPlayer} won</p>;
    }
    if (winner === "O") {
      return <p className="player-to-play">{secondPlayer} won</p>;
    }
    if (countDown !== 0) {
      return (
        <p className="player-to-play">
          {nextPlayer ? secondPlayer : firstPlayer}’s turn
        </p>
      );
    }
    if (countDown === 0 && winner !== "X" && winner !== "O") {
      return (
        <p className="player-to-play">
          Time out - {nextPlayer ? secondPlayer : firstPlayer} won
        </p>
      );
    }
  }
  function replay() {
    dispatch(start());
    dispatch(addExtraFeature(true));
  }

  return (
    <div className="started-wrapper">
      {textToDisplay()}
      <div className="board-container">
        <div className="vertical-border left"></div>
        <div className="horizontal-border top"></div>
        <div className="horizontal-border down"></div>
        <div className="vertical-border right"></div>
        {squares.map((square: boolean, index: number) => renderCell(index))}
        <div
          style={{ display: drawLine() ? "block" : "none" }}
          className={`draw-line ${drawLine()}`}
        ></div>
      </div>
      {countDown > 0 ? (
        <p className="remaining-time">time left: {countDown}s</p>
      ) : (
        <button onClick={replay} className="start-button restart">
          Restart
        </button>
      )}
    </div>
  );
}
