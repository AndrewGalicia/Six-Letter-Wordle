  /*----- constants -----*/
const WORDS = ['search','online','people','health','should','system','policy','number','please','rights','public','school','review',
'united','center','travel','report','member','before','hotels','office','design','posted','within','states','family','prices','sports','county','access',
'change','rating','during','return','events','little','movies','source','author','around','course','canada','credit','estate','select',
'photos','thread','market','really','action','series','second','forums','better','friend','server','issues','street','things','person',
'mobile','offers','recent','stores','memory','social','august','create','single','latest','status','browse','seller',
'always','result','groups','making','future','london','become','garden','listed','energy','images','notice','others','format',
'months','safety','having','common','living','called','period','window','france','region','island','record','direct' ]

const COLORS = {
    '0' : 'violet',
    '1' : 'orange',
    '-1': 'red'
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
  errorMessage = document.querySelector('error');
  document.getElementById('keyboard').addEventListener('click', type);

  /*----- functions -----*/
  
//initialize all states, then call render 
  function init() {
    board = [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0]
    ];

    winState = null;

    errorMessage = '';

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


    if (colNum <= 6) {
        document.getElementById(`${boxNum}`).innerText = letter;
        colNum += 1 ;
    } else {
        errorMessage.innerText = "Only 6 letter please!"
    }
}

function enter(evt) {
    console.log('enter button works')
    console.log(evt.target);
}

function clear(evt) {
    console.log('clear button works')
    console.log(evt.target)
}
//helper function to create random word on init
function randomWord() {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    return WORDS[randomIndex];
}

//winState functions
function checkWin () {
    if (playerWord === secreWord) {
        winState = 'w';
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
    console.log("render message working");
    if (winState === 'w') {
        gameOverEl.innerText = `You Win!`; 
    } else if (winState === 'l') {
        gameOverEl.innerText = `You Lose`;
    } else {
        gameOverEl.innerText = `"Guess the Word"`;
    }
}

function renderBoard() {
    console.log("render board working")
}

function renderControls() {
    if (winState) {
        startButton.disabled = false
    }
}
