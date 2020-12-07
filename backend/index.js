const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

let connectedUsers = 0;
let playerTurn = 1;
let game_data = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
];

const playerData = {
    player1: 0,
    player2: 0,
    draw: 0
}

function checkDown(data, col) {
	return (
		data[0][col] === data[1][col] &&
		data[0][col] == data[2][col] &&
		data[0][col] !== 0
	);
}
function checkAcross(data, row) {
	return (
		data[row][0] === data[row][1] &&
		data[row][0] == data[row][2] &&
		data[row][0] !== 0
	);
}
function checkDiagonal(data) {
	return (
		data[0][0] === data[1][1] && data[0][0] === data[2][2] && data[0][0] !== 0
	);
}
function checkDiagonal2(data) {
	return (
		data[0][2] === data[1][1] && data[0][2] === data[2][0] && data[0][2] !== 0
	);
}

function checkWin(data, row, col) {
	if (
		checkDown(data, col) ||
		checkAcross(data, row) ||
		checkDiagonal(data) ||
		checkDiagonal2(data)
	) {
		return true;
	} else {
		return false;
	}
}
function checkDraw(data) {
	for (let i = 0; i < data.length; i++) {
		for (let j = 0; j < data[i].length; j++) {
			if (data[i][j] === 0) {
				return false;
			}
		}
	}

	return true;
}

app.get("/", (res, req) => {
	req.send("<h1>This is the Backend</h1>");
});
io.on("connection", (socket) => {
	connectedUsers++;
    io.emit('setID', connectedUsers);
	if (connectedUsers == 2) {
		io.emit("startTheGame", connectedUsers, game_data, playerData);
	}
	socket.on("disconnect", () => {
		connectedUsers--;
		io.emit("startTheGame", connectedUsers);
		console.log("connected Users: " + connectedUsers);
	});

	socket.on("changeCell", (row, col, id) => {
		game_data[row][col] = playerTurn;

		if (checkWin(game_data, row, col)) {
            playerTurn == 1 ? playerData.player1 += 1 :  playerData.player2 += 1;
			io.emit("gameWon", playerTurn);
		} else if (checkDraw(game_data)) {
			io.emit("gameDraw");
		} else {
			playerTurn = playerTurn == 1 ? 2 : 1;
			io.emit("changeData", game_data, playerTurn);
		}
	});

	socket.on("restartGame", () => {
		const new_game = [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
		];
		game_data = new_game;
		io.emit("startTheGame", connectedUsers, game_data, playerData);
	});
});

http.listen(3000, () => {
	console.log("Listening on 3000");
});
