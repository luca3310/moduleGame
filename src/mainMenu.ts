import Phaser from "phaser";

export default class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenu" });
  }

  preload(): void {
    // Optionally, load any assets for the menu (e.g., background images)
  }

  create(): void {
    // Add the main menu title
    const titleText = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2 - 100,
      "My Game Title",
      {
        fontSize: "48px",
        color: "#ffffff",
      },
    );
    titleText.setOrigin(0.5);

    // Add a "Start Game" button or text
    const startGameText = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      "Start Game",
      {
        fontSize: "32px",
        color: "#00ff00",
      },
    );
    startGameText.setOrigin(0.5);

    // Make the text interactive (clickable)
    startGameText.setInteractive();
    startGameText.on("pointerdown", () => {
      // Switch to the MyGame scene when "Start Game" is clicked
      this.scene.stop("MainMenu");
      this.scene.launch("MyGame");
    });
  }
}
