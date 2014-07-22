var world_events = {

  init: function(that) {

    that.world_events_state = {};
    that.world_events_state.rain = false;
    that.world_events_state.storm = false;
    that.world_events_state.night = false;
    that.world_events_state.day = true;

    that.cloud_cover = 995;
    
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

    that.rainbow = that.effects.create(-400, 400, 'rainbow');
    that.rainbow.anchor.setTo(0.5, 0.5);
    that.rainbow.alpha = 0;
    that.rainbow.scale.x = 2;
    that.rainbow.scale.y = 2;
    
    that.darkness = that.effects.create(0, 0, 'black_screen');
    that.darkness.alpha = 0;

    that.lightning = that.effects.create(0, 0, 'lightning');
    that.lightning.alpha = 0;
  },

  startStorm: function(that){
    that.world_events_state.storm = true;
    game.add.tween(that.darkness).to( { alpha: that.darkness.alpha + 0.45 }, 15000, Phaser.Easing.Linear.None, true);
    
    
    game.time.events.add(Phaser.Timer.SECOND * 1/*this.randomizer(0, 0)*/, this.startRain, that, that);
    //game.time.events.add(Phaser.Timer.SECOND * 5, this.startLightning, this, that);
  },

  /*startLightning: function(that){
    var random_number = 1 
    game.add.tween(that.lightning).to( { alpha: 0.65 }, 200, Phaser.Easing.Linear.None, true);
    game.time.events.add(Phaser.Timer.SECOND * random_number, this.endLightning, that, that);
    game.world.addAt(that.lightning, 8);
  },

  endLightning: function(that){
    var random_number = 1
    game.add.tween(that.lightning).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
    game.time.events.add(Phaser.Timer.SECOND * random_number, this.killLightning, that, that);
    console.log('butts');
  },

  killLightning: function(that){
    var random_number = 1
    //game.time.events.add(Phaser.Timer.SECOND * 1, this.startThunder, that, random_number, that);
  },*/
  
  startThunder: function(num, that){
    console.log(num);
    that.thunder = game.add.audio('thunder_' + num);
    that.thunder.play();
  },

  startRain: function(that){
    that.world_events_state.rain = true;
    that.rain = game.add.audio('rain', 1, true);
    //that.rain.play();

    //Rain Second Layer//
    for(i = 0; i < 7; i++){
      that.rainEmitter = game.add.emitter( game.world.centerX, 0, 1200);
      that.effects.add(that.rainEmitter);
      game.world.addAt(that.rainEmitter, 8);
      that.rainEmitter.width = that.worldX;
      that.rainEmitter.makeParticles('rain');
      that.game.world.addAt(that.rainEmitter, 0);
      that.rainEmitter.minParticleScale = 0.3;
      that.rainEmitter.maxParticleScale = 0.6;
      that.rainEmitter.setYSpeed(800, 1200);
      that.rainEmitter.setXSpeed(0, -500);
      that.rainEmitter.minRotation = 0;
      that.rainEmitter.maxRotation = 5;
      game.world.addAt(that.rainEmitter, 0);
      that.rainEmitter.start(false, 1600, 5, 0);
    }

    //Rain First Layer//
    for(i = 0; i < 3; i++){
      that.rainEmitter = game.add.emitter(game.world.centerX, 0, 600);
      that.effects.add(that.rainEmitter);
      game.world.addAt(that.rainEmitter, 20);
      that.rainEmitter.width = that.worldX;
      that.rainEmitter.makeParticles('rain');
      that.game.world.addAt(that.rainEmitter, 0);
      that.rainEmitter.minParticleScale = 0.4;
      that.rainEmitter.maxParticleScale = 0.5;
      that.rainEmitter.setYSpeed(1500, 1700);
      that.rainEmitter.setXSpeed(-100, -200);
      that.rainEmitter.minRotation = 0;
      that.rainEmitter.maxRotation = 0;
      game.world.addAt(that.rainEmitter, 0);
      that.rainEmitter.start(false, 1600, 5, 0);
    }
  },

  startNight: function(that){
    that.world_events_state.night = true;
    game.world.addAt(that.darkness, 18);
    this.stopDay(that);
    game.add.tween(that.moon).to( { x: 1600 }, 45000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.moon).to( { y: -200 }, 45000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.moon.scale).to( { x: 1 }, 45000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.moon.scale).to( { y: 1 }, 45000, Phaser.Easing.Circular.None, true);
    
    game.time.events.add(Phaser.Timer.SECOND * 65, this.startDay, that, that);
  },

  stopNight: function(that) {
    that.world_events_state.night = false;
    game.add.tween(that.darkness).to( { alpha: 0 }, 5000, Phaser.Easing.Linear.None, true);
    game.add.tween(that.stars).to( { alpha: 0 }, 5000, Phaser.Easing.Linear.None, true);
    that.moon.x = 0;
    that.moon.y = 900;
  },

  startDay: function(that) {
    that.enemy_events_state.day = true;
    this.stopNight(that);
    game.add.tween(that.sun).to( { x: 1600 }, 45000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.sun).to( { y: -200 }, 45000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.sun.scale).to( { x: 2 }, 45000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.sun.scale).to( { y: 2 }, 45000, Phaser.Easing.Circular.None, true);
  },

  stopDay: function(that) {
    that.enemy_events_state.day = false;
    game.add.tween(that.darkness).to( { alpha: that.darkness.alpha + 0.6 }, 5000, Phaser.Easing.Linear.None, true);
    game.add.tween(that.stars).to( { alpha: 0.75 }, 5000, Phaser.Easing.Linear.None, true);
    that.sun.x = 0;
    that.sun.y = 900;
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
    that.cloud = that.effects.create(1800, cloud_y, this.setCloud(this.randomizer(1, 3)));
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
    
    if(that.world_events_state.storm == true){
      that.cloud.tint = '0x999999';
      that.cloud_cover = 850;
    }else{
      that.cloud_cover = 995;
    }
    
    that.cloud_count += 1;
    game.time.events.add(Phaser.Timer.SECOND * cloud_time * 0.0001, this.killCloud, that, that);
  },

  updateCloud: function(that){
    if(this.randomizer(1, 1000) > that.cloud_cover){
      this.startClouds(play_state);
    }
  },

  killCloud: function(that){
    that.cloud.destroy();
  }
};
