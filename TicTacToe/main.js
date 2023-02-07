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

const x = "<span class=\"material-symbols-outlined extended\" id='x-symbol'>close</span>"
const o = "<span class=\"material-symbols-outlined extended\" id='o-symbol'>circle</span>"

const isEmpty = (str) => (!str?.length);
class Game {

    constructor() {
        this.playerTurn = true;
        console.log("Creating game");
        document.querySelectorAll(".button").forEach((node) => {
            node.addEventListener("click", (event) => {
                this.handleClick(event);
            });
        });

        document.querySelector(".restart-button").addEventListener("click", () => {
            this.handleReset();
        });

        this.winner = "";
    }

    handleClick(event) {
        if (!this.playerTurn || !isEmpty(this.winner)) {
            return;
        }
        let id = event["srcElement"]["id"];
        // let int_id = parseInt(id);

        let field = document.getElementById(id);
        if (!field.innerHTML) {
            field.innerHTML = x;
            this.toggleTurn();
        }

        this.handleChange();
    }

    toggleTurn() {
        this.playerTurn = !this.playerTurn;
        this.checkWinner();
    }

    handleChange() {
        if (this.playerTurn || !isEmpty(this.winner)) {
            return;
        }

        let nodes = document.querySelectorAll(".button");
        let freeFields = [];

        for (let i = 0; i < nodes.length; ++i) {
            if (!nodes[i]["innerHTML"]) {
                freeFields.push(i);
            }
        }

        if (freeFields.length === 0) {
            return;
        }

        let freeField = freeFields[Math.floor((Math.random() * freeFields.length))];
        nodes[freeField]["innerHTML"] = o;

        this.toggleTurn();
    }

    handleReset() {
        document.querySelectorAll(".button").forEach((node) => {
            node["innerHTML"] = "";
        });
        this.winner = "";
        this.playerTurn = true;
    }

    occupiedFields(symbolId) {
        let symbol = "#" + symbolId;
        let symbols = document.querySelectorAll(symbol);

        let nrs = []
        for (let i = 0; i < symbols.length; ++i) {
            nrs.push(parseInt(symbols[i].parentNode["id"]));
        }

        nrs.sort();
        return nrs;
    }

    checkWinner() {
        let playerFields = this.occupiedFields("x-symbol");
        for (const winningSet of winning) {
            const win = winningSet.every(val => playerFields.includes(val));
            if (win) {
                this.winner = "PLAYER";
                return;
            }
        }

        let computerFields = this.occupiedFields("o-symbol");
        for (const winningSet of winning) {
            const win = winningSet.every(val => computerFields.includes(val));
            if (win) {
                this.winner = "COMPUTER";
                return;
            }
        }
    }

}


const game = new Game();
