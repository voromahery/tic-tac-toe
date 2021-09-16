import React from "react";
import { useAppSelector } from "./app/hooks";
import { startGame } from "./features/startScreenSlice";
import Home from "./pages/Home";
import StartedGame from "./pages/StartedGame";
import "./App.css";

function App() {
  const newGame = useAppSelector(startGame);
  return (
    <div className='container'>
      <h1 className="heading">Tic tac toe</h1>
      {newGame ? <StartedGame /> : <Home />}
    </div>
  );
}

export default App;
