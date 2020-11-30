import React, { useState } from 'react';
import "animate.css"
import './Game.scss';


const game_data = [[0,0,0],
                   [0,0,0],
                   [0,0,0]];


function checkDown(data, col){
  return data[0][col] === data[1][col] && data[0][col] == data[2][col] && data[0][col] !== 0;
}
function checkAcross(data, row){
  return data[row][0] === data[row][1] && data[row][0] == data[row][2] && data[row][0] !== 0;
}
function checkDiagonal(data){
  return data[0][0] === data[1][1] && data[0][0] === data[2][2] && data[0][0] !== 0;
}
function checkDiagonal2(data){
  return data[0][2] === data[1][1] && data[0][2] === data[2][0] && data[0][2] !== 0;
}

function checkWin(data, row, col){
    if(checkDown(data, col) || checkAcross(data, row) || checkDiagonal(data) || checkDiagonal2(data)){
      return true
    }else{
      return false
    }
}
function checkDraw(data){
    for(let i = 0; i < data.length; i++){
        for(let j=0; j < data[i].length; j++){
            if(data[i][j] === 0){
                return false;
            }
        }
    }

    return true;
}



const Game = () => {
    const initialgameData = {
        player1: 0,
        player2: 0,
        draw: 0
    }

    const [data, setData] = useState(game_data);
    const [playerTurn, setPlayerTurn] = useState(1);
    const [gameEnded, setEnd] = useState(false);
    const [isDraw, setDraw] = useState(false);
    const [gameData, setGameData] = useState(initialgameData);

    const setCellValue = (row, col) => {
        
        if ( data[row][col] == 0 && !gameEnded && !isDraw){
            let newData = data;
            newData[row][col] =  playerTurn;
            setData(newData);
            let wins = checkWin(data, row, col);
            let draw = checkDraw(data);
            if(wins){
                let d = gameData;
                if(playerTurn == 1){
                    d.player1 += 1; 
                    setGameData(d);

                }else {
                    d.player2 += 1;
                    setGameData(d);
                }
                console.table(gameData)
                setEnd(true);
            }else if (draw){
                setDraw(true);
            }
            else {
                setPlayerTurn(playerTurn => playerTurn == 1 ? 2 : 1);
            }
            
        }
    }

    const resetGame = () => {
        const new_game = [[0,0,0],
                          [0,0,0],
                          [0,0,0]];
        setData(new_game);
        setEnd(false);
        setDraw(false);
    }

    return (
        <div className="game">
           {
               gameEnded ?
                    <Modal>
                        <h1>🎆🎇🏆🏆🏆🏆✨🎉</h1>
                        <h2>Player {playerTurn}</h2>
                        <h4>Wins This Round </h4>
                        <button className="btn" onClick={resetGame}>Play again</button>
                    </Modal>
               : null
           }
           {
               isDraw ?
                    <Modal>
                        <h1>❌⭕</h1>
                        <h2>Draw</h2>
                        <button className="btn" onClick={resetGame}>Play again</button>
                    </Modal>
               : null
           }
            <table className="game_table">
                <tbody>
                    {
                        data.map((row, index) => {
                            return <Row key={index} rowData={row} rowIndex={index} changeFunc={setCellValue}></Row>
                        })
                    }
                </tbody>
            </table>
            <div className="turn-shower">
                <span className={playerTurn == 1 ? "active turn" : " turn"}><span  className="point">{gameData.player1}</span>Player 1</span>
                    <span className={playerTurn == 2 ? "active turn" : " turn"}>Player 2 <span className="point">{gameData.player2}</span></span>
            </div>
        </div>
    )
}

const Row = (props) => {
    const rowData = props.rowData;
    const changeFunc = props.changeFunc;
    const rowIndex = props.rowIndex;

    return (
        <tr>
           { rowData.map((col, index) => {
                return <Cell colData={col} key={(3*rowIndex)+index} rowIndex={rowIndex} colIndex={index} changeFunc={changeFunc}></Cell>
            })}
        </tr>
    )
}
const Cell = (props) => {
    const colVal = props.colData;
    const rowIndex = props.rowIndex;
    const colIndex = props.colIndex;
    const setValue = props.changeFunc;
    const display = colVal == 0 ? <p></p> : colVal == 1 ? <X/> : <O/>;

    const changeValue = () =>{
        setValue(rowIndex, colIndex)
    }
    return (
        <td onClick={changeValue}>{display}</td>
    )
}

const Modal = (props) => {
    return (
        <div className="modal-container">
            <div className="modal">
                {props.children}
            </div>
        </div>
    )
}

const X = () => {
    return(
        <svg className="x" viewBox="0 0 100 100">
            <line x1="10" y1="10" x2="90" y2="90" className="line line1"></line>
            <line x1="90" y1="10" x2="10" y2="90" className="line line1"></line>
        </svg>
    )   
}

const O = () => {
    return (
        <svg className="o" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40%"></circle>
        </svg>
    )
}
export default Game;