import React, { useState } from 'react'
import './Game.scss';


const game_data = [[0,0,0],
                   [0,0,0],
                   [0,0,0]]

const Game = () => {
    const [data, setData] = useState(game_data);
    const [playerTurn, setPlayerTurn] = useState(1);
    
    const setCellValue = (row, col) => {
        let newData = data;
        newData[row][col] = newData[row][col] == 0 ? playerTurn : newData[row][col];
        setPlayerTurn(playerTurn => playerTurn == 1 ? 2 : 1);
        setData(newData);
    }

    return (
        <div>
            <table className="game_table">
                <tbody>
                    {
                        data.map((row, index) => {
                            return <Row key={index} rowData={row} rowIndex={index} changeFunc={setCellValue}></Row>
                        })
                    }
                </tbody>
            </table>
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
    const display = colVal == 0 ? <p></p> : colVal == 1 ? 'X' : 'O';

    const changeValue = () =>{
        setValue(rowIndex, colIndex)
    }
    return (
        <td onClick={changeValue}>{display}</td>
    )
}

export default Game;