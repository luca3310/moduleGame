import updateEnemyMovement from '../enemy/updateEnemyMovement';
import updatePlayerMovement from '../player/updatePlayerMovement';
import updateTiles from '../tiles/updateTiles';


export default function update(time: number, delta: number): void {
  if (this.isPaused) return;

  updatePlayerMovement.call(this);
  updateEnemyMovement.call(this);
  this.updateUI();
  this.handleBulletFiring(time);
  this.updateDashCooldownBar(time);
  this.timer.update(delta);

  // Sørg for, at sundhedsbaren følger spilleren
  if (this.healthBar) {
    this.healthBar.updatePosition(this.player.x, this.player.y); // Opdater sundhedsbarens position til at følge spilleren
  }

// Opdateret level-up logik
if (this.player.xp >= this.player.xpToNextLevel) {
  this.player.level += 1;
  this.player.xp -= this.player.xpToNextLevel;
  this.player.xpToNextLevel = Math.floor(this.player.xpToNextLevel * 1.5);

  if (!this.player.levelUp) {
    this.player.levelUp = true;
    this.handleLevelUp();
  }
}

// Hvis spilleren har opnået levelUp, reset det
if (this.player.levelUp) {
    this.player.levelUp = false; // Reset flag efter håndtering
}

  updateTiles.call(this);
}