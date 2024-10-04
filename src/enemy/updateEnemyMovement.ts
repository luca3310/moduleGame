export default function updateEnemyMovement(): void {
  const speed = 50; // Fjendernes hastighed

  this.enemies.getChildren().forEach((enemy: Phaser.Physics.Arcade.Image & { anims: any }) => {
    // Beregn retningsvektor mod spilleren
    const direction = new Phaser.Math.Vector2(
      this.player.x - enemy.x,
      this.player.y - enemy.y
    ).normalize();

    // Anvend hastighed mod spilleren
    const velocityX = direction.x * speed;
    const velocityY = direction.y * speed;
    enemy.setVelocity(velocityX, velocityY);

    // Spejl fjenden afhængigt af retningen
    if (velocityX < 0) {
      enemy.setFlipX(true);  // Hvis fjenden bevæger sig til venstre
    } else {
      enemy.setFlipX(false); // Hvis fjenden bevæger sig til højre
    }

    // Tjek om fjenden bevæger sig, og afspil animationen
    if (velocityX !== 0 || velocityY !== 0) {
      enemy.anims.play('enemyWalk', true); // Afspil 'walk'-animation
      const angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, this.player.x, this.player.y);
      enemy.setRotation(angle - 90);
    } else {
      enemy.anims.play('enemyStand', true); // Afspil 'stand'-animation
    }
  });
}
