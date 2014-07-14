var world_events = {

  eventsReset: function() {
  
    this.event_status = {};
    this.event_status.rain = false;
    this.event_status.night = false;
  },

  rainData: function(){

    this.rainEmitter = game.add.emitter(game.world.centerX, 0, 1000);
    this.rainEmitter.width = 1600;

    this.rainEmitter.makeParticles('rain');

    this.rainEmitter.minParticleScale = 0.2;
    this.rainEmitter.maxParticleScale = 0.75;

    this.rainEmitter.setYSpeed(300, 500);
    this.rainEmitter.setXSpeed(-5, 5);

    this.rainEmitter.minRotation = 0;
    this.rainEmitter.maxRotation = 0;

  },

  startRain: function(){
    this.rainEmitter.start(false, 1600, 5, 0);
    this.event_status.rain = true;
  },

  startNight: function(){
    this.darkness = game.add.sprite(0, 0, 'black_screen');
    this.darkness.alpha = 0;
    game.add.tween(this.darkness).to( { alpha: 0.6 }, 5000, Phaser.Easing.Linear.None, true);
    game.add.tween(this.stars).to( { alpha: 0.75 }, 5000, Phaser.Easing.Linear.None, true);
    game.add.tween(this.moon).to( { x: 1000 }, 30000, Phaser.Easing.Circular.None, true);
    game.add.tween(this.moon).to( { y: 0 }, 30000, Phaser.Easing.Circular.None, true);
    this.event_status.night = true;

    game.time.events.add(Phaser.Timer.SECOND * 65, this.startDay, this);
  },

  startDay: function() {
    
    game.add.tween(this.darkness).to( { alpha: 0 }, 5000, Phaser.Easing.Linear.None, true);
    game.add.tween(this.stars).to( { alpha: 0 }, 5000, Phaser.Easing.Linear.None, true);
    this.moon.x = 50;
    this.moon.y = 700;
    this.event_status.night = false;
  },

  createNightSprites: function(){
    this.stars = game.add.sprite(0, 0, 'stars');
    this.stars.alpha = 0;
    this.moon = game.add.sprite(50, 700, 'moon');
    this.moon.fixedToCamera = false;
  }
};
