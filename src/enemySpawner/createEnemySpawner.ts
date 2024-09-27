export default function createEnemySpawner() {
  this.time.addEvent({
    delay: 1500, // Tid i ms mellem spawns
    loop: true, // Gentag for evigt
    callback: () => {
      const spawnRadius = 700; // Maksimal afstand til spilleren for at spawne fjender
      const minSpawnDistance = 350; // Minimum afstand fra spilleren for at spawne fjender
      const angle = Phaser.Math.FloatBetween(0, 2 * Math.PI);
      const distance = Phaser.Math.Between(minSpawnDistance, spawnRadius); // Random distance between min and max

      // Beregn fjendens spawn-position relativt til spilleren
      const enemyX = this.player.x + distance * Math.cos(angle);
      const enemyY = this.player.y + distance * Math.sin(angle);

      // Opret en sprite ved hjælp af den genererede tekstur
      const enemy = this.physics.add.sprite(enemyX, enemyY, "enemyTexture");

      // Tilføj fjenden til fysikgruppen
      this.enemies.add(enemy);

      // Sæt en tilfældig hastighed for at undgå, at fjenderne stables ved spawns
      enemy.setVelocity(
        Phaser.Math.Between(-50, 50),
        Phaser.Math.Between(-50, 50)
      );

      // Gør fjendens fysiklegeme større end renderen
      const bodyWidth = 60; // Fysiklegeme bredde (større end den visuelle størrelse)
      const bodyHeight = 100; // Fysiklegeme højde
      enemy.setSize(bodyWidth, bodyHeight);

      // Juster offset, hvis fysiklegemet er større end sprite
      enemy.setOffset((40 - bodyWidth) / 2, (40 - bodyHeight) / 2); // Juster offset for at centrere legemet

      // Tildel sundhed til fjenden
      enemy.health = 3; // Hver fjende starter med 3 sundhedspunkter
    },
  });
}