export default function updatePlayerMovement() {
  const speed = 6;

  if (this.wasdKeys.W.isDown) {
    this.player.y -= speed;
  }
  if (this.wasdKeys.S.isDown) {
    this.player.y += speed;
  }
  if (this.wasdKeys.A.isDown) {
    this.player.x -= speed;
  }
  if (this.wasdKeys.D.isDown) {
    this.player.x += speed;
  }
}
