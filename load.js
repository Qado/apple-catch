var load_state = {

    preload: function() {
      
      game.load.script('filter', 'phaser-master/filters/Marble.js')
      game.stage.backgroundColor = '#C2E7FF';

      //Loading Images//
      game.load.image('background_0', 'assets/images/backgrounds/1600/background_0.png');
      game.load.image('background_1', 'assets/images/backgrounds/1600/background_1.png');
      game.load.image('background_2', 'assets/images/backgrounds/1600/background_2.png');
      game.load.image('background_3', 'assets/images/backgrounds/1600/background_3.png');
      game.load.image('red-apple', 'assets/images/sprites/red-apple.png');
      game.load.image('green-apple', 'assets/images/sprites/green-apple.png');
      game.load.image('rotten-apple', 'assets/images/sprites/rotten-apple.png');
      game.load.image('golden-apple', 'assets/images/sprites/golden-apple.png');
      game.load.image('poisoned-apple', 'assets/images/sprites/poisoned-apple.png');
      game.load.image('basket', 'assets/images/sprites/basket.png');
      game.load.image('big-bush', 'assets/images/sprites/big_bush.png');
      game.load.image('rain', 'assets/images/sprites/rain.png');
      game.load.image('black_screen', 'assets/images/sprites/dark.png');
      game.load.image('moon', 'assets/images/sprites/moon.png');
      game.load.image('stars', 'assets/images/sprites/stars.png');
      game.load.image('yolk', 'assets/images/sprites/egg_yolk.png');
      game.load.image('canon-ball', 'assets/images/sprites/canon_ball.png');
      game.load.image('shadow', 'assets/images/sprites/canon_ball_shadow.png');
      game.load.image('ufo-vertical-shadow', 'assets/images/sprites/ufo_vertical_shadow.png');
      game.load.image('beam', 'assets/images/sprites/ufo_beam.png');
      game.load.image('corona', 'assets/images/sprites/phaser_particle.png');
      game.load.image('blue-light', 'assets/images/sprites/ufo_blue_light.png');
      game.load.image('apple-range', 'assets/images/sprites/apple_range.png');
      game.load.image('rainbow', 'assets/images/sprites/rainbow.png');
      game.load.image('sun', 'assets/images/sprites/sun.png');
      game.load.image('cloud_1', 'assets/images/sprites/cloud_1.png');
      game.load.image('cloud_2', 'assets/images/sprites/cloud_2.png');
      game.load.image('cloud_3', 'assets/images/sprites/cloud_3.png');

      //Loading Spritesheets//
      game.load.spritesheet('coin', 'assets/images/sprites/coin.png', 32, 32);
      game.load.spritesheet('newton', 'assets/images/sprites/newton.png', 141, 254);
      game.load.spritesheet('hedgehog', 'assets/images/sprites/hedgehog_spritesheet.png', 115, 65);
      game.load.spritesheet('beehive', 'assets/images/sprites/beehive_spritesheet.png', 122, 122);
      game.load.spritesheet('raven', 'assets/images/sprites/raven_spritesheet.png', 125, 134);
      game.load.spritesheet('egg', 'assets/images/sprites/raven_egg_spritesheet.png', 60, 92);
      game.load.spritesheet('ufo-horizontal-shadow', 'assets/images/sprites/ufo_shadow.png', 600, 63);

      //Loading Audio//
      game.load.audio('theme-song', 'assets/sounds/game_theme.mp3');
      game.load.audio('red-score', 'assets/sounds/red_sound.wav');
      game.load.audio('green-score', 'assets/sounds/green_sound.wav');
      game.load.audio('golden-score', 'assets/sounds/golden_sound.wav');
      game.load.audio('poison-sound', 'assets/sounds/poison_sound.wav');
      game.load.audio('poison-song', 'assets/sounds/poison_theme.wav');
      game.load.audio('collision-sound', 'assets/sounds/collide.wav');
      game.load.audio('flap', 'assets/sounds/raven_flap.wav');
      game.load.audio('canon-fire', 'assets/sounds/fire_canon.wav');
    },

    create: function() {

      game.state.start('play');

  }
};
