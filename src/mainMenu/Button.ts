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
  const button = scene.add.text(x, y, text, style).setOrigin(0.5).setInteractive();

  button.on("pointerdown", callback);
  button.on("pointerover", () => button.setStyle(hoverButtonStyle));
  button.on("pointerout", () => button.setStyle(buttonStyle));

  return button;
}