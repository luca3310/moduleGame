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
import bulletMovement from "./bullet/BulletMovement";
import bulletCollision from "./bullet/bulletCollision";
import LevelBar from "./ui/LevelBar";
import ReloadBar from "./ui/ReloadBar";
import Timer from "./ui/Timer";
import KillCounter from "./ui/KillCounter";
import { PlayerWithStats } from "./player/PlayerStats";
import HealthBar from "./ui/HealthBar";
import LevelUpMenu from "./LevelUpMenu";

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
  private bullets!: Phaser.GameObjects.Group;
  private levelBar!: LevelBar;
  private reloadBar!: ReloadBar;
  private healthBar!: HealthBar;
  private isPaused: boolean = false;
  private lastFired: number = 0;
  private fireRate: number = 1000;
  private timer!: Timer;
  private killCounter!: KillCounter;
  private levelUpMenu!: LevelUpMenu; // Ensure this is declared


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

    this.load.audio("ambience", "assets/Music/Zombies.mp3");
    this.load.json('powerUps', 'assets/powerUps.json');
    // You can load other assets like images here
  }

  create(): void {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
  
    this.bullets = this.add.group({
      classType: Phaser.Physics.Arcade.Sprite,
      runChildUpdate: true,
    });
  
    this.initializePlayer(centerX, centerY); // Opretter spiller og sundhedsbar
    this.initializeUI();
    this.initializeInput();
  
    createCamera.call(this);
    keybinds.call(this, Phaser);
    createEnemy.call(this);
    createEnemySpawner.call(this);
    createBullet.call(this);
    bulletCollision.call(this);
  
    this.leftMouseButton = this.input.activePointer;
    this.dashCooldownBar = this.add.graphics();
  
 

    // Play background music
    const music = this.sound.add("ambience", {
      loop: true,
      volume: 0.5,
    });
    music.play();
  }
  update(time: number, delta: number): void {
    if (this.isPaused) return;

    updatePlayerMovement.call(this);
    updateEnemyMovement.call(this);
    this.updateUI();
    this.handleBulletFiring(time);
    this.updateDashCooldownBar(time);
    this.timer.update(delta);

    // Sørg for, at sundhedsbaren følger spilleren
    if (this.healthBar) {
      this.healthBar.updatePosition();
    }

    if (this.player.xp >= this.player.xpToNextLevel) {
      this.player.level++;
      this.player.xp -= this.player.xpToNextLevel;
      this.player.xpToNextLevel *= 1.5;
      this.player.levelUp = true;
  
      // Vis level-up menu
      this.levelUpMenu.show(this.player.level);
    }
  }

  private initializePlayer(centerX: number, centerY: number): void {
    createPlayer.call(this, centerX, centerY);
    this.player = this.player as PlayerWithStats;
    this.player.level = 1;
    this.player.xp = 0;
    this.player.xpToNextLevel = 100;
    this.player.levelUp = false;
    this.player.stats = {
      health: 100,
      damage: 1,
      fireRate: 1000,
      speed: 160,
    };
  }

  private initializeUI(): void {
    this.levelBar = new LevelBar(this);
    this.levelBar.create();

    this.reloadBar = new ReloadBar(this);
    this.reloadBar.create();

    this.healthBar = new HealthBar(this, this.player);
    this.healthBar.create(); // Opret sundhedsbaren og knyt den til spilleren

    this.timer = new Timer(this);
    this.killCounter = new KillCounter(this);
  }

  private initializeInput(): void {
    this.input.keyboard.on("keydown-ESC", () => this.togglePause());
    this.input.keyboard.on("keydown-P", () => this.togglePause());
  }

  private updateUI(): void {
    if (this.levelBar) {
      this.levelBar.updateLevel(this.player.level);
      this.levelBar.updateXP(this.player.xp, this.player.xpToNextLevel);
    }
  
    if (this.reloadBar) {
      this.reloadBar.update();
    }
  
    if (this.healthBar) {
      this.healthBar.updateHealth(this.player.stats.health);
    }
  
  }

  private handleBulletFiring(time: number): void {
    if (!this.reloadBar.getReloadingStatus() && this.leftMouseButton.isDown) {
      if (time > this.lastFired) {
        spawnBullet.call(this, this.leftMouseButton);
        this.lastFired = time + this.fireRate;
        this.reloadBar.startReload();
      }
    }
  }

  public togglePause(): void {
    if (this.isPaused) {
      console.log("Resuming game and stopping pause menu");
      this.scene.resume("MyGame");
      this.scene.stop("PauseMenu");
    } else {
      console.log("Pausing game and launching pause menu");
      this.scene.pause("MyGame");
      this.scene.launch("PauseMenu");
    }
    this.isPaused = !this.isPaused;
  }

  public resetGame(): void {
    this.initializePlayer(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
    );
    this.levelBar.updateLevel(this.player.level);
    this.levelBar.updateXP(this.player.xp, this.player.xpToNextLevel);

    if (this.enemies) {
      this.enemies.clear(true, true);
    }

    if (this.bullets) {
      this.bullets.clear(true, true);
    }

    this.reloadBar.reset();
    this.healthBar.updateHealth(this.player.stats.health);
    this.timer = new Timer(this); // Reset timer
    this.killCounter = new KillCounter(this); // Reset kill counter
  }

  updatePlayerStats(statName: string, value: number): void {
    if (this.player.stats.hasOwnProperty(statName)) {
      this.player.stats[statName] = value;
      this.events.emit("statsChanged", this.player.stats);
    }
  }

  public incrementKillCount(): void {
    if (this.killCounter) {
      this.killCounter.incrementKillCount();
    }
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
