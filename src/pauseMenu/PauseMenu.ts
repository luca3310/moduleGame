import Phaser from "phaser";
import MyGame from "../myGame/myGame";
import { createBackground } from "./Background";
import { createButton } from "./Button";
import { createPlayerStats, updatePlayerStatsDisplay } from "./PlayerStats";

export default class PauseMenu extends Phaser.Scene {
  private resumeButton!: Phaser.GameObjects.Text;
  private quitButton!: Phaser.GameObjects.Text;
  private background!: Phaser.GameObjects.Rectangle;
  private playerStats!: { [key: string]: Phaser.GameObjects.Text };
  private xpProgressBar!: Phaser.GameObjects.Graphics;

  constructor() {
    super({ key: "PauseMenu" });
  }

  create(): void {
    const { width, height } = this.cameras.main;
  
    // Baggrund
    this.background = createBackground(this, width / 2, height / 2, width, height, 0x000000, 0.7);
    this.background.setDepth(0);
  
    // Resume og Quit knapper
    this.resumeButton = createButton(this, width / 2, height / 2 - 50, "Resume", "#00ff00", () => this.resumeGame());
    this.quitButton = createButton(this, width / 2, height / 2 + 50, "Quit", "#ff0000", () => this.quitGame());
    this.resumeButton.setDepth(1);
    this.quitButton.setDepth(1);
  
    // Initialiser spillerstatistik visning
    this.playerStats = createPlayerStats(this);
  
    // Hent nuværende spillerstatistik fra MyGame
    const gameScene = this.scene.get("MyGame") as MyGame;
    const currentStats = gameScene.getPlayerStats();
    updatePlayerStatsDisplay(this.playerStats, currentStats);
  
    // Lyt til stats ændringer
    gameScene.events.on('statsChanged', (newStats: { [key: string]: number }) => {
      updatePlayerStatsDisplay(this.playerStats, newStats);
    });
  }
  
  

  private resumeGame(): void {
    const gameScene = this.scene.get("MyGame") as MyGame;
    gameScene.togglePause();
    this.scene.stop("PauseMenu");
  }

  private quitGame(): void {
    this.scene.stop("MyGame");
    this.scene.stop("PauseMenu");
    this.scene.start("MainMenu");
  }
}