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
  private levelText!: Phaser.GameObjects.Text; // Text to display player level

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

    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      spawnBullet.call(this, pointer);
    });
  }

  update(): void {
    updatePlayerMovement.call(this);
    updateEnemyMovement.call(this, Phaser);

    this.levelText.setText(`Level: ${this.player.level}`);
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
