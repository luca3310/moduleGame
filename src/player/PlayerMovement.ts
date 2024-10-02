export function setupMovementAnimations(anims: any) {
    if (!anims.exists("walk")) {
      anims.create({
        key: "walk",
        frames: [{ key: "playerRun1" }, { key: "playerRun2" },{ key: "playerRun3" },{ key: "playerRun4" },],
        frameRate: 10,
        repeat: -1,
      });
    }
  }
  