import Phaser from 'phaser';
import Button from './button';

export default class LevelUpMenu {
    private scene: Phaser.Scene;
    private menu!: Phaser.GameObjects.Container;
    private levelText!: Phaser.GameObjects.Text;
    private powerUpOptions: Phaser.GameObjects.Container[] = [];
    private interactiveGroup!: Phaser.GameObjects.Group;
    private levelQueue: number[] = []; // Kø til level-ups

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    preload(): void {
        this.scene.load.json('powerUps', 'assets/powerUps.json'); // Loader power-ups data
    }

    create(): void {
        // Opretter menu-containeren
        this.menu = this.scene.add.container(this.scene.cameras.main.width / 2, this.scene.cameras.main.height / 2);
        this.menu.setScrollFactor(1); // Holder menuen fast på skærmen

        // Initialiserer interactiveGroup
        this.interactiveGroup = this.scene.add.group();

        // Tilføjer en semi-transparent baggrund med gradient
        const canvasWidth = 800;
        const canvasHeight = 500;
    
        const canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        const ctx = canvas.getContext('2d')!;
        
        const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
        gradient.addColorStop(0, '#a3d9a5'); // Startfarve
        gradient.addColorStop(1, '#4caf50'); // Slutfarve
    
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
        if (this.scene.textures.exists('gradientBackground')) {
            this.scene.textures.remove('gradientBackground');
        }
    
        const texture = this.scene.textures.createCanvas('gradientBackground', canvasWidth, canvasHeight);
        texture.context.drawImage(canvas, 0, 0);
        texture.refresh();
    
        const background = this.scene.add.image(0, 0, 'gradientBackground');
        background.setOrigin(0.5, 0.5);
        background.setDisplaySize(canvasWidth, canvasHeight);
        this.menu.add(background);
    
        // Tilføjer "Level Up!"-tekst
        this.levelText = this.scene.add.text(0, -200, "", {
            fontSize: '36px',
            color: '#ffffff',
            fontFamily: 'Arial',
            align: 'center',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5);
        this.menu.add(this.levelText);
    
        const optionWidth = 300;
        const optionHeight = 100;
        const spacing = 50;
    
        const powerUpData = this.scene.cache.json.get('powerUps');
    
        if (!powerUpData || !Array.isArray(powerUpData)) {
            console.error('Kunne ikke indlæse power-up data, eller data er ikke et array.');
            return;
        }
    
        Phaser.Utils.Array.Shuffle(powerUpData);
        const numOptions = Math.min(3, powerUpData.length);
    
        for (let i = 0; i < numOptions; i++) {
            const data = powerUpData[i];
            const option = this.scene.add.container();
            
            const optionGraphics = this.scene.add.graphics();
            optionGraphics.fillStyle(0x333333, 0.9);
            optionGraphics.fillRoundedRect(0, 0, optionWidth, optionHeight, 10);
            option.add(optionGraphics);
            
            const image = this.scene.add.image(50, optionHeight / 2, data.imageKey);
            image.setDisplaySize(100, 100);
            option.add(image);
            
            const title = this.scene.add.text(150, optionHeight / 2 - 40, data.title, {
                fontSize: '22px',
                color: '#ffffff',
                fontFamily: 'Arial',
                align: 'left'
            }).setOrigin(0, 0.5);
            option.add(title);
            
            const description = this.scene.add.text(150, optionHeight / 2 + 10, data.description, {
                fontSize: '16px',
                color: '#cccccc',
                fontFamily: 'Arial',
                align: 'left',
                wordWrap: { width: optionWidth - 160 }
            }).setOrigin(0, 0.5);
            option.add(description);
        
            const startX = -280;
            const cardPositionX = startX + i * (optionWidth + spacing);
            option.setPosition(cardPositionX, -50);
            
            const button = new Button(this.scene, cardPositionX + optionWidth / 2, 100, 'Tryk her', () => this.handleButtonClick());
        
            this.menu.add(option);
            this.powerUpOptions.push(option);

            // Tilføj knappen til interactiveGroup
            this.interactiveGroup.add(button.getButton());

            // Tilføj knappen til menuen
            this.menu.add(button.getButton());
        }    
    
        this.menu.setVisible(false);
    }

    private handleButtonClick(): void {
        console.log("knappen er trykket på");

        // Fjern én level fra køen
        this.levelQueue.shift();

        // Tjek om der er flere level-ups i køen
        if (this.levelQueue.length > 0) {
            this.showNextLevelUp(); // Vis næste level-up, hvis der er flere
        } else {
            this.hide(); // Skjul menuen, når alle level-ups er valgt
        }
    }

    show(level: number): void {
        // Tilføj level til køen, hvis der er flere level-ups
        for (let i = this.levelQueue[this.levelQueue.length - 1] || 0; i < level; i++) {
            this.levelQueue.push(i + 1);
        }

        // Hvis level-up-menuen ikke er synlig, vis den første
        if (!this.menu.visible) {
            this.showNextLevelUp();
        }
    }

    private showNextLevelUp(): void {
        const nextLevel = this.levelQueue[0];
        this.levelText.setText(`Level Up! You are now level ${nextLevel}`);
        this.menu.setVisible(true);

        // Gør knapperne interaktive igen, når menuen vises
        this.interactiveGroup.getChildren().forEach((button) => {
            (button as Phaser.GameObjects.Container).setInteractive();
        });
    }

    hide(): void {
        this.menu.setVisible(false);
    }
}