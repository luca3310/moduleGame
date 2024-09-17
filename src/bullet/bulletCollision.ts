export default function bulletCollision() {
  this.physics.add.overlap(
    this.bullets,
    this.enemies,
    (bullet: any, enemy: any) => {
      // Destroy the bullet on hit
      bullet.destroy();

      // Reduce enemy health
      enemy.health -= 1;

      const damageText = this.add.text(0, 0, `-${1}`, {
        font: "30px Arial",
        fill: "#ffff00",
        stroke: "#000000",
        strokeThickness: 3,
      });

      // Generate a random position around the enemy (in a circle)
      const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
      const radius = 30; // Circle radius around the enemy
      const offsetX = Math.cos(angle) * radius;
      const offsetY = Math.sin(angle) * radius;

      // Set the position of the damage text
      damageText.setPosition(enemy.x + offsetX, enemy.y + offsetY);

      // Create an animation for the damage number (e.g., floating up and fading out)
      this.tweens.add({
        targets: damageText,
        y: damageText.y - 50, // Move the text upward
        alpha: 0, // Fade out the text
        duration: 800, // Duration of the tween
        ease: "Power1",
        onComplete: () => {
          damageText.destroy(); // Remove the text after the animation
        },
      });

      // Blink the enemy white for a short period
      enemy.setTint(0xffffff); // Set the enemy tint to white
      this.time.delayedCall(100, () => {
        enemy.clearTint(); // Revert to the original color after 100ms
      });

      if (enemy.health <= 0) {
        // Destroy the enemy only if its health is zero or below
        enemy.destroy();

        // Notify the scene that an enemy has been killed
        this.events.emit('enemyKilled');

        // Add XP to the player
        this.player.xp += 10;

        // Level up logic
        if (this.player.xp >= this.player.xpToNextLevel) {
          this.player.level += 1;
          this.player.xp -= this.player.xpToNextLevel;
          this.player.xpToNextLevel = Math.floor(
            this.player.xpToNextLevel * 1.5,
          );
        }
      }
    },
  );
}