import React  from "react";
import cross from '../images/cross.svg'
import circle from '../images/circle.svg'
import {useAppDispatch} from '../app/hooks';
import {start} from '../features/startScreen/startScreenSlice'

export default function Home(){
    const dispatch = useAppDispatch();
    return(
    <div className="board">
        <div className='player-option'>
            <img className='piece cross' src={cross} alt="cross"/>
            <input type="text" placeholder="leave empty to use AI or enter player name" name='name entry'/>
        </div>
        <div className='player-option'>
        <img className='piece circle' src={circle} alt="circle"/>
        <input type="text" placeholder="leave empty to use AI or enter player name" name='name entry'/>
        </div>
    <div className='time-limit'>
    <p>turn Time limit in seconds: <span>3s</span></p>
    </div>
    <button className="start-button" onClick={() => dispatch(start())}>Start</button>
</div>
    )
}