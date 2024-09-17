export default class KillCounter {
    private scene: Phaser.Scene;
    private killCount: number;
    private killCounterText: Phaser.GameObjects.Text;
  
    constructor(scene: Phaser.Scene) {
      this.scene = scene;
      this.killCount = 0;
  
      // Opret moderne UI for kill counter til højre for timeren
      this.killCounterText = this.scene.add.text(150, 70, 'Kills: 0', {
        fontSize: '22px',
        color: '#FF4500', // Lys orange for kontrast
        fontFamily: 'Arial',
        padding: { x: 15, y: 10 },
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Transparent baggrund
        shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 5, fill: true },
      }).setDepth(10); // Sørg for, at teksten er ovenpå
      this.killCounterText.setScrollFactor(0);
    }
  
    incrementKillCount(): void {
      this.killCount++;
      this.killCounterText.setText('Kills: ' + this.killCount);
    }
  }