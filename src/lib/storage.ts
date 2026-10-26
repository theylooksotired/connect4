import { Player } from "../components/Player";
import type { GameStep } from "../components/Game";

export type AppData = {
  players: Player[];
  steps: GameStep[];
};

const storageKey = "connect4";

export function createInitialData(): AppData {
  return {
    players: <Player[]>[],
    steps: <GameStep[]>[]
  };
}

export function loadAppData(): AppData {
  const savedData = localStorage.getItem(storageKey);
  if (savedData === null) {
    return createInitialData();
  }
  return JSON.parse(savedData) as AppData;
}

export function saveAppData(data: AppData) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}
