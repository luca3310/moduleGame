export default function createEnemy() {
  // Opret en physics-baseret gruppe til fjender
  this.enemies = this.physics.add.group({
    bounceX: 1,
    bounceY: 1,
  });

  // Fjender må ikke overlappe hinanden
  this.physics.add.collider(this.enemies, this.enemies);

  // Tjek, om 'enemyWalk' animationen allerede eksisterer
  if (!this.anims.exists("enemyWalk")) {
    // Opret animationer for fjendens bevægelse
    this.anims.create({
      key: "enemyWalk",
      frames: [{ key: "meatEnemyRun1" }, { key: "meatEnemyRun2" }, { key: "meatEnemyRun3" }, { key: "meatEnemyRun4" }],
      frameRate: 10,
      repeat: -1, // Animationen skal gentage sig
    });
  }

  // Opret en stillestand animation (valgfrit)
  if (!this.anims.exists("enemyStand")) {
    this.anims.create({
      key: "enemyStand",
      frames: [{ key: "enemyStand" }],
      frameRate: 1, // Brug kun ét billede
    });
  }

  this.physics.add.collider(
    this.player,
    this.enemies,
    (player: Phaser.Physics.Arcade.Sprite & { stats: { health: number } }, enemy: Phaser.Physics.Arcade.Sprite & { attackTimer?: Phaser.Time.TimerEvent }) => {
      console.log("Collision between player and enemy!");
    
      // Start angrebstimer for fjenden
      if (!enemy.attackTimer) {
        enemy.attackTimer = this.time.addEvent({
          delay: 2000, // Angreb hver 3. sekund
          callback: () => {
            const damageAmount = 10; // Skader spilleren med 10 hver gang
            this.handlePlayerHit(damageAmount);
            
            // Vis skaden over spilleren (ved health bar)
            const damageText = this.add.text(player.x, player.y - 50, `-${damageAmount}`, {
              font: '30px Arial',
              fill: '#ff0000',
              stroke: '#000000',
              strokeThickness: 3,
            });
  
            this.tweens.add({
              targets: damageText,
              y: damageText.y - 30,
              alpha: 0,
              duration: 800,
              ease: 'Power1',
              onComplete: () => {
                damageText.destroy();
              },
            });
          },
          callbackScope: this,
          loop: true,
        });
      }
    }
  );
  
}  