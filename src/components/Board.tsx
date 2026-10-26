"use client";

import Player, { type Player as PlayerData } from "./Player";

type BoardProps = {
  board: string[][];
  players: PlayerData[];
  playTurn: (indexColumn: number) => void;
};

export default function Board({ board, players, playTurn }: BoardProps) {
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
  <table className="board">
    <thead>
    <tr>
    {boardHeadLetters.map((item, index) => (
      <th key={"header_" + index}>
        <span onClick={() => playTurn(index)}>{item}</span>
      </th>
    ))}
    </tr>
    </thead>
      <tbody>
        {board.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => {
              if (cell == "0") {
                return (
                  <td key={colIndex}>
                    <div className="cell cell-empty"><span></span></div>
                  </td>)
              } else {
                let player = players.find((item) => (item.code == cell));
                if (player && player.code) {
                  return (
                    <td key={colIndex}>
                      <div className={"cell cell-player cell-" + player.color}><span>{player.code}</span></div>
                    </td>);
                } else {
                  return (
                    <td key={colIndex}>
                      <div className="cell cell-default"><span>{cell}</span></div>
                    </td>);
                }
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
