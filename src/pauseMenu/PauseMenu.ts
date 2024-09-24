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
    
    // Sæt dybden af baggrunden
    this.background.setDepth(0); // Eller en lavere værdi
  
    // Resume og Quit knapper
    this.resumeButton = createButton(this, width / 2, height / 2 - 50, "Resume", "#00ff00", () => this.resumeGame());
    this.quitButton = createButton(this, width / 2, height / 2 + 50, "Quit", "#ff0000", () => this.quitGame());
  
    // Sæt dybden for knapperne
    this.resumeButton.setDepth(1); // Højere værdi end baggrunden
    this.quitButton.setDepth(1); // Højere værdi end baggrunden
  
    // Player stats
    this.playerStats = createPlayerStats(this);
    
  
    // Lyt til stats ændringer
    this.events.on('statsChanged', (newStats: { [key: string]: number }) => {
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