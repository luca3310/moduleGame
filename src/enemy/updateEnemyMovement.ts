export default function updateEnemyMovement(Phaser: any) {
  const speed = 50; // Adjusted speed for physics

  this.enemies.getChildren().forEach((enemy: Phaser.Physics.Arcade.Image) => {
    // Calculate direction vector to player
    const direction = new Phaser.Math.Vector2(
      this.player.x - enemy.x,
      this.player.y - enemy.y,
    ).normalize();

    // Apply velocity towards the player
    enemy.setVelocity(direction.x * speed, direction.y * speed);
  });
}
