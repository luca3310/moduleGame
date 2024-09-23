export function setupMovementAnimations(anims: any) {
    if (!anims.exists("walk")) {
      anims.create({
        key: "walk",
        frames: [{ key: "playerWalk1" }, { key: "playerWalk2" }],
        frameRate: 10,
        repeat: -1,
      });
    }
  }
  