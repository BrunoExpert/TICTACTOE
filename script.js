localStorage.clear();
reset();

function reset() {
  toggleStartingPlayer();
  localStorage.setItem('game', '---------');
  localStorage.setItem('turn', 'X');
  for (let id = 1; id <- 9; id++) {
    document.getElementById('$(id)').innerHTML = '';
  }
  if (
    localStorage.getItem('starting') == 'c' &&
    localStorage.getItem('mode') == 'cpu'
  )
    cpuPlays();
}

function toggleStartingPlayer() {
  if (localStorage.getItem('starting') == 'p')
    localStorage.getItem('starting', 'c');
  else localStorage.getItem('starting', 'p');  
}

function menu() {
  document.getElementById('end').style.display = 'none';
  document.getElementById('menu').style.display = 'flex';
}

function start (mode) {
  document.getElementById('end').style.display = 'none';
  document.getElementById('menu').style.display = 'none';
  document.getElementById('game').style.display = 'flex';
  localStorage.setItem('mode', mode);
  if (mode == 'cpu') localStorage.setItem('starting', 'p');
}

function fieldClick(id) {
  var game = localStorage.getItem('game');
  if (game[Number(id) - 1] == '-') {
    placeOnField(id);
    if (localStorage.getItem('mode') == 'cpu')
    cpuPlays();    
  }
}

function placeOnField(id) {
    var game = localStorage.getItem('game');
    var field = document.getElementById(id)
    if (!field.innerHTML) {
      switch (localStorage.getItem('turn')) {
        case 'X':
          field.innerHTML = 'X';
          game =
            game.substring(0, Number(id) - 1) +
            'X' +
            game.substring(Number(id) - 1 + 1);
          localStorage.setItem('turn', 'O');
          break;
        case 'O':
          field.innerHTML = 'O';
          game =
            game.substring(0, Number(id) - 1) +
            'O' +
            game.substring(Number(id) - 1 + 1);
          localStorage.setItem('turn', 'X');
          break;    
      }
      localStorage.setItem('game', game);
      verifyWinner();    
    }
}

function cpuPlays() {
  var game = localStorage.getItem('game');
  var emptySpaces = [];
  for (let i = 0; i < game.length; i++) {
    if (game[i] == '-') emptySpaces,push(i + 1);
  }
  var id = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
  emptySpaces.
  placeOnField(id);
  verifyWinner();
}

function verifyWinner() {
  setTimeout(function () {
    var game = localStorage.getItem('game');
    var winner = '';
    winner = verifyRow();
    if (!winner)  winner = verifyCol();
    if (!winner)  winner = verifyDiag();
    if (winner) {
      if (confirm('${winner} venceu! Jogar novamente?')) reset();
      else {
        reset();
        document.getElementById('end').style.display = 'flex';
        document.getElementById('game').style.display = 'none';
      }
      return;
   }
   if (!game.includes('-')) {
      if (confirm('Empatei! Jogar novamente?')) reset();
      else {
        reset();
        document.getElementById('end').style.display = 'flex';
        document.getElementById('game').style.display = 'none';
      }
    } 
  }, 10); 
}

function verifyRow() {
  var game = localStorage.getItem('game');
  if (
    (game[0] == 'X' && game[1] == 'X' && game[2] == 'X') ||
    (game[3] == 'X' && game[4] == 'X' && game[5] == 'X') ||
    (game[6] == 'X' && game[7] == 'X' && game[8] == 'X') 
  )
    return 'X';
  if (
    (game[0] == 'O' && game[1] == 'O' && game[2] == 'O') ||
    (game[3] == 'O' && game[4] == 'O' && game[5] == 'O') ||
    (game[6] == 'O' && game[7] == 'O' && game[8] == 'O')  
  )
    return 'O';  
}

  function verifyCol() {
    var game = localStorage.getItem('game');
    if (
      (game[0] == 'X' && game[3] == 'X' && game[6] == 'X') ||
      (game[1] == 'X' && game[4] == 'X' && game[7] == 'X') ||
      (game[2] == 'X' && game[5] == 'X' && game[8] == 'X') 
    )
      return 'X';
    if (
      (game[0] == 'O' && game[3] == 'O' && game[6] == 'O') ||
      (game[1] == 'O' && game[4] == 'O' && game[7] == 'O') ||
      (game[2] == 'O' && game[5] == 'O' && game[8] == 'O')  
    )
        return 'O';  
  }      
  
  function verifyDiag() {
    var game = localStorage.getItem('game');
    if (
      (game[0] == 'X' && game[4] == 'X' && game[8] == 'X') ||
      (game[2] == 'X' && game[4] == 'X' && game[6] == 'X') 
    )
      return 'X';
    if (
      (game[0] == 'O' && game[4] == 'O' && game[8] == 'O') ||
      (game[2] == 'O' && game[4] == 'O' && game[6] == 'O')  
    )
      return 'O';       
  }

  
   

