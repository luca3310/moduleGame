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
import LevelBar  from "./ui/LevelBar" 
import ReloadBar  from "./ui/ReloadBar" 

class MyGame extends Phaser.Scene {
  private player!: any;
  private wasdKeys!: { [key: string]: Phaser.Input.Keyboard.Key };
  private leftMouseButton!: Phaser.Input.Pointer;
  private enemies!: Phaser.GameObjects.Group;
  private levelBar!: LevelBar;
  private reloadBar!: ReloadBar;

  private lastFired: number = 0;
  private fireRate: number = 1000;

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
    createBullet.call(this);
    bulletCollision.call(this);

    this.levelBar = new LevelBar(this);
    this.levelBar.create();

    this.reloadBar = new ReloadBar(this);
    this.reloadBar.create();
  }

  update(time: number, delta: number): void {
    updatePlayerMovement.call(this);
    updateEnemyMovement.call(this, Phaser);

    this.levelBar.updateLevel(this.player.level);
    this.levelBar.updateXP(this.player.xp, this.player.xpToNextLevel);

    this.reloadBar.update();

    if (!this.reloadBar.getReloadingStatus() && this.leftMouseButton.isDown) {
      if (time > this.lastFired) {
        spawnBullet.call(this, this.leftMouseButton);
        this.lastFired = time + this.fireRate;
        this.reloadBar.startReload();
        console.log('Shot fired. Starting reload...');
      }
    }
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
