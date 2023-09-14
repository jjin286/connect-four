"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;
const htmlBoard = document.getElementById('board');

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
//[[null, null, null, null, null, null, null],
// []]
function makeBoard() {

  for (let y = 0; y < HEIGHT; y++) {
    board.push([]);
    for (let x = 0; x < WIDTH; x++) {
      board[y].push(null);
    }
  }
}

/** makeHtmlBoard: make HTML table*/
function makeHtmlBoard() {
  createColumnTops();
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement('tr');
    row.setAttribute('id', `r-${y}`);
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `c-${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/**Create a column top for board for placing peices */
function createColumnTops() {
  //Creating the top row for column toppers
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");

  //Create Cells within top row
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", `top-${x}`);
    headCell.addEventListener("click", handleClick);
    top.append(headCell);
  }
  htmlBoard.append(top);
}


/** findSpotForCol: given column x, return bottom empty y (null if filled) */
function findSpotForCol(x) {
  for (let y = board.length - 1; y >= 0; y--) {
    if (board[y][x] === null) {
      return y;
    }
  }

  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  const piece = document.createElement('div');
  piece.classList.add('piece', `p${currPlayer}`);

  const currCell = document.getElementById(`c-${y}-${x}`);
  currCell.append(piece);

}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  console.log("handle click ran");
  // get x from ID of clicked cell
  // TODO: "top-".length, Number
  const x = +(evt.target.id.slice(4));

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  placeInTable(y, x);
  board[y][x] = currPlayer;


  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  if (board[0].every((x) => x !== null)) {
    endGame("It's a tie!");
  }


  // switch players
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {

    let playerPieces = [];
    for(let [y,x] of cells){
      // let y = coords[0];
      // let x = coords[1];

      if(y >= HEIGHT || y < 0){
        return false;
      }
      if(x >= WIDTH || x < 0){
        return false;
      }
      console.log("Board Value: ", board[y][x]);
      playerPieces.push(board[y][x]);
    }

    return playerPieces.every((x) => x === 1) || playerPieces.every((x) => x === 2);
  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
