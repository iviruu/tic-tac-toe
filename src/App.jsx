import { useState } from 'react'
import './App.css'
import ThreeInARow from './assets/components/ThreeInARow.jsx'
import FourInARow from './assets/components/FourInARow.jsx'




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
      <h3 className='title'>Si tocas el logo, cambiaras de juego.</h3>
    <div className='logo' onClick={changeGame}>
    {
      mode
      ? <h1> Tres en Linia</h1>
      : <h1>🎲 Quatro en Linia</h1>
    }
    </div>
    {
      mode
      ? <ThreeInARow/>
      : <FourInARow/>
    }
    </main>
  )
}

export default App
