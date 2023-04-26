  /*----- constants -----*/
const WORDS = ['AAAAAA','SEARCH', 'ONLINE', 'PEOPLE', 'HEALTH', 'SHOULD', 'SYSTEM', 'POLICY', 'NUMBER', 'PLEASE', 'RIGHTS', 'PUBLIC', 'SCHOOL', 'REVIEW',
'UNITED', 'CENTER', 'TRAVEL', 'REPORT', 'MEMBER', 'BEFORE', 'HOTELS', 'OFFICE', 'DESIGN', 'POSTED', 'WITHIN', 'STATES', 'FAMILY', 'PRICES', 'SPORTS', 'COUNTY', 'ACCESS',
'CHANGE', 'RATING', 'DURING', 'RETURN', 'EVENTS', 'LITTLE', 'MOVIES', 'SOURCE', 'AUTHOR', 'AROUND', 'COURSE', 'CANADA', 'CREDIT', 'ESTATE', 'SELECT',
'PHOTOS', 'THREAD', 'MARKET', 'REALLY', 'ACTION', 'SERIES', 'SECOND', 'FORUMS', 'BETTER', 'FRIEND', 'SERVER', 'ISSUES', 'STREET', 'THINGS', 'PERSON',
'MOBILE', 'OFFERS', 'RECENT', 'STORES', 'MEMORY', 'SOCIAL', 'AUGUST', 'CREATE', 'SINGLE', 'LATEST', 'STATUS', 'BROWSE', 'SELLER',
'ALWAYS', 'RESULT', 'GROUPS', 'MAKING', 'FUTURE', 'LONDON', 'BECOME', 'GARDEN', 'LISTED', 'ENERGY', 'IMAGES', 'NOTICE', 'OTHERS', 'FORMAT',
'MONTHS', 'SAFETY', 'HAVING', 'COMMON', 'LIVING', 'CALLED', 'PERIOD', 'WINDOW', 'FRANCE', 'REGION', 'ISLAND', 'RECORD', 'DIRECT']

const COLORS = {
    '0' : 'violet',
    '1' : 'orange',
    '-1': 'red',
    '2' : 'grey'
}

  /*----- state variables -----*/
let secreWord   //The answer, created using a random word generator
let winState    //W or L, located in "h2"
let errorMessage//Not in the list or Word to short? id = "header"
let playerWord  //Player inputed word
let board       //6 x 6 grid
let rowNum      //row in html
let colNum      //column in html  


  /*----- cached elements  -----*/

  const startButton = document.getElementById('start');
  const gameOverEl = document.querySelector('h2');
  const enterButton = document.getElementById('enter');
  const clearButton = document.getElementById('clear');

  /*----- event listeners -----*/

  enterButton.addEventListener('click', enter);
  startButton.addEventListener('click', init);
  clearButton.addEventListener('click', clear);
  errorMessage = document.getElementById('error');
  document.getElementById('keyboard').addEventListener('click', type);

  /*----- functions -----*/
  
//initialize all states, then call render 
  function init() {
    clearBoard();
    board = [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0]
    ];

    winState = null;

    errorMessage.innerText = null;

    playerWord = '';

    secreWord = randomWord(); 

    rowNum = 5;

    colNum = 0;


    render();
  }

//Playing the game functions
function type(evt) {
    let boxNum = rowNum.toString() + colNum.toString()    
    let letter = evt.target.innerText;
    console.log('type working')

    if (colNum === 6) {
        errorMessage.innerText = 'Only 6 letters please!';
    } else {
        document.getElementById(`${boxNum}`).innerText = letter;
        colNum += 1 ;
    }
}

function clear() {
    console.log('clear button works')
    let boxNum = rowNum.toString() + colNum.toString();
    if (colNum >= 1) {
        colNum -= 1;
        boxNum = rowNum.toString() + colNum.toString();
        document.getElementById(`${boxNum}`).innerText = null;  
    }
}

function enter() {
    if (colNum === 6 && checkWord()) {
        errorMessage.innerText = 'Success!!';
        rowNum -= 1;
        colNum = 0;
        checkWin();
    } else if (colNum < 6) {
        errorMessage.innerText = 'Not enough letters!!';
    } else {
        errorMessage.innerText = 'Word not on the list ';
    }
    render();
}

//checks to see if the typed word is in the word bank
function checkWord() {
    let word = '';
    
    for (let i = 0; i < 6; i++) {
        let boxNum = rowNum.toString() + i.toString();
        word += document.getElementById(`${boxNum}`).innerText
    }
    console.log(word);
    if (WORDS.includes(word)) {
        playerWord = word;
        return true;
    } else {
        return false;
    };
}

//function clears the board by iterating through all the boxes and setting them to null;
function clearBoard() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            let boxNum = i.toString() + j.toString();
            console.log(boxNum);
            document.getElementById(`${boxNum}`).innerText = null
        }
    }
}

//helper function to create random word on init
function randomWord() {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    return WORDS[randomIndex];
}

//winState functions
function checkWin () {
    if (playerWord === secreWord) {
        return winState = 'w';
    } else if (rowNum === -1) {
        return winState = 'l';
    }
}

//render functions below
function render() {
    console.log("working");
    renderMessage(); 
    renderBoard();
    startButton.disabled = true;
    renderControls();
}

function renderMessage() {
    if (winState === 'w') {
        gameOverEl.innerText = `You Win!`; 
    } else if (winState === 'l') {
        gameOverEl.innerText = `You Lose`;
    } else {
        gameOverEl.innerText = `"Guess the Word"`;
    }
}

//changes colors
function renderBoard() {
    console.log("render board start working")
    if (rowNum < 5) {
        for (let i = 0; i < 6; i++) {
            playerCha = playerWord[i];
            let prevRowNum = rowNum + 1;
            let boxNum = prevRowNum.toString() + i.toString();
            boxEle =document.getElementById(`${boxNum}`);
            if (secreWord.includes(playerCha) && playerCha === secreWord[i]) {
                boxEle.style.backgroundColor = 'red'
            } else if (secreWord.includes(playerCha)) {
                boxEle.style.backgroundColor = 'orange'
            } else {
                boxEle.style.backgroundColor = 'gray'
            }
        }
    }
    console.log('render finished working');
}

function renderControls() {
    if (winState) {
        startButton.disabled = false;
    }
}

