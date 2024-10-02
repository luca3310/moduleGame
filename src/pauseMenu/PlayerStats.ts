import Phaser from "phaser";

export function createPlayerStats(scene: Phaser.Scene): { [key: string]: Phaser.GameObjects.Text } {
  const playerStats: { [key: string]: Phaser.GameObjects.Text } = {};

  let statY = 100;
  const statX = 50;
  const fontStyle = { fontSize: "20px", color: "#ffffff", fontFamily: "Roboto, sans-serif" };

  const initialStats = ["Health", "Damage", "Fire Rate", "Speed"];
  for (const stat of initialStats) {
    playerStats[stat] = scene.add.text(statX, statY, `${stat}: --`, fontStyle)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(2);

    statY += 40;
  }

  return playerStats;
}


export function updatePlayerStatsDisplay(
  playerStats: { [key: string]: Phaser.GameObjects.Text },
  stats: { [key: string]: number }
): void {
  for (const [key, value] of Object.entries(stats)) {
    if (playerStats[key]) {
      playerStats[key].setText(`${key}: ${value}`);
    }
  }
}