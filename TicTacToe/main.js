const winning = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

class Game {

    constructor() {
        this.playerTurn = true;
        console.log("Creating game")
        document.querySelectorAll(".button").forEach((node)=>{
            node.addEventListener("click", this.handleClick);
        });
    }

    handleClick(event) {
        let id = parseInt(event["srcElement"]["id"]);

        console.log(id)
    }

    toggleTurn() {
        this.playerTurn = !this.playerTurn;
    }
}

let game = new Game()
