import Phaser from "phaser";
import createPlayer from "./player/createPlayer";
import keybinds from "./keybinds";
import createCamera from "./camera/createCamera";
import updatePlayerMovement from "./player/updatePlayerMovement";
import createEnemySpawner from "./enemySpawner/createEnemySpawner";
import updateEnemyMovement from "./enemy/updateEnemyMovement";
import createEnemy from "./enemy/createEnemy";

class MyGame extends Phaser.Scene {
  private player!: Phaser.GameObjects.Rectangle;
  private wasdKeys!: { [key: string]: Phaser.Input.Keyboard.Key };
  private enemies!: Phaser.GameObjects.Group;

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
  }

  update(): void {
    updatePlayerMovement.call(this);
    updateEnemyMovement.call(this, Phaser);
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
