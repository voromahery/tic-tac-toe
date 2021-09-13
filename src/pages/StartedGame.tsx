import React, {useEffect, useState} from "react";
import {useAppSelector, useAppDispatch} from '../app/hooks';
import {newPlayer} from '../features/addPlayer'
// import { newSecondPlayer} from '../features/addSecondPlayer'
import {gameTimer} from '../features/timer'
 import {start} from '../features/startScreenSlice'
// 0 | 1 | 2
// ---+---+---
//  3 | 4 | 5
// ---+---+---
//  6 | 7 | 8 
// Possibility to win
//[0, 1, 2]
//[3, 4, 5]
//[6, 7, 8]

//[0, 3, 6]
//[3, 4, 5]
//[6, 7, 8]

//[6, 4, 2]
//[0, 4, 8]
export default function StartedGame(){
    const dispatch = useAppDispatch();
    const firstPlayer = useAppSelector(newPlayer);
    // const secondPlayer = useAppSelector(newSecondPlayer);
    const timer = useAppSelector(gameTimer)
    const [countDown, setCountDown] = useState(timer)

   useEffect(()=>{
    let myInterval = setInterval(() => {
            countDown > 0 && setCountDown(countDown - 1)
        }, 1000)
        
        return ()=> {
            clearInterval(myInterval);
          };

    },[countDown]);

    return(
<div className='started-wrapper'>
    <p className='player-to-play'>{firstPlayer}’s turn</p>
<div className='board-container'>
            <div className="vertical-border left"></div>
            <div data-cell-index="0" className="cell 0"></div>
            <div data-cell-index="1" className="cell 1"></div>
            <div data-cell-index="2" className="cell 2"></div>
            <div className="horizontal-border top"></div>
            <div data-cell-index="3" className="cell 3"></div>
            <div data-cell-index="4" className="cell 4"></div>
            <div data-cell-index="5" className="cell 5"></div>
            <div className="horizontal-border down"></div>
            <div data-cell-index="6" className="cell 6"></div>
            <div data-cell-index="7" className="cell 7"></div>
            <div data-cell-index="8" className="cell 8"></div>
            <div className="vertical-border right"></div>
        </div>
        {countDown > 0 ? <p className='remaining-time'>time left: {countDown}s</p> : <button onClick={() => dispatch(start())} className='start-button'>Restart</button>}
</div>
    )
}