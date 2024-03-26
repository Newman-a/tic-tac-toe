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
console.log('%c Ig: @Newman_ga ', 'color: #1479EA; font-size: #px; background-color: #000000; padding: 5px 20; border-radius: 5px; font-family: Arial; font-weight: bold;');

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

const winningPosition = [
    
    [0,1,2], [3,4,5], [6,7,8], // Horizontal
    [0,3,6], [1,4,7], [2,5,8], // Vertical
    [0,4,8], [2,4,6] // Diagona

]

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
        div.classList.add('cell');

        if(i === 0){
            div.classList.add('cellCTL');
        } else if(i === 1){
            div.classList.add('cellMT');
        } else if(i === 2){
            div.classList.add('cellCTR');
        } else if(i === 3){
            div.classList.add('cellML');
        } else if(i === 5){
            div.classList.add('cellMR');
        } else if(i === 6){
            div.classList.add('cellCBL');
        } else if(i === 7){
            div.classList.add('cellMB');
        } else if(i === 8){
            div.classList.add('cellCBR');
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
    
    const winner = winningPosition.some(array => { //El array no se lee porque es un array de arrays

        //Los siguientes if son para que las celdas ganadoras se pinten de un color diferente

        if([0,1,2].every(position => cells[position].classList.contains(currentPlayer))){
           

            for(let i = 0; i < 3; i++){
                isTurnX ? cells[i].classList.add('crossWinner') : cells[i].classList.add('circleWinner');
            }

            return true;
        } else if([3,4,5].every(position => cells[position].classList.contains(currentPlayer))){

            for(let i = 3; i < 6; i++){
                isTurnX ? cells[i].classList.add('crossWinner') : cells[i].classList.add('circleWinner');
            }

            return true;
        } else if([6,7,8].every(position => cells[position].classList.contains(currentPlayer))){

            for(let i = 6; i < 9; i++){
                isTurnX ? cells[i].classList.add('crossWinner') : cells[i].classList.add('circleWinner');
            }

            return true;
        } else if ([0,3,6].every(position => cells[position].classList.contains(currentPlayer))){

            for(let i = 0; i < 9; i+=3){
                isTurnX ? cells[i].classList.add('crossWinner') : cells[i].classList.add('circleWinner');
            }

            return true;
        } else if ([1,4,7].every(position => cells[position].classList.contains(currentPlayer))){
            for(let i = 1; i < 9; i+=3){
                isTurnX ? cells[i].classList.add('crossWinner') : cells[i].classList.add('circleWinner');
            }

            return true;
        } else if ([2,5,8].every(position => cells[position].classList.contains(currentPlayer))){
            for(let i = 2; i < 9; i+=3){
                isTurnX ? cells[i].classList.add('crossWinner') : cells[i].classList.add('circleWinner');
            }

            return true;
        } else if ([0,4,8].every(position => cells[position].classList.contains(currentPlayer))){
            for(let i = 0; i < 9; i+=4){
                isTurnX ? cells[i].classList.add('crossWinner') : cells[i].classList.add('circleWinner');
            }

            return true;
        } else if ([2,4,6].every(position => cells[position].classList.contains(currentPlayer))){
            for(let i = 2; i < 7; i+=2){
                isTurnX ? cells[i].classList.add('crossWinner') : cells[i].classList.add('circleWinner');
            }

            return true;
        } else {
            return false;
        }

        /*Esta opcion de abajo es importante si quieres desahacerte de los if anteriores*/
        // return array.every(position => {

        //     return cells[position].classList.contains(currentPlayer);
        // });
    });

    if(!winner){
        return;
    }

    showEndgame(true);
        return true;
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