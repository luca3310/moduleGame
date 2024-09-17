import Phaser from "phaser";

export default class KillCounter {
  private scene: Phaser.Scene;
  private killCounterText: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.killCounterText = this.scene.add.text(10, 10, `Kills: 0`, {
      font: "24px Arial",
      color: "#ffffff",
    });
    this.killCounterText.setScrollFactor(0);
    this.killCounterText.setDepth(3); // Set depth for kill counter
  }

  public updateKills(kills: number): void {
    this.killCounterText.setText(`Kills: ${kills}`);
  }

  public setPosition(x: number, y: number): void {
    this.killCounterText.setPosition(x, y);
  }
}