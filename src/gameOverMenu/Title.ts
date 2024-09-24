import Phaser from "phaser";

export function createTitle(scene: Phaser.Scene, text: string, width: number, height: number): void {
  scene.add.text(width / 2, height / 2 - 150, text, {
    fontSize: "48px",
    color: "#ffffff",
    fontStyle: "bold"
  }).setOrigin(0.5);
}