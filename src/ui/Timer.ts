export default class Timer {
    private scene: Phaser.Scene;
    private elapsedTime: number;
    private timerText: Phaser.GameObjects.Text;
  
    constructor(scene: Phaser.Scene) {
      this.scene = scene;
      this.elapsedTime = 0;
  
      // Create a modern UI for the timer below the XP bar (e.g., y = 50 + height of XP bar)
      this.timerText = this.scene.add.text(10, 70, 'Time: 00:00', {
        fontSize: '22px',
        color: '#00FF00', // Bright green for visibility
        fontFamily: 'Arial',
        padding: { x: 15, y: 10 },
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Make background slightly transparent
        shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 5, fill: true },
      }).setDepth(10); // Ensure text is on top
      this.timerText.setScrollFactor(0);
    }
  
    update(delta: number): void {
      this.elapsedTime += delta;
  
      // Convert milliseconds to seconds
      const totalSeconds = Math.floor(this.elapsedTime / 1000);
      
      // Calculate minutes and seconds
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
  
      // Format time as MM:SS
      const formattedTime = `${this.formatNumber(minutes)}:${this.formatNumber(seconds)}`;
  
      // Update the timer on the screen
      this.timerText.setText('Time: ' + formattedTime);
    }
  
    private formatNumber(number: number): string {
      // Ensure two digits (e.g., 05 instead of 5)
      return number < 10 ? '0' + number : number.toString();
    }
  }