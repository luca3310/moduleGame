export default function updatePlayerMovement() {
  const speed = 160;
  let isMoving = false;

  // Bevægelser på Y-aksen (op/ned)
  if (this.wasdKeys.W.isDown) {
    this.player.setVelocityY(-speed);
    isMoving = true;
  } else if (this.wasdKeys.S.isDown) {
    this.player.setVelocityY(speed);
    isMoving = true;
  } else {
    this.player.setVelocityY(0); // Stop bevægelse på Y-aksen
  }

  // Bevægelser på X-aksen (venstre/højre)
  if (this.wasdKeys.A.isDown) {
    this.player.setVelocityX(-speed);
    isMoving = true;
  } else if (this.wasdKeys.D.isDown) {
    this.player.setVelocityX(speed);
    isMoving = true;
  } else {
    this.player.setVelocityX(0); // Stop bevægelse på X-aksen
  }

  // Afspil 'walk' animationen, hvis spilleren bevæger sig
  if (isMoving) {
    if (!this.player.anims.isPlaying || this.player.anims.currentAnim.key !== 'walk') {
      this.player.anims.play('walk');
    }
  } else {
    // Stop animationen og vis stående billede
    this.player.anims.stop();
    this.player.setTexture('playerStand');
  }
}
