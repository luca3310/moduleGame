import Phaser from "phaser";

export function createBackground(
  scene: Phaser.Scene,
  x: number,
  y: number,
  width: number,
  height: number,
  color: number,
  alpha: number
): Phaser.GameObjects.Rectangle {
  const background = scene.add.rectangle(x, y, width, height, color, alpha)
    .setOrigin(0.5)
    .setDepth(1);

  return background;
}