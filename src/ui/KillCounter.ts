export default class KillCounter {
  private scene: Phaser.Scene;
  private killCount: number;
  private killCounterText: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.killCount = 0;

    // Placer kill counteren lidt længere nede (y = 40)
    this.killCounterText = this.scene.add.text(20, 40, 'Kills: 0', {
      fontSize: '22px',
      color: '#FF4500',
      fontFamily: 'Arial',
      padding: { x: 10, y: 5 },
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 5, fill: true },
    }).setDepth(10);

    // Sørg for, at teksten er fastlåst, når kameraet bevæger sig
    this.killCounterText.setScrollFactor(0);
  }

  incrementKillCount(): void {
    this.killCount++;
    this.killCounterText.setText('Kills: ' + this.killCount);
  }
}
