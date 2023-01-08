
const gameStatusEl = document.getElementById("game-status")
const dealerCardTable = document.getElementById("dealer-card-table")
const playerCardTable = document.getElementById("player-card-table")
const dealerScoreBoard = document.getElementById("dealer-score-board")
const playerScoreBoard = document.getElementById("player-score-board")
let deck = []
let hiddenCard = []
let hiddenImg = ""
let isAlive = false
let dealerPoints = 0
let playerPoints = 0


//create deck
function createDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
    let types = ["C", "D", "H", "S"]
    for(const type of types) {
        for(const value of values) {
            deck.push(`${value}-${type}`)
        }
    }
}


//shuffle deck
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}


//get card value
function getValue(card) {
    let data = card.split("-") // "4-C" -> ["4", "C"]
    let value = data[0]

    return isNaN(value) ? value == "A" ? 11 : 10 : parseInt(value)
}


//DEAL button
document.getElementById("start-game-btn").addEventListener("click", function deal() {
    if (isAlive === true) {
      return
    }
    //if player does not refresh the page, tables and scores need to be cleared when starting new round
    dealerCardTable.innerHTML = ""
    playerCardTable.innerHTML = ""
    dealerPoints = 0
    playerPoints = 0
    gameStatusEl.innerHTML = "GAME IS ON !"
    dealerScoreBoard.innerHTML = "Dealer:"
    createDeck()
    shuffleDeck()
    //generates 1 face down (hidden) and 1 face up card for the dealer
    hiddenImg = document.createElement("img")
    hiddenCard = deck.pop()
    dealerPoints += getValue(hiddenCard)
    hiddenImg.src = "cards/BACK.png"    
    dealerCardTable.append(hiddenImg)
    const cardImg = document.createElement("img")
    let card = deck.pop()
    dealerPoints += getValue(card)
    cardImg.src = "cards/" + card + ".png"
    dealerCardTable.append(cardImg)
    //generates 2 cards for the player
    for (i = 0; i < 2; i++) {
      const cardImg = document.createElement("img")
      let card = deck.pop()
      playerPoints += getValue(card)
      playerScoreBoard.innerHTML = `Player: ${playerPoints}`
      cardImg.src = "cards/" + card + ".png"
      playerCardTable.append(cardImg)
    }
    //player status
    isAlive = true
    if (dealerPoints === 21 && playerPoints === 21) {
        gameStatusEl.textContent = "PUSH !"
        dealerScoreBoard.innerHTML = `Dealer: ${dealerPoints}`
        hiddenImg.src = "cards/" + hiddenCard + ".png"
        isAlive = false
        } else if (dealerPoints === 21 && playerPoints != 21) {
        gameStatusEl.textContent = "DEALER WINS !"
        dealerScoreBoard.innerHTML = `Dealer: ${dealerPoints}`
        hiddenImg.src = "cards/" + hiddenCard + ".png"
        isAlive = false
        } else if (dealerPoints != 21 && playerPoints === 21) {
        gameStatusEl.textContent = "PLAYER WINS !"
        dealerScoreBoard.innerHTML = `Dealer: ${dealerPoints}`
        hiddenImg.src = "cards/" + hiddenCard + ".png"
        isAlive = false
    }
})
  
  
  

//new card (HIT)
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
    if(playerPoints === 21) {
        gameStatusEl.textContent = "PLAYER WINS !"
        dealerScoreBoard.innerHTML = `Dealer: ${dealerPoints}`
        hiddenImg.src = "cards/" + hiddenCard + ".png"
        isAlive = false
    }
    if(playerPoints > 21) {
        gameStatusEl.textContent = "DEALER WINS !"
        dealerScoreBoard.innerHTML = `Dealer: ${dealerPoints}`
        hiddenImg.src = "cards/" + hiddenCard + ".png"
        isAlive = false
    }
})

//STAND button
document.getElementById("stand-btn").addEventListener("click", function stand() {
    if(isAlive === false) {
        return
    }
    while(dealerPoints < 17) {
        const cardImg = document.createElement("img")
        let card = deck.pop()
        dealerPoints += getValue(card)
        cardImg.src = "cards/" + card + ".png"
        dealerCardTable.append(cardImg)
        dealerScoreBoard.innerHTML = `Dealer: ${dealerPoints}`
    }
    if (dealerPoints > 21) {
        gameStatusEl.textContent = "PLAYER WINS !"
        dealerScoreBoard.innerHTML = `Dealer: ${dealerPoints}`
        hiddenImg.src = "cards/" + hiddenCard + ".png"
        isAlive = false
    } else if (dealerPoints < playerPoints) {
        gameStatusEl.textContent = "PLAYER WINS !"
        dealerScoreBoard.innerHTML = `Dealer: ${dealerPoints}`
        hiddenImg.src = "cards/" + hiddenCard + ".png"
        isAlive = false
    } else {
        gameStatusEl.textContent = "DEALER WINS !"
        dealerScoreBoard.innerHTML = `Dealer: ${dealerPoints}`
        hiddenImg.src = "cards/" + hiddenCard + ".png"
        isAlive = false
    }
})

