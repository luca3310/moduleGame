export default class LevelUpMenu {
    private scene: Phaser.Scene;
    private menu!: Phaser.GameObjects.Container;
    private levelText!: Phaser.GameObjects.Text;
    private powerUpOptions: Phaser.GameObjects.Container[] = [];

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    preload(): void {
        // Load power-ups JSON here
        this.scene.load.json('powerUps', 'assets/powerUps.json');
    }

    create(): void {
        // Create the menu container
        this.menu = this.scene.add.container(this.scene.cameras.main.width / 2, this.scene.cameras.main.height / 2);
        this.menu.setScrollFactor(0); // Keep the menu fixed on the screen
    
        // Add a semi-transparent background
        const background = this.scene.add.graphics();
        background.fillStyle(0x000000, 0.8); // Semi-transparent black
        background.fillRect(-250, -200, 500, 400);
        this.menu.add(background);
    
        // Add level-up text
        this.levelText = this.scene.add.text(0, -150, "", {
            fontSize: '32px',
            color: '#ffffff',
            fontFamily: 'Arial',
            align: 'center',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5);
        this.menu.add(this.levelText);
    
        // Create power-up options
        this.createPowerUpOptions();
    
        // Hide menu by default
        this.menu.setVisible(false);
    }
    
    private createPowerUpOptions(): void {
        const optionWidth = 200;
        const optionHeight = 100;
        const spacing = 20;

        // Load power-up data from JSON
        const powerUpData = this.scene.cache.json.get('powerUps');

        if (!powerUpData || !Array.isArray(powerUpData)) {
            console.error('Failed to load power-up data or data is not an array.');
            return;
        }

        // Shuffle the power-up data to randomize the order
        Phaser.Utils.Array.Shuffle(powerUpData);

        // Limit the number of power-ups shown
        const numOptions = Math.min(4, powerUpData.length);

        for (let i = 0; i < numOptions; i++) {
            const data = powerUpData[i];
            const option = this.scene.add.container();

            // Background
            const background = this.scene.add.graphics();
            background.fillStyle(0x333333, 0.9); // Dark gray background
            background.fillRect(0, 0, optionWidth, optionHeight);
            option.add(background);

            // Image
            const image = this.scene.add.image(30, optionHeight / 2, data.imageKey);
            image.setDisplaySize(80, 80); // Adjust size as needed
            option.add(image);

            // Text
            const title = this.scene.add.text(120, optionHeight / 2 - 30, data.title, {
                fontSize: '20px',
                color: '#ffffff',
                fontFamily: 'Arial',
                align: 'left'
            }).setOrigin(0, 0.5);
            option.add(title);

            const description = this.scene.add.text(120, optionHeight / 2 + 10, data.description, {
                fontSize: '14px',
                color: '#cccccc',
                fontFamily: 'Arial',
                align: 'left',
                wordWrap: { width: optionWidth - 150 }
            }).setOrigin(0, 0.5);
            option.add(description);

            // Button Background
            const buttonBackground = this.scene.add.graphics();
            buttonBackground.fillStyle(0x007bff, 1); // Button color
            buttonBackground.fillRoundedRect(optionWidth - 100, optionHeight / 2 - 15, 80, 30, 5); // Rounded corners
            option.add(buttonBackground);

            // Button Text
            const buttonText = this.scene.add.text(optionWidth - 100, optionHeight / 2, 'Select', {
                fontSize: '16px',
                color: '#ffffff',
                fontFamily: 'Arial'
            }).setOrigin(0.5, 0.5).setInteractive();
            buttonText.on('pointerdown', () => {
                console.log(`Selected: ${data.title}`);
            });
            option.add(buttonText);

            option.setPosition(-200, -100 + i * (optionHeight + spacing));
            this.menu.add(option);
            this.powerUpOptions.push(option);
        }
    }

    show(level: number): void {
        this.levelText.setText(`Level Up! You are now level ${level}`);
        this.menu.setVisible(true);
    }

    hide(): void {
        this.menu.setVisible(false);
    }
}