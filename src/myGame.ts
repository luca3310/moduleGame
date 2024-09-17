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
import KillCounter from "./ui/KillCounter"; // Importer KillCounter klassen

// Udvid Phaser's sprite med ekstra egenskaber for level og XP
type PlayerWithStats = Phaser.Physics.Arcade.Sprite & {
  level: number;
  xp: number;
  xpToNextLevel: number;
  levelUp: boolean; // Tilføjet levelUp-flag
};

class MyGame extends Phaser.Scene {
  private player!: PlayerWithStats;
  private wasdKeys!: { [key: string]: Phaser.Input.Keyboard.Key };
  private leftMouseButton!: Phaser.Input.Pointer;
  private enemies!: Phaser.GameObjects.Group;
  private levelBar!: LevelBar;
  private reloadBar!: ReloadBar;
  private killCounter!: KillCounter; // Tilføj KillCounter instans

  private lastFired: number = 0;
  private fireRate: number = 1000;
  private kills: number = 0;

  constructor() {
    super({ key: "MyGame" });
  }

  preload(): void {
    this.load.image('playerStand', 'assets/player/player_stand.png');
    this.load.image('playerWalk1', 'assets/player/player_walk1.png');
    this.load.image('playerWalk2', 'assets/player/player_walk2.png');
    this.load.image('bullet', 'assets/weapons/Rock.png');
  }

  create(): void {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
  
    createPlayer.call(this, centerX, centerY);
    this.player = this.player as PlayerWithStats;
    this.player.level = 1;
    this.player.xp = 0;
    this.player.xpToNextLevel = 100;
    this.player.levelUp = false;
  
    createCamera.call(this);
    keybinds.call(this, Phaser);
    createEnemy.call(this);
    createEnemySpawner.call(this);
    createBullet.call(this);
    bulletCollision.call(this);
  
    // Opret level bar
    this.levelBar = new LevelBar(this);
    this.levelBar.create();
  
    // Beregn positionen for KillCounter baseret på LevelBar's position og størrelse
    const levelBarHeight = this.levelBar.getHeight(); // Forudsat at du har en metode til at få højden
    const killCounterY = this.levelBar.getY() + levelBarHeight + 10; // 10 pixels margin
  
    // Opret reload bar
    this.reloadBar = new ReloadBar(this);
    this.reloadBar.create();
  
    // Opret kill counter og placér den under level bar
    this.killCounter = new KillCounter(this);
    this.killCounter.setPosition(10, killCounterY); // Sæt positionen for KillCounter
  
    this.leftMouseButton = this.input.activePointer;
    this.events.on('enemyKilled', this.updateKillCounter, this);
  }

  update(time: number, delta: number): void {
    updatePlayerMovement.call(this);
    updateEnemyMovement.call(this, Phaser);

    this.levelBar.updateLevel(this.player.level);
    this.levelBar.updateXP(this.player.xp, this.player.xpToNextLevel);

    if (this.player.xp >= this.player.xpToNextLevel) {
      this.player.level++;
      this.player.xp -= this.player.xpToNextLevel;
      this.player.xpToNextLevel *= 1.5;
      this.player.levelUp = true;
    }

    this.reloadBar.update();

    if (!this.reloadBar.getReloadingStatus() && this.leftMouseButton.isDown) {
      if (time > this.lastFired) {
        spawnBullet.call(this, this.leftMouseButton);
        this.lastFired = time + this.fireRate;
        this.reloadBar.startReload();
      }
    }
  }

  private updateKillCounter(): void {
    this.kills += 1;
    this.killCounter.updateKills(this.kills); // Opdater kill counter
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
  scene: [MyGame], // Tilføj begge scener her
};

// Initialiser spillet
new Phaser.Game(config);