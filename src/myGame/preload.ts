// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
export function preload(this: Phaser.Scene): void {
    this.load.image('playerStand', 'assets/Player/player_stand.png');
    this.load.image('playerWalk1', 'assets/Player/player_walk1.png');
    this.load.image('playerWalk2', 'assets/Player/player_walk2.png');
    this.load.image('bullet', 'assets/weapons/rock.png');
    this.load.image('enemyStand', 'assets/Enemy/zombie_stand.png');
    this.load.image('enemyWalk1', 'assets/Enemy/zombie_walk1.png');
    this.load.image('enemyWalk2', 'assets/Enemy/zombie_walk2.png');

    this.load.image('tile1', 'assets/Tiled/tile_0000.png');
    this.load.image('tile2', 'assets/Tiled/tile_0001.png');
    this.load.image('tile3', 'assets/Tiled/tile_0002.png');

    this.load.audio('ambience', 'assets/Music/Zombies.mp3');
    this.load.audio('zombieHit', 'assets/Sounds/Zombie/163447__under7dude__zombie-hit.wav');
    this.load.json('powerUps', 'assets/powerUps.json');
    // You can load other assets like images here
    
}