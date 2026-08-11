'use client';

import { useEffect, useRef } from 'react';
import { useGameStore } from '@/store/gameStore';
import { GameState } from '@/lib/types';
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  TOWER_MAIN_X,
  TOWER_MAIN_Y,
  TOWER_MAIN_RADIUS,
  ENEMIES,
} from '@/lib/constants';
import {
  updateEnemyPositions,
  fireTowers,
  spawnEnemies,
} from '@/lib/gameLogic';

interface GameCanvasProps {
  onGameStateUpdate: (state: GameState) => void;
}

export default function GameCanvas({ onGameStateUpdate }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { state, setState } = useGameStore();
  const lastUpdateRef = useRef<number>(Date.now());
  const spawnCounterRef = useRef<number>(0);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    function drawGame(gameState: GameState) {
      // Clear with background color
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      // Draw tower main (center)
      ctx.fillStyle = '#6D28D9';
      ctx.beginPath();
      ctx.arc(TOWER_MAIN_X, TOWER_MAIN_Y, TOWER_MAIN_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FFF';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('TOWER', TOWER_MAIN_X, TOWER_MAIN_Y);

      // Draw placed towers as circles
      gameState.towers.forEach((tower, idx) => {
        ctx.fillStyle = '#F97316';
        ctx.beginPath();
        ctx.arc(tower.x, tower.y, 10, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw enemies as red circles
      gameState.enemies.forEach((enemy) => {
        ctx.fillStyle = '#EF4444';
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, 8, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw path line
      ctx.strokeStyle = 'rgba(109, 40, 217, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, GAME_HEIGHT / 2);
      ctx.lineTo(GAME_WIDTH, GAME_HEIGHT / 2);
      ctx.stroke();
    }

    function updateGame() {
      const now = Date.now();
      const deltaTime = now - lastUpdateRef.current;
      lastUpdateRef.current = now;

      let currentState = state;

      if (currentState.waveRunning) {
        spawnCounterRef.current += deltaTime;
        if (spawnCounterRef.current >= 500) {
          currentState = spawnEnemies(currentState);
          spawnCounterRef.current = 0;
        }
      }

      currentState = updateEnemyPositions(currentState, deltaTime);
      currentState = fireTowers(currentState, deltaTime);

      setState(currentState);
      onGameStateUpdate(currentState);
      drawGame(currentState);

      animationFrameRef.current = requestAnimationFrame(updateGame);
    }

    animationFrameRef.current = requestAnimationFrame(updateGame);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [state, setState, onGameStateUpdate]);

  return (
    <canvas
      ref={canvasRef}
      width={GAME_WIDTH}
      height={GAME_HEIGHT}
      className="w-full h-full border border-purple-600"
    />
  );
}
