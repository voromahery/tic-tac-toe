import React, {useEffect, useState} from "react";
import {useAppSelector, useAppDispatch} from '../app/hooks';
import {addFirstPlayerScore ,newFirstPlayer} from '../features/addFirstPlayer'
import { newSecondPlayer, secondPlayerScore} from '../features/addSecondPlayer'
import {gameTimer} from '../features/timer'
import {start} from '../features/startScreenSlice'
import { next, isNext } from "../features/nextPlayer";
import cross from '../images/cross.svg'
import circle from '../images/circle.svg'

// Possibility to win
//[0, 1, 2]
//[3, 4, 5]
//[6, 7, 8]

//[0, 3, 6]
//[3, 4, 5]
//[6, 7, 8]

//[2, 4, 6]
//[0, 4, 8]

export default function StartedGame(){
    const dispatch = useAppDispatch();
    const firstPlayer = useAppSelector(newFirstPlayer);
    const secondPlayer = useAppSelector(newSecondPlayer);
    const timer = useAppSelector(gameTimer)
    const nextPlayer = useAppSelector(next)
    // const firstPlayerScores = useAppSelector(newFirstPlayerScore)
    // const secondPlayerScores = useAppSelector(newSecondPlayerScore)
    const [countDown, setCountDown] = useState(timer)
    const circlePiece = <img src={circle} alt='circle'/>
    const crossPiece = <img src={cross} alt='cross'/>
    const [squares, setSquares] = React.useState(Array(9).fill(null))
    
    // const player:{player: string, score: number}[] = [
    //   {
    //     player: firstPlayer, 
    //     score: firstPlayerScores, 
    //   }, 
    //   {
    //     player: secondPlayer, 
    //     score: secondPlayerScores, 
    //   }
    // ]

     const winner = calculateWinner(squares)

    function calculateNextValue(squares:any) {
        return squares.filter(Boolean).length % 2 === 0 ? "X" : 'O'
      }

      function calculateWinner(square:any) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ]
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i]
          
          if (square[a] && square[a] === square[b] && square[a] === square[c]) {
            return square[a]
          }
        }
        return null
      }

    function selectSquare(square:number) {
      if (winner || squares[square]){
        return
      }
      const squaresCopy = [...squares]
      squaresCopy[square] = calculateNextValue(squares)
      setSquares(squaresCopy)
    }

    function renderSquare(i:number) {
      return (
        <button className='cell' disabled={countDown === 0} onClick={() => {
          dispatch(isNext())
          return selectSquare(i)
        }}>
          {squares[i] === 'X' && squares[i] !== null ? crossPiece : squares[i] === 'O' && squares[i] !== null && circlePiece}
        </button>
      )
    }

   useEffect(()=>{
    let myInterval = setInterval(() => {
            countDown > 0 && setCountDown(countDown - 1)
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    },[countDown]);

useEffect(() => {
  if (countDown === 0 && nextPlayer){
    dispatch(secondPlayerScore())
  } 
  else if(countDown === 0 && !nextPlayer) {
    dispatch(addFirstPlayerScore())
  }
  
}, [nextPlayer, countDown, dispatch])

function textToDisplay(){
  if (countDown !== 0 && winner === 'X') {
    return <p className='player-to-play'>{firstPlayer} won</p>
  }
  if (countDown !== 0 && winner === 'O') {
    return <p className='player-to-play'>{secondPlayer} won</p>
  }
  if(countDown !== 0){
  return  <p className='player-to-play'>{nextPlayer ? secondPlayer : firstPlayer}’s turn</p>
  } 
  if (countDown === 0 && winner !=='X' && winner !== 'O') {
  return <p className='player-to-play'>Time out - {nextPlayer ? secondPlayer : firstPlayer} won</p>
  }
}


    return(
        <div className='started-wrapper'>
         {textToDisplay()}
         
          <div className='board-container'>
            <div className="vertical-border left"></div>
            <div className="horizontal-border top"></div>
            <div className="horizontal-border down"></div>
            <div className="vertical-border right"></div>
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
          {countDown > 0 ? <p className='remaining-time'>time left: {countDown}s</p> : <button onClick={() => dispatch(start())} className='start-button'>Restart</button>}
        </div>
    )
}