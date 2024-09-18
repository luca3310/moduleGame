export default function createBullet() {
  this.bullets = this.physics.add.group({
    defaultKey: "bullet",
  });
}
