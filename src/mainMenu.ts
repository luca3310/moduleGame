import Phaser from "phaser";
import MyGame from "./myGame/myGame";

export default class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenu" });
  }

  preload(): void {
    // Eventuelt, load assets til menuen her
  }

  create(): void {
    const titleText = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2 - 100,
      "My Game Title",
      {
        fontSize: "48px",
        color: "#ffffff",
      }
    );
    titleText.setOrigin(0.5);

    const startGameText = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      "Start Game",
      {
        fontSize: "32px",
        color: "#00ff00",
      }
    );
    startGameText.setOrigin(0.5);

    startGameText.setInteractive();
    startGameText.on("pointerdown", () => {
      // Fjern den eksisterende MyGame-scene, hvis den findes
      if (this.scene.get("MyGame")) {
        this.scene.stop("MyGame");
        this.scene.remove("MyGame");
      }

      // Opret en ny instans af MyGame og start den
      const newGame = new MyGame();  
      this.scene.add("MyGame", newGame);
      this.scene.start("MyGame"); // Start MyGame scenen
    });
  }
}