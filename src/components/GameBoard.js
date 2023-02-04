import React from 'react'
import { useState } from 'react'

export default function GameBoard() {

    const [currentPlayer, setCurrentPlayer] = useState("X");

    const [game, setGame] = useState([["", "", ""], ["", "", ""], ["", "", ""]]);

    const [result, setResult] = useState("");

    const [gameboardClass, setGameboardClass] = useState("gameboard");

    const [clicks, setClicks] = useState(0);

    function swapPlayer() {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }

    const processClick = e => {
        setClicks(clicks + 1);
        var id = e.currentTarget.id;
        let updatedGame = game;
        updatedGame[Math.floor(id / 10)][id % 10] = currentPlayer;
        setGame(updatedGame);
        validateGame();
        if (clicks === 8) {
            setResult("It's a draw!");
            setClicks(0);
            setGameboardClass("gameboardDisabled");
        }
        swapPlayer();
    };

    function validateGame() {
        var set = new Set();
        set.add(game[0][0].concat(game[0][1]).concat(game[0][2]));
        set.add(game[1][0].concat(game[1][1]).concat(game[1][2]));
        set.add(game[2][0].concat(game[2][1]).concat(game[2][2]));

        set.add(game[0][0].concat(game[1][0]).concat(game[2][0]));
        set.add(game[0][1].concat(game[1][1]).concat(game[2][1]));
        set.add(game[0][2].concat(game[1][2]).concat(game[2][2]));

        set.add(game[0][0].concat(game[1][1]).concat(game[2][2]));
        set.add(game[0][2].concat(game[1][1]).concat(game[2][0]));

        if (currentPlayer === 'X') {
            if (set.has("XXX")) {
                setResult("Player X wins!");
                setClicks(0);
                setGameboardClass("gameboardDisabled");
            }
        } else {
            if (set.has("OOO")) {
                setResult("Player O wins!");
                setClicks(0);
                setGameboardClass("gameboardDisabled");
            }
        }

    }

    function resetGame() {
        setGame([["", "", ""], ["", "", ""], ["", "", ""]]);
        setResult("");
        setGameboardClass("gameboard");
        setCurrentPlayer("X");
    }

    return (
        <div className="cont">
            <div className="gameTitle">
                <h1>Tic Tac Toe</h1>
            </div>
            <div className="resultText">
                <h4>{result}</h4>
            </div>
            <div className={gameboardClass} >

                <div className="box" onClick={processClick} id="0">{game[0][0]}</div>
                <div className="box" onClick={processClick} id="1">{game[0][1]}</div>
                <div className="box" onClick={processClick} id="2">{game[0][2]}</div>

                <div className="box" onClick={processClick} id="10">{game[1][0]}</div>
                <div className="box" onClick={processClick} id="11">{game[1][1]}</div>
                <div className="box" onClick={processClick} id="12">{game[1][2]}</div>

                <div className="box" onClick={processClick} id="20">{game[2][0]}</div>
                <div className="box" onClick={processClick} id="21">{game[2][1]}</div>
                <div className="box" onClick={processClick} id="22">{game[2][2]}</div>

            </div>
            <button className="bn54" onClick={() => resetGame()}>
                <span className="bn54span">
                    Reset game
                </span>
            </button>
        </div>
    )
}
