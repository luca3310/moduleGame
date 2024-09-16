export default function updatePlayerMovement() {
  const speed = 160;  // Ændret til 160 for at matche farten med physics

  let isMoving = false;  // Variabel til at tjekke, om spilleren bevæger sig

  // Bevægelse op/ned
  if (this.wasdKeys.W.isDown) {
    this.player.setVelocityY(-speed);
    isMoving = true;
  } else if (this.wasdKeys.S.isDown) {
    this.player.setVelocityY(speed);
    isMoving = true;
  } else {
    this.player.setVelocityY(0);  // Stop bevægelse på Y-aksen
  }

  // Bevægelse venstre/højre
  if (this.wasdKeys.A.isDown) {
    this.player.setVelocityX(-speed);
    this.player.setFlipX(true);  // Spejlvend til venstre
    isMoving = true;
  } else if (this.wasdKeys.D.isDown) {
    this.player.setVelocityX(speed);
    this.player.setFlipX(false);  // Normalt billede til højre
    isMoving = true;
  } else {
    this.player.setVelocityX(0);  // Stop bevægelse på X-aksen
  }

  // Afspil animation, hvis spilleren bevæger sig
  if (isMoving) {
    this.player.anims.play('walk', true);
  } else {
    this.player.setTexture('playerStand');  // Stå stille, når ikke bevæger sig
  }
}
