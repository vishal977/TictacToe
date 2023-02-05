import React from 'react'
import { useState } from 'react'
import * as Constants from '../Constants'

export default function GameBoard() {

    const [currentPlayer, setCurrentPlayer] = useState("X")

    const [game, setGame] = useState([["", "", ""], ["", "", ""], ["", "", ""]])

    const [result, setResult] = useState("")

    const [gameboardClass, setGameboardClass] = useState(Constants.GAMEBOARD_ENABLED)

    const [clicks, setClicks] = useState(0)

    const swapPlayer = () => {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }

    const processClick = e => {
        setClicks(clicks + 1)
        updateGameState(e.currentTarget.id)
        checkForWin()
        checkForDraw()
        swapPlayer()
    }

    const checkForDraw = () => {
        if (clicks === 8) {
            setResult(Constants.GAME_DRAWN)
            disableBoard()
        }
    }

    const updateGameState = (id) => {
        game[Math.floor(id / 10)][id % 10] = currentPlayer
        setGame(game)
    }

    const declareWinner = (winner) => {
        setResult(`Player ${winner} wins!`)
        disableBoard()
    }

    const disableBoard = () => {
        setClicks(0)
        setGameboardClass(Constants.GAMEBOARD_DISABLED)
    }

    const checkForWin = () => {
        var set = new Set()
        for (let idx = 0; idx < 3; idx++) {
            set.add(game[idx][0].concat(game[idx][1]).concat(game[idx][2]))
            set.add(game[0][idx].concat(game[1][idx]).concat(game[2][idx]))
        }
        set.add(game[0][0].concat(game[1][1]).concat(game[2][2]))

        if (currentPlayer === 'X' && set.has(`XXX`)) {
            declareWinner(`X`)
        }
        if (currentPlayer === 'O' && set.has(`OOO`)) {
            declareWinner(`O`)
        }

    }

    const resetGame = () => {
        setGame([["", "", ""], ["", "", ""], ["", "", ""]])
        setResult("")
        setGameboardClass(Constants.GAMEBOARD_ENABLED)
        setCurrentPlayer("X")
    }

    return (
        <div className="cont">
            <div className="gameTitle">
                <h1>{Constants.GAME_TITLE}</h1>
            </div>
            <div className="resultText">
                <h4>{result}</h4>
            </div>
            <div className={gameboardClass} >
                {
                    game.map((idx, rowIndex) => {
                        return idx.map((col, colIndex) => {
                            return <div className={game[rowIndex][colIndex] === "" ? "box" : "boxDisabled"} onClick={processClick} id={"" + rowIndex + colIndex}>{col}</div>
                        })
                    })
                }

            </div>
            <button className="bn54" onClick={() => resetGame()}>
                <span className="bn54span">
                    Reset game
                </span>
            </button>
        </div>
    )
}
