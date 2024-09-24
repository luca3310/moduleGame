import Phaser from "phaser";
import MyGame from "../myGame/myGame";
import { createBackground } from "./Background";
import { createTitle } from "./Title";
import { createButton } from "./Button";


export default class GameOverMenu extends Phaser.Scene {
  constructor() {
    super({ key: "GameOverMenu" });
  }

  create(): void {
    const { width, height } = this.cameras.main;

    // Baggrund med semi-transparens
    createBackground(this, width, height);

    // Titeltekst
    createTitle(this, "Game Over", width, height);

    // Knapper
    createButton(this, width / 2, height / 2 - 50, "Retry", "#00ff00", () => this.retryGame());
    createButton(this, width / 2, height / 2 + 50, "Quit to Main Menu", "#ff0000", () => this.quitToMainMenu());
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