import React from 'react'
import ReactDOM from 'react-dom'
import Game from "./Game/Game"

const App = () => {
    return(
        <div className="App">
            <h1>Tic Tie Toe</h1>
            <div className="game">
                <Game></Game>
            </div>
        </div>
    )
}

ReactDOM.render(<App/>, document.querySelector("#root"));