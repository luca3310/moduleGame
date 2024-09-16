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
    const barY = 40;

    this.levelBarBackground = this.scene.add.graphics();
    this.levelBarBackground.fillStyle(0x444444, 1);
    this.levelBarBackground.fillRect(barX, barY, barWidth, 20);
    this.levelBarBackground.setScrollFactor(0);

    this.levelBar = this.scene.add.graphics();
    this.levelBar.fillStyle(0x0000ff, 1);
    this.levelBar.fillRect(barX, barY, barWidth, 20);
    this.levelBar.setScrollFactor(0);

    this.levelTextInsideBar = this.scene.add.text(barX + barWidth - 10, barY + 10, `Level: 1`, {
      fontSize: "18px",
      fontFamily: "Arial, sans-serif",
      color: "#fff",
      align: "right",
    });
    this.levelTextInsideBar.setOrigin(1, 0.5);
    this.levelTextInsideBar.setScrollFactor(0);

    this.xpText = this.scene.add.text(barX, barY + 30, `XP: 0 / 100`, {
      fontSize: "16px",
      fontFamily: "Arial, sans-serif",
      color: "#fff",
      align: "left",
    });
    this.xpText.setScrollFactor(0);
  }

  updateLevel(level: number) {
    this.levelTextInsideBar.setText(`Level: ${level}`);
  }

  updateXP(xp: number, xpToNextLevel: number) {
    const xpProgress = xp / xpToNextLevel;
    this.levelBar.clear();
    this.levelBar.fillStyle(0x0000ff, 1);
    this.levelBar.fillRect(10, 40, (this.scene.cameras.main.width - 20) * xpProgress, 20);
    this.levelBar.setScrollFactor(0);

    this.xpText.setText(`XP: ${Math.floor(xp)} / ${xpToNextLevel}`);
  }
}