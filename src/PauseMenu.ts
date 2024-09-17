// PauseMenu.ts
import Phaser from "phaser";
import MyGame from "./myGame";

export default class PauseMenu extends Phaser.Scene {
  private resumeButton!: Phaser.GameObjects.Text;
  private quitButton!: Phaser.GameObjects.Text;
  private background!: Phaser.GameObjects.Rectangle;
  private playerStats!: { [key: string]: Phaser.GameObjects.Text };

  constructor() {
    super({ key: "PauseMenu" });
  }

  preload(): void {
    // Preload eventuelt assets her
  }

  create(): void {
    const { width, height } = this.cameras.main;

    // Baggrund for PauseMenu
    this.background = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.7);
    this.background.setOrigin(0.5);
    this.background.setDepth(1000);

    // Resume Button
    this.resumeButton = this.add.text(width / 2, height / 2 - 50, "Resume", {
      fontSize: "32px",
      color: "#00ff00",
      backgroundColor: "#000000",
      padding: { x: 20, y: 10 },
    })
      .setOrigin(0.5)
      .setInteractive();
    this.resumeButton.setDepth(1001);

    // Quit Button
    this.quitButton = this.add.text(width / 2, height / 2 + 50, "Quit", {
      fontSize: "32px",
      color: "#ff0000",
      backgroundColor: "#000000",
      padding: { x: 20, y: 10 },
    })
      .setOrigin(0.5)
      .setInteractive();
    this.quitButton.setDepth(1001);

    // Lyttere for Resume og Quit knapper
    this.resumeButton.on("pointerdown", () => this.resumeGame());
    this.quitButton.on("pointerdown", () => this.quitGame());

    // Visning af player stats
    this.createPlayerStats();

    // Lyt til stats ændringer fra MyGame
    this.events.on('statsChanged', (newStats: { [key: string]: number }) => {
      this.updatePlayerStatsDisplay(newStats);
    });
  }

  private createPlayerStats(): void {
    const { height } = this.cameras.main;
    this.playerStats = {};

    let statY = 100; // Startposition for stats listen
    const statX = 50; // X-position til venstre
    const fontStyle = { fontSize: "20px", color: "#ffffff", fontFamily: "Roboto, sans-serif" };

    // Plads til stats, indtil de får værdier fra MyGame
    const initialStats = ["Health", "Damage", "Fire Rate", "Speed"];
    for (const stat of initialStats) {
      this.playerStats[stat] = this.add.text(statX, statY, `${stat}: --`, fontStyle)
        .setOrigin(0, 0)
        .setScrollFactor(0)
        .setDepth(1001);

      statY += 40; // Flyt Y-positionen ned for næste stat
    }
  }

  private updatePlayerStatsDisplay(stats: { [key: string]: number }): void {
    for (const [key, value] of Object.entries(stats)) {
      if (this.playerStats[key]) {
        this.playerStats[key].setText(`${key}: ${value}`);
      }
    }
  }

  private resumeGame(): void {
    const gameScene = this.scene.get("MyGame") as MyGame;
    gameScene.togglePause(); // Kalder togglePause på MyGame
    this.scene.stop("PauseMenu");
  }

  private quitGame(): void {
    this.scene.stop("MyGame");
    this.scene.stop("PauseMenu");
    this.scene.start("MainMenu"); // Skifter til MainMenu
  }
}