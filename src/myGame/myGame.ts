import Phaser from 'phaser';
import createPlayer from '../player/createPlayer';
import updatePlayerMovement from '../player/updatePlayerMovement';
import createCamera from '../camera/createCamera';
import createEnemySpawner from '../enemySpawner/createEnemySpawner';
import updateEnemyMovement from '../enemy/updateEnemyMovement';
import createEnemy from '../enemy/createEnemy';
import spawnBullet from '../bullet/spawnBullet';
import createXp from '../xp/createXp';
import bulletCollision from '../bullet/bulletCollision';
import LevelBar from '../ui/LevelBar';
import ReloadBar from '../ui/ReloadBar';
import Timer from '../ui/Timer';
import KillCounter from '../ui/KillCounter';
import { PlayerWithStats } from '../player/PlayerStats';
import HealthBar from '../ui/HealthBar';
import LevelUpMenu from '../levelUpMenu/LevelUpMenu';
import createTiles from '../tiles/createTiles';
import updateTiles from '../tiles/updateTiles';
import { preload } from './preload';
import create from './create';
import update from './update';

export default class MyGame extends Phaser.Scene {
  public player!: PlayerWithStats;
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
  private fireRate: number;
  private damage: number
  private timer!: Timer;
  private killCounter!: KillCounter;
  private levelUpMenu!: LevelUpMenu;
  protected tiles1: Phaser.GameObjects.Group;
  protected tiles2: Phaser.GameObjects.Group;
  protected tiles3: Phaser.GameObjects.Group;
  protected tilePositions: Set<string>;

  constructor() {
    super({ key: 'MyGame' });
  }

  handlePlayerHit(damage: number): void {
    this.player.stats.health = Math.max(this.player.stats.health - damage, 0);
    this.healthBar.updateHealth(this.player.stats.health);

    if (this.player.stats.health <= 0) {
      console.log('Spilleren er død');
      this.scene.launch('GameOverMenu');
      this.scene.pause(); 
      this.scene.bringToTop("GameOverMenu");
    }
  }

    // Tilføj en metode til at hente spillerstatistikker
    public getPlayerStats(): { [key: string]: number } {
      return {
        Health: this.player.stats.health,
        Damage: this.player.stats.damage,
        'Fire Rate': this.player.stats.fireRate,
        Speed: this.player.stats.speed,
      };
    }

  handleLevelUp(): void {
    if (this.player.levelUp) {
      console.log('LevelUpMenu forsøger at åbne');
      if (!this.scene.isActive('LevelUpMenu')) {
        console.log('LevelUpMenu åbnes nu');
        this.scene.pause('MyGame');
        this.scene.launch('LevelUpMenu');
        this.scene.bringToTop('LevelUpMenu');
      }
    }
  }

  handlePowerUpSelection(): void {
    this.scene.resume('MyGame');
    this.scene.stop('LevelUpMenu');
    this.player.levelUp = false;  // Nulstil levelUp-flaget
  }

  preload(): void {
    preload.call(this);
  }

  create(): void {
    create.call(this);
  }

  update(time: number, delta: number): void {
    update.call(this, time, delta);
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
        damage: 1, // Start damage for player
        fireRate: 1850, // Initial fire rate for player
        speed: 70,
        dashSpeed: 10000, // Speed during dash
        dashDuration: 200, // Dash lasts for 200ms
        dashCooldown: 4000, // Cooldown for 1 second
    };

    // Tilføj xpPerBlop, attractionSpeed og magnetRadius som en del af spillerens stats
    this.player.xpPerBlop = 10; // XP pr. blop
    this.player.attractionSpeed = 200; // Speed of attraction
    this.player.magnetRadius = 200; // Distance at which XP blops get attracted

    this.fireRate = this.player.stats.fireRate; // Sæt fireRate til player.fireRate
}

  private initializeUI(): void {
    this.levelBar = new LevelBar(this);
    this.levelBar.create();
  
    // Send player stats fireRate til ReloadBar
    this.reloadBar = new ReloadBar(this, this.player.stats.fireRate);
    this.reloadBar.create();
  
    this.healthBar = new HealthBar(this, this.player);
    this.healthBar.create(this.player.x, this.player.y);
  
    this.timer = new Timer(this);
    this.killCounter = new KillCounter(this);
  }
  

  private initializeInput(): void {
    this.input.keyboard.on('keydown-ESC', () => this.togglePause());
    this.input.keyboard.on('keydown-P', () => this.togglePause());
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

  public toggleLevelUpMenu(): void {
    if (this.isPaused) {
      this.scene.resume('MyGame');
      console.log('Stop LevelUpMenu');
      this.scene.stop('LevelUpMenu');
    } else {
      this.scene.pause('MyGame');
      this.scene.launch('LevelUpMenu');
      this.scene.bringToTop('LevelUpMenu');
    }
    this.isPaused = !this.isPaused;
  }

  public togglePause(): void {
    if (this.isPaused) {
      this.scene.resume('MyGame');
      this.scene.stop('PauseMenu');
    } else {
      this.scene.pause('MyGame');
      this.scene.launch('PauseMenu');
      this.scene.bringToTop("PauseMenu")
    }
    this.isPaused = !this.isPaused;
  }

  public resetGame(): void {
    this.initializePlayer(this.cameras.main.width / 2, this.cameras.main.height / 2);
    this.levelBar.updateLevel(this.player.level);
    this.levelBar.updateXP(this.player.xp, this.player.xpToNextLevel);

    if (this.enemies) {
      this.enemies.clear(true, true);
    }

    if (this.bullets) {
      this.bullets.clear(true, true);
    }

    this.healthBar.updateHealth(this.player.stats.health);
    this.timer = new Timer(this);
    this.killCounter = new KillCounter(this);
  }

  updatePlayerStats(statName: string, value: number): void {
    if (this.player.stats.hasOwnProperty(statName)) {
      this.player.stats[statName] = value;
      this.events.emit('statsChanged', this.player.stats);
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
      const barY = this.player.y + 30;

      this.dashCooldownBar.fillStyle(0xff0000, 1);
      this.dashCooldownBar.fillRect(barX, barY, barWidth, this.dashCooldownHeight);
    }
  }
}
