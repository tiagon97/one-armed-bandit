class Wallet {
    constructor(money) {
        this.money = money;
    }

    checkIfCanPlay(value) {
        if (this.money < value) return false
        return true;
    }
    changeWalletBalance(result, bid) {
        if (result) this.money += bid * 3;
        else this.money -= bid;
        // return this.money;
    }
}



class gameResult {
    constructor() {
        this.options = ['<i class="fas fa-carrot"></i>', '<i class="fas fa-cannabis"></i>', '<i class="far fa-lemon"></i>'];
    }

    specifyResult(array) {
        if (array.length) {
            if (array[0] === array[1] && array[1] === array[2] ||
                array[0] !== array[1] && array[1] != array[2] && array[0] != array[2]) {
                return true;
            } else {
                return false;
            }
        } else {
            throw new Error('Empty Array');
        }
    }

    drawNewArr() {
        const drawArr = [];
        for (let i = 0; i < this.options.length; i++) {
            const index = Math.floor(Math.random() * this.options.length);
            drawArr.push(this.options[index]);
        }
        return drawArr;
    }
}

class Stats {
    constructor() {
        this.wins = 0;
        this.losses = 0;
        this.gamesPlayed = 0;
    }
    updateStats(result) {
        if (result) this.wins++;
        else this.losses++
        this.gamesPlayed++;
        console.log(this.wins, this.losses, this.gamesPlayed)
    }
}

class Game {
    constructor() {
        this.wallet = new Wallet(200);
        this.stats = new Stats();
        this.play = document.querySelector('.btn button').addEventListener("click", this.startGame.bind(this));
        this.icons = [...document.querySelectorAll('.game div')];
        this.input = document.querySelector(".btn .bid");
        this.wins = document.querySelector("p span.wins");
        this.losses = document.querySelector("p span.losses");
        this.counter = document.querySelector("p span.numbOfGames");
        this.walletBalance = document.querySelector('p span.wallet');
        this.render();
    }

    startGame() {
        if (this.input.value < 1) return alert("Minimalna stawka to 1$");
        if (!this.wallet.checkIfCanPlay(this.input.value)) return alert("Masz za mało środków");
        this.draw = new gameResult();
        const arr = this.draw.drawNewArr();
        const result = this.draw.specifyResult(arr);
        //  console.log(arr);
        console.log(result);

        this.icons.forEach(function (icon, index) {
            icon.innerHTML = ''
            icon.innerHTML = arr[index];
        })

        this.stats.updateStats(result);
        this.wallet.changeWalletBalance(result, this.input.value);

        this.wins.textContent = this.stats.wins;
        this.losses.textContent = this.stats.losses;
        this.counter.textContent = this.stats.gamesPlayed;
        this.walletBalance.textContent = this.wallet.money + "$";
        this.input.value = ''

    }

    render() {
        this.wins.textContent = 0
        this.losses.textContent = 0
        this.counter.textContent = 0
        this.walletBalance.textContent = this.wallet.money + "$";
    }
}





const newGame = new Game(); 