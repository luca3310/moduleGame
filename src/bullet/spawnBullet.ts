export default function spawnBullet() {
  const bulletSpeed = 400;

  // Create a new bullet at the player's current position
  const bullet = this.bullets.get(this.player.x, this.player.y, "bullet");

  if (bullet) {
    // Get the pointer's world position (adjusting for camera movement)
    const pointerWorldPos = this.cameras.main.getWorldPoint(
      this.input.activePointer.x,
      this.input.activePointer.y,
    );

    // Calculate direction from the player's position to the pointer's world position
    const direction = new Phaser.Math.Vector2(
      pointerWorldPos.x - this.player.x,
      pointerWorldPos.y - this.player.y,
    ).normalize(); // Normalize to get unit vector for consistent speed

    bullet.setVelocity(direction.x * bulletSpeed, direction.y * bulletSpeed);


    // Destroy bullet after 3 seconds if it doesn't hit anything
    this.time.delayedCall(3000, () => {
      bullet.destroy();
    });
  }
}
