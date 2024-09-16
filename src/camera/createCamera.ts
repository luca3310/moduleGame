export default function createCamera() {
  this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
}
