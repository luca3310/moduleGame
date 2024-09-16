export default function createPlayer(x: number, y: number) {
  // Opret en spiller sprite med fysik
  this.player = this.physics.add.sprite(x, y, 'playerStand');

  // Tilføj properties for niveau og XP
  this.player.level = 1;
  this.player.xp = 0;
  this.player.xpToNextLevel = 100; // XP required for the next level

  // Opret animationer for spillerens bevægelse (walk)
  this.anims.create({
    key: 'walk',
    frames: [
      { key: 'playerWalk1' },
      { key: 'playerWalk2' }
    ],
    frameRate: 10,
    repeat: -1 // Animationen skal gentage sig selv
  });
}
