export default function createPlayer(x: number, y: number) {
  this.player = this.add.rectangle(x, y, 50, 50, 0x00ff00);
  this.physics.add.existing(this.player);

  // Add properties to track player level and XP
  this.player.level = 1;
  this.player.xp = 0;
  this.player.xpToNextLevel = 100; // XP required for the next level

  // Create a static level bar background
}
