// create.ts
import LevelUpMenu from '../levelUpMenu/LevelUpMenu';
import createCamera from '../camera/createCamera';
import keybinds from '../keybinds';
import createEnemy from '../enemy/createEnemy';
import createEnemySpawner from '../enemySpawner/createEnemySpawner';
import createBullet from '../bullet/createBullet';
import bulletCollision from '../bullet/bulletCollision';
import createXp from '../xp/createXp';
import createTiles from '../tiles/createTiles';

export default function create(): void {
  const centerX = this.cameras.main.width / 2;
  const centerY = this.cameras.main.height / 2;

  this.bullets = this.add.group({
    classType: Phaser.Physics.Arcade.Sprite,
    runChildUpdate: true,
  });

  this.initializePlayer(centerX, centerY); // Opretter spiller og sundhedsbar

  this.initializeInput();

  createCamera.call(this);
  keybinds.call(this, Phaser);
  createEnemy.call(this);
  createEnemySpawner.call(this);
  createBullet.call(this);
  bulletCollision.call(this);
  createXp.call(this);
  createTiles.call(this);
  
  this.initializeUI();

  this.leftMouseButton = this.input.activePointer;
  this.dashCooldownBar = this.add.graphics();

  // Play background music
  const ambience = this.sound.add('ambience', {
    loop: true,
    volume: 0.5,
  });
  ambience.play();
  
}