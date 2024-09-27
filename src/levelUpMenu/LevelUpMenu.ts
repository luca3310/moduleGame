import Phaser from 'phaser';
import { PlayerWithStats } from '../player/PlayerStats';
import MyGame from 'src/myGame/myGame';

export default class LevelUpMenu extends Phaser.Scene {
  private powerUpOptions!: any[];  // Store random power-ups
  private powerUpContainers!: Phaser.GameObjects.Container[]; // Hold power-up containere
  private background!: Phaser.GameObjects.Image; // Baggrund som billede
  private gameScene!: MyGame; // Reference til MyGame scenen
  private isMenuOpen: boolean = false; // Tjek om menuen allerede er åben

  constructor() {
    super({ key: 'LevelUpMenu' });
  }

  create(): void {
    console.log('LevelUpMenu create() called');

    const { width, height } = this.cameras.main;

    // Skab en baggrund
    this.background = this.add.image(width / 2, height / 2, 'menuBackground') 
      .setDisplaySize(width, height)
      .setScrollFactor(0)
      .setAlpha(0);

    // Fade-in animation til baggrunden
    this.tweens.add({
      targets: this.background,
      alpha: 1,
      duration: 500,
      ease: 'Power2'
    });

    // Hent power-ups fra JSON og vælg 3 tilfældige
    const powerUps = this.cache.json.get('powerUps');
    this.powerUpOptions = Phaser.Utils.Array.Shuffle(powerUps).slice(0, 3);

    // Container til knapper
    const buttonContainer = this.add.container(width / 2, height / 2);

    this.powerUpOptions.forEach((powerUp, index) => {
      const button = this.createPowerUpButton(powerUp, index);
      buttonContainer.add(button);
      button.y += index * 80; // Plads mellem knapperne
    });

    this.gameScene = this.scene.get('MyGame') as MyGame;
  }

  private createPowerUpButton(powerUp: any, index: number): Phaser.GameObjects.Container {
    const button = this.add.rectangle(0, 0, 300, 70, 0x4A90E2)
      .setOrigin(0.5)
      .setInteractive()
      .setStrokeStyle(2, 0x2c3e50)
      .setAlpha(0.9)
      .on('pointerover', () => {
        button.setFillStyle(0x5B99E2);
        button.setScale(1.05);
        this.addGlowEffect(button);
      })
      .on('pointerout', () => {
        button.setFillStyle(0x4A90E2);
        button.setScale(1);
        this.removeGlowEffect(button);
      })
      .on('pointerdown', () => {
        button.disableInteractive();
        button.setScale(0.95);
        this.selectPowerUp(powerUp);
      })
      .on('pointerup', () => button.setScale(1));

    const buttonShadow = this.add.rectangle(0, 5, 300, 70, 0x000000, 0.5)
      .setOrigin(0.5);

    const image = this.add.image(-100, 0, powerUp.imageKey)
      .setOrigin(0.5)
      .setDisplaySize(50, 50);

    const text = this.add.text(20, 0, powerUp.title, { fontSize: '18px', color: '#fff' })
      .setOrigin(0.5);

    return this.add.container(0, 0, [buttonShadow, button, image, text]);
  }

  private selectPowerUp(powerUp: any): void {
    // Håndter den valgte power-up
    this.gameScene.handlePowerUpSelection(); 
    console.log('Power-up valgt:', powerUp);
  }

  // Sørg for at nulstille "isMenuOpen" når menuen lukkes
  shutdown(): void {
    console.log('LevelUpMenu shutdown');
    this.isMenuOpen = false;  // Nulstil flagget, så menuen kan åbnes igen
  }

  private addGlowEffect(button: Phaser.GameObjects.Rectangle): void {
    // Glødeffekt på hover
    this.tweens.add({
      targets: button,
      alpha: 1,
      duration: 200,
      ease: 'Power2'
    });
  }

  private removeGlowEffect(button: Phaser.GameObjects.Rectangle): void {
    // Fjern glødeffekt
    this.tweens.add({
      targets: button,
      alpha: 0.9,
      duration: 200,
      ease: 'Power2'
    });
  }
}
