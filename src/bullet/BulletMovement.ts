export default function bulletMovement() {
  const speed = 500;
  // Loop through all active bullets in the group
  this.bullets.children.each((bullet: any) => {
    if (bullet.active) {
      // Update the bullet's position manually based on its direction and speed
      bullet.x += (+bullet.dir.x * speed * this.game.loop.delta) / 1000;
      bullet.y += (+bullet.dir.y * speed * this.game.loop.delta) / 1000;
    }
  }, this);
}
