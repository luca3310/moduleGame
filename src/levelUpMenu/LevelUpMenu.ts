import Phaser from 'phaser';
import { PlayerWithStats } from '../player/PlayerStats';
import MyGame from 'src/myGame/myGame';

export default class LevelUpMenu extends Phaser.Scene {
  private powerUpOptions!: any[];  // Store random power-ups
  private powerUpContainers!: Phaser.GameObjects.Container[]; // Hold power-up containere
  private background!: Phaser.GameObjects.Image; // Baggrund som billede

  constructor() {
    super({ key: 'LevelUpMenu' });
  }

  create(): void {
    const { width, height } = this.cameras.main;

    // Skab en baggrund med et billede
    this.background = this.add.image(width / 2, height / 2, '') // Sørg for at tilføje 'menuBackground' til din preload
      .setDisplaySize(width, height) // Skaler baggrunden til at dække hele skærmen
      .setScrollFactor(0)
      .setAlpha(0); // Start med at være usynlig

    // Animer baggrunden til at fade ind
    this.tweens.add({
      targets: this.background,
      alpha: 1,
      duration: 500,
      ease: 'Power2'
    });

    // Hent power-ups fra JSON og vælg 3 tilfældige
    const powerUps = this.cache.json.get('powerUps');
    this.powerUpOptions = Phaser.Utils.Array.Shuffle(powerUps).slice(0, 3); // Hent 3 tilfældige power-ups

    // Opret containere til at holde knapperne
    const containerY = height / 2; // Centrér containerne vertikalt
    const buttonSpacing = 80; // Plads mellem knapperne

    // Opret en container til alle knapper
    const buttonContainer = this.add.container(width / 2, containerY);

    this.powerUpOptions.forEach((powerUp, index) => {
      const button = this.createPowerUpButton(powerUp, index);
      buttonContainer.add(button);
      button.y += index * buttonSpacing; // Placer knapperne med mellemrum
    });
  }

  // Opret en funktion til at lave knappen
  private createPowerUpButton(powerUp: any, index: number): Phaser.GameObjects.Container {
    const button = this.add.rectangle(0, 0, 300, 70, 0x4A90E2)
      .setOrigin(0.5)
      .setInteractive()
      .setStrokeStyle(2, 0x2c3e50) // Kontur farve
      .setAlpha(0.9) // Gør knappen let gennemsigtig
      .setDepth(1) // Sørg for at knappen er over baggrunden
      .on('pointerover', () => {
        button.setFillStyle(0x5B99E2); // Hover farve
        button.setScale(1.05); // Forstørrelse ved hover
        this.addGlowEffect(button); // Tilføj glødeffekt
      })
      .on('pointerout', () => {
        button.setFillStyle(0x4A90E2); // Tilbage til original farve
        button.setScale(1); // Tilbage til normal størrelse
        this.removeGlowEffect(button); // Fjern glødeffekt
      })
      .on('pointerdown', () => {
        button.setScale(0.95); // Lidt forminskning ved klik
        this.selectPowerUp(powerUp);
        console.log(powerUp);
        
      })
      .on('pointerup', () => button.setScale(1)); // Tilbage til normal størrelse ved slip

    // Knap baggrund
    const buttonShadow = this.add.rectangle(0, 5, 300, 70, 0x000000, 0.5) // Skygge bag knappen
      .setOrigin(0.5)
      .setDepth(0); // Sørg for at skyggen er bag knappen

    // Tilføj billede
    const image = this.add.image(-100, 0, powerUp.imageKey)
      .setOrigin(0.5)
      .setDisplaySize(50, 50); // Juster størrelsen på billedet

    // Tilføj tekst for titlen
    const titleText = this.add.text(30, -10, `${powerUp.title}`, { 
      fontSize: '24px', 
      color: '#fff', 
      fontFamily: 'Arial',
      align: 'left'
    }).setOrigin(0); // Til venstre for billedet

    // Tilføj tekst for beskrivelsen
    const descriptionText = this.add.text(30, 10, `${powerUp.description}`, { 
      fontSize: '18px', 
      color: '#fff', 
      fontFamily: 'Arial',
      align: 'left'
    }).setOrigin(0); // Til venstre for billedet

    // Opret en container til knappen og dens elementer
    const buttonContainer = this.add.container(0, 0, [buttonShadow, button, image, titleText, descriptionText]);
    return buttonContainer; // Returnér containeren
  }

  // Tilføj en glødeffekt til knappen
  private addGlowEffect(button: Phaser.GameObjects.Rectangle): void {
    const glow = this.add.rectangle(button.x, button.y, button.width + 20, button.height + 20, 0xFFF700, 0.5)
      .setOrigin(0.5)
      .setDepth(-1)
      .setAlpha(0); // Start med at være usynlig

    this.tweens.add({
      targets: glow,
      alpha: 1,
      duration: 300,
      yoyo: true,
      repeat: -1, // Gentag for evigt
      ease: 'Sine.easeInOut'
    });
  }

  // Fjern glødeffekt
  private removeGlowEffect(button: Phaser.GameObjects.Rectangle): void {
    // Find og fjern glødeffekten
    this.children.each(child => {
      if (child instanceof Phaser.GameObjects.Rectangle && child.alpha === 1) {
        child.destroy(); // Slet glødeffekten
      }
    });
  }

  // Håndter power-up valg
  selectPowerUp(powerUp: any): void {
    const gameScene = this.scene.get('MyGame') as MyGame;
    gameScene.updatePlayerStats(powerUp.stat, gameScene.player.stats[powerUp.stat] + powerUp.value);
  
    // Tilføj visuel feedback, f.eks. et lille "stat-up" ikon eller tekst
    gameScene.toggleLevelUpMenu();
  }
  
}