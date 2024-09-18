export default function createXp() {
  const graphics = this.add.graphics();
  graphics.fillStyle(0x0000ff, 1); // Blue color with full opacity
  graphics.fillRect(0, 0, 20, 20);
  graphics.generateTexture("blueRect", 20, 20);
  graphics.destroy(); // Clean up the graphics object

  this.xpBlops = this.physics.add.group({
    defaultKey: "blueRect",
  });

  this.physics.add.overlap(
    this.player,
    this.xpBlops,
    (player: any, xpBlop: any) => {
      xpBlop.destroy();
      player.xp += 10;
    },
  );

  this.physics.add.overlap(this.enemies, this.xpBlops, () => {
    // Empty callback to avoid any collision handling
  });
}
