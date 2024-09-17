import Phaser from "phaser";
import MainMenu from "./mainMenu";
import MyGame from "./myGame";
import PauseMenu from "./PauseMenu";

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
  scene: [MainMenu, MyGame, PauseMenu], // Tilføj alle scener her
};

new Phaser.Game(config);