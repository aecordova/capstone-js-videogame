import Phaser from 'phaser';
import config from '../Config/config';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    const { width, height } = config;

    this.gameButton = this.add.sprite(0, 0, 'blueButton1').setInteractive();
    this.optionsButton = this.add.sprite(0, 0, 'blueButton1').setInteractive();
    this.creditsButton = this.add.sprite(0, 0, 'blueButton1').setInteractive();

    this.centerObject(this.gameButton, height / 2 - 70, width, height);
    this.centerObject(this.optionsButton, height / 2, width, height);
    this.centerObject(this.creditsButton, height / 2 + 70, width, height);

    this.gameText = this.add.text(0, 0, 'Play', { fontSize: '36px', fill: '#fff' });
    this.optionsText = this.add.text(0, 0, 'Options', { fontSize: '36px', fill: '#fff' });
    this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '36px', fill: '#fff' });

    this.centerObject(this.gameText, (height / 2 - 65) - 70, width, height);
    this.centerObject(this.optionsText, (height / 2 - 65), width, height);
    this.centerObject(this.creditsText, (height / 2 - 65) + 70, width, height);

    this.gameButton.on('pointerdown', () => {
      this.scene.start('Game');
    });

    this.optionsButton.on('pointerdown', () => {
      this.scene.start('Options');
    });

    this.creditsButton.on('pointerdown', () => {
      this.scene.start('Credits');
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
