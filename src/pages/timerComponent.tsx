import React, {useEffect, useState} from 'react'
import { gameTimer } from "../features/timerSlice";
import { useAppSelector} from "../app/hooks";

export default function RenderTimer() {
  // const dispatch = useAppDispatch();
  const timer = useAppSelector(gameTimer);
const [countDown, setCountDown] = useState(timer)
     useEffect(() => {
    let myInterval = setInterval(() => {
      countDown > 0 && setCountDown(countDown - 1);
      // dispatch(addTimer(countDown))
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
    
  }, [countDown]);
  return  <p className="remaining-time">time left: {countDown}s</p>
}

