// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
export function preload(this: Phaser.Scene): void {
    this.load.image('enemyStand', 'assets/Enemy/zombie_stand.png');
    this.load.image('enemyWalk1', 'assets/Enemy/zombie_walk1.png');
    this.load.image('enemyWalk2', 'assets/Enemy/zombie_walk2.png');

    
    this.load.audio('ambience', 'assets/Music/Zombies.mp3');
    this.load.audio('zombieHit', 'assets/Sounds/Zombie/163447__under7dude__zombie-hit.wav');
    this.load.json('powerUps', 'assets/powerUps.json');
    // You can load other assets like images here

    this.load.image('playerRun1', 'assets/player/playerRun1.png');
    this.load.image('playerRun2', 'assets/player/playerRun2.png');
    this.load.image('playerRun3', 'assets/player/playerRun3.png');
    this.load.image('playerRun4', 'assets/player/playerRun4.png');

    this.load.image('playerIdle1', 'assets/player/playerIdle1.png');

    this.load.image('weapon', 'assets/player/weapon.png');
    this.load.image('bullet', 'assets/player/bullet.png');


    this.load.image('meatEnemyRun1', 'assets/meatEnemy/meatEnemyRun1.png');
    this.load.image('meatEnemyRun2', 'assets/meatEnemy/meatEnemyRun2.png');
    this.load.image('meatEnemyRun3', 'assets/meatEnemy/meatEnemyRun3.png');
    this.load.image('meatEnemyRun4', 'assets/meatEnemy/meatEnemyRun4.png');

    this.load.image("tile_001", "assets/tiles/tile_001.png")
    this.load.image("tile_002", "assets/tiles/tile_002.png")
    this.load.image("tile_003", "assets/tiles/tile_003.png")
    this.load.image("tile_004", "assets/tiles/tile_004.png")
    this.load.image("tile_005", "assets/tiles/tile_005.png")
    this.load.image("tile_006", "assets/tiles/tile_006.png")
    this.load.image("tile_007", "assets/tiles/tile_007.png")



}