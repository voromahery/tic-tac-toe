import React, { useEffect, useCallback, useState } from "react";
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
import { start, setExtraFeature } from "../features/startScreenSlice";
import { next, isNext, setNextPlayer } from "../features/nextPlayerSlice";
import cross from "../images/cross.svg";
import circle from "../images/circle.svg";

export default function StartedGame() {
  const dispatch = useAppDispatch();
  const firstPlayer = useAppSelector(newFirstPlayer);
  const secondPlayer = useAppSelector(newSecondPlayer);
  const timer = useAppSelector(gameTimer);
  const nextPlayer = useAppSelector(next);

  const [isDisabled, setIsDisabled] = useState(false);
  const [countDown, setCountDown] = useState(timer);
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const winner = calculateWinner(squares);
  // Pieces to display when the cell is clicked
  const circlePiece = <img src={circle} alt="circle" />;
  const crossPiece = <img src={cross} alt="cross" />;

  // Checking the available cell
  const piecesCollector: number = squares.filter(
    (item) => item !== null
  ).length;

  const changeValueIntoNumber = squares.map((item, index) => {
    return item === null ? index : item;
  });

  const availableIndex = changeValueIntoNumber.filter(
    (item) => typeof item === "number"
  );

  const getRandomNumber = Math.floor(Math.random() * availableIndex.length);

  const indexToPut = availableIndex[getRandomNumber];

  function calculateNextValue(squares: any) {
    return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
  }

  // Running the timer
  useEffect(() => {
    let myInterval = setInterval(() => {
      countDown > 0 && setCountDown(countDown - 1);
    }, 1000);
    return () => clearInterval(myInterval);
  }, [countDown]);

  // Add Scores and disabled the cell
  useEffect(() => {
    if (
      countDown === 0 &&
      nextPlayer &&
      (winner !== "X" || winner !== "O") &&
      piecesCollector !== 9
    ) {
      setIsDisabled(true);
      dispatch(secondPlayerScore());
    }
    if (
      countDown === 0 &&
      !nextPlayer &&
      (winner !== "X" || winner !== "O") &&
      piecesCollector !== 9
    ) {
      setIsDisabled(true);
      dispatch(firstPlayerScore());
    }
    if (winner === "X") {
      setIsDisabled(true);
      dispatch(firstPlayerScore());
    }
    if (winner === "O") {
      setIsDisabled(true);
      dispatch(secondPlayerScore());
    }
    // eslint-disable-next-line
  }, [nextPlayer, dispatch]);

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

  // Checking whether the game is draw or not
  useEffect(() => {
    (winner === "X" || winner === "O") && setIsDisabled(true);
    if (
      piecesCollector === 9 &&
      winner !== "X" &&
      winner !== "O" &&
      piecesCollector === 9 &&
      winner !== "X" &&
      winner !== "O"
    ) {
      setIsDisabled(true);
    }
    if (countDown === 0) {
      setIsDisabled(true);
    }
  }, [winner, piecesCollector, countDown]);

  const selectCell = useCallback(
    (square: number) => {
      const squaresCopy = [...squares];
      squaresCopy[square] = calculateNextValue(squares);
      setSquares(squaresCopy);
    },
    [squares]
  );

  function renderCell(i: number) {
    return (
      <button
        className="cell"
        disabled={
          (firstPlayer.length === 0 && secondPlayer.length === 0) ||
          countDown === 0 ||
          isDisabled ||
          squares[i]
        }
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
    if (winner === "X" && firstPlayer.length === 0) {
      return <p className="player-to-play">X won</p>;
    }
    if (winner === "O" && secondPlayer.length === 0) {
      return <p className="player-to-play">O won</p>;
    }
    if (winner === "X" && firstPlayer.length > 0) {
      return <p className="player-to-play">{firstPlayer} won</p>;
    }
    if (winner === "O" && secondPlayer.length > 0) {
      return <p className="player-to-play">{secondPlayer} won</p>;
    }
    if (countDown === 0 && winner !== "X" && winner !== "O") {
      return (
        <p className="player-to-play">
          Time out - {nextPlayer ? secondPlayer || "O" : firstPlayer || "X"} won
        </p>
      );
    }
    if (
      secondPlayer.length === 0 &&
      firstPlayer.length === 0 &&
      countDown !== 0
    ) {
      return <p className="player-to-play">{nextPlayer ? "O" : "X"}’s turn</p>;
    }
    if (firstPlayer.length === 0 && countDown !== 0) {
      return (
        <p className="player-to-play">
          {nextPlayer ? "X" : secondPlayer}’s turn
        </p>
      );
    }
    if (secondPlayer.length === 0 && countDown !== 0) {
      return (
        <p className="player-to-play">
          {nextPlayer ? "O" : firstPlayer}’s turn
        </p>
      );
    }
    if (countDown !== 0) {
      return (
        <p className="player-to-play">
          {nextPlayer ? secondPlayer : firstPlayer}’s turn
        </p>
      );
    }
  }

  function replay() {
    dispatch(start());
    dispatch(setExtraFeature(true));
    dispatch(setNextPlayer(false));
  }

  useEffect(() => {
    setTimeout(() => {
      if (
        secondPlayer.length === 0 &&
        squares.filter(Boolean).length % 2 !== 0 &&
        winner === undefined &&
        firstPlayer.length > 0
      ) {
        selectCell(indexToPut);
        dispatch(isNext());
      }
    }, 1000);

    setTimeout(() => {
      if (
        firstPlayer.length === 0 &&
        squares.filter(Boolean).length % 2 === 0 &&
        winner === undefined &&
        secondPlayer.length > 0
      ) {
        selectCell(indexToPut);
        dispatch(isNext());
      }
    }, 1000);
    // eslint-disable-next-line
  }, [secondPlayer, winner, squares, selectCell, dispatch, firstPlayer]);

  useEffect(() => {
    setTimeout(() => {
      if (
        firstPlayer.length === 0 &&
        secondPlayer.length === 0 &&
        winner === undefined &&
        countDown !== 0
      ) {
        selectCell(indexToPut);
        dispatch(isNext());
      }
    }, 1000);
    // eslint-disable-next-line
  }, [squares, winner, dispatch]);

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
      {!isDisabled ? (
        <p className="remaining-time">time left: {countDown}s</p>
      ) : (
        <button onClick={replay} className="start-button restart">
          Restart
        </button>
      )}
    </div>
  );
}
