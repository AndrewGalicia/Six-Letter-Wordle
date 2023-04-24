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
let winState    //Win or Lose, located in "h2"
let errorMessage//Not in the list or Word to short? id = "header"
let playerWord  //Player inputed word
let board       //6 x 6 grid


  /*----- cached elements  -----*/

  const startButton = document.querySelector('button');


  /*----- event listeners -----*/

  startButton.addEventListener('click', init);


  /*----- functions -----*/
  init()
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

    
  }



  function randomWord() {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    return WORDS[randomIndex];
}