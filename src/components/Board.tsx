"use client";

import { useState, type SubmitEvent } from "react";

type BoardProps = {
  board: string[][];
  playTurn: (indexColumn: number) => void;
};

export default function Board({ board, playTurn }: BoardProps) {
  const boardHeadLetters = initLetters(board[0].length);

  // Iniatilze an array for the letters on top
  function initLetters(boardWidth:number):string[] {
    let boardHeadLetters = [];
    for (let i = 0; i < boardWidth; i++) {
      boardHeadLetters.push(String.fromCharCode(65 + i));
    }
    return boardHeadLetters;
  }

  return (
  <table>
    <thead>
    <tr>
    {boardHeadLetters.map((item, index) => (
      <th key={"header_" + index}>
      <div
        style={{cursor:'pointer', padding: '10px'}}
        onClick={() => playTurn(index)}
        >{item}</div>
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
  );
}
