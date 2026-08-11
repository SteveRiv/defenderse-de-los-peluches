'use client';

import { GameState } from '@/lib/types';

interface GameUIProps {
  gameState: GameState;
  onNextWave: () => void;
}

export default function GameUI({ gameState, onNextWave }: GameUIProps) {
  const hpPercent = (gameState.towerMainHp / gameState.towerMainMaxHp) * 100;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-slate-900 to-transparent p-4 pointer-events-auto">
        <div className="flex justify-between items-center text-slate-100">
          <div>
            <span className="text-lg font-bold">Wave {gameState.wave}/{gameState.maxWaves}</span>
          </div>
          <div>
            <span className="text-lg font-bold">💰 ${gameState.money}</span>
          </div>
          <div>
            <span className="text-lg font-bold">🏰 HP: {gameState.towerMainHp}/{gameState.towerMainMaxHp}</span>
          </div>
        </div>

        {/* HP Bar */}
        <div className="mt-2 w-full bg-slate-700 rounded-full h-6 overflow-hidden">
          <div
            className="bg-gradient-to-r from-green-500 to-emerald-600 h-full transition-all duration-300"
            style={{ width: `${hpPercent}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-4 pointer-events-auto">
        {!gameState.waveRunning && gameState.gameRunning && gameState.wave <= gameState.maxWaves && (
          <button
            onClick={onNextWave}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg hover:scale-105 transition-transform"
          >
            Siguiente Oleada
          </button>
        )}

        {!gameState.gameRunning && (
          <div className="text-center text-xl font-bold text-slate-100">
            {gameState.towerMainHp <= 0 ? '💀 GAME OVER' : '🎉 NIVEL COMPLETADO'}
          </div>
        )}

        {gameState.waveRunning && (
          <div className="text-center text-slate-400">
            Enemigos en pantalla: {gameState.enemies.length}
          </div>
        )}
      </div>
    </div>
  );
}
