export default function createTiles() {
  const rectWidth2 = 1200; // Width of the tileOutline
  const rectHeight2 = 800; // Height of the tileOutline
  const tileScale = 4; // Scale factor for the tiles

  // Create the tileOutline
  this.tileOutline = this.add.graphics();
  this.tileOutline.lineStyle(1, 0x00ff00); // 1px thick green outline
  this.tileOutline.strokeRect(
    this.player.x - 600,
    this.player.y - 400,
    rectWidth2,
    rectHeight2,
  );

  // Create an outlined rectangle using the Graphics object
  this.testCamera = this.add.graphics();
  this.testCamera.lineStyle(1, 0x0000ff); // 1px thick blue outline
  const rectWidth = 1000;
  const rectHeight = 600;
  this.testCamera.strokeRect(
    this.player.x - 500,
    this.player.y - 300,
    rectWidth,
    rectHeight,
  );

  // Define tile groups for different types of tiles
  this.tiles1 = this.physics.add.group({ defaultKey: "tile1" });
  this.tiles2 = this.physics.add.group({ defaultKey: "tile2" });
  this.tiles3 = this.physics.add.group({ defaultKey: "tile3" });

  // Create a Set to keep track of tile positions
  this.tilePositions = new Set();

  // Calculate the width and height of the scaled tiles (assuming square tiles)
  const tileSize =
    this.textures.get("tile1").getSourceImage().width * tileScale;

  // Loop to fill the tileOutline with random tiles
  for (let x = this.player.x - 600; x < this.player.x + 600; x += tileSize) {
    for (let y = this.player.y - 400; y < this.player.y + 400; y += tileSize) {
      // Randomly select a tile type (1, 2, or 3)
      const randomTile = Phaser.Math.Between(1, 3);
      let tileGroup;
      let tileKey;

      if (randomTile === 1) {
        tileGroup = this.tiles1;
        tileKey = "tile1";
      } else if (randomTile === 2) {
        tileGroup = this.tiles2;
        tileKey = "tile2";
      } else {
        tileGroup = this.tiles3;
        tileKey = "tile3";
      }

      // Create the tile at the current position
      const tile = tileGroup.get(x, y, tileKey);
      tile.x = x;
      tile.y = y;
      tile.setScale(tileScale, tileScale); // Apply the scale
      tile.setDepth(0); // Set the depth for the tiles

      // Add tile position to the set
      this.tilePositions.add(`${x},${y}`);
    }
  }

  // Set the player's depth higher than the tiles so it appears on top
  this.player.setDepth(1);
}
