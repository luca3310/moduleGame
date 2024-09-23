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

  if (this.player.xp >= this.player.xpToNextLevel) {
    this.player.level++;
    console.log('here ');

    this.player.xp -= this.player.xpToNextLevel;
    this.player.xpToNextLevel *= 1.5;
    this.player.levelUp = true;

    // Vis level-up menu
    this.levelUpMenu.show(this.player.level);
  }

  updateTiles.call(this);
}