import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 600,
  height: 340,
  physics: {
    default: 'arcade',
  },
};
