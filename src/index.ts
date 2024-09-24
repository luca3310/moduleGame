import Phaser from "phaser";
import MainMenu from "./mainMenu/mainMenu";
import MyGame from "./myGame/myGame";
import PauseMenu from "./pauseMenu/PauseMenu";
import GameOverMenu from "./gameOverMenu/GameOverMenu";
import SettingsMenu from "./settingsMenu/SettingsMenu";

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
  scene: [MainMenu, SettingsMenu, MyGame, PauseMenu, GameOverMenu],
};

new Phaser.Game(config);