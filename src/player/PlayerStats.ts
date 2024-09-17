// playerStats.ts
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
  };
  