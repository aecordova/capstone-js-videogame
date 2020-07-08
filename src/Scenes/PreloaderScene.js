import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    this.add.image(400, 200, 'logo');

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();

    progressBar.fillStyle(0x222222, 0.8);
    progressBar.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.cameras.main;
    const { height } = this.cameras.cameras.main.height;

    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#fffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#fffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#fffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset:  ${file.key}`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    }).bind(this);

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    this.load.image('blueButton1', 'assets/ui/blue_button02.png');
    this.load.image('blueButton2', 'assets/ui/blue_button03.png');
    this.load.image('phaserLogo', 'assets/logo.png');

    function init() {
      this.readyCount = 0;
    }

    function ready() {
      this.readyCount += 1;
      if (this.readyCount === 2) {
        this.scene.start('Title');
      }
    }
  }

  create() {
    this.scene.start('Preloader');
  }
}
