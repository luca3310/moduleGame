export default function createPlayer(centerX: number, centerY: number) {
  this.player = this.add.rectangle(
    centerX - 25,
    centerY - 25,
    50,
    50,
    0x00ff00,
  );
}
