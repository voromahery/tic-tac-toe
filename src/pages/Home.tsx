import React  from "react";
import cross from '../images/cross.svg'
import circle from '../images/circle.svg'
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {start} from '../features/startScreenSlice'
import { addNewPlayer, newPlayer } from "../features/addPlayer";
import { newSecondPlayer, addSecondPlayer} from '../features/addSecondPlayer'
export default function Home(){
    const dispatch = useAppDispatch();
    const firstPlayer = useAppSelector(newPlayer);
    const secondPlayer = useAppSelector(newSecondPlayer)
    
    return(
    <div className="board">
        <div className='player-option'>
            <img className='piece cross' src={cross} alt="cross"/>
            <input type="text" placeholder="leave empty to use AI or enter player name" value={firstPlayer} onChange={(e) => dispatch(addNewPlayer(e.target.value))} name='first player name'/>
        </div>
        <div className='player-option'>
            <img className='piece circle' src={circle} alt="circle"/>
            <input type="text" placeholder="leave empty to use AI or enter player name" value={secondPlayer} onChange={(e) => dispatch(addSecondPlayer(e.target.value))} name='second player name'/>
        </div>
    <div className='time-limit'>
    <p>turn Time limit in seconds: <span>3s</span></p>
    </div>
    <button className="start-button" onClick={() => dispatch(start())}>Start</button>
</div>
    )
}