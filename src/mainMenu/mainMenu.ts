import Phaser from "phaser";
import MyGame from "../myGame/myGame";
import { titleStyle, buttonStyle } from "./MainMenuStyles";
import { createButton } from "./Button";

export default class MainMenu extends Phaser.Scene {
  private background!: Phaser.GameObjects.Image; // Baggrundsobjekt

  constructor() {
    super({ key: "MainMenu" });
  }

  preload(): void {
    this.load.image('menuBackground', 'assets/player.jpg'); // Indlæs baggrundsbillede
  }

  create(): void {
    const { width, height } = this.cameras.main;

    // Baggrund
    this.background = this.add.image(width / 2, height / 2, 'menuBackground').setOrigin(0.5).setDisplaySize(width, height);
    
    // Titel
    const titleText = this.add.text(width / 2, height / 2 - 150, "Veganske Klør", titleStyle).setOrigin(0.5).setAlpha(0);
    this.tweens.add({
      targets: titleText,
      alpha: 1,
      duration: 1000,
      ease: 'Power2',
    });

    

    // Start Game-knap
    createButton(this, width / 2, height / 2, "Start Game", buttonStyle, () => {
      this.startGame();
    });

    // Indstillinger-knap
    createButton(this, width / 2, height / 2 + 50, "Settings", buttonStyle, () => {
      this.openSettings();
    });
  }

  private startGame(): void {
    // Stop og fjern MyGame, hvis den allerede er tilføjet
    if (this.scene.get("MyGame")) {
      this.scene.stop("MyGame");
      this.scene.remove("MyGame");
    }
  
    // Start LoaderScene
    this.scene.start("LoaderScene");
  }
  

  private openSettings(): void {
    this.scene.start("SettingsMenu");
  }
}