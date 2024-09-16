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
import LevelBar from "./ui/LevelBar";
import ReloadBar from "./ui/ReloadBar";

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

  preload(): void {
    // Preload assets
    this.load.image('playerStand', 'assets/player_stand.png');
    this.load.image('playerWalk1', 'assets/player_walk1.png');
    this.load.image('playerWalk2', 'assets/player_walk2.png');
  }

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

    // Initialiser mus pointer
    this.leftMouseButton = this.input.activePointer;
  }

  update(time: number, delta: number): void {
    updatePlayerMovement.call(this);
    updateEnemyMovement.call(this, Phaser);

    // Opdater level bar og XP
    this.levelBar.updateLevel(this.player.level);
    this.levelBar.updateXP(this.player.xp, this.player.xpToNextLevel);

    // Opdater reload bar
    this.reloadBar.update();

    // Håndter skydning
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

// Konfigurationen af Phaser spillet
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

// Initialiser Phaser spillet
new Phaser.Game(config);
