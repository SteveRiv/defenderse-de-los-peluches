import { GameState, Tower, Enemy, TowerType } from './types';
import { TOWERS, ENEMIES, ENEMY_START_X, ENEMY_START_Y, TOWER_MAIN_HP, WAVES } from './constants';

export function createInitialGameState(): GameState {
  return {
    level: 1,
    wave: 1,
    maxWaves: 5,
    money: 1000,
    towerMainHp: TOWER_MAIN_HP,
    towerMainMaxHp: TOWER_MAIN_HP,
    towers: [],
    enemies: [],
    gameRunning: true,
    waveRunning: false,
    selectedSlot: null,
    totalEnemiesKilled: 0,
    totalResourcesCollected: 0,
  };
}

export function canAffordTower(money: number, towerType: TowerType): boolean {
  const tower = TOWERS[towerType];
  return money >= tower.price;
}

export function purchaseTower(
  state: GameState,
  towerType: TowerType,
  slotX: number,
  slotY: number
): GameState {
  const tower = TOWERS[towerType];
  if (state.money < tower.price) return state;

  const newTower: Tower = {
    id: `${towerType}-${Date.now()}`,
    type: towerType,
    x: slotX,
    y: slotY,
    level: 1,
    damage: tower.damage,
    fireRate: tower.fireRate,
    range: tower.range,
    lastFireTime: 0,
    price: tower.price,
  };

  return {
    ...state,
    money: state.money - tower.price,
    towers: [...state.towers, newTower],
  };
}

export function spawnEnemies(state: GameState): GameState {
  if (!state.waveRunning) return state;

  const waveConfig = WAVES[state.wave - 1];
  if (!waveConfig) return state;

  let newEnemies: Enemy[] = [];
  let id = 0;

  waveConfig.enemies.forEach((enemySpawn) => {
    const enemyDef = ENEMIES[enemySpawn.type];
    for (let i = 0; i < enemySpawn.count; i++) {
      newEnemies.push({
        id: `${enemySpawn.type}-${state.wave}-${id++}`,
        type: enemySpawn.type,
        x: ENEMY_START_X,
        y: ENEMY_START_Y,
        hp: enemyDef.hp,
        maxHp: enemyDef.hp,
        speed: enemyDef.speed,
        damage: enemyDef.damage,
        reward: enemyDef.reward,
      });
    }
  });

  return {
    ...state,
    enemies: [...state.enemies, ...newEnemies],
  };
}

export function updateEnemyPositions(state: GameState, deltaTime: number): GameState {
  const updatedEnemies = state.enemies.map((enemy) => ({
    ...enemy,
    x: enemy.x + (enemy.speed * deltaTime) / 1000,
  }));

  // Remove enemies that reached the end (attacked tower)
  const remainingEnemies = updatedEnemies.filter((e) => e.x < 900);

  // Damage tower for enemies that reached it
  const enemiesThatReachedTower = updatedEnemies.filter((e) => e.x >= 900);
  let damage = 0;
  enemiesThatReachedTower.forEach((e) => {
    damage += e.damage;
  });

  const newHp = Math.max(0, state.towerMainHp - damage);

  return {
    ...state,
    enemies: remainingEnemies,
    towerMainHp: newHp,
    gameRunning: newHp > 0,
  };
}

export function fireTowers(state: GameState, deltaTime: number): GameState {
  let updatedEnemies = [...state.enemies];
  const now = Date.now();

  state.towers.forEach((tower) => {
    if (now - tower.lastFireTime >= tower.fireRate) {
      // Find closest enemy in range
      const targets = updatedEnemies.filter(
        (enemy) => Math.hypot(enemy.x - tower.x, enemy.y - tower.y) <= tower.range
      );

      if (targets.length > 0) {
        const closest = targets.reduce((prev, curr) =>
          Math.hypot(curr.x - tower.x, curr.y - tower.y) <
          Math.hypot(prev.x - tower.x, prev.y - tower.y)
            ? curr
            : prev
        );

        updatedEnemies = updatedEnemies.map((enemy) => {
          if (enemy.id === closest.id) {
            const newHp = enemy.hp - tower.damage;
            return { ...enemy, hp: newHp };
          }
          return enemy;
        });

        tower.lastFireTime = now;
      }
    }
  });

  // Remove dead enemies and award money
  let money = state.money;
  const aliveEnemies = updatedEnemies.filter((e) => {
    if (e.hp <= 0) {
      money += e.reward;
      return false;
    }
    return true;
  });

  return {
    ...state,
    enemies: aliveEnemies,
    money,
    totalEnemiesKilled: state.totalEnemiesKilled + (state.enemies.length - aliveEnemies.length),
  };
}

export function startWave(state: GameState): GameState {
  if (state.wave > state.maxWaves) {
    return { ...state, gameRunning: false, waveRunning: false };
  }

  return {
    ...state,
    waveRunning: true,
    enemies: [],
  };
}

export function endWave(state: GameState): GameState {
  if (state.wave >= state.maxWaves) {
    return { ...state, gameRunning: false, waveRunning: false };
  }

  return {
    ...state,
    wave: state.wave + 1,
    waveRunning: false,
    enemies: [],
  };
}

export function sellTower(state: GameState, towerId: string): GameState {
  const tower = state.towers.find((t) => t.id === towerId);
  if (!tower) return state;

  const refund = Math.floor(tower.price * 0.7); // 70% refund

  return {
    ...state,
    towers: state.towers.filter((t) => t.id !== towerId),
    money: state.money + refund,
  };
}
