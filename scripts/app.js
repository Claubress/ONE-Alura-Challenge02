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


// variables

let listword = ['museo', 'globo', 'vaso', 'interior', 'espina', 'trofeo', 'templo', 'cultura', 'pintura'];


// principal functions

function startGame() {
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
}
