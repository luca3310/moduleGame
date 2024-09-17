// HealthBar.ts
import Phaser from "phaser";

export default class HealthBar {
  private healthBarBackground!: Phaser.GameObjects.Graphics;
  private healthBar!: Phaser.GameObjects.Graphics;
  private player!: Phaser.Physics.Arcade.Sprite;

  constructor(private scene: Phaser.Scene, player: Phaser.Physics.Arcade.Sprite) {
    this.player = player;
  }

  create() {
    // Opret baggrund for sundhedsbar
    this.healthBarBackground = this.scene.add.graphics();
    this.healthBarBackground.fillStyle(0x000000, 1);
    this.healthBarBackground.fillRect(this.player.x - 25, this.player.y - 35, 50, 5);
    this.healthBarBackground.setScrollFactor(0);
    this.healthBarBackground.setDepth(1);

    // Opret selve sundhedsbar
    this.healthBar = this.scene.add.graphics();
    this.healthBar.fillStyle(0xff0000, 1);
    this.healthBar.fillRect(this.player.x - 25, this.player.y - 35, 50, 5);
    this.healthBar.setScrollFactor(0);
    this.healthBar.setDepth(2);
  }

  updateHealth(health: number) {
    const healthPercentage = health / 100; // Assuming max health is 100
    const barWidth = 50 * healthPercentage;

    // Opdater sundhedsbar
    this.healthBar.clear();
    this.healthBar.fillStyle(0xff0000, 1);
    this.healthBar.fillRect(this.player.x - 25, this.player.y - 35, barWidth, 5);
  }

  update() {
    // Opdater positionen af sundhedsbar til at følge spilleren
    this.healthBarBackground.setPosition(this.player.x - 25, this.player.y - 35);
    this.healthBar.setPosition(this.player.x - 25, this.player.y - 35);
  }
}
