export default function createXp() {
  const graphics = this.add.graphics();
  graphics.fillStyle(0x0000ff, 1); // Blue color with full opacity
  graphics.fillRect(0, 0, 20, 20);
  graphics.generateTexture("blueRect", 20, 20);
  graphics.destroy(); // Clean up the graphics object

  this.xpBlops = this.physics.add.group({
    defaultKey: "blueRect",
  });

  const magnetRadius = 200; // Distance at which XP blops get attracted

  // Update function to check for magnet effect
  this.physics.world.on("worldstep", () => {
    this.xpBlops.getChildren().forEach((xpBlop: any) => {
      const distance = Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        xpBlop.x,
        xpBlop.y,
      );

      // If within the magnet radius, move the XP blop towards the player
      if (distance < magnetRadius) {
        const angle = Phaser.Math.Angle.Between(
          xpBlop.x,
          xpBlop.y,
          this.player.x,
          this.player.y,
        );

        const attractionSpeed = 200; // Speed of attraction (adjust as needed)
        xpBlop.body.velocity.x = Math.cos(angle) * attractionSpeed;
        xpBlop.body.velocity.y = Math.sin(angle) * attractionSpeed;
      }
    });
  });

  // Same collision handling logic for XP blops
  this.physics.add.overlap(
    this.player,
    this.xpBlops,
    (player: any, xpBlop: any) => {
      xpBlop.destroy();
      player.xp += 35;
    },
  );

  this.physics.add.overlap(this.enemies, this.xpBlops, () => {
    // Empty callback to avoid any collision handling
  });
}
