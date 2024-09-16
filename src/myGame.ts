import Phaser from "phaser";
import createPlayer from "./player/createPlayer";
import updatePlayerMovement from "./player/updatePlayerMovement";
import keybinds from "./keybinds";
import createCamera from "./camera/createCamera";
import createEnemySpawner from "./enemySpawner/createEnemySpawner";
import updateEnemyMovement from "./enemy/updateEnemyMovement";
import createEnemy from "./enemy/createEnemy";
import createBullet from "./bullet/createBullet";
import spawnBullet from "./bullet/spawnBullet";
import bulletCollision from "./bullet/bulletCollision";
import LevelBar from "./ui/LevelBar";
import ReloadBar from "./ui/ReloadBar";

// Udvid Phaser's sprite med ekstra egenskaber for level og XP
type PlayerWithStats = Phaser.Physics.Arcade.Sprite & {
  level: number;
  xp: number;
  xpToNextLevel: number;
};

class MyGame extends Phaser.Scene {
  private player!: PlayerWithStats;  // Cast player til vores udvidede type
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

    // Opret spilleren og tilføj egenskaber for level, XP osv.
    createPlayer.call(this, centerX, centerY);

    // Cast `this.player` til `PlayerWithStats` og initialiser level og XP
    this.player = this.player as PlayerWithStats;
    this.player.level = 1;
    this.player.xp = 0;
    this.player.xpToNextLevel = 100;

    // Opret kamera og keybinds
    createCamera.call(this);
    keybinds.call(this, Phaser);

    // Opret fjender og skudsystem
    createEnemy.call(this);
    createEnemySpawner.call(this);
    createBullet.call(this);
    bulletCollision.call(this);

    // Opret level bar og reload bar
    this.levelBar = new LevelBar(this);
    this.levelBar.create();

    this.reloadBar = new ReloadBar(this);
    this.reloadBar.create();

    // Initialiser musen
    this.leftMouseButton = this.input.activePointer;
  }

  update(time: number, delta: number): void {
    // Opdater spillerens bevægelse
    updatePlayerMovement.call(this);

    // Opdater fjendens bevægelse
    updateEnemyMovement.call(this, Phaser);

    // Opdater level bar og XP for spilleren
    this.levelBar.updateLevel(this.player.level);  // level opdatering
    this.levelBar.updateXP(this.player.xp, this.player.xpToNextLevel);  // XP opdatering

    // Opdater reload bar
    this.reloadBar.update();

    // Håndter skud når venstre musetast er nede
    if (!this.reloadBar.getReloadingStatus() && this.leftMouseButton.isDown) {
      if (time > this.lastFired) {
        spawnBullet.call(this, this.leftMouseButton);
        this.lastFired = time + this.fireRate;
        this.reloadBar.startReload();
      }
    }
  }
}

// Phaser konfiguration
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

// Initialiser spillet
new Phaser.Game(config);
