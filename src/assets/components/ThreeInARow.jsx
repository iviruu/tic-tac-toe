import { useState } from "react"
import { useBoard, useTurn } from "../hoocks/ThreeInARow"
import { TURNS } from "../constants"
import { checkEndGame, checkWinner } from "../logic/board"
import confetti from "canvas-confetti"
import { Square } from "./Square"
import { WinnerModal } from "./WinnerModal"

 
 
 
 
 
 function ThreeInARow () {
 const {board, setBoard} = useBoard()

  const {turn, setTurn} = useTurn()

  const [winner, setWinner] = useState(() => {
    return localStorage.getItem("winner") || null;
});

  
  
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
    window.localStorage.removeItem('winner')

  }



  const updateBoard = (index) =>{
    if(board[index] || winner) return;
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)


    const newWinner = checkWinner(newBoard)
    if (newWinner){
      confetti()
      setWinner(newWinner)
      localStorage.setItem("winner", newWinner);
    } else if(checkEndGame(newBoard)){
      setWinner(false)
    }

  }
  
  return (
    <main className='board'> 
    <section className='turn'>
      <Square isSelected = {turn === TURNS.X}>
        {TURNS.X}
        </Square>
      <Square isSelected = {turn === TURNS.O}>
        {TURNS.O}
        </Square>
    </section>
    <section className='game'>
      {
        board.map((square, index)=>{
          return(
            <Square
            key={index}
            index= {index}
            updateBoard={updateBoard}
            >
              {square}

            </Square>
          )
        } )
      }
    </section>
    <button onClick={resetGame}>Reset del juego</button>

    <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>
    </main>
    )
}
export default ThreeInARow