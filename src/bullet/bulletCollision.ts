export default function bulletCollision() {
  this.physics.add.overlap(this.bullets, this.enemies, (bullet: any, enemy: any) => {
    bullet.destroy();
    enemy.health -= 1;

    this.sound.play('zombieHit');

    const damageText = this.add.text(0, 0, `-${1}`, {
      font: '30px Arial',
      fill: '#ffff00',
      stroke: '#000000',
      strokeThickness: 3,
    });

    const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
    const radius = 30;
    const offsetX = Math.cos(angle) * radius;
    const offsetY = Math.sin(angle) * radius;
    damageText.setPosition(enemy.x + offsetX, enemy.y + offsetY);

    this.tweens.add({
      targets: damageText,
      y: damageText.y - 50,
      alpha: 0,
      duration: 800,
      ease: 'Power1',
      onComplete: () => {
        damageText.destroy();
      },
    });

    enemy.setTint(0xffffff);
    this.time.delayedCall(100, () => {
      enemy.clearTint();
    });

    if (enemy.health <= 0) {
      enemy.destroy();
      this.events.emit('enemyKilled');

      this.player.xp += 10;

      if (this.player.xp >= this.player.xpToNextLevel) {
        this.player.level += 1;
        this.player.xp -= this.player.xpToNextLevel;
        this.player.xpToNextLevel = Math.floor(this.player.xpToNextLevel * 1.5);
      }

      this.incrementKillCount(); // Opdater kill counteren her
    }
  });
}
