
const gameStatusEl = document.getElementById("game-status")
const dealerCardTable = document.getElementById("dealer-card-table")
const playerCardTable = document.getElementById("player-card-table")
const dealerScoreBoard = document.getElementById("dealer-score-board")
const playerScoreBoard = document.getElementById("player-score-board")
let deck = []
let isAlive = false
let dealerPoints = 0
let playerPoints = 0


//creates deck
function createDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
    let types = ["C", "D", "H", "S"]
    for(i = 0; i < types.length; i++) {
        for(j = 0; j < values.length; j++) {
            deck.push(`${values[j]}-${types[i]}`)
        }
    }
}



//shuffles the deck
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}


//gets card value
function getValue(card) {
    let data = card.split("-") // "4-C" -> ["4", "C"]
    let value = data[0]

    if (isNaN(value)) { //A J Q K
        if (value == "A") {
            return 11
        }
        return 10
    }
    return parseInt(value)
}




//starting the game
document.getElementById("start-game-btn").addEventListener("click", function deal() {
    if(isAlive === true) {
        return
    }
    createDeck()
    shuffleDeck()
    //generates 1 face down (hidden) and 1 face up card for the dealer
        const hiddenImg = document.createElement("img")
        let hiddenCard = deck.pop()
        dealerPoints += getValue(hiddenCard)
        hiddenImg.src = "cards/BACK.png"
        dealerCardTable.append(hiddenImg)
        const cardImg = document.createElement("img")
        let card = deck.pop()
        dealerPoints += getValue(card)
        cardImg.src = "cards/" + card + ".png"
        dealerCardTable.append(cardImg)
        // dealerScoreBoard.innerHTML = `Dealer: ${dealerPoints}`
    //generates 2 cards for the player
    for(i = 0; i < 2; i++) {
        const cardImg = document.createElement("img")
        let card = deck.pop()
        playerPoints += getValue(card)
        playerScoreBoard.innerHTML = `Player: ${playerPoints}`
        cardImg.src = "cards/" + card + ".png"
        playerCardTable.append(cardImg)
    }
    gameStatusEl.textContent = ""
    //player status
    isAlive = true
}) 

//providing a new card (HIT)
document.getElementById("new-card-btn").addEventListener("click", function hit() {
    if(isAlive === false) {
        return
    }
    const cardImg = document.createElement("img")
    let card = deck.pop()
    playerPoints += getValue(card)
    playerScoreBoard.innerHTML = `Player: ${playerPoints}`
    cardImg.src = "cards/" + card + ".png"
    playerCardTable.append(cardImg)
})

