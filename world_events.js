var world_events = {

  init: function(that) {

    that.world_events_state = {};
    that.world_events_state.rain = false;
    that.world_events_state.night = false;
    
    that.stars = game.add.sprite(0, 0, 'stars');
    that.stars.alpha = 0;
    that.moon = game.add.sprite(0, 700, 'moon');
    that.moon.anchor.setTo(0.5, 0.5);
    that.moon.fixedToCamera = false;
  },

  startRain: function(that){
    that.rainEmitter = game.add.emitter( game.world.centerX, 0, 1000);
    that.rainEmitter.width = 1600;
    that.rainEmitter.makeParticles('rain');
    that.game.world.addAt(that.rainEmitter, 0);
    that.rainEmitter.minParticleScale = 0.5;
    that.rainEmitter.maxParticleScale = 0.75;
    that.rainEmitter.setYSpeed(300, 500);
    that.rainEmitter.setXSpeed(-5, 5);
    that.rainEmitter.minRotation = -2;
    that.rainEmitter.maxRotation = 2;
    that.rainEmitter.start(false, 1600, 5, 0);
    that.world_events_state.rain = true;
  },

  startNight: function(that){
    that.darkness = game.add.sprite(0, 0, 'black_screen');
    that.darkness.alpha = 0;
    game.add.tween(that.darkness).to( { alpha: 0.6 }, 5000, Phaser.Easing.Linear.None, true);
    game.add.tween(that.stars).to( { alpha: 0.75 }, 5000, Phaser.Easing.Linear.None, true);
    game.add.tween(that.moon).to( { x: 800 }, 30000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.moon).to( { y: 0 }, 30000, Phaser.Easing.Circular.None, true);
    that.world_events_state.night = true;

    game.time.events.add(Phaser.Timer.SECOND * 65, this.startDay, that, that);
  },

  startDay: function(that) {
    game.add.tween(that.darkness).to( { alpha: 0 }, 5000, Phaser.Easing.Linear.None, true);
    game.add.tween(that.stars).to( { alpha: 0 }, 5000, Phaser.Easing.Linear.None, true);
    that.moon.x = 50;
    that.moon.y = 700;
    that.world_events_state.night = false;
  }

};

