import Phaser from "phaser";
import anotherFile from "./anotherFile";

class MyGame extends Phaser.Scene {
  constructor() {
    super({ key: "MyGame" });
  }

  preload() {}

  create() {
    // Draw a rectangle on the screen
    const rect = this.add.rectangle(400, 300, 200, 150, 0xff0000); // Red rectangle at (400, 300)

    // Add some text to the screen
    anotherFile.call(this);
    // Move the rectangle after 1 second
    this.time.delayedCall(1000, () => {
      rect.x = 200;
      rect.y = 150;
    });
  }

  update() {
    // Any continuous update logic would go here
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#2d2d2d", // Set a background color
  scene: MyGame,
};

new Phaser.Game(config); // Start the game
