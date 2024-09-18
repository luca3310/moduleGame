import Phaser from 'phaser';

export default class HealthBar {
  private healthBar!: Phaser.GameObjects.Graphics;
  private player: Phaser.Physics.Arcade.Sprite;
  private scene: Phaser.Scene;
  private maxHealth: number;

  constructor(scene: Phaser.Scene, player: Phaser.Physics.Arcade.Sprite) {
    this.scene = scene;
    this.player = player;
    this.maxHealth = 100; // Sæt spillerens max health (kan tilpasses)
  }

  create() {
    // Opret en simpel sundhedsbar, der er grøn
    this.healthBar = this.scene.add.graphics();
    this.healthBar.fillStyle(0x00ff00, 1); // Grøn farve
    this.updatePosition(); // Opretter sundhedsbaren over spilleren ved starten
    this.healthBar.setDepth(5); // Sørg for, at sundhedsbaren vises over spilleren
  }

  updateHealth(health: number) {
    const healthPercentage = health / this.maxHealth; // Procentvis af max health
    const barWidth = 50 * healthPercentage; // Beregn sundhedsbarens bredde ud fra procenten

    // Ryd sundhedsbaren og tegn den igen med den nye bredde
    this.healthBar.clear();
    this.healthBar.fillStyle(0x00ff00, 1); // Grøn farve
    this.updatePosition(); // Opdaterer positionen af sundhedsbaren
    this.healthBar.fillRect(0, 0, barWidth, 8); // Placer sundhedsbaren over spilleren
  }

  updatePosition() {
    // Sørg for, at sundhedsbaren følger spilleren
    const barX = this.player.x - 25;
    const barY = this.player.y - 48; // Løftet lidt højere op
    this.healthBar.setPosition(barX, barY);
  }
}
