import Phaser from "phaser";

export function createButton(
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string,
  style: Phaser.Types.GameObjects.Text.TextStyle,
  callback: () => void
): Phaser.GameObjects.Text {
  const buttonBackground = scene.add.rectangle(x, y, 220, 50, 0x222222, 0.9)
    .setOrigin(0.5)
    .setInteractive()
    .setStrokeStyle(2, 0x00cc00); // Sæt standard stroke color

  const buttonText = scene.add.text(x, y, text, style).setOrigin(0.5);

  // Animering ved hover
  buttonBackground.on("pointerover", () => {
    buttonBackground.setFillStyle(0x444444);
    buttonText.setColor("#00cc00");
    scene.tweens.add({
      targets: buttonBackground,
      scaleX: 1.05,
      scaleY: 1.05,
      duration: 150,
      ease: "Power1",
      yoyo: true,
    });
  });

  buttonBackground.on("pointerout", () => {
    buttonBackground.setFillStyle(0x222222);
    buttonText.setColor("#ffffff");
  });

  buttonBackground.on("pointerdown", () => {
    buttonBackground.setFillStyle(0x333333); // Mørkere farve ved klik
    callback();
  });

  buttonBackground.on("pointerup", () => {
    buttonBackground.setFillStyle(0x444444);
  });

  return buttonText; // Returner buttonText
}