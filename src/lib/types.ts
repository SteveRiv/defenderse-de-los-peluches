// Game types and interfaces

export type TowerType = 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE';
export type EnemyType = 'castor' | 'oso';

export interface Tower {
  id: string;
  type: TowerType;
  x: number;
  y: number;
  level: number;
  damage: number;
  fireRate: number;
  range: number;
  lastFireTime: number;
  price: number;
}

export interface Enemy {
  id: string;
  type: EnemyType;
  x: number;
  y: number;
  hp: number;
  maxHp: number;
  speed: number;
  damage: number;
  reward: number;
}

export interface GameState {
  level: number;
  wave: number;
  maxWaves: number;
  money: number;
  towerMainHp: number;
  towerMainMaxHp: number;
  towers: Tower[];
  enemies: Enemy[];
  gameRunning: boolean;
  waveRunning: boolean;
  selectedSlot: number | null;
  totalEnemiesKilled: number;
  totalResourcesCollected: number;
}

export interface TowerDefinition {
  id: TowerType;
  name: string;
  price: number;
  damage: number;
  fireRate: number;
  range: number;
  concept: string;
  description: string;
}

export interface EnemyDefinition {
  type: EnemyType;
  name: string;
  hp: number;
  speed: number;
  damage: number;
  reward: number;
  icon: string;
}
