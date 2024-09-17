// createPlayer.ts
import HealthBar from "../ui/HealthBar"; // Sørg for den rigtige sti til HealthBar

export default function createPlayer(x: number, y: number) {
  // Opret en spiller sprite med fysik
  this.player = this.physics.add.sprite(x, y, "playerStand");

  // Tilføj properties for niveau og XP
  this.player.level = 1;
  this.player.xp = 0;
  this.player.xpToNextLevel = 100; // XP required for the next level
  this.player.health = 100; // Initial health
  this.player.setDepth(0)

  // Tjek, om 'walk' animationen allerede eksisterer
  if (!this.anims.exists('walk')) {
    // Opret animationer for spillerens bevægelse (walk)
    this.anims.create({
      key: "walk",
      frames: [{ key: "playerWalk1" }, { key: "playerWalk2" }],
      frameRate: 10,
      repeat: -1, // Animationen skal gentage sig selv
    });
  }

  // Tilføj sundhedsbar til spilleren
  this.healthBar = new HealthBar(this, this.player);
  this.healthBar.create();

  this.physics.add.collider(
    this.player,
    this.enemies,
    (player: Phaser.Physics.Arcade.Sprite, enemy: Phaser.Physics.Arcade.Sprite) => {
      console.log("Collision between player and enemy!");

      // Reducer spillerens sundhed ved kollision
      this.player.health -= 10;
      this.healthBar.updateHealth(this.player.health); // Opdater sundhedsbar

      // Check for health below zero
      if (this.player.health <= 0) {
        console.log("Player is dead!");
        // Håndter spillerens død (f.eks. genstart spil, vis game over skærm)
        this.player.setAlpha(0); // Gør spilleren uset
        // Eller genstart spillet eller vis en game over skærm
      }
    },
  );
}