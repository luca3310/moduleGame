import Phaser from "phaser";
import createPlayer from "./player/createPlayer";
import keybinds from "./keybinds";
import createCamera from "./camera/createCamera";
import updatePlayerMovement from "./player/updatePlayerMovement";
import createEnemySpawner from "./enemySpawner/createEnemySpawner";
import updateEnemyMovement from "./enemy/updateEnemyMovement";
import createEnemy from "./enemy/createEnemy";
import createBullet from "./bullet/createBullet";
import spawnBullet from "./bullet/spawnBullet";
import bulletCollision from "./bullet/bulletCollision";

class MyGame extends Phaser.Scene {
  private player!: any;
  private wasdKeys!: { [key: string]: Phaser.Input.Keyboard.Key };
  private enemies!: Phaser.GameObjects.Group;
  private levelBarBackground!: Phaser.GameObjects.Graphics; // Background of the level bar
  private levelBar!: Phaser.GameObjects.Graphics; // Dynamic level bar
  private levelTextInsideBar!: Phaser.GameObjects.Text; // Text inside the bar

  constructor() {
    super({ key: "MyGame" });
  }

  preload(): void {}

  create(): void {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    createPlayer.call(this, centerX, centerY);

    createCamera.call(this);

    keybinds.call(this, Phaser);

    createEnemy.call(this);
    createEnemySpawner.call(this);

    // Create bullets
    createBullet.call(this);

    // Enable bullet collision with enemies
    bulletCollision.call(this);

    // Handle bullet spawning on pointer down
    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      spawnBullet.call(this, pointer);
    });

    // Create the level bar background and the dynamic bar
    this.levelBarBackground = this.add.graphics();
    this.levelBarBackground.fillStyle(0x444444, 1); // Gray color
    this.levelBarBackground.fillRect(10, 40, this.cameras.main.width - 20, 20); // Position and size
    this.levelBarBackground.setScrollFactor(0); // Ensures bar stays on screen
    
    this.levelBar = this.add.graphics();
    this.levelBar.fillStyle(0x0000ff, 1); // Blue color
    this.levelBar.fillRect(10, 40, this.cameras.main.width - 20, 20); // Initial size (full)
    this.levelBar.setScrollFactor(0); // Ensures bar stays on screen

    // Create level text inside the bar
    this.levelTextInsideBar = this.add.text(this.cameras.main.width / 2, 45, `Level: 1`, {
      fontSize: "18px",
      align: "center",
    });
    this.levelTextInsideBar.setOrigin(0.5, 0.5); // Center text in the bar
    this.levelTextInsideBar.setScrollFactor(0); // Ensures text stays on screen
  }

  update(): void {
    updatePlayerMovement.call(this);
    updateEnemyMovement.call(this, Phaser);

    // Update level text
    this.levelTextInsideBar.setText(`Level: ${this.player.level}`);

    // Calculate XP progress as a percentage
    const xpProgress = this.player.xp / this.player.xpToNextLevel;

    // Update the dynamic level bar width to reflect XP progress
    this.levelBar.clear(); // Clear previous bar rendering
    this.levelBar.fillStyle(0x0000ff, 1); // Blue color for the bar
    this.levelBar.fillRect(10, 40, (this.cameras.main.width - 20) * xpProgress, 20); // Scale based on XP
    this.levelBar.setScrollFactor(0); // Ensures bar stays on screen
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#2d2d2d",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  scene: MyGame,
};

new Phaser.Game(config);