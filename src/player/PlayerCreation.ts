import PlayerStats from './PlayerStats';
import PlayerHealth from './PlayerHealth';
import { setupMovementAnimations } from './PlayerMovement';
import updatePlayerMovement from './updatePlayerMovement';

export default function createPlayer(x: number, y: number) {
  this.player = this.physics.add.sprite(x, y, "playerStand");
  this.player.setOrigin(0.5, 0.5);


  // Initialiser stats
  PlayerStats.init(this.player);
  PlayerHealth.init(this.player, this.healthBar);
  setupMovementAnimations(this.anims);


  this.physics.add.collider(
    this.player,
    this.enemies,
    (player: Phaser.Physics.Arcade.Sprite, enemy: Phaser.Physics.Arcade.Sprite) => {
      PlayerHealth.handleCollision(this.player, this.healthBar);
    }
  );

  // Opdater bevægelsen
  this.input.keyboard.on('keydown', () => updatePlayerMovement.call(this));
}
