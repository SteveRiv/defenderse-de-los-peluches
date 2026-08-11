import { create } from 'zustand';
import { GameState, TowerType } from '@/lib/types';
import { createInitialGameState, purchaseTower, sellTower, startWave, endWave } from '@/lib/gameLogic';

interface GameStore {
  state: GameState;
  setState: (state: GameState) => void;
  buyTower: (towerType: TowerType, slotX: number, slotY: number) => void;
  removeTower: (towerId: string) => void;
  startWave: () => void;
  endWave: () => void;
  reset: () => void;
  selectSlot: (slotIndex: number | null) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  state: createInitialGameState(),

  setState: (newState: GameState) => set({ state: newState }),

  buyTower: (towerType: TowerType, slotX: number, slotY: number) =>
    set((store) => ({
      state: purchaseTower(store.state, towerType, slotX, slotY),
    })),

  removeTower: (towerId: string) =>
    set((store) => ({
      state: sellTower(store.state, towerId),
    })),

  startWave: () =>
    set((store) => ({
      state: startWave(store.state),
    })),

  endWave: () =>
    set((store) => ({
      state: endWave(store.state),
    })),

  reset: () =>
    set({
      state: createInitialGameState(),
    }),

  selectSlot: (slotIndex: number | null) =>
    set((store) => ({
      state: { ...store.state, selectedSlot: slotIndex },
    })),
}));
