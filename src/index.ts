import Phaser from "phaser";
import MainMenu from "./mainMenu";
import MyGame from "./myGame";

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
  scene: [MainMenu, MyGame], // Add both the MainMenu and MyGame scenes
};

new Phaser.Game(config);
