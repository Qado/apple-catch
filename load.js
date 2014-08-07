var load_state = {

    preload: function() {
      
      game.load.script('filter', 'phaser-master/filters/Marble.js')
      game.stage.backgroundColor = '#C2E7FF';

      //Loading Images//
      
      //Backgrounds//
      game.load.image('background_0', 'assets/images/backgrounds/1600/background_0.png');
      game.load.image('background_1', 'assets/images/backgrounds/1600/background_1.png');
      game.load.image('background_2', 'assets/images/backgrounds/1600/background_2.png');
      game.load.image('background_3', 'assets/images/backgrounds/1600/background_3.png');
      
      //Apples//
      game.load.image('red-apple', 'assets/images/sprites/apples/red-apple.png');
      game.load.image('green-apple', 'assets/images/sprites/apples/green-apple.png');
      game.load.image('rotten-apple', 'assets/images/sprites/apples/rotten-apple.png');
      game.load.image('golden-apple', 'assets/images/sprites/apples/golden-apple.png');
      game.load.image('poisoned-apple', 'assets/images/sprites/apples/poisoned-apple.png');
      
      //Newton//
      game.load.image('basket', 'assets/images/sprites/newton/basket.png');
      game.load.spritesheet('newton', 'assets/images/sprites/newton/newton.png', 141, 254);
      
      //Bushes//
      game.load.image('big-bush', 'assets/images/sprites/bushes/big_bush.png');
      game.load.image('leaf_1', 'assets/images/sprites/bushes/leaf_1.png');
      game.load.image('leaf_2', 'assets/images/sprites/bushes/leaf_2.png');
      game.load.image('leaf_3', 'assets/images/sprites/bushes/leaf_3.png');
      game.load.image('leaf_4', 'assets/images/sprites/bushes/leaf_4.png');
      game.load.image('leaf_5', 'assets/images/sprites/bushes/leaf_5.png');
      
      //Weather//
      game.load.image('black_screen', 'assets/images/sprites/weather/dark.png');
      game.load.image('sun', 'assets/images/sprites/weather/sun.png');
      game.load.image('moon', 'assets/images/sprites/weather/moon.png');
      game.load.image('stars', 'assets/images/sprites/weather/stars.png');
      game.load.image('cloud_1', 'assets/images/sprites/weather/cloud_1.png');
      game.load.image('cloud_2', 'assets/images/sprites/weather/cloud_2.png');
      game.load.image('cloud_3', 'assets/images/sprites/weather/cloud_3.png');
      game.load.image('rain', 'assets/images/sprites/weather/rain.png');
      game.load.image('rainbow', 'assets/images/sprites/weather/rainbow.png');
      game.load.image('lightning', 'assets/images/sprites/weather/lightning_flash.png');
      
      //Canon Ball//
      game.load.image('canon-ball', 'assets/images/sprites/enemies/canon_ball/canon_ball.png');
      game.load.image('shadow', 'assets/images/sprites/enemies/canon_ball/canon_ball_shadow.png');
      game.load.image('canon_ball_vertical_shadow', 'assets/images/sprites/enemies/canon_ball/canon_ball_vertical_shadow.png');
      
      //UFO//
      game.load.image('ufo-vertical-shadow', 'assets/images/sprites/enemies/ufo/ufo_vertical_shadow.png');
      game.load.spritesheet('ufo-horizontal-shadow', 'assets/images/sprites/enemies/ufo/ufo_shadow.png', 600, 63);
      game.load.image('beam', 'assets/images/sprites/enemies/ufo/ufo_beam.png');
      game.load.image('corona', 'assets/images/sprites/enemies/ufo/phaser_particle.png');
      game.load.image('blue-light', 'assets/images/sprites/enemies/ufo/ufo_blue_light.png');

      //Coin//
      game.load.spritesheet('coin', 'assets/images/sprites/etc/coin.png', 32, 32);
      
      //Hedgehog//
      game.load.spritesheet('hedgehog', 'assets/images/sprites/enemies/hedgehog/hedgehog_spritesheet.png', 115, 65);
      
      //Beehive//
      game.load.spritesheet('beehive', 'assets/images/sprites/enemies/beehive/beehive_spritesheet.png', 122, 122);
      
      //Raven//
      game.load.spritesheet('raven', 'assets/images/sprites/enemies/raven/raven_spritesheet.png', 125, 134);
      game.load.spritesheet('egg', 'assets/images/sprites/enemies/raven/raven_egg_spritesheet.png', 60, 92);
      game.load.image('yolk', 'assets/images/sprites/enemies/raven/egg_yolk.png');

      //Flowers//
      game.load.image('flower_1', 'assets/images/sprites/flowers/white_daisy.png');
      game.load.image('flower_2', 'assets/images/sprites/flowers/pink_tulip.png');
      game.load.image('flower_3', 'assets/images/sprites/flowers/red_poppy.png');
      game.load.image('flower_4', 'assets/images/sprites/flowers/yellow_lily.png');
      game.load.image('flower_5', 'assets/images/sprites/flowers/blue_geranium.png');
      game.load.image('flower_6', 'assets/images/sprites/flowers/violet.png');
      game.load.image('mushroom_1', 'assets/images/sprites/flowers/mushroom.png');
      game.load.image('mushroom_2', 'assets/images/sprites/flowers/glow_mushroom.png');

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
      game.load.audio('thunder_1', 'assets/sounds/thunder_1.wav');
      game.load.audio('thunder_2', 'assets/sounds/thunder_2.wav');
      game.load.audio('thunder_3', 'assets/sounds/thunder_3.wav');
      game.load.audio('thunder_4', 'assets/sounds/thunder_4.wav');
      game.load.audio('rain', 'assets/sounds/rain.wav');
      game.load.audio('bush_rustle', 'assets/sounds/bush_rustle.wav');
    },

    create: function() {

      game.state.start('play');

  }
};
