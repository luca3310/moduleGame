export default function createPlayer(x: number, y: number) {
  this.player = this.add.rectangle(x, y, 50, 50, 0x00ff00);
  this.physics.add.existing(this.player);

  // Add properties to track player level and XP
  this.player.level = 1;
  this.player.xp = 0;
  this.player.xpToNextLevel = 100; // XP required for the next level

  // Display level on screen (optional)
  this.levelText = this.add.text(10, 10, `Level: ${this.player.level}`, {
    fontSize: "24px",
    fill: "#fff",
  });
  this.levelText.setScrollFactor(0); // Ensures text stays on screen
}
