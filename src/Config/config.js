import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 600,
  height: 400,
  physics: {
    default: 'arcade',
  },
};
