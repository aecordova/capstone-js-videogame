import Phaser from 'phaser';
import config from '../Config/config';
import make from '../Config/make';


export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    const { width, height } = config;
    this.createForm();
    const gameOverText = this.make.text({
      x: width / 2,
      y: height / 2 - 200,
      text: 'Game Over',
      style: {
        font: '50px monospace',
        fill: '#ffffff',
      },
    }).setOrigin(0.5, 0.5);

    const scoreText = this.make.text({
      x: width / 2,
      y: height / 2 - 110,
      text: `Score: ${this.score}`,
      style: {
        font: '25px monospace',
        fill: '#ffffff',
      },
    }).setOrigin(0.5, 0.5);

    this.replayButton = this.add.sprite(0, 0, 'blueButton1').setInteractive();
    this.centerObject(this.replayButton, height / 2 + 85, width, height);
    this.replayText = this.add.text(0, 0, 'Replay', { fontSize: '36px', fill: '#fff' });
    this.centerObject(this.replayText, (height / 2 - 65) + 90, width, height);

    this.replayButton.on('pointerdown', () => {
      document.querySelector('form').remove();
      this.scene.start('Game');
    });

    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton2');
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton1');
    });
  }

  createForm() {
    const form = make('form', 'name-form', document.querySelector('main'));
    make('input', 'name-input', form, { type: 'text', placeholder: 'Enter your name to submit score...' });
    const btn = make('button', 'name-submit', form, { type: 'submit' });
    btn.textContent = 'Go';

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
