import Phaser from "phaser";
import MainMenu from "./mainMenu";
import MyGame from "./myGame/myGame";
import PauseMenu from "./PauseMenu";
import GameOverMenu from "./GameOverMenu";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#2d2d2d",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  scene: [MainMenu, MyGame, PauseMenu, GameOverMenu],
};

new Phaser.Game(config);