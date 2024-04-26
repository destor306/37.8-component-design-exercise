import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import { copy } from "@testing-library/user-event/dist/cjs/clipboard/copy.js";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows =3, ncols=3, chanceLightStartsOn=.5 }) {
  
  const [board, setBoard] = useState(createBoard());

 
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    // TODO: create array-of-arrays of true/false values
    return Array.from({length: ncols}).map(
      row => Array.from({length: nrows}).map(
        () =>Math.random() < chanceLightStartsOn
      )
    );
    
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(row => row.every(cell=> cell ===true))
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const copyBoard = oldBoard.map(row => [...row])
    
      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y,x, copyBoard);
      flipCell(y+1,x, copyBoard)
      flipCell(y-1,x, copyBoard)
      flipCell(y,x+1, copyBoard)
      flipCell(y,x-1, copyBoard)

      // TODO: return the copy
      return copyBoard
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if(hasWon()){
    return <div>You WON!</div>
  }
  // TODO
  let tableboard = []

  const makeTable = (tableboard)=>{
    for(let i =0; i< ncols; i++){
      let row =[]
      for (let j =0;j<nrows; j++){
        let coord = `${i}-${j}`
        row.push(<Cell 
          key={coord}
          pos={coord} 
          isLit={board[i][j]} 
          flipCellsAroundMe={()=> flipCellsAround(coord)}/>)
      }
      tableboard.push(<tr key={i}>{row}</tr>)
    }
  }
 
  makeTable(tableboard);
  // TODO
  return(
    <table className="Board">
      <tbody>{tableboard}</tbody>
    </table>
  )
}

export default Board;
