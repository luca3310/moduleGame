import createPlayer from 'src/player/createPlayer';
import { PlayerWithStats } from '../player/PlayerStats';


export default function initializePlayer(centerX: number, centerY: number): void {
  createPlayer.call(this, centerX, centerY);
  this.player = this.player as PlayerWithStats;
  this.player.level = 1;
  this.player.xp = 0;
  this.player.xpToNextLevel = 100;
  this.player.levelUp = false;
  this.player.stats = {
    health: 100,
    damage: 1,
    fireRate: 1000,
    speed: 160,
  };
}