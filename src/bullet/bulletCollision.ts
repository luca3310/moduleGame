export default function bulletCollision() {
  this.physics.add.overlap(this.bullets, this.enemies, (bullet: any, enemy: any) => {
      bullet.destroy();
      
      // Brug spillerens damage i stedet for hardcoded 3
      const damageAmount = this.player.stats.damage; // Få skade fra spillerens stats
      enemy.health -= damageAmount; 

      this.sound.play('zombieHit');

      const damageText = this.add.text(0, 0, `-${damageAmount}`, {
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

          const numXpBlops = 3; // Number of xpBlops in the splash

          for (let i = 0; i < numXpBlops; i++) {
              const xpBlop = this.xpBlops.get(enemy.x, enemy.y, 'blueRect');

              xpBlop.body.velocity.x = Phaser.Math.Between(-100, 100);
              xpBlop.body.velocity.y = Phaser.Math.Between(-100, 100);

              this.time.addEvent({
                  delay: 500, // Time in ms before the callback is executed
                  callback: () => {
                      if (xpBlop?.body?.velocity) {
                          xpBlop.body.velocity.x = 0;
                          xpBlop.body.velocity.y = 0;
                      }
                  },
              });
          }

          this.incrementKillCount(); // Opdater kill counteren her
      }
  });
}
