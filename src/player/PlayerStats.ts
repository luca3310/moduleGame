export type PlayerStats = {
  health: number;
  damage: number;
  fireRate: number;
  speed: number;
  [key: string]: number; // Gør det nemt at tilføje nye stats
};

export type PlayerWithStats = Phaser.Physics.Arcade.Sprite & {
  level: number;
  xp: number;
  xpToNextLevel: number;
  levelUp: boolean;
  stats: PlayerStats; // Ny stats-egenskab
  xpPerBlop: number;  // XP pr. blop
  attractionSpeed: number; // Tilføj attractionSpeed
  magnetRadius: number; // Tilføj magnetRadius
};


export class PlayerStatsManager {
  static init(player: PlayerWithStats) {
    player.level = 1;
    player.xp = 0;
    player.xpToNextLevel = 100; // XP required for the next level
    player.stats = {
      health: 100,
      damage: 10,
      fireRate: 10,
      speed: 160,
    };
  }
}

export default PlayerStatsManager;
