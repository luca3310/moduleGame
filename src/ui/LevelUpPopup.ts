import Phaser from "phaser";

export default class LevelUpPopup {
  private popup!: Phaser.GameObjects.Container;
  private timerEvent?: Phaser.Time.TimerEvent;
  private displayTime: number = 8000; // 8 seconds

  constructor(private scene: Phaser.Scene) {}

  create(level: number) {
    // Ensure no previous popup is shown
    if (this.popup) {
      this.popup.destroy();
    }

    // Create a container for the popup
    this.popup = this.scene.add.container();
    
    // Background
    const background = this.scene.add.graphics();
    background.fillStyle(0x000000, 0.8);
    background.fillRect(0, 0, 300, 150);
    background.setAlpha(0.8);
    
    // Box for power-ups
    const box = this.scene.add.graphics();
    box.fillStyle(0xffffff, 1);
    box.fillRect(10, 10, 280, 130);
    box.setAlpha(0.9);
    
    // Add background and box to the popup container
    this.popup.add(background);
    this.popup.add(box);

    // Text
    const levelUpText = this.scene.add.text(150, 40, `Level Up! Level ${level}`, {
      fontSize: '24px',
      fontFamily: 'Roboto, sans-serif',
      color: '#ffffff',
      align: 'center'
    });
    levelUpText.setOrigin(0.5, 0.5);

    // Example power-ups
    const powerUpText = this.scene.add.text(150, 80, `Choose Power-Up:`, {
      fontSize: '18px',
      fontFamily: 'Roboto, sans-serif',
      color: '#ffffff',
      align: 'center'
    });
    powerUpText.setOrigin(0.5, 0.5);

    // Add texts to the popup container
    this.popup.add(levelUpText);
    this.popup.add(powerUpText);

    // Position the popup in the center of the screen
    this.popup.setPosition(
      this.scene.cameras.main.width / 2 - this.popup.width / 2,
      this.scene.cameras.main.height / 2 - this.popup.height / 2
    );

    // Set timer to hide popup
    this.timerEvent = this.scene.time.addEvent({
      delay: this.displayTime,
      callback: () => this.destroy(),
      callbackScope: this
    });
  }

  destroy() {
    if (this.popup) {
      this.popup.destroy();
    }
    if (this.timerEvent) {
      this.timerEvent.remove(false);
    }
  }
}