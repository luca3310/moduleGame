import Phaser from 'phaser';

export default class HealthBar {
  private scene: Phaser.Scene;
  private player: Phaser.Physics.Arcade.Sprite;
  private maxHealth: number;
  private currentHealth: number;
  private healthBar: Phaser.GameObjects.Graphics;
  private barWidth: number;
  private barHeight: number;
  private transitionDuration: number; // Duration for color transition in milliseconds
  private fadeDuration: number; // Duration for fade effect
  private shakeDuration: number; // Duration for shake effect
  private transitionTimer: Phaser.Time.TimerEvent | null;
  private fadeTimer: Phaser.Time.TimerEvent | null;
  private shakeTimer: Phaser.Time.TimerEvent | null;
  private targetColor: number;
  private currentColor: number;

  constructor(scene: Phaser.Scene, player: Phaser.Physics.Arcade.Sprite) {
    this.scene = scene;
    this.player = player;
    this.maxHealth = 100;
    this.currentHealth = 100;
    this.barWidth = 100;
    this.barHeight = 10;
    this.transitionDuration = 500; // Duration for color transition in milliseconds
    this.fadeDuration = 200; // Duration for fade effect in milliseconds
    this.shakeDuration = 300; // Duration for shake effect in milliseconds
    this.transitionTimer = null;
    this.fadeTimer = null;
    this.shakeTimer = null;
    this.targetColor = 0xff0000; // Initial target color (red for damage)
    this.currentColor = 0x00ff00; // Initial color (green for health)

    // Initializing the graphics object
    this.healthBar = this.scene.add.graphics();
    this.drawHealthBar(); // Draw initial health bar
  }

  create(x: number, y: number): void {
    this.updatePosition(x, y);
  }

  updateHealth(newHealth: number): void {
    const oldHealth = this.currentHealth;
    this.currentHealth = Phaser.Math.Clamp(newHealth, 0, this.maxHealth);

    if (this.currentHealth <= 0 && oldHealth > 0) {
      this.startTransitionToBlack(); // Start transition to black when health reaches 0
    } else {
      if (this.currentHealth < oldHealth) {
        this.startShakeEffect(); // Start shake effect when taking damage
        this.startFadeEffect(); // Start fade effect after taking damage
      }
      this.drawHealthBar(); // Redraw health bar after damage
    }
  }

  private startTransitionToBlack(): void {
    // Ensure there's no existing timer
    if (this.transitionTimer) {
      this.transitionTimer.remove();
    }

    // Set the target color to black
    this.targetColor = 0x000000;

    // Start a timed transition to black
    this.transitionTimer = this.scene.time.addEvent({
      delay: this.transitionDuration / 10, // Adjusting delay for smoother transition
      callback: this.updateTransition,
      callbackScope: this,
      repeat: 10 // This ensures the color gradually transitions
    });
  }

  private updateTransition(): void {
    const step = 10; // Adjust step size for transition speed

    // Convert color to Phaser Display Color instances
    const currentColorInstance = Phaser.Display.Color.ValueToColor(this.currentColor || 0x00ff00); // Fallback to default color
    const targetColorInstance = Phaser.Display.Color.ValueToColor(this.targetColor || 0x000000); // Fallback to default color

    // Calculate the interpolated color
    const newColorInstance = Phaser.Display.Color.Interpolate.ColorWithColor(
      currentColorInstance,
      targetColorInstance,
      step,
      step
    );

    // Update the current color
    this.currentColor = Phaser.Display.Color.GetColor(
      newColorInstance.r,
      newColorInstance.g,
      newColorInstance.b
    );

    // Clear and redraw the health bar with the new color
    this.healthBar.clear();
    this.healthBar.fillStyle(this.currentColor, 1); // Use updated color
    this.drawHealthBar();
  }

  private drawHealthBar(): void {
    // Calculate health percentage
    const healthPercentage = this.currentHealth / this.maxHealth;

    // Draw the health bar with current color
    this.healthBar.lineStyle(2, 0x000000, 1); // Black border for health bar
    this.healthBar.fillStyle(this.currentColor, 1); // Use current color for health
    this.healthBar.fillRect(
      -this.barWidth / 2,
      -this.barHeight / 2,
      this.barWidth * healthPercentage,
      this.barHeight
    );

    // Only draw red if health has dropped, but without overwriting color transitions
    if (this.currentHealth < this.maxHealth) {
      this.healthBar.fillStyle(0xff0000, 1); // Red for damage
      this.healthBar.fillRect(
        -this.barWidth / 2 + this.barWidth * healthPercentage,
        -this.barHeight / 2,
        this.barWidth * (1 - healthPercentage),
        this.barHeight
      );
    }
  }

  private startFadeEffect(): void {
    if (this.fadeTimer) {
      this.fadeTimer.remove();
    }

    // Set up a fade effect timer
    this.fadeTimer = this.scene.time.addEvent({
      delay: this.fadeDuration / 10, // Adjust for smoother fade
      callback: this.fadeToColor,
      callbackScope: this,
      repeat: 10
    });
  }

  private fadeToColor(): void {
    // We can fade to any color; here it’s fading the red part
    const newColorInstance = Phaser.Display.Color.Interpolate.ColorWithColor(
      Phaser.Display.Color.ValueToColor(0xff0000),
      Phaser.Display.Color.ValueToColor(0x000000), // Fade to black
      10,
      1
    );

    const fadeColor = Phaser.Display.Color.GetColor(
      newColorInstance.r,
      newColorInstance.g,
      newColorInstance.b
    );

    this.healthBar.fillStyle(fadeColor, 1); // Apply fade color
    this.drawHealthBar();
  }

  private startShakeEffect(): void {
    if (this.shakeTimer) {
      this.shakeTimer.remove();
    }

    // Create a shake effect by rapidly moving the bar
    let elapsed = 0;
    const shakeAmplitude = 5; // Amplitude of shake
    const shakeSpeed = 50; // Speed of shake (in milliseconds)

    this.shakeTimer = this.scene.time.addEvent({
      delay: shakeSpeed,
      callback: () => {
        if (elapsed >= this.shakeDuration) {
          this.healthBar.setPosition(this.healthBar.x, this.healthBar.y); // Reset position
          if (this.shakeTimer) {
            this.shakeTimer.remove();
          }
          return;
        }

        // Random small movements to create shake effect
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
    this.healthBar.setPosition(x, y - 70); // Adjusted to be above the player
  }
}
