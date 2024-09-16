import levelUp from "src/player/levelUp";

export default function bulletCollision() {
  this.physics.add.overlap(
    this.bullets,
    this.enemies,
    (bullet: any, enemy: any) => {
      bullet.setActive(false);
      bullet.setVisible(false);
      enemy.destroy();

      this.player.xp += 10;

      if (this.player.xp >= this.player.xpToNextLevel) {
        this.player.level += 1;
        this.player.xp -= this.player.xpToNextLevel;
        this.player.xpToNextLevel = Math.floor(this.player.xpToNextLevel * 1.5);
      }
    },
  );
}
