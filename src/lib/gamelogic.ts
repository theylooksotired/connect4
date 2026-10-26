/** INITIALIZE **/

// Initialize a board with the given width and height
export function initBoard(boardWidth:number, boardHeight:number):string[][] {
  let board:string[][] = [];
  for (let i = 0; i < boardHeight; i++) {
    board[i] = [];
    for (let j = 0; j < boardWidth; j++) {
    board[i][j] = "0";
    }
  }
  return board;
}

// Iniatilze an array for the letters on top
export function initLetters(boardWidth:number):string[] {
  let boardHeadLetters = [];
  for (let i = 0; i < boardWidth; i++) {
    boardHeadLetters.push(String.fromCharCode(65 + i));
  }
  return boardHeadLetters;
}

/** MAIN GAME LOGIC **/

// Get the cases to check
// For better understanding the logic head to:
// https://test.leanomartinet.com/ressources/connect4_2.jpeg
export function getCasesToCheck(row:number, col:number, boardWidth:number, boardHeight:number):string[] {
  let casesToCheck = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  if (col > (boardWidth - 4)) {
    removeCase(casesToCheck, 'b');
    removeCase(casesToCheck, 'e');
    removeCase(casesToCheck, 'f');
  }
  if (col < 3) {
    removeCase(casesToCheck, 'a');
    removeCase(casesToCheck, 'g');
    removeCase(casesToCheck, 'h');
  }
  if (row > (boardHeight - 4)) {
    removeCase(casesToCheck, 'c');
    removeCase(casesToCheck, 'e');
    removeCase(casesToCheck, 'h');
  }
  if (row < 3) {
    removeCase(casesToCheck, 'd');
    removeCase(casesToCheck, 'f');
    removeCase(casesToCheck, 'g');
  }
  return casesToCheck;
}

// Remove a case, it's always tricky to deal with arrays in JS
export function removeCase(cases:string[], itemCase:number):string[] {
  if (cases.indexOf(itemCase) >= 0) {
    cases.splice(cases.indexOf(itemCase), 1);
  }
}

// Check if the position is a winner or not
export function checkPositionToWin(board:string[][], row:number, col:number, caseCheck:string):boolean {
  let values = [];
  switch (caseCheck) {
    case 'a':
      values = [board[row][col], board[row][col - 1], board[row][col - 2], board[row][col - 3]];
      break;
    case 'b':
      values = [board[row][col], board[row][col + 1], board[row][col + 2], board[row][col + 3]];
      break;
    case 'c':
      values = [board[row][col], board[row + 1][col], board[row + 2][col], board[row + 3][col]];
      break;
    case 'd':
      values = [board[row][col], board[row - 1][col], board[row - 2][col], board[row - 3][col]];
      break;
    case 'e':
      values = [board[row][col], board[row + 1][col + 1], board[row + 2][col + 2], board[row + 3][col + 3]];
      break;
    case 'f':
      values = [board[row][col], board[row - 1][col + 1], board[row - 2][col + 2], board[row - 3][col + 3]];
      break;
    case 'g':
      values = [board[row][col], board[row - 1][col - 1], board[row - 2][col - 2], board[row - 3][col - 3]];
      break;
    case 'h':
      values = [board[row][col], board[row + 1][col - 1], board[row + 2][col - 2], board[row + 3][col - 3]];
      break;
  }
  return fourEqual(values);
}

// Check if four elements are equal in one of the cases
export function fourEqual(values:string[]):boolean {
  if (values.length != 4) {
    return false;
  }
  return (values[0] == values[1] && values[1] == values[2] && values[2] == values[3]);
}