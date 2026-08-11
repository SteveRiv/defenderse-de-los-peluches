'use client';

import React, { useEffect, useRef } from 'react';
import { useGameStore } from '@/store/gameStore';
import { GameState } from '@/lib/types';
import GameCanvas from '@/components/game/GameCanvas';
import GameUI from '@/components/game/GameUI';
import Shop from '@/components/game/Shop';

export default function GamePage() {
  const { state, setState, startWave, endWave } = useGameStore();
  const userId = useRef<string | null>(null);

  // Get user ID from Supabase Auth
  useEffect(() => {
    userId.current = 'test-user-' + Date.now();
  }, []);

  const handleGameStateUpdate = (newState: GameState) => {
    setState(newState);
  };

  const handleNextWave = () => {
    startWave();
  };

  const handleWaveEnd = () => {
    endWave();
  };

  // Auto-end wave when all enemies are defeated
  useEffect(() => {
    if (state.waveRunning && state.enemies.length === 0 && state.wave > 0) {
      const timer = setTimeout(() => {
        handleWaveEnd();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state.enemies.length, state.waveRunning, state.wave]);

  return (
    <div className="w-full h-screen bg-slate-950 flex flex-col items-center justify-center">
      <div className="relative w-full max-w-4xl" style={{ aspectRatio: '4/3', backgroundColor: '#0F172A' }}>
        {/* Game Container */}
        <div id="game-container" className="w-full h-full absolute inset-0">
          <GameCanvas onGameStateUpdate={handleGameStateUpdate} />
        </div>

        {/* UI Overlays */}
        <GameUI gameState={state} onNextWave={handleNextWave} />
        <Shop gameState={state} />
      </div>

      {/* Info Panel */}
      <div className="mt-4 text-center text-slate-400 text-sm">
        <p>Wave {state.wave}/{state.maxWaves}</p>
        <p>Dinero: ${state.money} | HP: {state.towerMainHp}/{state.towerMainMaxHp}</p>
        <p>Torres: {state.towers.length} | Enemigos: {state.enemies.length}</p>
      </div>
    </div>
  );
}
