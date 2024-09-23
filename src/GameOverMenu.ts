import Phaser from "phaser";
import MainMenu from "./mainMenu";
import MyGame from "./myGame/myGame";

export default class GameOverMenu extends Phaser.Scene {
  private retryButton!: Phaser.GameObjects.Text;
  private quitButton!: Phaser.GameObjects.Text;
  private background!: Phaser.GameObjects.Rectangle;

  constructor() {
    super({ key: "GameOverMenu" });
  }

  create(): void {
    const { width, height } = this.cameras.main;

    this.background = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.7);
    this.background.setOrigin(0.5);
    this.background.setDepth(10); // Set depth for background

    this.retryButton = this.add.text(width / 2, height / 2 - 50, "Retry", { fontSize: "32px", color: "#00ff00" })
      .setOrigin(0.5)
      .setInteractive();
      this.retryButton.setDepth(10); // Set depth for background

    this.quitButton = this.add.text(width / 2, height / 2 + 50, "Quit to Main Menu", { fontSize: "32px", color: "#ff0000" })
      .setOrigin(0.5)
      .setInteractive();
      this.quitButton.setDepth(10); // Set depth for background

    this.retryButton.on("pointerdown", () => this.retryGame());
    this.quitButton.on("pointerdown", () => this.quitToMainMenu());
  }

  private retryGame(): void {
    const gameScene = this.scene.get("MyGame") as MyGame;
    gameScene.resetGame(); // Kalder resetGame for at nulstille spillet
    this.scene.stop("GameOverMenu");
  }

  private quitToMainMenu(): void {
    this.scene.stop("MyGame");
    this.scene.stop("GameOverMenu");
    this.scene.start("MainMenu");
  }
}