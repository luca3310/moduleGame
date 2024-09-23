import Phaser from 'phaser';

export default class Button {
    private scene: Phaser.Scene;
    private button: Phaser.GameObjects.Container;

    constructor(scene: Phaser.Scene, x: number, y: number, text: string, onClick: () => void) {
        this.scene = scene;
        
        // Opret container til knappen
        this.button = this.scene.add.container(x, y);
        
        // Opret grafik til rundet knap
        const graphics = this.scene.add.graphics();
        graphics.fillStyle(0x4caf50, 1); // Grøn baggrund
        graphics.fillRoundedRect(-150, -25, 300, 50, 25); // Tegner en rundet knap
        this.button.add(graphics);

        // Tilføj tekst til knappen
        const buttonText = this.scene.add.text(0, 0, text, {
            fontSize: '28px',
            color: '#fff',
            padding: { left: 10, right: 10, top: 5, bottom: 5 },
        }).setOrigin(0.5);
        this.button.add(buttonText);
        
        // Gør knappen interaktiv
        this.button.setSize(300, 50).setInteractive({ useHandCursor: true })
            .on('pointerdown', (pointer: Phaser.Input.Pointer) => {
                if (pointer.leftButtonDown()) { // Skift til venstreklik for at undgå højreklik
                    onClick(); // Kald onClick callback ved klik
                }
            })
            .on('pointerover', () => {
                graphics.clear();
                graphics.fillStyle(0x66bb6a, 1); // Hover-effekt
                graphics.fillRoundedRect(-150, -25, 300, 50, 25);
            })
            .on('pointerout', () => {
                graphics.clear();
                graphics.fillStyle(0x4caf50, 1); // Gå tilbage til normal farve
                graphics.fillRoundedRect(-150, -25, 300, 50, 25);
            });

        this.button.setDepth(10); // Sørg for at knappen er over andre elementer
    }

    getButton(): Phaser.GameObjects.Container {
        return this.button;
    }
}