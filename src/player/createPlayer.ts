import PlayerStatsManager from './PlayerStats'; // Importer PlayerStatsManager
import PlayerHealth from './PlayerHealth';
import { setupMovementAnimations } from './PlayerMovement';
import HealthBar from "../ui/HealthBar"; // Sørg for den rigtige sti til HealthBar

export default function createPlayer(x: number, y: number) {
  // Opret en spiller sprite med fysik
  this.player = this.physics.add.sprite(x, y, "playerStand");
  this.player.setOrigin(0.5, 0.5);

  // Initialiser stats og sundhed
  PlayerStatsManager.init(this.player);
  PlayerHealth.init(this.player, this.healthBar);
  
  // Opsæt animationer
  setupMovementAnimations(this.anims);

  // Tilføj kollision med fjender
  this.physics.add.collider(
    this.player,
    this.enemies,
    (player: Phaser.Physics.Arcade.Sprite, enemy: Phaser.Physics.Arcade.Sprite) => {
      console.log("Collision between player and enemy!");
      PlayerHealth.handleCollision(this.player, this.healthBar);
    }
  );
}
