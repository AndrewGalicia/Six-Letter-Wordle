  /*----- constants -----*/
//word bank, all capital letters
const WORDS = ['AAAAAA','SEARCH', 'ONLINE', 'PEOPLE', 'HEALTH', 'SHOULD', 'SYSTEM', 'POLICY', 'NUMBER', 'PLEASE', 'RIGHTS', 'PUBLIC', 'SCHOOL', 'REVIEW',
'UNITED', 'CENTER', 'TRAVEL', 'REPORT', 'MEMBER', 'BEFORE', 'HOTELS', 'OFFICE', 'DESIGN', 'POSTED', 'WITHIN', 'STATES', 'FAMILY', 'PRICES', 'SPORTS', 'COUNTY', 'ACCESS',
'CHANGE', 'RATING', 'DURING', 'RETURN', 'EVENTS', 'LITTLE', 'MOVIES', 'SOURCE', 'AUTHOR', 'AROUND', 'COURSE', 'CANADA', 'CREDIT', 'ESTATE', 'SELECT',
'PHOTOS', 'THREAD', 'MARKET', 'REALLY', 'ACTION', 'SERIES', 'SECOND', 'FORUMS', 'BETTER', 'FRIEND', 'SERVER', 'ISSUES', 'STREET', 'THINGS', 'PERSON',
'MOBILE', 'OFFERS', 'RECENT', 'STORES', 'MEMORY', 'SOCIAL', 'AUGUST', 'CREATE', 'SINGLE', 'LATEST', 'STATUS', 'BROWSE', 'SELLER',
'ALWAYS', 'RESULT', 'GROUPS', 'MAKING', 'FUTURE', 'LONDON', 'BECOME', 'GARDEN', 'LISTED', 'ENERGY', 'IMAGES', 'NOTICE', 'OTHERS', 'FORMAT',
'MONTHS', 'SAFETY', 'HAVING', 'COMMON', 'LIVING', 'CALLED', 'PERIOD', 'WINDOW', 'FRANCE', 'REGION', 'ISLAND', 'RECORD', 'DIRECT', 'ZZZZZZ']

  /*----- state variables -----*/
let secreWord   //The answer, created using a random word generator
let winState    //W or L, located in "h2"
let playerWord  //Player inputed word. Updated during enterButton event.
let rowNum      //row number, button 0 - top 5, decreased on succesful enterButton event
let colNum      //column number 0-5 left to right. resets to zero on succesful enterButton event 
let boxNum      //the invidual box

  /*----- cached elements  -----*/
const startButton = document.getElementById('start'); 
const enterButton = document.getElementById('enter');  
const clearButton = document.getElementById('clear');  
const gameOverEl = document.querySelector('h2');       
const errorMessage = document.getElementById('error-message'); //errors mesasge e.g 'word not on list'
const typedWord = [...document.querySelectorAll('.keys')]

  /*----- event listeners -----*/
enterButton.addEventListener('click', enter); //checks playerWord, winState, resets colNum to zero, lowers rowNum, render
startButton.addEventListener('click', init);  //inits game
clearButton.addEventListener('click', clear); //backspace button
document.getElementById('keyboard').addEventListener('click', type);

  /*----- functions -----*/
//initialize all states, then call render 
function init() {
  clearBoard();       //resets the board from a previous game
  winState = null;
  errorMessage.innerText = null;
  playerWord = '';
  secreWord = randomWord(); //sets the word we are trying to guess;
  rowNum = 5;
  colNum = 0;
  boxNum = rowNum.toString() + colNum.toString()  
  render();
}
//Playing the game functions
    //keyboard event to place letter on board
function type(evt) {
    if (typedWord.indexOf(evt.target) === -1) return;

    boxNum = rowNum.toString() + colNum.toString()    
    let letter = evt.target.innerText;
    if (colNum === 6) {
        errorMessage.innerText = 'Only 6 letters please!';
    } else {
        document.getElementById(`${boxNum}`).innerText = letter;
        colNum += 1;
    }
}
    //enter button event. Checks if we won else, moves to next row.
function enter() {
    if (colNum === 6 && checkWord()) {
        rowNum -= 1;
        colNum = 0;
        errorMessage.innerText = null;
        checkWin();
    } else if (colNum < 6) {
        errorMessage.innerText = 'Not enough letters!!';
    } else {
        errorMessage.innerText = 'Word not on the list';
    }
    render();
}
    //boolean; checks to see if the typed word is in the word bank
function checkWord() {
    let word = '';
    for (let i = 0; i < 6; i++) {
        let altBoxNum = rowNum.toString() + i.toString();
        word += document.getElementById(`${altBoxNum}`).innerText;
    }

    if (WORDS.includes(word)) {
        playerWord = word;
        return true;
    } else {
        return false;
    }
}
    //backspace button
function clear() {
    if (colNum >= 1) {
        colNum -= 1;
        boxNum = rowNum.toString() + colNum.toString();
        document.getElementById(`${boxNum}`).innerText = null;  
    }
}
    //function clears the board by iterating through all the boxes and setting them to null;
function clearBoard() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            let altBoxNum = i.toString() + j.toString();
            document.getElementById(`${altBoxNum}`).innerText = null; //clears letters
            document.getElementById(`${altBoxNum}`).style.backgroundColor = '#c738ad'; //clears colors
        }
    }
}
    //randomly selects word from WORD bank and sets as secret word
function randomWord() {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    return WORDS[randomIndex];
}
    //checks if there is a winner or loser. 
function checkWin () {
    if (playerWord === secreWord) {
        return winState = 'w';
    } else if (rowNum === -1) {
        return winState = 'l';
    }
}
//render functions below!!
    //main render button
function render() {
    renderMessage(); //win or lose message
    renderBoard();   //updates the box colors
    startButton.disabled = true; //disable upon init;
    renderControls(); //enables startButton upon game over!
}
    //changes message depending on winState
function renderMessage() {
    if (winState === 'w') {
        gameOverEl.innerText = `YOU WIN!`; 
    } else if (winState === 'l') {
        gameOverEl.innerText = `YOU LOSE!`;
    } else {
        gameOverEl.innerText = `${rowNum + 1} guesses left`;
    }
}
    //changes colors with .1 second delay
function renderBoard() {
    if (rowNum < 5) { //don't check on first row
        let i = 0;
        let interval = setInterval(() => {//set delay to each iterations
            playerCha = playerWord[i];
            let prevRowNum = rowNum + 1;
            let altBoxNum = prevRowNum.toString() + i.toString();
            boxEle = document.getElementById(`${altBoxNum}`);
            //for each iteration, changes the color of the box depending on the word
            if (secreWord.includes(playerCha) && playerCha === secreWord[i]) {
                boxEle.style.backgroundColor = 'red';
            } else if (secreWord.includes(playerCha)) {
                boxEle.style.backgroundColor = 'orange';
            } else {
                boxEle.style.backgroundColor = 'gray';
            }

            i++;

            if (i >= 6) {
                clearInterval(interval);
            }
        }, 80);
    }
}
    //enables button when winState is not null;
function renderControls() {
    if (winState) {
        startButton.disabled = false;
    }
}

