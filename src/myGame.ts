// MyGame.ts
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
import HealthBar from "./ui/HealthBar";
import PauseMenu from "./PauseMenu";

type PlayerWithStats = Phaser.Physics.Arcade.Sprite & {
  level: number;
  xp: number;
  xpToNextLevel: number;
  levelUp: boolean;
  health?: number;
};

export default class MyGame extends Phaser.Scene {
  private player!: PlayerWithStats;
  private wasdKeys!: { [key: string]: Phaser.Input.Keyboard.Key };
  private leftMouseButton!: Phaser.Input.Pointer;
  private isDashing: boolean = false;
  private dashEndTime: number = 0;
  private dashCooldownEnd: number = 0;
  private dashCooldownBar!: Phaser.GameObjects.Graphics;
  private dashCooldownMaxWidth: number = 100;
  private dashCooldownHeight: number = 5;
  private enemies!: Phaser.GameObjects.Group;
  private levelBar!: LevelBar;
  private reloadBar!: ReloadBar;
  private healthBar!: HealthBar;
  private isPaused: boolean = false;
  private lastFired: number = 0;
  private fireRate: number = 1000;

  constructor() {
    super({ key: "MyGame" });
  }

  preload(): void {
    this.load.image("playerStand", "assets/Player/player_stand.png");
    this.load.image("playerWalk1", "assets/Player/player_walk1.png");
    this.load.image("playerWalk2", "assets/Player/player_walk2.png");
    this.load.image("bullet", "assets/weapons/rock.png");
    this.load.image("enemyStand", "assets/Enemy/zombie_stand.png");
    this.load.image("enemyWalk1", "assets/Enemy/zombie_walk1.png");
    this.load.image("enemyWalk2", "assets/Enemy/zombie_walk2.png");
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
    this.player.health = 100; // Initial sundhed

    createCamera.call(this);
    keybinds.call(this, Phaser);
    createEnemy.call(this);
    createEnemySpawner.call(this);
    createBullet.call(this);
    bulletCollision.call(this);

    this.input.keyboard.on("keydown-ESC", () => this.togglePause());
    this.input.keyboard.on("keydown-P", () => this.togglePause());

    this.levelBar = new LevelBar(this);
    this.levelBar.create();

    this.reloadBar = new ReloadBar(this);
    this.reloadBar.create();

    this.healthBar = new HealthBar(this, this.player);
    this.healthBar.create();

    this.leftMouseButton = this.input.activePointer;
    this.dashCooldownBar = this.add.graphics();
  }

  update(time: number, delta: number): void {
    if (this.isPaused) return;

    updatePlayerMovement.call(this);
    updateEnemyMovement.call(this);

    this.levelBar.updateLevel(this.player.level);
    this.levelBar.updateXP(this.player.xp, this.player.xpToNextLevel);

    if (this.player.xp >= this.player.xpToNextLevel) {
      this.player.level++;
      this.player.xp -= this.player.xpToNextLevel;
      this.player.xpToNextLevel *= 1.5;
      this.player.levelUp = true;
    }

    this.reloadBar.update();
    this.healthBar.update(); // Opdater healthbar position

    if (!this.reloadBar.getReloadingStatus() && this.leftMouseButton.isDown) {
      if (time > this.lastFired) {
        spawnBullet.call(this, this.leftMouseButton);
        this.lastFired = time + this.fireRate;
        this.reloadBar.startReload();
      }
    }

    this.updateDashCooldownBar(time);
  }

  public togglePause(): void {
    if (this.isPaused) {
      console.log("Resuming game and stopping pause menu");
      this.scene.resume("MyGame");
      this.scene.stop("PauseMenu");
      this.isPaused = false;
    } else {
      console.log("Pausing game and launching pause menu");
      this.scene.pause("MyGame");
      this.scene.launch("PauseMenu");
      this.isPaused = true;
    }
  }

  public resetGame(): void {
    this.player.level = 1;
    this.player.xp = 0;
    this.player.xpToNextLevel = 100;
    this.levelBar.updateLevel(this.player.level);
    this.levelBar.updateXP(this.player.xp, this.player.xpToNextLevel);
    this.player.health = 100; // Reset health

    this.healthBar.updateHealth(this.player.health); // Reset health bar
    this.reloadBar.reset();
  }

  private updateDashCooldownBar(currentTime: number): void {
    const remainingCooldown = this.dashCooldownEnd - currentTime;
    const totalCooldown = this.dashCooldownEnd - this.dashEndTime;

    this.dashCooldownBar.clear();

    if (remainingCooldown > 0) {
      const cooldownPercentage = remainingCooldown / totalCooldown;
      const barWidth = this.dashCooldownMaxWidth * cooldownPercentage;

      const barX = this.player.x - this.dashCooldownMaxWidth / 2;
      const barY = this.player.y + 40;

      this.dashCooldownBar.fillStyle(0xffffff, 1);
      this.dashCooldownBar.fillRect(
        barX,
        barY,
        barWidth,
        this.dashCooldownHeight,
      );
    }
  }
}
