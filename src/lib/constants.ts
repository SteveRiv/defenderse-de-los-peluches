import { TowerDefinition, EnemyDefinition } from './types';

// Game dimensions
export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;
export const SLOT_SIZE = 80;
export const SLOT_SPACING = 10;

// Tower main
export const TOWER_MAIN_HP = 100;
export const TOWER_MAIN_X = GAME_WIDTH / 2;
export const TOWER_MAIN_Y = GAME_HEIGHT / 2;
export const TOWER_MAIN_RADIUS = 30;

// Enemy path
export const ENEMY_START_X = -50;
export const ENEMY_START_Y = GAME_HEIGHT / 2;
export const ENEMY_END_X = GAME_WIDTH + 50;
export const ENEMY_END_Y = GAME_HEIGHT / 2;

// Wave timing
export const WAVE_DELAY = 20000; // 20 seconds between waves
export const ENEMY_SPAWN_INTERVAL = 500; // 500ms between spawns

// Initial money
export const INITIAL_MONEY = 1000;

// Tower definitions
export const TOWERS: Record<string, TowerDefinition> = {
  SELECT: {
    id: 'SELECT',
    name: 'SELECT Tower',
    price: 100,
    damage: 10,
    fireRate: 1500, // ms
    range: 150,
    concept: 'SELECT - Obtener datos',
    description: 'Lee datos de la BD. Daño: ⭐⭐ Velocidad: ⭐',
  },
  INSERT: {
    id: 'INSERT',
    name: 'INSERT Tower',
    price: 150,
    damage: 5,
    fireRate: 1000,
    range: 180,
    concept: 'INSERT - Agregar datos',
    description: 'Agrega defensas. Daño: ⭐ Velocidad: ⭐⭐',
  },
  UPDATE: {
    id: 'UPDATE',
    name: 'UPDATE Tower',
    price: 200,
    damage: 15,
    fireRate: 800,
    range: 100,
    concept: 'UPDATE - Modificar datos',
    description: 'Modifica enemigos. Daño: ⭐⭐⭐ Velocidad: ⭐⭐⭐⭐',
  },
  DELETE: {
    id: 'DELETE',
    name: 'DELETE Tower',
    price: 300,
    damage: 50,
    fireRate: 3000,
    range: 150,
    concept: 'DELETE - Eliminar datos',
    description: 'Borra enemigos. Daño: ⭐⭐⭐⭐⭐ Velocidad: ⭐',
  },
};

// Enemy definitions
export const ENEMIES: Record<string, EnemyDefinition> = {
  castor: {
    type: 'castor',
    name: 'Castor',
    hp: 1,
    speed: 30, // pixels per second
    damage: 10,
    reward: 10,
    icon: '🦫',
  },
  oso: {
    type: 'oso',
    name: 'Oso',
    hp: 2,
    speed: 50,
    damage: 20,
    reward: 15,
    icon: '🐻',
  },
};

// Wave configurations
export const WAVES = [
  { wave: 1, enemies: [{ type: 'castor' as const, count: 5 }] },
  { wave: 2, enemies: [{ type: 'castor' as const, count: 7 }, { type: 'oso' as const, count: 3 }] },
  { wave: 3, enemies: [{ type: 'castor' as const, count: 5 }, { type: 'oso' as const, count: 5 }] },
  { wave: 4, enemies: [{ type: 'castor' as const, count: 10 }] },
  { wave: 5, enemies: [{ type: 'castor' as const, count: 15 }, { type: 'oso' as const, count: 5 }] },
];

// Colors
export const COLORS = {
  bg: '#0F172A',
  primary: '#6D28D9',
  secondary: '#0EA5E9',
  accent: '#F97316',
  text: '#F1F5F9',
  border: '#1E293B',
  enemy: '#EF4444',
  tower: '#10B981',
};
