export default function createPlayer(x: number, y: number) {
  // Opret en spiller sprite
  this.player = this.physics.add.sprite(x, y, 'playerStand');
  
  // Tilføj en properties for niveau og XP
  this.player.level = 1;
  this.player.xp = 0;
  this.player.xpToNextLevel = 100; // XP needed for the next level

  // Opret animationer
  this.anims.create({
    key: 'walk',
    frames: [
      { key: 'playerWalk1' },
      { key: 'playerWalk2' }
    ],
    frameRate: 10,
    repeat: -1
  });

  // Opret en statisk level bar baggrund
  // Tilføj level bar og reload bar hvis nødvendigt


  // Tilføj properties til at spore spillerens niveau og XP
  this.player.level = 1;
  this.player.xp = 0;
  this.player.xpToNextLevel = 100; // XP required for the next level
}
