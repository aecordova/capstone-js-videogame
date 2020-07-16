import Phaser from 'phaser';
import blueButton1 from '../assets/ui/blue_button02.png';
import blueButton2 from '../assets/ui/blue_button03.png';
import mainLogo from '../assets/zenva_logo.png';
import box from '../assets/ui/grey_box.png';
import checkedBox from '../assets/ui/blue_boxCheckmark.png';
import bgMusic from '../assets/TownTheme.mp3';
import platform from '../assets/gameplay/platform.png';
import player from '../assets/gameplay/catrun.png';
import zombie from '../assets/gameplay/zombie.png';
import star from '../assets/gameplay/stars.png';
import background from '../assets/gameplay/background.png';
import clouds1 from '../assets/gameplay/clouds1.png';
import clouds2 from '../assets/gameplay/clouds2.png';



export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    const { width } = this.cameras.main;
    const { height } = this.cameras.main;

    const progressBar = this.add.graphics({
      x: -(width / 2),
      y: -(height / 2),
    });
    const progressBox = this.add.graphics({
      x: -(width / 2),
      y: -(height / 2),
    });

    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRoundedRect(240, 270, 320, 50);

    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 100,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });

    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRoundedRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.image('blueButton1', blueButton1);
    this.load.image('blueButton2', blueButton2);
    this.load.image('mainLogo', mainLogo);
    this.load.image('box', box);
    this.load.image('checkedBox', checkedBox);
    this.load.image('platform', platform);
    this.load.image('bg', background);
    this.load.image('clouds1', clouds1);
    this.load.image('clouds2', clouds2);
    this.load.spritesheet('player', player, {
      frameWidth: 40,
      frameHeight: 50,
    });
    this.load.spritesheet('zombie', zombie, {
      frameWidth: 45,
      frameHeight: 58,
    });
    this.load.spritesheet('star', star, {
      frameWidth: 22,
      frameHeight: 22,
    });

    this.load.audio('bgMusic', [bgMusic]);

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.add.image(width / 2, height / 2, 'mainLogo');
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);
  }

  ready() {
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Game');
    }
  }
}
