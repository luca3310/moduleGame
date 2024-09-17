export default function createEnemy() {
  // Opret en physics-baseret gruppe til fjender
  this.enemies = this.physics.add.group({
    bounceX: 1,
    bounceY: 1,
  });

  // Fjender må ikke overlappe hinanden
  this.physics.add.collider(this.enemies, this.enemies);

  // Opret animationer for fjendens bevægelse
  this.anims.create({
    key: 'enemyWalk',
    frames: [
      { key: 'enemyWalk1' },
      { key: 'enemyWalk2' },
    ],
    frameRate: 10,
    repeat: -1, // Animationen skal gentage sig
  });

  // Opret en stillestand animation (valgfrit)
  this.anims.create({
    key: 'enemyStand',
    frames: [{ key: 'enemyStand' }],
    frameRate: 1, // Brug kun ét billede
  });
}
