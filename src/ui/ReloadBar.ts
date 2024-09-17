import Phaser from "phaser";

export default class ReloadBar {
  reset() {
    throw new Error("Method not implemented.");
  }
  private reloadBarBackground!: Phaser.GameObjects.Graphics;
  private reloadBar!: Phaser.GameObjects.Graphics;
  private isReloading: boolean = false;
  private reloadTime: number = 1000;
  private reloadStartTime: number = 0;

  constructor(private scene: Phaser.Scene) {}

  create() {
    const { width, height } = this.scene.cameras.main;

    this.reloadBarBackground = this.scene.add.graphics();
    this.reloadBarBackground.fillStyle(0x333333, 1);
    this.reloadBarBackground.fillRect(10, height - 30, width - 20, 20);
    this.reloadBarBackground.setScrollFactor(0);
    this.reloadBarBackground.setDepth(1); // Set depth for background

    this.reloadBar = this.scene.add.graphics();
    this.reloadBar.fillStyle(0x00ff00, 1);
    this.reloadBar.fillRect(10, height - 30, 0, 20);
    this.reloadBar.setScrollFactor(0);
    this.reloadBar.setDepth(2); // Set depth for reload bar
  }

  startReload() {
    this.isReloading = true;
    this.reloadStartTime = this.scene.time.now;
  }

  update() {
    if (this.isReloading) {
      const elapsed = this.scene.time.now - this.reloadStartTime;
      const reloadProgress = 1 - Math.min(elapsed / this.reloadTime, 1);

      this.reloadBar.clear();
      this.reloadBar.fillStyle(0x00ff00, 1);
      this.reloadBar.fillRect(10, this.scene.cameras.main.height - 30, (this.scene.cameras.main.width - 20) * reloadProgress, 20);

      if (reloadProgress === 0) {
        this.isReloading = false;
        this.reloadBar.clear();
        this.reloadBar.fillStyle(0x00ff00, 1);
        this.reloadBar.fillRect(10, this.scene.cameras.main.height - 30, this.scene.cameras.main.width - 20, 20);
      }
    }
  }

  getReloadingStatus(): boolean {
    return this.isReloading;
  }
}