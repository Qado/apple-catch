var world_events = {

  init: function(that) {

    that.world_events_state = {};
    that.world_events_state.rain = false;
    that.world_events_state.night = false;
    
    that.stars = that.effects.create(0, 0, 'stars');
    game.world.addAt(that.stars, 0);
    that.stars.alpha = 0;

    that.sun = that.effects.create(0, 900, 'sun');
    game.world.addAt(that.sun, 3);
    that.sun.anchor.setTo(0.5, 0.5);
    that.sun.scale.x = 5;
    that.sun.scale.y = 5;
    
    that.moon = that.effects.create(0, 900, 'moon');
    game.world.addAt(that.moon, 1);
    that.moon.anchor.setTo(0.5, 0.5);
    that.moon.scale.x = 2;
    that.moon.scale.y = 2;

    that.rainbow = that.effects.create(800, 400, 'rainbow');
    that.rainbow.anchor.setTo(0.5, 0.5);
    that.rainbow.alpha = 0.4;
    that.rainbow.scale.x = 1;
    that.rainbow.scale.y = 1;
  },

  startRain: function(that){
    that.darkness_2 = that.effects.create(0, 0, 'black_screen');
    game.world.addAt(that.darkness_2, 16);
    that.darkness_2.alpha = 0;
    game.add.tween(that.darkness_2).to( { alpha: 0.45 }, 5000, Phaser.Easing.Linear.None, true);
    that.rainEmitter = game.add.emitter( game.world.centerX, 0, 1000);
    that.rainEmitter.width = 1600;
    that.rainEmitter.makeParticles('rain');
    that.game.world.addAt(that.rainEmitter, 0);
    that.rainEmitter.minParticleScale = 0.5;
    that.rainEmitter.maxParticleScale = 0.75;
    that.rainEmitter.setYSpeed(700, 900);
    that.rainEmitter.setXSpeed(-5, 5);
    that.rainEmitter.minRotation = -2;
    that.rainEmitter.maxRotation = 2;
    game.world.addAt(that.rainEmitter, 0);
    that.rainEmitter.start(false, 1600, 5, 0);
    that.world_events_state.rain = true;
  },

  startNight: function(that){
    that.darkness = that.effects.create(0, 0, 'black_screen');
    game.world.addAt(that.darkness, 16);
    that.darkness.alpha = 0;
    game.add.tween(that.darkness).to( { alpha: 0.6 }, 5000, Phaser.Easing.Linear.None, true);
    game.add.tween(that.stars).to( { alpha: 0.75 }, 5000, Phaser.Easing.Linear.None, true);
    game.add.tween(that.moon).to( { x: 1600 }, 45000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.moon).to( { y: -200 }, 45000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.moon.scale).to( { x: 1 }, 45000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.moon.scale).to( { y: 1 }, 45000, Phaser.Easing.Circular.None, true);
    that.sun.x = 0;
    that.sun.y = 900;
    that.world_events_state.night = true;
    
    game.time.events.add(Phaser.Timer.SECOND * 65, this.startDay, that, that);
  },

  startDay: function(that) {
    game.add.tween(that.darkness).to( { alpha: 0 }, 5000, Phaser.Easing.Linear.None, true);
    game.add.tween(that.stars).to( { alpha: 0 }, 5000, Phaser.Easing.Linear.None, true);
    game.add.tween(that.sun).to( { x: 1600 }, 45000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.sun).to( { y: -200 }, 45000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.sun.scale).to( { x: 2 }, 45000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.sun.scale).to( { y: 2 }, 45000, Phaser.Easing.Circular.None, true);
    that.moon.x = 0;
    that.moon.y = 900;
    that.world_events_state.night = false;
  },

  randomizer: function(min, max, exclude){
    //returns a random number from the above range
    function pickRandom(min, max){
      return Math.round(Math.random() * (max - min) + min)
    }
    random_number = pickRandom(min, max);

    //picks a random number again if there is an exclusion.
    while(random_number == exclude){
      random_number = pickRandom(min, max);
    }
    return random_number
  },

  setCloud: function(num){
    return 'cloud_' + num;
  },

  startClouds: function(that){
    var cloud_y = this.randomizer(0, that.worldY * 0.55);
    var cloud_scale = 0.60 - (cloud_y/that.worldY * 0.55);
    var cloud_time = (1 - cloud_scale) * 180000;
    that.cloud = that.effects.create(1900, cloud_y, this.setCloud(this.randomizer(1, 3)));
    game.world.addAt(that.cloud, 2);
    that.cloud.scale.x = cloud_scale;
    that.cloud.scale.y = cloud_scale;
    that.cloud.anchor.setTo(0.5, 0.5);
    that.cloud.alpha = this.randomizer(0, 7)/10;
    game.physics.p2.enable(that.cloud);
    that.cloud.body.gravityScale = 0;
    that.cloud.enableBody = true;
    that.cloud.collideWorldBounds = true;
    that.cloud.body.kinematic = true;
    game.add.tween(that.cloud).to( { x: -300 }, cloud_time, Phaser.Easing.Linear.None, true);
    that.cloud_count += 1;
  },

  updateCloud: function(that){
    if(this.randomizer(1, 1000) > 995){
      this.startClouds(play_state);
    }
  }
};
