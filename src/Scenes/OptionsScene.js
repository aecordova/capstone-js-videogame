import Phaser from 'phaser';
import config from '../Config/config';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  create() {
    const { width, height } = config;
    // var music = this.sound.add('bgMusic');
    // music.play();
    this.musicOn = true;
    this.soundOn = true;

    this.musicButton = this.add.image((width / 2) - 100, (height / 3) + 10, 'checkedBox');
    this.soundButton = this.add.image((width / 2) - 100, (height / 3) + 80, 'checkedBox');

    this.text = this.add.text((width / 2), (height / 3) - 130, 'Options', { fontSize: 40 });
    this.musicText = this.add.text((width / 2) + this.musicButton.width, (height / 3) - 30, 'Music Enabled', { fontSize: 24 });
    this.soundText = this.add.text((width / 2) + this.soundButton.width, (height / 3) + 40, 'Sound Enabled', { fontSize: 24 });

    this.text.setOrigin(0.5, 0.5);
    this.musicText.setOrigin(0.5, 0.5);
    this.soundText.setOrigin(0.5, 0.5);

    this.musicButton.setInteractive();
    this.soundButton.setInteractive();

    this.musicButton.on('pointerdown', () => {
      this.musicOn = !this.musicOn;
      this.updateAudio();
    });

    this.soundButton.on('pointerdown', () => {
      this.soundOn = !this.soundOn;
      this.updateAudio();
    });

    this.menuButton = this.add.sprite((width / 2), (height / 3) + 150, 'blueButton1').setInteractive();
    this.menuText = this.add.text((width / 2), (height / 3) + 95, 'Menu', { fontSize: '32px', fill: '#fff' });
    this.menuText.setOrigin(0.5, 0.5);

    this.menuButton.on('pointerdown', () => {
      this.scene.start('Title');
    });

    this.updateAudio();
  }

  updateAudio() {
    if (this.musicOn === false) {
      this.musicButton.setTexture('box');
    } else {
      this.musicButton.setTexture('checkedBox');
    }

    if (this.soundOn === false) {
      this.soundButton.setTexture('box');
    } else {
      this.soundButton.setTexture('checkedBox');
    }
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
