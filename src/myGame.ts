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
  levelUp: boolean; // Tilføjet levelUp-flag
};

class MyGame extends Phaser.Scene {
  private player!: PlayerWithStats;
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
    // Preload assets med de korrekte filnavne
    this.load.image('playerStand', 'assets/Player/player_stand.png');
    this.load.image('playerWalk1', 'assets/Player/player_walk1.png');
    this.load.image('playerWalk2', 'assets/Player/player_walk2.png');
    this.load.image('bullet', 'assets/weapons/rock.png');
  
    // Ændret fra 'enemy' til 'zombie' for at matche filnavne
    this.load.image('enemyStand', 'assets/Enemy/zombie_stand.png');
    this.load.image('enemyWalk1', 'assets/Enemy/zombie_walk1.png');
    this.load.image('enemyWalk2', 'assets/Enemy/zombie_walk2.png');
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
    this.player.levelUp = false; // Initialiser levelUp-flaget

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
    updatePlayerMovement.call(this);
    updateEnemyMovement.call(this);

    // Opdater level bar og XP for spilleren
    this.levelBar.updateLevel(this.player.level);
    this.levelBar.updateXP(this.player.xp, this.player.xpToNextLevel);

    // Tjek for XP og opgradér level hvis nødvendigt
    if (this.player.xp >= this.player.xpToNextLevel) {
      this.player.level++;
      this.player.xp -= this.player.xpToNextLevel; // Fjern den brugte XP
      this.player.xpToNextLevel *= 1.5; // Forøg kravene for næste level
      this.player.levelUp = true; // Sæt flaget til true, så popup'en vises
    }

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