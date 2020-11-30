import React from 'react'
import ReactDOM from 'react-dom'
import Game from "./Game/Game"
import "./index.scss"

const App = () => {
    return(
        <div className="App">
            <h1 className="AppName">Tic Tie Toe</h1>
            <div className="game">
                <Game></Game>
            </div>
        </div>
    )
}

ReactDOM.render(<App/>, document.querySelector("#root"));