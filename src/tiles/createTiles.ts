export default function createTiles() {
  const tileScale = 4;

  // Define tile groups for different types of tiles
  this.tiles1 = this.physics.add.group({ defaultKey: "tile_001" });
  this.tiles2 = this.physics.add.group({ defaultKey: "tile2" });
  this.tiles3 = this.physics.add.group({ defaultKey: "tile3" });

  // Create a Set to keep track of tile positions
  this.tilePositions = new Set();

  // Calculate the width and height of the scaled tiles (assuming square tiles)
  const tileSize =
    this.textures.get("tile_001").getSourceImage().width * tileScale;

  // Loop to fill the tileOutline with random tiles
  for (let x = this.player.x - 600; x < this.player.x + 600; x += tileSize) {
    for (let y = this.player.y - 400; y < this.player.y + 400; y += tileSize) {
     
      // Randomly select a tile type (1, 2, or 3)
      const randomTile = Phaser.Math.Between(1, 11);
      let tileGroup;
      let tileKey;

      if (randomTile === 1 || randomTile === 8) {
        tileGroup = this.tiles1;
        tileKey = "tile_001";
      } else if (randomTile === 2 || randomTile === 9) {
        tileGroup = this.tiles2;
        tileKey = "tile_002";
      } else if (randomTile === 3) {
        tileGroup = this.tiles3;
        tileKey = "tile_003";
      } else if (randomTile === 4){
        tileGroup = this.tiles3;
        tileKey = "tile_004";
      } else if (randomTile === 5) {
        tileGroup = this.tiles3;
        tileKey = "tile_005";
      } else if (randomTile === 6 || randomTile === 10){
        tileGroup = this.tiles3;
        tileKey = "tile_006";
      } else if (randomTile === 7 || randomTile === 11){
        tileGroup = this.tiles3;
        tileKey = "tile_007";
      }

      // Create the tile at the current position
      const tile = tileGroup.get(x, y, tileKey);
      tile.x = x;
      tile.y = y;
      tile.setScale(tileScale, tileScale); // Apply the scale
      tile.setDepth(-1); // Set the depth for the tiles

      // Add tile position to the set
      this.tilePositions.add(`${x},${y}`);
    }
  }
}
