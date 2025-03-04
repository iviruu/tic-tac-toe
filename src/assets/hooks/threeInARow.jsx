import { useState } from "react"
import { TURNS } from "../constants"


export function useBoard(){
    const [board, setBoard] = useState(() =>{
        const boardFromStorage = window.localStorage.getItem('board')
        return boardFromStorage ? JSON.parse(boardFromStorage):
        Array(9).fill(null)
      })
      return {board, setBoard}
}

export function useTurn(){
    const [turn, setTurn] = useState(() => {
        const turnFromStorage = window.localStorage.getItem('turn')
        return turnFromStorage ??
        TURNS.X
      })
      return {turn, setTurn}
}

