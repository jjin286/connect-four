"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;
const HTML_BOARD = document.getElementById('board');

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
//[[null, null, null, null, null, null, null],
// []]
function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let row = 0; row < HEIGHT; row++) {
    board.push([]);
    for (let col = 0; col < WIDTH; col++) {
      board[row].push(null);
    }
  }
}

/** makeHtmlBoard: make HTML table*/
function makeHtmlBoard() {
  createColumnTops();

  for (let y = 0; y < HEIGHT; y++) {
    let row = document.createElement('tr');
    row.setAttribute('id', `r-${y}`);
    for (let x = 0; x < WIDTH; x++) {
      let cell = document.createElement('td');
      cell.setAttribute('id', `c-${y}-${x}`);
      row.append(cell);
    }
    HTML_BOARD.append(row);
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
  HTML_BOARD.append(top);
}


/** findSpotForCol: given column x, return bottom empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 5
  return 5;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
  // TODO: switch currPlayer 1 <-> 2
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {

      let potentialWins = findPotentialWin(y, x);

      // find winner (only checking each win-possibility as needed)
      if (validateWin(horiz) || validateWin(vert) || validateWin(diagDR) || validateWin(diagDL)) {
        return true;
      }
    }
  }
}

/**
 * Given coordinates, finds possible winning cells, returns possible winning cells
 */
function findPotentialWin(y, x) {
  // TODO: assign values to the below variables for each of the ways to win
  // horizontal has been assigned for you
  // each should be an array of 4 cell coordinates:
  // [ [y, x], [y, x], [y, x], [y, x] ]
  let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
  let vert;
  let diagDL;
  let diagDR;

  return [horiz, vert, diagDL, diagDR];
}

/** validateWin:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
function validateWin(cells) {

  // TODO: Check four cells to see if they're all legal & all color of current
  // player

}

makeBoard();
makeHtmlBoard();
