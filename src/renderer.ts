import Phaser from 'phaser';

class MyGame extends Phaser.Scene {
  private player!: Phaser.GameObjects.Sprite;
  private wasdKeys!: { [key: string]: Phaser.Input.Keyboard.Key };
  private tileSize: number = 16; // Antag størrelse af hver tile
  private borderTileSize: number = 16; // Størrelse af kant-tile
  private tilesPerRow: number;
  private tilesPerColumn: number;

  constructor() {
    super({ key: 'MyGame' });
  }

  preload(): void {
    // Load tile images
    for (let i = 1; i <= 10; i++) {
      this.load.image(`tiles${i}`, `assets/tile_000${i}.png`);
    }
    this.load.image('border', 'assets/border.png'); // Tile til kanten
    this.load.image('player', 'assets/player.png'); // Sørg for at tilføje en player image
  }

  create(): void {
    const sceneWidth = this.sys.game.config.width as number;
    const sceneHeight = this.sys.game.config.height as number;

    // Calculate number of tiles required to cover the scene
    this.tilesPerRow = Math.ceil(sceneWidth / this.tileSize);
    this.tilesPerColumn = Math.ceil(sceneHeight / this.tileSize);

    // Fill the scene with tiles
    for (let x = 0; x < this.tilesPerRow; x++) {
      for (let y = 0; y < this.tilesPerColumn; y++) {
        const tileTypeIndex = (x + y) % 8 + 3; // Vælg tiles fra 3 til 10
        const tileType = `tiles${tileTypeIndex}`;
        this.add.image(x * this.tileSize, y * this.tileSize, tileType).setOrigin(0);
      }
    }

    // Add border around the scene
    for (let x = 0; x < sceneWidth; x += this.borderTileSize) {
      this.add.image(x, 0, 'border').setOrigin(0); // Top border
      this.add.image(x, sceneHeight - this.borderTileSize, 'border').setOrigin(0); // Bottom border
    }
    for (let y = 0; y < sceneHeight; y += this.borderTileSize) {
      this.add.image(0, y, 'border').setOrigin(0); // Left border
      this.add.image(sceneWidth - this.borderTileSize, y, 'border').setOrigin(0); // Right border
    }

    // Create player sprite
    this.player = this.add.sprite(100, 450, 'player');

    // Setup input controls
    this.wasdKeys = {
      W: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      A: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      S: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      D: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };

    // Set camera bounds to match the scene size
    this.cameras.main.setBounds(0, 0, sceneWidth, sceneHeight);
    this.cameras.main.startFollow(this.player, true, 0.09, 0.09); // Følg spilleren med en glidende effekt

    // Optionally, set camera zoom
    this.cameras.main.setZoom(1.2); // Justér zoom niveauet som ønskes

    // Make player collidable with tiles
    this.physics.add.existing(this.player);
  }

  update(): void {
    // Movement speed
    const speed = 6;

    // Move player with WASD keys
    if (this.wasdKeys.W.isDown) {
      this.player.y -= speed;
    }
    if (this.wasdKeys.S.isDown) {
      this.player.y += speed;
    }
    if (this.wasdKeys.A.isDown) {
      this.player.x -= speed;
    }
    if (this.wasdKeys.D.isDown) {
      this.player.x += speed;
    }

    // Adjust camera position based on player movement
    // No need to manually adjust camera position if using startFollow()
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1900,
  height: 1150,
  backgroundColor: '#2d2d2d',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  scene: MyGame,
};

new Phaser.Game(config);