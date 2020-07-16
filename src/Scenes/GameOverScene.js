import Phaser from 'phaser';
import config from '../Config/config';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    const { width, height } = config;

    const gameOverText = this.make.text({
      x: width / 2,
      y: height / 2 - 150,
      text: 'Game Over',
      style: {
        font: '50px monospace',
        fill: '#ffffff',
      },
    }).setOrigin(0.5, 0.5);

    const scoreText = this.make.text({
      x: width / 2,
      y: height / 2 - 60,
      text: `Score: ${this.score}`,
      style: {
        font: '25px monospace',
        fill: '#ffffff',
      },
    }).setOrigin(0.5, 0.5);

    this.replayButton = this.add.sprite(0, 0, 'blueButton1').setInteractive();
    this.centerObject(this.replayButton, height / 2 + 70, width, height);
    this.replayText = this.add.text(0, 0, 'Replay', { fontSize: '36px', fill: '#fff' });
    this.centerObject(this.replayText, (height / 2 - 65) + 75, width, height);
    this.replayButton.on('pointerdown', () => {
      this.scene.start('Game');
    });

    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton2');
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton1');
    });
  }

  centerObject(gameObject, offset = 0, baseWidth, baseHeight) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(
        baseWidth / 2,
        offset,
        baseWidth,
        baseHeight / 2,
      ),
    );
  }
}
