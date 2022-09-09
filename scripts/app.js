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

let listWord = ['MUSEO', 'GLOBO', 'VASO', 'INTERIOR', 'ESPINA', 'TROFEO', 'TEMPLO', 'CULTURA', 'PINTURA', 'CELULAR'];
let selectedWord = [];
let secretWord = '';


// principal functions

function startGame() {
    secretWord = selectWord();
    drawUnderscore(secretWord);
    showSection('none', 'none', 'flex');
}


function addNewWord() {
    showSection('none', 'flex', 'none');
}


function startNewGame() {
    console.log('Iniciar nuevo juego');
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


function selectWord() {
    let order;
    let notSelected = true;

    if (selectedWord.length == 10) {
        selectedWord = [];
    }

    do {
        order = Math.floor((Math.random() * listWord.length));
        if (!selectedWord.includes(order)) {
            selectedWord.push(order);
            notSelected = false;
        }
    } while (notSelected);

    return listWord[order];
}


function drawUnderscore(word) {
    const textCanvas = document.querySelector('#game__canvas__text');
    const ctx = textCanvas.getContext("2d");   
    let startH = 0;
    let endH = 0;
    let widthUnderscore = 0;
    let widthSpace = 0;
    let positionV = 70;

    if (ctx) {
        
        // limpiar canvas
        textCanvas.width = textCanvas.width;

        [startH, widthUnderscore, widthSpace] = initialPosition(textCanvas, word.length)

        ctx.lineWidth = 3;    
        ctx.strokeStyle = "#0A3871";

        for (let i = 1; i <= word.length; i++) {
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

    if (isLetter(event.keyCode)) {
        console.log(event.key.toUpperCase());        
    }
}


function isLetter(code) {
    return (code >= 65 && code <= 90)
}
