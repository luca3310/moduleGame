import Phaser from "phaser";
import MyGame from "./myGame";

export default class PauseMenu extends Phaser.Scene {
  private resumeButton!: Phaser.GameObjects.Text;
  private quitButton!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "PauseMenu" });
  }

  preload(): void {
    // Preload eventuelt assets her
  }

  create(): void {
    const { width, height } = this.cameras.main;

    // Tilføj tekst for Resume og Quit
    this.resumeButton = this.add.text(width / 2, height / 2 - 50, "Resume", {
      fontSize: "32px",
      color: "#00ff00",
      backgroundColor: "#000000"
    }).setOrigin(0.5).setInteractive();

    this.quitButton = this.add.text(width / 2, height / 2 + 50, "Quit", {
      fontSize: "32px",
      color: "#ff0000",
      backgroundColor: "#000000"
    }).setOrigin(0.5).setInteractive();

    // Tilføj event listeners til knapperne
    this.resumeButton.on("pointerdown", () => this.resumeGame());
    this.quitButton.on("pointerdown", () => this.quitGame());
  }

  private resumeGame(): void {
    const gameScene = this.scene.get("MyGame") as MyGame;
    gameScene.togglePause(); // Kalder togglePause på MyGame
    this.scene.stop("PauseMenu");
  }

  private quitGame(): void {
    // Stopper det aktive spil og går til hovedmenuen
    this.scene.stop("MyGame");
    this.scene.stop("PauseMenu");
    this.scene.start("MainMenu"); // Skifter til MainMenu
  }
}