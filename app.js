const gameBoard = document.querySelector('.game__board');
const messageTurn = document.querySelector('.game__turn');
const endGame = document.querySelector('.endgame');
const endGameResult = document.querySelector('.endgame__result');
const buttonReset = document.querySelector('.endgame__button');

//Inicio
const play = document.querySelector('.play__button');
const playshow = document.querySelector('.play');

//Nombre de los jugadores
const nameXO = document.querySelector('.name');


/* Si quieres que los jugadores tengan nombres personalizados, 
descomenta las siguientes lineas y comenta la linea 16
*/

/*
let x = prompt('Ingrese el nombre del jugador X - maximo 6 caracteres');
let o = prompt('Ingrese el nombre del jugador O - maximo 6 caracteres');

x = x.slice(0,6);
o = o.slice(0,6);
*/

//Mensaje de bienvenida en consola personalizado
console.log('%c Hola programador ', 'color: #1479EA; font-size: #px; background-color: #000000; padding: 5px 20; border-radius: 5px; font-family: Arial; font-weight: bold;');

play.addEventListener('click', () => {
    playshow.classList.remove('play--mostrar');
    startGame();

    if(!document.fullscreenElement){
        document.documentElement.requestFullscreen() || document.documentElement.webkitRequestFullscreen() || document.documentElement.mozRequestFullscreen() || document.documentElement.msRequestFullscreen();
    } else {
        document.exitFullscreen();
    }
});



let isTurnX = true;
let turn = 0;
let maxTurn = 9;
let players  = {
    x: "cross",
    o: "circle"
}

function startGame(){
    createBoard();
    /*Si quieres que los jugadores tengan nombres personalizados, 
    descomenta las siguientes lineas (43) */

    //messageTurn.textContent = isTurnX ? `${x}` : `${o}`;

    messageTurn.textContent = isTurnX ? `X` : `O`;

    isTurnX = true;
    turn = 0;
    endGame.classList.remove('show');
}

function createBoard(){
    const cells = 9;

    while(gameBoard.firstElementChild){
        gameBoard.firstElementChild.remove();
    }

    
    for(let i = 0; i < cells; i++){
        const div = document.createElement('div');
        const design = ['clase-0', 'clase-1', 'clase-2','clase-3', 'clase-4', 
        'clase-5', 'clase-6', 'clase-7', 'clase-8'];

        div.classList.add('cell');

        for(let j = 0; j <= design.length; j++){
            if(i === j){
                div.classList.add(design[j]);
            }
        }

        div.addEventListener('click', handleGame, {once:true});

        gameBoard.append(div);
    }
}

function handleGame(e){
    const currentCell = e.currentTarget;
    const currentTurn = isTurnX ? players.x : players.o;
    
    turn++;
    drawShape(currentCell, currentTurn);

    checkWinner(currentTurn);

    if(checkWinner(currentTurn)){
        return;
    }

    if(turn === maxTurn){
        showEndgame(false);
    }

    changeTurn();
}

function drawShape(element, newClass){
    element.classList.add(newClass);
}

function changeTurn(){
    isTurnX = !isTurnX;
 
    messageTurn.textContent = isTurnX ? `X` : `O`;
}

function checkWinner(currentPlayer){
    const cells = document.querySelectorAll('.cell');
    
    const winnerCombination = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6] // Diagonales
    ];

    const winner = winnerCombination.some(combination => {
        if(combination.every(position => cells[position].classList.contains(currentPlayer))) {
            combination.forEach(position => {
                isTurnX ? cells[position].classList.add('crossWinner') : cells[position].classList.add('circleWinner');
            });
            return true;
        }
        return false;
    });

    if(winner) {
        showEndgame(true);
        return true;
    }

    return false;
}

function showEndgame(winner){
    endGame.classList.add('show');

    if(winner){
        /*Si quieres que los jugadores tengan nombres personalizados,
        descomenta las siguientes lineas (146)*/

        //endGameResult.textContent = `${isTurnX ? x : o} ha ganado el juego!`;

        endGameResult.textContent = `¡${isTurnX ? "X": "O"} ha ganado el juego!😁👌`;
    } else {
        endGameResult.textContent = "¡Empate!";
    }
}


buttonReset.addEventListener('click', () => {
    startGame(); //se reinicia el juego
    messageTurn.textContent = isTurnX ? `X` : `O`; //el mensaje de turno se reinicia
});
