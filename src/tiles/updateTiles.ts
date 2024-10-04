export default function updateTiles() {
  // Now, update the tiles
  const tileOutline = 1200
  const tileSize =
    this.textures.get("tile_000").getSourceImage().width;

  // Function to check if a position is within the tileOutline
  const isWithinTileOutline = (x: number, y: number) => {
    const minX = this.player.x - tileOutline;
    const maxX = this.player.x + tileOutline;
    const minY = this.player.y - tileOutline;
    const maxY = this.player.y + tileOutline;
    return x >= minX && x < maxX && y >= minY && y < maxY;
  };

  // Get all tiles from all groups
  const allTiles = [].concat(
    this.tiles1.getChildren(),
    this.tiles2.getChildren(),
    this.tiles3.getChildren(),
  );

  // Set to keep track of positions to add (to avoid duplicates)
  const positionsToAdd = [];

  // For each existing tile
  for (let tile of allTiles) {
    const x = tile.x;
    const y = tile.y;

    // Neighboring positions (up, down, left, right)
    const neighbors = [
      { x: x + tileSize, y: y },
      { x: x - tileSize, y: y },
      { x: x, y: y + tileSize },
      { x: x, y: y - tileSize },
    ];

    for (let neighbor of neighbors) {
      const key = `${neighbor.x},${neighbor.y}`;
      if (
        !this.tilePositions.has(key) &&
        isWithinTileOutline(neighbor.x, neighbor.y)
      ) {
        positionsToAdd.push(neighbor);
        this.tilePositions.add(key);
      }
    }
  }

  // Now, create new tiles at positionsToAdd
  for (let pos of positionsToAdd) {
    // Randomly select a tile type (1, 2, or 3)
    const randomTile = Phaser.Math.Between(1, 11);
    let tileGroup;
    let tileKey;

    if (randomTile === 1 || randomTile === 8) {
      tileGroup = this.tiles1;
      tileKey = "tile_000";
    } else if (randomTile === 2 || randomTile === 9) {
      tileGroup = this.tiles2;
      tileKey = "tile_001";
    } else if (randomTile === 3) {
      tileGroup = this.tiles3;
      tileKey = "tile_002";
    } else if (randomTile === 4){
      tileGroup = this.tiles3;
      tileKey = "tile_003";
    } else if (randomTile === 5) {
      tileGroup = this.tiles3;
      tileKey = "tile_004";
    } else if (randomTile === 6 || randomTile === 10){
      tileGroup = this.tiles3;
      tileKey = "tile_005";
    } else if (randomTile === 7 || randomTile === 11){
      tileGroup = this.tiles3;
      tileKey = "tile_006";
    }
    // Create the tile at the neighbor position
    const newTile = tileGroup.get(pos.x, pos.y, tileKey);
    newTile.x = pos.x;
    newTile.y = pos.y;
    newTile.setDepth(-1); // Set the depth for the tiles
  }

  // Remove tiles that are outside of the tileOutline
  for (let tile of allTiles) {
    const x = tile.x;
    const y = tile.y;
    if (!isWithinTileOutline(x, y)) {
      // Remove tile
      tile.destroy();

      // Remove position from tilePositions
      this.tilePositions.delete(`${x},${y}`);
    }
  }
}