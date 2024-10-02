export default class Timer {
  private scene: Phaser.Scene;
  private elapsedTime: number;
  private timerText!: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.elapsedTime = 0;

    // Opret timerText i create-metoden og placer den centreret lidt længere nede (y = 40)
    this.createTimerText();
  }

  private createTimerText(): void {
    const { width } = this.scene.cameras.main;

    // Placer timeren i midten og lidt længere nede
    this.timerText = this.scene.add.text(width / 2, 40, 'Time: 00:00', {
      fontSize: '22px',
      color: '#00FF00',
      fontFamily: 'Arial',
      padding: { x: 10, y: 5 },
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 5, fill: true },
    }).setOrigin(0.5, 0).setDepth(10);

    this.timerText.setScrollFactor(0);
  }

  update(delta: number): void {
    this.elapsedTime += delta;

    const totalSeconds = Math.floor(this.elapsedTime / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${this.formatNumber(minutes)}:${this.formatNumber(seconds)}`;
    this.timerText.setText('Time: ' + formattedTime);
  }

  private formatNumber(number: number): string {
    return number < 10 ? '0' + number : number.toString();
  }
}
