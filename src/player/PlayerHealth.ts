export default class PlayerHealth {
    static init(player: any, healthBar: any) {
      player.health = 100; // Initial health
      player.setDepth(0);
      
      // Opdater sundhedsbar
      if (healthBar) {
        healthBar.create();
      }
    }
  
    static handleCollision(player: any, healthBar: any) {
      console.log("Collision between player and enemy!");
      player.health -= 10;
  
      if (healthBar) {
        healthBar.updateHealth(player.health);
      }
  
      if (player.health <= 0) {
        console.log("Player is dead!");
        player.setAlpha(0); // Gør spilleren uset
        // Håndter død her
      }
    }
  }
  