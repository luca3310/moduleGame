export default function updatePlayerMovement() {
  const normalSpeed = 160;
  const dashSpeed = 10000; // Speed during dash
  const dashDuration = 200; // Dash lasts for 200ms
  const dashCooldown = 1000; // Cooldown for 1 second

  let speed = normalSpeed; // Default speed

  let isMoving = false; // Variable to check if the player is moving

  // Check if dash key (Space) is pressed and dash is available
  if (
    this.wasdKeys.Space.isDown &&
    !this.isDashing &&
    this.time.now > this.dashCooldownEnd
  ) {
    this.isDashing = true;
    this.dashEndTime = this.time.now + dashDuration;
    this.dashCooldownEnd = this.time.now + dashCooldown;
    speed = dashSpeed; // Increase speed during dash
  }

  // If dash is active and its time has not ended
  if (this.isDashing && this.time.now > this.dashEndTime) {
    this.isDashing = false; // Stop dashing when time ends
  }

  // Movement up/down
  if (this.wasdKeys.W.isDown) {
    this.player.setVelocityY(-speed);
    isMoving = true;
  } else if (this.wasdKeys.S.isDown) {
    this.player.setVelocityY(speed);
    isMoving = true;
  } else {
    this.player.setVelocityY(0); // Stop movement on Y-axis
  }

  // Movement left/right
  if (this.wasdKeys.A.isDown) {
    this.player.setVelocityX(-speed);
    this.player.setFlipX(true); // Flip image to the left
    isMoving = true;
  } else if (this.wasdKeys.D.isDown) {
    this.player.setVelocityX(speed);
    this.player.setFlipX(false); // Normal image to the right
    isMoving = true;
  } else {
    this.player.setVelocityX(0); // Stop movement on X-axis
  }

  // Play walk animation if the player is moving
  if (isMoving) {
    this.player.anims.play("walk", true);
  } else {
    this.player.setTexture("playerStand"); // Standing still when not moving
  }
}
