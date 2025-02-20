import { useState } from 'react'
import './App.css'
import ThreeInARow from './assets/components/ThreeInARow'
import FourInARow from './assets/components/FourInARow'




function App() {
  
  
  const [mode, setMode]= useState(() =>{
    const modeStorage = window.localStorage.getItem('mode')
    return modeStorage ? JSON.parse(modeStorage) 
    : true
  })
  
  const changeGame = () =>{
    setMode(prevMode => {
      const newMode = !prevMode;
      window.localStorage.setItem('mode', JSON.stringify(newMode));
      return newMode;
    });
  }
  
  
  return (
    <main className='board'>
      <button style={{color: 'rgb(109,158,235)'}} onClick={changeGame}>Cambiar a 
      {
      mode
      ? <p>  4 en Raya</p>
      : <p>Tic Tac Toe</p>
    }
    </button>
    {
      mode
      ? <h1> Tic Tac Toe</h1>
      : <h1>🎲 4 en Raya</h1>
    }
    {
      mode
      ? <ThreeInARow/>
      : <FourInARow/>
    }
    </main>
  )
}

export default App
