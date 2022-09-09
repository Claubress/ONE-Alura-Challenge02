// events 

const btnStartGame = document.querySelector('#btn__start__game');
btnStartGame.addEventListener('click', startGame);

const btnNewWord = document.querySelector('#btn__start__word');
btnNewWord.addEventListener('click', addNewWord);

const btnNewGame = document.querySelector('#btn__new');
btnNewGame.addEventListener('click', startNewGame);

const btnDesist = document.querySelector('#btn__desist');
btnDesist.addEventListener('click', desist);

const btnSaveStart = document.querySelector('#btn__save');
btnSaveStart.addEventListener('click', saveWord);

const btnCancel = document.querySelector('#btn__cancel');
btnCancel.addEventListener('click', cancelWord);


function setting() {
    const imgCanvas = document.querySelector('#game__canvas__img');
    const imgCanvasStyle = getComputedStyle(game__canvas__img);
    imgCanvas.width = (imgCanvasStyle.width).split('px')[0];
    imgCanvas.height = (imgCanvasStyle.height).split('px')[0];

    const textCanvas = document.querySelector('#game__canvas__text');
    const textCanvasStyle = getComputedStyle(game__canvas__text);
    textCanvas.width = (textCanvasStyle.width).split('px')[0];
    textCanvas.height = (textCanvasStyle.height).split('px')[0];
}


window.onload = setting;



// variables

let listWord = ['MUSEO', 'GLOBO', 'VASO', 'INTERIOR', 'ESPINA', 'TROFEO', 'TEMPLO',
                'CULTURA', 'PINTURA', 'CELULAR'];
let selectedWord = [];
let hitLetters = [];
let secretWord = '';
let hits = 0;



// principal functions

function startGame() {    
    selectedWord.splice(0, selectedWord.length)
    hitLetters = [];
    secretWord = '';
    hits = 0;
    start();
    showSection('none', 'none', 'flex');
}


function addNewWord() {
    showSection('none', 'flex', 'none');
}


function startNewGame() {1
    hitLetters = [];
    secretWord = '';
    hits = 0;
    start();
}


function desist() {
    showSection('flex', 'none', 'none');
}


function saveWord() {
    showSection('none', 'none', 'flex');
}


function cancelWord() {
    showSection('flex', 'none', 'none');
}



// helper functions

function start() {
    secretWord = selectWord(listWord, selectedWord);
    console.log('start =>', 'secretWord:', secretWord);
    drawUnderscore(secretWord.length);    
}


function showSection(start, input, game) {
    const boxStart = document.querySelector('.start');
    const boxInput = document.querySelector('.input');
    const boxGame = document.querySelector('.game');
    boxStart.style.display = start;
    boxInput.style.display = input;
    boxGame.style.display = game;
    if (game === 'flex') {
        window.addEventListener('keydown', keyCheck);
    } else {
        window.removeEventListener('keydown', keyCheck);
    }
}


function selectWord(words, wordSelected) {
    let order;
    let notSelected = true;
    
    if (wordSelected.length == 10) {
        wordSelected.splice(0, wordSelected.length);
    }

    do {
        order = Math.floor((Math.random() * words.length));
        if (!wordSelected.includes(order)) {
            wordSelected.push(order);
            notSelected = false;
        }
    } while (notSelected);

    return words[order];
}


function drawUnderscore(lenWord) {
    const textCanvas = document.querySelector('#game__canvas__text');
    const ctx = textCanvas.getContext("2d");   
    let startH = 0;
    let endH = 0;
    let widthUnderscore = 0;
    let widthSpace = 0;
    let positionV = 65;

    if (ctx) {
        
        // limpiar canvas
        textCanvas.width = textCanvas.width;

        [startH, widthUnderscore, widthSpace] = initialPosition(textCanvas, lenWord)

        ctx.lineWidth = 3;    
        ctx.strokeStyle = "#0A3871";
        ctx.fillStyle = "#0A3871"
        for (let i = 1; i <= lenWord; i++) {
            endH = startH + widthUnderscore;

            ctx.moveTo(startH, positionV);
            ctx.lineTo(endH, positionV);

            startH = endH + widthSpace;              
        }
        ctx.stroke();
    }
}

function initialPosition(textCanvas, lenWord) {
    const percenUnderscore = 0.07543;
    const percenSpace = 0.0431;

    const widthCanvas = textCanvas.width;
    const widthUnderscore = Math.round(widthCanvas * percenUnderscore);
    const widthSpace = Math.round(widthCanvas * percenSpace);
    
    const startUnderscore = Math.round(widthCanvas / 2) - 
                            Math.round((lenWord * widthUnderscore + (lenWord - 1) *
                            widthSpace) / 2);

    return [startUnderscore, widthUnderscore, widthSpace]    
}


function keyCheck(event) {
    let letter = '';

    if (isLetter(event.keyCode)) {
        letter = event.key.toUpperCase();
        if (secretWord.includes(letter)) {    
            hits = hits + letterHit(secretWord, letter, hitLetters);            
            if (hits === secretWord.length) {
            console.log('keyCheck =>', 'ganaste');
            }
        } else {
            console.log('keyCheck =>', 'ERROR !!!');

        }

    }
}


function isLetter(code) {
    return (code >= 65 && code <= 90)
}


function letterHit(word, letter, listLetters) {
    let newHits = 0;
    if (!listLetters.includes(letter)) {
        listLetters.push(letter);
        for (let index = 0; index < word.length; index++) {
            if (word[index] === letter) {
                drawLetterHit(index, letter, word.length);
                newHits++;
            }    
        }
        return newHits
    } else {
        return 0;
    }
}


function drawLetterHit(position, letter, lenWord) {

    const textCanvas = document.querySelector('#game__canvas__text');
    const ctx = textCanvas.getContext("2d");   

    if (ctx) {
        let startH = 0;
        let endH = 0;
        let widthUnderscore = 0;
        let widthSpace = 0;
        let positionV = 57;
        let centerX = 0; 
        let percenFont = 0.0862;

        ctx.font = Math.round(textCanvas.width * percenFont) + 'px Inter';

        ctx.strokeStyle = "#0A3871";
        ctx.fillStyle = "#0A3871"
        ctx.textAlign = 'center';

        [startH, widthUnderscore, widthSpace] = initialPosition(textCanvas, lenWord)
        centerX = widthUnderscore / 2;        

        for (let i = 1; i <= position; i++) {
            endH = startH + widthUnderscore;
            startH = endH + widthSpace;              
        }

        ctx.fillText(letter, startH + centerX, positionV);
    }


}
