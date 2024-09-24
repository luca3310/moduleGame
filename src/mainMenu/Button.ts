import Phaser from "phaser";
import { hoverButtonStyle, buttonStyle } from "./MainMenuStyles";

export function createButton(
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string,
  style: Phaser.Types.GameObjects.Text.TextStyle,
  callback: () => void
): Phaser.GameObjects.Text {
  const button = scene.add.text(x, y, text, style)
    .setOrigin(0.5)
    .setInteractive()
    .setAlpha(0); // Start med at være usynlig

  button.on("pointerdown", callback);
  button.on("pointerover", () => button.setStyle(hoverButtonStyle).setShadow(2, 2, '#000000', 0.5, true));
  button.on("pointerout", () => button.setStyle(buttonStyle).setShadow(0, 0, '#000000', 0, true));

  // Fade-in effekt for knappen
  scene.tweens.add({
    targets: button,
    alpha: 1,
    duration: 1000,
    ease: 'Power2',
  });

  return button;
}