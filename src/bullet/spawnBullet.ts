export default function spawnBullet(pointer: Phaser.Input.Pointer) {
  const bulletSpeed = 500;

  // Create a new bullet
  const bullet = this.bullets.get(this.player.x, this.player.y, "bullet");

  if (bullet) {
    // Calculate the direction from player to cursor
    const direction = new Phaser.Math.Vector2(
      pointer.worldX - this.player.x,
      pointer.worldY - this.player.y,
    ).normalize();

    // Set the bullet velocity in the direction of the cursor
    bullet.setVelocity(direction.x * bulletSpeed, direction.y * bulletSpeed);

    // Bullet should be destroyed after 3 seconds if it doesn't hit anything
    this.time.delayedCall(3000, () => {
      bullet.destroy();
    });
  }
}
