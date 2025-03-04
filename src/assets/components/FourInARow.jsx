import { useEffect, useState } from "react";
import "./FourInARow.css";
import { WinnerModal } from "./WinnerModal";
import confetti from "canvas-confetti";

const FILAS = 6;
const COLUMNAS = 7;
const VACIO = null;

const generarTablero = () => Array.from({ length: FILAS }, () => Array(COLUMNAS).fill(VACIO));

export default function FourInARow() {
    const [tablero, setTablero] = useState(() => {
        const savedBoard = localStorage.getItem("tablero");
        return savedBoard ? JSON.parse(savedBoard) : generarTablero();
    });

    const [turno, setTurno] = useState(() => {
        return localStorage.getItem("turno") || "🔴";
    });

    const [winner, setWinner] = useState(() => {
        return JSON.parse(localStorage.getItem("ganador")) || null;
    });

    // Guardar el estado del juego en localStorage cada vez que cambie
    useEffect(() => {
        localStorage.setItem("tablero", JSON.stringify(tablero));
        localStorage.setItem("turno", turno);
        localStorage.setItem("ganador", JSON.stringify(winner));
    }, [tablero, turno, winner]);

    const colocarFicha = (columna) => {
        if (winner) return;

        const nuevaMatriz = tablero.map((fila) => [...fila]);
        for (let fila = FILAS - 1; fila >= 0; fila--) {
            if (!nuevaMatriz[fila][columna]) {
                nuevaMatriz[fila][columna] = turno;
                setTablero(nuevaMatriz);

                if (checkVictoria(nuevaMatriz, fila, columna, turno)) {
                    setWinner(turno);
                    confetti();
                } else {
                    setTurno(prevTurno => (prevTurno === "🔴" ? "🟡" : "🔴"));
                }
                return;
            }
        }
    };

    const checkVictoria = (matriz, fila, columna, jugador) => {
        return (
            checkLinea(matriz, fila, columna, jugador, 1, 0) || // Horizontal
            checkLinea(matriz, fila, columna, jugador, 0, 1) || // Vertical
            checkLinea(matriz, fila, columna, jugador, 1, 1) || // Diagonal ↘
            checkLinea(matriz, fila, columna, jugador, 1, -1)   // Diagonal ↙
        );
    };

    const checkLinea = (matriz, fila, columna, jugador, deltaFila, deltaColumna) => {
        let count = 1 + contarFichas(matriz, fila, columna, jugador, deltaFila, deltaColumna)
                      + contarFichas(matriz, fila, columna, jugador, -deltaFila, -deltaColumna);
        return count >= 4;
    };

    const contarFichas = (matriz, fila, columna, jugador, deltaFila, deltaColumna) => {
        let count = 0;
        let r = fila + deltaFila;
        let c = columna + deltaColumna;

        while (r >= 0 && r < FILAS && c >= 0 && c < COLUMNAS && matriz[r][c] === jugador) {
            count++;
            r += deltaFila;
            c += deltaColumna;
        }
        return count;
    };

    const resetGame = () => {
        setTablero(generarTablero());
        setTurno("🔴");
        setWinner(null);
        localStorage.removeItem("tablero");
        localStorage.removeItem("turno");
        localStorage.removeItem("ganador");
    };

    return (
        <div className="board">
            {winner ? (
                <h2 className="ganador">¡{winner} Gana! 🎉</h2>
            ) : (
                <h2 className="turn">Turno de {turno}</h2>
            )}
            <div className="tablero">
                {tablero.map((fila, filaIndex) =>
                    fila.map((celda, colIndex) => (
                        <div
                            key={`${filaIndex}-${colIndex}`}
                            className="celda"
                            onClick={() => colocarFicha(colIndex)}
                        >
                            {celda}
                        </div>
                    ))
                )}
            </div>
            <button onClick={resetGame} className="reiniciar">
                🔄 Reiniciar
            </button>
            <WinnerModal winner={winner} resetGame={resetGame} />
        </div>
    );
}
