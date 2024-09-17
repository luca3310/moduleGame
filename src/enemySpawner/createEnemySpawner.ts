export default function createEnemySpawner() {
  this.time.addEvent({
    delay: 3400, // Time in ms
    loop: true, // Repeat forever
    callback: () => {
      const spawnRadius = 300; // Distance around the player to spawn enemies
      const angle = Phaser.Math.FloatBetween(0, 2 * Math.PI);
      const distance = Phaser.Math.Between(spawnRadius / 2, spawnRadius);

      // Calculate enemy spawn position relative to player
      const enemyX = this.player.x + distance * Math.cos(angle);
      const enemyY = this.player.y + distance * Math.sin(angle);

      // Create a graphics object and draw a red rectangle
      const graphics = this.add.graphics();
      graphics.fillStyle(0xff0000, 1); // Red color
      graphics.fillRect(0, 0, 40, 40); // Rectangle size (visible size)

      // Generate a texture from the graphics
      graphics.generateTexture("enemyTexture", 40, 40);
      graphics.destroy(); // Remove the graphics object, we no longer need it

      // Create a sprite using the generated texture
      const enemy = this.physics.add.sprite(enemyX, enemyY, "enemyTexture");

      // Add the enemy to the physics group
      this.enemies.add(enemy);

      // Set random velocity to avoid enemies stacking at spawn
      enemy.setVelocity(
        Phaser.Math.Between(-50, 50),
        Phaser.Math.Between(-50, 50),
      );

      // Make the enemy's physics body larger than the render
      const bodyWidth = 60; // Physics body width (bigger than the visual size)
      const bodyHeight = 100; // Physics body height
      enemy.setSize(bodyWidth, bodyHeight);

      // Optionally, center the physics body if it's larger than the sprite
      enemy.setOffset((40 - bodyWidth) / 2, (40 - bodyHeight) / 2); // Adjust the offset to center the body

      // Assign health to the enemy
      enemy.health = 3; // Each enemy starts with 3 health points
    },
  });
}
