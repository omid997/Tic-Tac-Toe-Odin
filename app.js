const Player = (name, marker, score, type) => {
  const getName = () => name;
  const getMarker = () => marker;
  const getType = () => type;
  const addScore = () => score++;
  const getScore = () => score;
  return {
    getName,
    getMarker,
    getType,
    addScore,
    getScore
  }
}

const GameBoard = (() => {
  let player1;
  let player2;
  const getPlayer1 = () => player1;
  const getPlayer2 = () => player2;

  let turn;
  const displayTurn = () => turn;

  let board = ['', '', '', '', '', '', '', '', ''];
  const getBoard = () => board;

  const startGame = (p1, p2) => {
    player1 = p1;
    player2 = p2;
    setTurn();
  }

  const setTurn = () => {
    if (turn === player1) {
      turn = player2;
      computer(getBoard());
    } else {
      turn = player1;
    }
  }

  const addSign = index => {
    if (board[index] === '') {
      board[index] = turn.getMarker();
    } else {
      console.log("wrong cell is clicked!");
    }
  }

  const chackWin = () => {
    let turnMarker = turn.getMarker().repeat(3);
    let counter = '';

    // check rows
    for (let i = 0; i < 9; i += 3) {
      counter = '';
      for (let j = i; j < i + 3; j++) {
        counter += board[j];
        if (counter == turnMarker) {
          return true;
        }
      }
    }
    // check columns
    for (let i = 0; i < 3; i++) {
      counter = '';
      for (let j = i; j < 9; j += 3) {
        counter += board[j];
        if (counter === turnMarker) {
          return true;
        }
      }
    }

    // check diameters
    counter = board[0] + board[4] + board[8];
    if (counter == turnMarker) {
      return true;
    }
    counter = board[2] + board[4] + board[6];
    if (counter == turnMarker) {
      return true;
    }
    return false;
  }

  const checkTie = () => {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        return false;
      }
    }
    return true;
  }
  const gameEnded = () => {

    if (chackWin() === true) {
      win();
      return true;
    }
    if (checkTie() === true) {
      return true;
    }
    // game continues
    setTurn();
    return false;
  }

  const win = () => {
    turn.addScore();
  }

  const clearGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = player1;
  }
  return {
    getBoard,
    addSign,
    gameEnded,
    displayTurn,
    startGame,
    getPlayer1,
    getPlayer2,
    clearGame,
  }

})();

const viewController = (() => {
  const gameBox = document.getElementById('box');
  const cells = document.querySelectorAll('.cell');
  const firstScore = document.getElementById('firstscore');
  const secondScore = document.getElementById('secondscore');
  const clearButton = document.getElementById('clear');
  const situationBar = document.getElementById('situationbar');

  const eventListeners = () => {
    cells.forEach(cell => {
      cell.addEventListener('click', e => {
        let index = e.target.id;
        if (!cell.classList.contains('selected') && !gameBox.classList.contains('ended')) {
          GameBoard.addSign(index);
          updateView();
        }
      })
    });
    clearButton.addEventListener('click', () => {
      gameBox.classList.remove('ended');
      cells.forEach(cell => {
        cell.classList.remove('selected');
        cell.textContent = '';
      });
      GameBoard.clearGame();
    })
  }

  const updateView = () => {
    GameBoard.getBoard().forEach((content, index) => {
      if (content !== '') {
        cells[index].textContent = content;
        cells[index].classList.add('selected');
      }
    });
    if (GameBoard.gameEnded()) {
      gameBox.classList.add('ended');
      situationBar.textContent = `${GameBoard.displayTurn().getName()} wins!`;
      clearButton.textContent = 'Play again'
    }
    firstScore.textContent = GameBoard.getPlayer1().getScore();
    secondScore.textContent = GameBoard.getPlayer2().getScore();


  }

  return {
    eventListeners,
    updateView
  }
})();

let player1 = Player('omid', 'X', 0, 'human');
let player2 = Player('PC', 'O', 0, 'computer');

viewController.eventListeners();
GameBoard.startGame(player1, player2);

function computer(state) {
  let numberOfEmptyCells = 0;
  for (let index = 0; index < state.length; index++) {
    if(state[index] === '') numberOfEmptyCells++;
  }
  let randomIndex = Math.floor((Math.random() * numberOfEmptyCells) + 1);
  
  console.log(numberOfEmptyCells, randomIndex);
  numberOfEmptyCells = 0;
  for (let index = 0; index < state.length; index++) {
    if(state[index] === '') {numberOfEmptyCells++;}
    if(numberOfEmptyCells == randomIndex) {
      GameBoard.addSign(index);
      viewController.updateView();
      break;  
    }
  }
  
}