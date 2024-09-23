import Phaser from "phaser";
import MainMenu from "./mainMenu";
import MyGame from "./myGame/myGame";

export default class GameOverMenu extends Phaser.Scene {
  private retryButton!: Phaser.GameObjects.Text;
  private quitButton!: Phaser.GameObjects.Text;
  private background!: Phaser.GameObjects.Rectangle;
  private buttonBackground!: Phaser.GameObjects.Rectangle;

  constructor() {
    super({ key: "GameOverMenu" });
  }

  create(): void {
    const { width, height } = this.cameras.main;

    // Baggrund med semi-transparens
    this.background = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.7);
    this.background.setOrigin(0.5);

    // Titeltekst
    this.add.text(width / 2, height / 2 - 150, "Game Over", {
      fontSize: "48px",
      color: "#ffffff",
      fontStyle: "bold"
    }).setOrigin(0.5);

    // Retry-knap med baggrund
    this.createButton(
      width / 2,
      height / 2 - 50,
      "Retry",
      "#00ff00",
      () => this.retryGame()
    );

    // Quit-knap med baggrund
    this.createButton(
      width / 2,
      height / 2 + 50,
      "Quit to Main Menu",
      "#ff0000",
      () => this.quitToMainMenu()
    );
  }

  private createButton(x: number, y: number, text: string, color: string, callback: () => void): void {
    // Baggrund for knappen (aflange knapper)
    const buttonBackground = this.add.rectangle(x, y, 220, 50, 0x222222, 0.8)
      .setOrigin(0.5)
      .setInteractive();
    buttonBackground.setStrokeStyle(2, Phaser.Display.Color.HexStringToColor(color).color); // Kantlinje i samme farve som teksten

    // Knapteksten
    const buttonText = this.add.text(x, y, text, {
      fontSize: "24px",
      color: color,
      fontStyle: "bold",
    }).setOrigin(0.5);

    // Gør hele knappen interaktiv
    buttonBackground.on("pointerdown", callback);
    buttonText.on("pointerdown", callback);
    
    // Hover effekt for knappen
    buttonBackground.on("pointerover", () => buttonBackground.setFillStyle(0x444444));
    buttonBackground.on("pointerout", () => buttonBackground.setFillStyle(0x222222));
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