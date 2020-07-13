import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 400,
  height: 300,
  physics: {
    default: 'arcade',
  },
};
