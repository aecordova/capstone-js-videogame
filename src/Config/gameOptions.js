const gameOptions = {
  platformSpeedRange: [300, 300],

  // mountain speed, in pixels per second
  mountainSpeed: 80,

  // spawn range, how far should be the rightmost platform from the right edge
  // before next platform spawns, in pixels
  spawnRange: [80, 300],

  // platform width range, in pixels
  platformSizeRange: [10, 300],

  // a height range between rightmost platform and next platform to be spawned
  platformHeightRange: [-4, 4],

  // a scale to be multiplied by platformHeightRange
  platformHeighScale: 20,

  // platform max and min height, as screen height ratio
  platformVerticalLimit: [0.4, 0.8],

  // player gravity
  playerGravity: 900,

  // player jump force
  jumpForce: 400,

  playerStartPosition: 200,

  jumps: 2,

  coinPercent: 25,
  firePercent: 25,
};

export default gameOptions;