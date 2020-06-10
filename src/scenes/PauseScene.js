import 'phaser';

export default class PauseScene extends Phaser.Scene {
  constructor() {
    super('Pause');
  }

  preload() {
  }

  create() {
  }

  update() {
    const cursorKey = this.input.keyboard.createCursorKeys();
    if (cursorKey.right.isDown || cursorKey.left.isDown || cursorKey.up.isDown) {
      this.scene.resume('Game');
      this.scene.stop();
    }
  }
}