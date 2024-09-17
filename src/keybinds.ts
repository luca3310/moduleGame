export default function keybinds(Phaser: any) {
  // WASD keys
  this.wasdKeys = {
    W: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
    A: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
    S: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
    D: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    Space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE), // Added space key
  };

  // Mouse button
  this.leftMouseButton = this.input.activePointer;
}
