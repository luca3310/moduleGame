import Phaser from "phaser";

export function createBackground(scene: Phaser.Scene, width: number, height: number): void {
  const background = scene.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.7);
  background.setOrigin(0.5);
}