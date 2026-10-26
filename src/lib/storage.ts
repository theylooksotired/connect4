export type AppData = {
  players: string[];
  steps: any[];
};

const storageKey = "connect4";

export function createInitialData(): AppData {
  return {
    players: [],
    steps: []
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
