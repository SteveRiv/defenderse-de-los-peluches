import { createClient } from '@supabase/supabase-js';
import { GameState } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nqbzlsizzkaixzknjgwk.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xYnpsc2l6emthaXh6a25qZ3drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0MDEwNTUsImV4cCI6MjEwMTk3NzA1NX0.2pyqqAm-qS9SBa_1RqL7zD37xmGjdnGhtncNRm7A8xk';

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function saveGameProgress(userId: string, gameState: GameState) {
  try {
    const { data, error } = await supabase
      .from('game_progress')
      .upsert({
        user_id: userId,
        current_level: gameState.level,
        current_wave: gameState.wave,
        current_money: gameState.money,
        tower_main_hp: gameState.towerMainHp,
        total_enemies_killed: gameState.totalEnemiesKilled,
        towers_placed: gameState.towers.map((t) => ({
          id: t.id,
          type: t.type,
          x: t.x,
          y: t.y,
          level: t.level,
        })),
        last_saved: new Date().toISOString(),
      });

    if (error) {
      console.error('Error saving game progress:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}

export async function loadGameProgress(userId: string): Promise<GameState | null> {
  try {
    const { data, error } = await supabase
      .from('game_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error || !data) {
      return null;
    }

    return {
      level: data.current_level,
      wave: data.current_wave,
      maxWaves: 5,
      money: data.current_money,
      towerMainHp: data.tower_main_hp,
      towerMainMaxHp: 100,
      towers: data.towers_placed || [],
      enemies: [],
      gameRunning: true,
      waveRunning: false,
      selectedSlot: null,
      totalEnemiesKilled: data.total_enemies_killed,
      totalResourcesCollected: 0,
    };
  } catch (error) {
    console.error('Error loading game progress:', error);
    return null;
  }
}

export async function getLeaderboard(limit: number = 10) {
  try {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('rank', { ascending: true })
      .limit(limit);

    if (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}
