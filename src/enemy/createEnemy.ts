export default function createEnemy() {
  // Create a physics-enabled group for enemies
  this.enemies = this.physics.add.group({
    bounceX: 1, // Ensure enemies bounce off each other
    bounceY: 1,
  });

  // Add collider to prevent enemies from overlapping
  this.physics.add.collider(this.enemies, this.enemies);
}
