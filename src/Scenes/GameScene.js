import Phaser from 'phaser';
import gameOptions from '../Config/gameOptions';
import config from '../Config/config';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    const { width, height } = config;
    this.addedPlatforms = 0;
    this.playerJumps = 0;
    this.dying = false;
    this.score = 0;

    this.add.image(0, 0, 'bg').setScale(0.5, 0.5).setOrigin(0.2, 0.1);
    this.scoreText = this.make.text({
      x: width / 2,
      y: height - 40,
      text: `Score: ${this.score}`,
      style: {
        font: '15px monospace',
        fill: '#ffffff',
      },
    }).setOrigin(0.5, 0.5);

    this.smallCloudGroup = this.add.group();
    this.bigCloudGroup = this.add.group();

    this.platformGroup = this.add.group({
      removeCallback(platform) {
        platform.scene.platformPool.add(platform);
      },
    });
    this.platformPool = this.add.group({
      removeCallback(platform) {
        platform.scene.platformGroup.add(platform);
      },
    });
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player', {
        start: 0,
        end: 8,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.zombieGroup = this.add.group({
      removeCallback(zombie) {
        zombie.scene.zombiePool.add(zombie);
      },
    });
    this.zombiePool = this.add.group({
      removeCallback(zombie) {
        zombie.scene.zombieGroup.add(zombie);
      },
    });
    this.anims.create({
      key: 'zombieAttack',
      frames: this.anims.generateFrameNumbers('zombie', {
        start: 0,
        end: 8,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.starGroup = this.add.group({
      removeCallback(star) {
        star.scene.starPool.add(star);
      },
    });
    this.starPool = this.add.group({
      removeCallback(star) {
        star.scene.starGroup.add(star);
      },
    });
    this.anims.create({
      key: 'shine',
      frames: this.anims.generateFrameNumbers('star', {
        start: 0,
        end: 6,
      }),
      frameRate: 12,
      repeat: -1,
    });

    this.addPlatform(
      width,
      width / 2,
      height * gameOptions.platformVerticalLimit[1],
    );

    this.player = this.physics.add.sprite(
      gameOptions.playerStartPosition,
      height / 2,
      'player',
    );
    this.player.setGravityY(gameOptions.playerGravity);
    this.player.setDepth(2);

    this.platformCollider = this.physics.add.collider(this.player, this.platformGroup, () => {
      if (!this.player.anims.isPlaying) {
        this.player.anims.play('run');
      }
    }, null, this);

    this.physics.add.overlap(this.player, this.zombieGroup, () => {
      this.dying = true;
      this.player.anims.stop();
      this.player.setFrame(2);
      this.player.body.setVelocityY(-200);
      this.physics.world.removeCollider(this.platformCollider);
    }, null, this);

    this.physics.add.overlap(this.player, this.starGroup, (player, star) => {
      this.score += 100;
      this.tweens.add({
        targets: star,
        y: star.y - 100,
        alpha: 0,
        duration: 800,
        ease: 'Cubic.easeOut',
        callbackScope: this,
        onComplete() {
          this.starGroup.killAndHide(star);
          this.starGroup.remove(star);
        },
      });
    });

    this.input.on('pointerdown', this.jump, this);
  }

  addPlatform(platformWidth, posX, posY) {
    this.addedPlatforms += 1;
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.y = posY;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
      platform.displayWidth = platformWidth;
      platform.tileScaleX = 1 / platform.scaleX;
    } else {
      platform = this.add.tileSprite(posX, posY, platformWidth, 45, 'platform');
      this.physics.add.existing(platform);
      platform.body.setImmovable(true);
      platform.body.setVelocityX(
        Phaser.Math.Between(
          gameOptions.platformSpeedRange[0],
          gameOptions.platformSpeedRange[1],
        ) * -1,
      );
      platform.setDepth(2);
      this.platformGroup.add(platform);
    }
    this.nextPlatformDistance = Phaser.Math.Between(
      gameOptions.spawnRange[0],
      gameOptions.spawnRange[1],
    );

    if (this.addedPlatforms > 1) {
      if (Phaser.Math.Between(1, 100) <= gameOptions.zombieProbability) {
        if (this.zombiePool.getLength()) {
          const zombie = this.zombiePool.getFirst();
          zombie.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth);
          zombie.y = posY - 46;
          zombie.alpha = 1;
          zombie.active = true;
          zombie.visible = true;
          this.zombiePool.remove(zombie);
        } else {
          const zombie = this.physics.add.sprite(
            posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth),
            posY - 46, 'zombie',
          );
          zombie.setImmovable(true);
          zombie.setVelocityX(platform.body.velocity.x);
          zombie.setSize(8, 2, true);
          zombie.anims.play('zombieAttack');
          zombie.setDepth(2);
          this.zombieGroup.add(zombie);
        }
      }
      if (Phaser.Math.Between(1, 100) <= gameOptions.starProbability) {
        if (this.starPool.getLength()) {
          const star = this.starPool.getFirst();
          star.x = posX;
          star.y = posY - 80;
          star.alpha = 1;
          star.active = true;
          star.visible = true;
          this.starPool.remove(star);
        } else {
          const star = this.physics.add.sprite(posX, posY - 80, 'star');
          star.setImmovable(true);
          star.setVelocityX(platform.body.velocity.x);
          star.anims.play('shine');
          star.setDepth(2);
          this.starGroup.add(star);
        }
      }
    }
  }

  jump() {
    if ((!this.dying)
      && (this.player.body.touching.down
      || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps))) {
      if (this.player.body.touching.down) {
        this.playerJumps = 0;
      }
      this.player.setVelocityY(gameOptions.jumpForce * -1);
      this.playerJumps += 1;
      this.player.anims.stop();
    }
  }

  update() {
    if (this.player.y > config.height) {
      this.scene.start('Game');
    }
    this.player.x = gameOptions.playerStartPosition;
    this.scoreText.setText(`Score: ${this.score}`);

    let minDistance = config.width;
    let rightmostPlatformHeight = 0;
    this.platformGroup.getChildren().forEach((platform) => {
      const platformDistance = config.width - platform.x - platform.displayWidth / 2;
      if (platformDistance < minDistance) {
        minDistance = platformDistance;
        rightmostPlatformHeight = platform.y;
      }
      if (platform.x < -platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);

    this.starGroup.getChildren().forEach((star) => {
      if (star.x < -star.displayWidth / 2) {
        this.starGroup.killAndHide(star);
        this.starGroup.remove(star);
      }
    }, this);

    this.zombieGroup.getChildren().forEach((zombie) => {
      if (zombie.x < -zombie.displayWidth / 2) {
        this.zombieGroup.killAndHide(zombie);
        this.zombieGroup.remove(zombie);
      }
    }, this);

    if (minDistance > this.nextPlatformDistance) {
      const nextPlatformWidth = Phaser.Math.Between(
        gameOptions.platformSizeRange[0],
        gameOptions.platformSizeRange[1],
      );
      const platformRandomHeight = gameOptions.platformHeighScale * Phaser.Math.Between(
        gameOptions.platformHeightRange[0],
        gameOptions.platformHeightRange[1],
      );
      const nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
      const minPlatformHeight = config.height * gameOptions.platformVerticalLimit[0];
      const maxPlatformHeight = config.height * gameOptions.platformVerticalLimit[1];
      const nextPlatformHeight = Phaser.Math.Clamp(
        nextPlatformGap, minPlatformHeight,
        maxPlatformHeight,
      );
      this.addPlatform(nextPlatformWidth, config.width + nextPlatformWidth / 2, nextPlatformHeight);
    }
  }
}
