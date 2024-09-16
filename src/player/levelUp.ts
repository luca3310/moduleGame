export default function levelUp(): void {
  this.player.level += 1;
  this.player.xp -= this.player.xpToNextLevel;
  this.player.xpToNextLevel = Math.floor(this.player.xpToNextLevel * 1.5);

  this.levelText.setText(`Level: ${this.player.level}`);
}
