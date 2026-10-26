"use client";

import { useState } from "react";
import { initBoard, initLetters, getCasesToCheck, checkPositionToWin } from "../lib/gamelogic";

export default function Game() {
  const players = ["P1", "P2"];
  const [boardWidth, setBoardWidth] = useState(7);
  const [boardHeight, setBoardHeight] = useState(6);
  const [board, setBoard] = useState<string[][]>(() => initBoard(boardWidth, boardHeight));
  const [currentPlayer, setCurrentPlayer] = useState(players[0]);
  const boardHeadLetters = initLetters(boardWidth);

  function playTurn(index) {
    findWhoPlaysNext();
    addChipToBoard(currentPlayer, index);
    console.log(someoneWon());
  }

  function findWhoPlaysNext() {
    let nextPlayer = '';
    if (!currentPlayer) {
      nextPlayer = players[0];
    } else {
      let currentKey = players.findIndex((ele) => (ele == currentPlayer))
      currentKey = (currentKey >= (players.length - 1)) ? 0 : currentKey + 1;
      nextPlayer = players[currentKey];
    }
    setCurrentPlayer(nextPlayer);
  }

  function addChipToBoard(currentPlayer, index) {
    let availableColumn = [];
    for (let row = 0; row < boardHeight; row++) {
      for (let col = 0; col < boardWidth; col++) {
        if (col == index && board[row][col] == 0) {
          availableColumn.push(row); 
        }
      }
    }
    let indexAvailableColumn = null;
    if (availableColumn.length > 0) {
      indexAvailableColumn = availableColumn[availableColumn.length - 1];
    }
    addItemToBoard(indexAvailableColumn, index, currentPlayer);
  }

  function addItemToBoard(row, col, value) {
    board[row][col] = value;
    setBoard(board);
  }

  function someoneWon() {
    for (let row = 0; row < boardHeight; row++) {
      for (let col = 0; col < boardWidth; col++) {
        let casesToCheck = getCasesToCheck(row, col, boardWidth, boardHeight);
        for (let i = 0; i <= casesToCheck.length; i++) {
          if (board[row][col] != "0" && checkPositionToWin(board, row, col, casesToCheck[i])) {
            return 'WINNER ' + board[row][col] + '!!!';
          }
        }
      }
    }
    return 'NO ONE WON';
  }

  return (
    <main>
      <h1>Connect 4</h1>
      <table>
        <thead>
          <tr>
            {boardHeadLetters.map((item, index) => (
              <th key={"header_" + index}>
                <div style={{cursor:'pointer', padding: '10px'}} onClick={() => playTurn(index)}>{item}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}