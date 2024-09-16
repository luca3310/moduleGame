import Phaser from "phaser";

export default class LevelBar {
  private levelBarBackground!: Phaser.GameObjects.Graphics;
  private levelBar!: Phaser.GameObjects.Graphics;
  private levelTextInsideBar!: Phaser.GameObjects.Text;
  private xpText!: Phaser.GameObjects.Text;

  constructor(private scene: Phaser.Scene) {}

  create() {
    const { width } = this.scene.cameras.main;
    const barWidth = width - 20;
    const barX = 10;
    const barY = 10; // Adjusted to position at the top

    // Background for the level bar
    this.levelBarBackground = this.scene.add.graphics();
    this.levelBarBackground.fillStyle(0x333333, 1);
    this.levelBarBackground.fillRect(barX, barY, barWidth, 20);
    this.levelBarBackground.setScrollFactor(0);

    // Level bar with modern gradient
    this.levelBar = this.scene.add.graphics();
    this.levelBar.fillStyle(0x1e90ff, 1); // Modern blue color
    this.levelBar.fillRect(barX, barY, barWidth, 20);
    this.levelBar.setScrollFactor(0);

    // Level text with a sleek font
    this.levelTextInsideBar = this.scene.add.text(barX + barWidth - 10, barY + 10, `Level: 1`, {
      fontSize: "20px",
      fontFamily: "Roboto, sans-serif",
      color: "#ffffff",
      align: "right",
      stroke: "#000000", // Adding stroke for better readability
      strokeThickness: 2,
    });
    this.levelTextInsideBar.setOrigin(1, 0.5);
    this.levelTextInsideBar.setScrollFactor(0);

    // XP text in the center with modern font
    this.xpText = this.scene.add.text(barX + barWidth / 2, barY + 10, `XP: 0 / 100`, {
      fontSize: "16px",
      fontFamily: "Roboto, sans-serif",
      color: "#ffffff",
      align: "center",
      stroke: "#000000",
      strokeThickness: 2,
    });
    this.xpText.setOrigin(0.5, 0.5); // Center the text
    this.xpText.setScrollFactor(0);
  }

  updateLevel(level: number) {
    this.levelTextInsideBar.setText(`Level: ${level}`);
  }

  updateXP(xp: number, xpToNextLevel: number) {
    const xpProgress = xp / xpToNextLevel;
    this.levelBar.clear();
    this.levelBar.fillStyle(0x1e90ff, 1); // Keep modern blue color
    this.levelBar.fillRect(10, 10, (this.scene.cameras.main.width - 20) * xpProgress, 20);
    this.levelBar.setScrollFactor(0);

    this.xpText.setText(`XP: ${Math.floor(xp)} / ${xpToNextLevel}`);

    // Update XP text position to keep it centered
    const barWidth = this.scene.cameras.main.width - 20;
    this.xpText.x = 10 + barWidth / 2;
  }
}