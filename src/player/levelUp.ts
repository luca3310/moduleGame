// levelUp.ts
export default function levelUp(): void {
  this.player.level += 1; // Increase player level
  console.log(`Player leveled up! New level: ${this.player.level}`);

  // Adjust XP and calculate next level's XP requirement
  this.player.xp -= this.player.xpToNextLevel;
  this.player.xpToNextLevel = Math.floor(this.player.xpToNextLevel * 1.5);

  // Update any UI elements, like level text
  if (this.levelText) {
    this.levelText.setText(`Level: ${this.player.level}`);
  }

  // Trigger level-up effects or show level-up menu if needed
  this.handleLevelUpEffects(); // This could be used for special visual/audio effects, showing level-up choices, etc.
}