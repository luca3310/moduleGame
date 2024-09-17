export default class Timer {
    private scene: Phaser.Scene;
    private elapsedTime: number;
    private timerText!: Phaser.GameObjects.Text; // Brug ! for at indikere, at det vil blive initialiseret
  
    constructor(scene: Phaser.Scene) {
      this.scene = scene;
      this.elapsedTime = 0;
  
      // Opret timerText i create-metoden
      this.createTimerText();
    }
  
    private createTimerText(): void {
      this.timerText = this.scene.add.text(10, 70, 'Time: 00:00', {
        fontSize: '22px',
        color: '#00FF00',
        fontFamily: 'Arial',
        padding: { x: 15, y: 10 },
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 5, fill: true },
      }).setDepth(10);
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