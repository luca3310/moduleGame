import Phaser from 'phaser';

export default class HealthBar {
  private scene: Phaser.Scene;
  private player: Phaser.Physics.Arcade.Sprite & { stats: { health: number } };
  private maxHealth: number;
  private currentHealth: number;
  private healthBar: Phaser.GameObjects.Graphics;
  private barWidth: number;
  private barHeight: number;
  private regenInterval: number; // Interval for health regeneration
  private regenTimer: Phaser.Time.TimerEvent | null;
  private transitionTimer: Phaser.Time.TimerEvent | null;
  private shakeTimer: Phaser.Time.TimerEvent | null;
  private targetColor: number;
  private currentColor: number;

  constructor(scene: Phaser.Scene, player: Phaser.Physics.Arcade.Sprite & { stats: { health: number } }) {
    this.scene = scene;
    this.player = player;
    this.maxHealth = player.stats.health;
    this.currentHealth = player.stats.health;
    this.barWidth = this.maxHealth;
    this.barHeight = 10;
    this.regenInterval = 1000;
    this.transitionTimer = null;
    this.shakeTimer = null;
    this.regenTimer = null;
    this.targetColor = 0xff0000;
    this.currentColor = 0x00ff00;

    // Initializing the graphics object
    this.healthBar = this.scene.add.graphics();
    this.drawHealthBar();

    // Start regeneration timer
    this.startRegenHealth();
  }

  create(x: number, y: number): void {
    this.updatePosition(x, y);
  }

  updateHealth(newHealth: number): void {
    const oldHealth = this.currentHealth;
    this.currentHealth = Phaser.Math.Clamp(newHealth, 0, this.maxHealth);

    // Update player stats to match current health
    this.player.stats.health = this.currentHealth;

    if (this.currentHealth <= 0 && oldHealth > 0) {
      this.startTransitionToBlack();
    } else {
      if (this.currentHealth < oldHealth) {
        this.startShakeEffect();
      }
      this.drawHealthBar();
    }
  }

  private startRegenHealth(): void {
    if (this.regenTimer) {
      this.regenTimer.remove();
    }

    this.regenTimer = this.scene.time.addEvent({
      delay: this.regenInterval,
      callback: () => {
        if (this.currentHealth < this.maxHealth) {
          this.updateHealth(this.currentHealth + 1);
        }
      },
      callbackScope: this,
      loop: true
    });
  }

  updateMaxHealth(newMaxHealth: number): void {
    this.maxHealth = newMaxHealth;
    this.currentHealth = Phaser.Math.Clamp(this.currentHealth, 0, this.maxHealth);
    this.barWidth = this.maxHealth; // Update bar width to reflect new max health
    this.drawHealthBar();
  }

  private startTransitionToBlack(): void {
    if (this.transitionTimer) {
      this.transitionTimer.remove();
    }

    this.transitionTimer = this.scene.time.addEvent({
      delay: 50,
      callback: this.updateTransition,
      callbackScope: this,
      repeat: 10
    });
  }

  private updateTransition(): void {
    const step = 10;
    const currentColorInstance = Phaser.Display.Color.ValueToColor(this.currentColor);
    const targetColorInstance = Phaser.Display.Color.ValueToColor(0x000000);

    const newColorInstance = Phaser.Display.Color.Interpolate.ColorWithColor(
      currentColorInstance,
      targetColorInstance,
      step,
      step
    );

    this.currentColor = Phaser.Display.Color.GetColor(
      newColorInstance.r,
      newColorInstance.g,
      newColorInstance.b
    );

    this.drawHealthBar();
  }

  private drawHealthBar(): void {
    const healthPercentage = this.currentHealth / this.maxHealth;

    this.healthBar.clear();
    this.healthBar.lineStyle(2, 0x000000, 1);
    this.healthBar.fillStyle(this.currentColor, 1);
    this.healthBar.fillRect(
      -this.barWidth / 2,
      -this.barHeight / 2,
      this.barWidth * healthPercentage,
      this.barHeight
    );

    if (this.currentHealth < this.maxHealth) {
      this.healthBar.fillStyle(0xff0000, 1);
      this.healthBar.fillRect(
        -this.barWidth / 2 + this.barWidth * healthPercentage,
        -this.barHeight / 2,
        this.barWidth * (1 - healthPercentage),
        this.barHeight
      );
    }
  }

  private startShakeEffect(): void {
    if (this.shakeTimer) {
      this.shakeTimer.remove();
    }

    let elapsed = 0;
    const shakeAmplitude = 5;
    const shakeSpeed = 50;

    this.shakeTimer = this.scene.time.addEvent({
      delay: shakeSpeed,
      callback: () => {
        if (elapsed >= 300) {
          this.healthBar.setPosition(this.healthBar.x, this.healthBar.y);
          if (this.shakeTimer) {
            this.shakeTimer.remove();
          }
          return;
        }

        this.healthBar.setPosition(
          this.healthBar.x + Phaser.Math.Between(-shakeAmplitude, shakeAmplitude),
          this.healthBar.y + Phaser.Math.Between(-shakeAmplitude, shakeAmplitude)
        );

        elapsed += shakeSpeed;
      },
      callbackScope: this,
      loop: true
    });
  }

  updatePosition(x: number, y: number): void {
    this.healthBar.setPosition(x, y - 70);
  }
}
