"use client";

import { useEffect, useState } from "react";
import Player, { type Player as PlayerData } from "./Player";
import Board from "./Board";
import { initBoard, columnIsValid, findWinnerBoard } from "../lib/gamelogic";
import { createInitialData, loadAppData, saveAppData, type AppData } from "../lib/storage";

export type GameStep = {
  player: string;
  column: number;
};

export default function Game() {
  // Game states
  const [players, setPlayers] = useState<PlayerData[]>([
    { code: 'P1', name: 'Player 1', 'color': 'red'},
    { code: 'P2', name: 'Player 2', 'color': 'yellow'}
  ]);
  const [gameSteps, setGameSteps] = useState<GameStep[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(players[0].code);
  const [boardWidth, setBoardWidth] = useState(7);
  const [boardHeight, setBoardHeight] = useState(6);
  const [board, setBoard] = useState<string[][]>(() => initBoard(boardWidth, boardHeight));
  const [winner, setWinner] = useState<string>("0");

  // Local storage states and function to save everything there
  const [appData, setAppData] = useState<AppData>(createInitialData);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(function loadSavedData() {
    let loadedData = loadAppData();
    if (loadedData.steps.length > 0) {
      runGame(loadedData.steps);
    }
    if (loadedData.players.length > 0) {
      setPlayers(loadedData.players);
    }
    setAppData(loadedData);
    setDataLoaded(true);
  }, []);

  useEffect(
    function saveDataWhenItChanges() {
      if (!dataLoaded) return;
      saveAppData(appData);
    },
    [appData, dataLoaded],
  );

  useEffect(
    function checkWinnerWhenBoardChanges() {
      if (!dataLoaded) return;
      const winner = findWinnerBoard(board);
      if (winner != "0") setWinner(winner);
    },
    [board, dataLoaded],
  );

  if (!dataLoaded) {
    return null;
  }

  /** Main function to run the game **/
  // It is triggered once the current player clicks on a column header
  function playTurn(indexColumn:number) {
    if (columnIsValid(board, indexColumn)) {
      findCurrentPlayer();
      addChipToBoard(currentPlayer, indexColumn);
    }
  }

  /** Step 1 : Find which player has clicked and make it the active one **/
  function findCurrentPlayer() {
    let nextPlayer = '';
    // Check that the current player is valid or restart to the first one
    if (players.map(item => item.code).indexOf(currentPlayer) < 0) {
      nextPlayer = players[0].code;
    } else {
      // Find the next player using the array of players
      let currentKey = players.findIndex((ele) => (ele.code == currentPlayer))
      currentKey = (currentKey >= (players.length - 1)) ? 0 : currentKey + 1;
      nextPlayer = players[currentKey].code;
    }
    setCurrentPlayer(nextPlayer);
  }

  /** Step 2 : Add a chip to the board for the current player **/
  // The index is the column that the player has clicked on
  function addChipToBoard(currentPlayer: string, indexColumn: number) {
    // Save the new board (cloning because it's an aray)
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => [...row]);

      let availableColumnValues = [];
      for (let row = 0; row < boardHeight; row++) {
        if (newBoard[row][indexColumn] == "0") {
          availableColumnValues.push(newBoard[row][indexColumn]); 
        }
      }
      let indexRow = 0;
      if (availableColumnValues.length > 0) {
        indexRow = availableColumnValues.length - 1;
      }
      newBoard[indexRow][indexColumn] = currentPlayer;
      return newBoard;
    });
    // Save the game steps (cloning)
    setGameSteps((prevGameSteps) => [
      ...prevGameSteps,
      { 'player': currentPlayer, 'column': indexColumn }
    ]);
    // Save the game to the local storage
    setAppData((prevAppData) => ({
      ...prevAppData,
      players: players.map(player => ({ ...player })),
      steps: [...prevAppData.steps, { 'player': currentPlayer, 'column': indexColumn }],
    }));
  }

  /** AUTO RUN: Given a series of steps (GameStep type) run the game **/
  function runGame(gameSteps:GameStep[]):void {
    // Restart the board and the game steps
    setBoard(initBoard(boardWidth, boardHeight));
    setGameSteps([]);
    // Parse the steps
    for (let i = 0; i < gameSteps.length; i++) {
      if (columnIsValid(board, gameSteps[i].column)) {
        addChipToBoard(gameSteps[i].player, gameSteps[i].column);
      }
    }
  }

  // Delete the last step and run the game again
  function deleteLastStep() {
    if (gameSteps.length > 0) {
      const updatedGameSteps = [...gameSteps];
      const rewindCurrentPlayer = updatedGameSteps.length > 0 ? updatedGameSteps[updatedGameSteps.length - 1].player : players[0].code;
      setCurrentPlayer(rewindCurrentPlayer);
      updatedGameSteps.pop();
      runGame(updatedGameSteps);
      // Save the game to the local storage
      setAppData((prevAppData) => ({
        ...prevAppData,
        steps: updatedGameSteps,
      }));
    }
  }

  // Reset the game
  function resetGame() {
    setGameSteps([]);
    setBoard(initBoard(boardWidth, boardHeight));
    setCurrentPlayer(players[0].code);
    setAppData(createInitialData());    
    setWinner("0");
  }

  /** PLAYER Functions */
  function updatePlayerInformation(code: string, name: string, color: string) {
    setPlayers((players) => {
      const updatedPlayers = [...players];
      for (let i = 0; i < updatedPlayers.length; i++) {
        if (updatedPlayers[i].code === code) {
          updatedPlayers[i] = {
            ...updatedPlayers[i],
            name: name,
            color: color,
          };
        }
      }
      // Save the game to the local storage
      setAppData((prevAppData) => ({
        ...prevAppData,
        players: updatedPlayers
      }));
      return updatedPlayers;
    });
  }

  if (winner != "0") {
    let player = players.find((item) => (item.code == winner));
    return (
      <main className="winner">
        <span className="winner-celebrate"></span>
        {player ?
        <h1>{player.name} won!</h1>
        :
        <h1>{winner} won!</h1>}
        <div className="actions">
          <button className="action" onClick={() => resetGame()}>Restart</button>
        </div>
      </main>
    )
  }

  return (
    <main>
      <div className="header">
        <h1>connect<span>4....</span></h1>
        <div className="actions">
          {(gameSteps.length > 0) ?
          <button className="action" onClick={() => deleteLastStep()}>Rewind</button>
          : null}          
          <button className="action" onClick={() => resetGame()}>Reset</button>
        </div>
      </div>
      <div className="game">
        <div className="players">
          <div className="editorial-title">Instructions</div>
          <div className="editorial-text">
            <p>Click on a column letter to drop your disc.</p>
            <p>The first player to connect four discs in a row, column, or diagonal <strong>wins!</strong></p>
          </div>
          <hr/>
          <div className="editorial-title">Players</div>
          {players.map((item, index) => (
            <Player
              key={"player_" + index}
              code={item.code}
              name={item.name}
              color={item.color}
              isCurrent={currentPlayer == item.code}
              onChange={(name, color) => updatePlayerInformation(item.code, name, color)}
            />
          ))}
        </div>
        <Board
          board={board}
          players={players}
          playTurn={playTurn} />
      </div>
    </main>
  );
}