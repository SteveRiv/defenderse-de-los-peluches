'use client';

import { TowerType, GameState } from '@/lib/types';
import { TOWERS } from '@/lib/constants';
import { useGameStore } from '@/store/gameStore';

interface ShopProps {
  gameState: GameState;
}

const TOWER_ICONS: Record<TowerType, string> = {
  SELECT: '🔍',
  INSERT: '➕',
  UPDATE: '♻️',
  DELETE: '❌',
};

export default function Shop({ gameState }: ShopProps) {
  const { buyTower } = useGameStore();

  const handleBuyTower = (towerType: TowerType) => {
    // Use first available slot
    const firstEmptySlot = getFirstEmptySlot();
    if (firstEmptySlot !== null) {
      const slotX = 60 + (firstEmptySlot % 4) * 90;
      const slotY = 80 + Math.floor(firstEmptySlot / 4) * 90;
      buyTower(towerType, slotX, slotY);
    }
  };

  const getFirstEmptySlot = () => {
    const occupied = new Set(gameState.towers.map((t) => Math.round(t.x / 90) % 4));
    for (let i = 0; i < 12; i++) {
      if (!occupied.has(i)) return i;
    }
    return null;
  };

  return (
    <div className="absolute right-4 top-20 bg-slate-900 border-2 border-purple-600 rounded-lg p-4 w-64 pointer-events-auto">
      <h3 className="text-slate-100 font-bold mb-4">TIENDA</h3>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {(Object.entries(TOWERS) as [TowerType, typeof TOWERS[TowerType]][]).map(([key, tower]) => {
          const canAfford = gameState.money >= tower.price;

          return (
            <div
              key={key}
              className="bg-slate-800 border border-slate-700 rounded p-3 hover:border-purple-600 transition"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{TOWER_ICONS[key as TowerType]}</span>
                <span className="text-slate-100 font-bold text-sm">{tower.name}</span>
              </div>

              <div className="text-xs text-slate-400 mb-2">{tower.concept}</div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300 text-sm">${tower.price}</span>
                <span className="text-xs text-slate-400">
                  ⭐ Dmg: {tower.damage} | Speed: {tower.fireRate}ms
                </span>
              </div>

              <button
                onClick={() => handleBuyTower(key as TowerType)}
                disabled={!canAfford}
                className={`w-full py-2 rounded font-bold text-sm transition ${
                  canAfford
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:scale-105'
                    : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                }`}
              >
                COMPRAR
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-2 bg-slate-800 rounded text-xs text-slate-300 border border-slate-700">
        <p className="font-bold mb-1">Torre Seleccionada:</p>
        <p>Dinero actual: ${gameState.money}</p>
        <p>Torres colocadas: {gameState.towers.length}/12</p>
      </div>
    </div>
  );
}
