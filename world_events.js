var world_events = {

  init: function(that){
    //World
    that.world_events_state = {};
    that.world_events_state.rain = false;
    that.world_events_state.storm = false;
    that.world_events_state.night = false;
    that.world_events_state.lightning = false;
    that.world_events_state.day = true;
    
    //Clouds
    that.cloud_cover = 985;
    that.cloud_tint = '0xffffff';
    that.cloud_speed = 500000;
    
    //Stars
    that.stars = that.effects.create(0, 0, 'stars');
    game.world.addAt(that.stars, 0);
    that.stars.alpha = 0;

    //Sun
    that.sun = that.effects.create(0, 900, 'sun');
    game.world.addAt(that.sun, 1);
    that.sun.anchor.setTo(0.5, 0.5);
    that.sun.scale.x = 5;
    that.sun.scale.y = 5;
    
    //Moon
    that.moon = that.effects.create(0, 900, 'moon');
    game.world.addAt(that.moon, 1);
    that.moon.anchor.setTo(0.5, 0.5);
    that.moon.scale.x = 2;
    that.moon.scale.y = 2;

    //Rainbow
    that.rainbow = that.effects.create(-400, 400, 'rainbow');
    that.rainbow.anchor.setTo(0.5, 0.5);
    that.rainbow.alpha = 0;
    that.rainbow.scale.x = 2;
    that.rainbow.scale.y = 2;
    
    //Darkness
    that.darkness = that.effects.create(0, 0, 'black_screen');
    that.darkness.alpha = 0;
    
    //Storm Darkness
    that.storm_darkness = that.effects.create(0, 0, 'black_screen');
    that.storm_darkness.alpha = 0;

    //Lightning
    that.lightning = that.effects.create(0, 0, 'lightning');
    game.world.addAt(that.lightning, 1);
    that.lightning.alpha = 0;
  },

  startStorm: function(that){
    that.world_events_state.storm = true;
    that.cloud_tint = '0x999999';
    that.cloud_speed = 90000;
    that.cloud_cover = 475;
    game.world.addAt(that.storm_darkness, 18);
    game.add.tween(that.storm_darkness).to( { alpha: 0.45 }, 15000, Phaser.Easing.Linear.None, true);
    game.time.events.add(Phaser.Timer.SECOND * (that.cloud_speed * 0.001)/2 , this.startRain, that, that);
    
    var random_time = utilities.randomizer((that.cloud_speed * 0.001) + 20, (that.cloud_speed * 0.001) + 40);
    game.time.events.add(Phaser.Timer.SECOND * that.cloud_speed, this.stopStorm, this, that);
  },

  startLightning: function(that){
    that.world_events_state.lightning = true;
    that.lightning_time = utilities.randomizer(1, 5);
    that.thunder_time = utilities.randomizer(5, 10);
    that.strike_distance = that.thunder_time - that.lightning_time;
    that.strike_intensity = 1 - (that.strike_distance * 0.1);
    that.thunder_volume = 1 - (that.strike_distance * 0.1);
    
    var flash_count = utilities.randomizer(1, 3);
    var onTime = 0.1;
    var offTime = 0.2;
    var flashTime = (onTime + offTime) * flash_count/2;

    for(i=0;i<flash_count;i++){
      var lightning_factor = i * 0.2
      game.time.events.add(Phaser.Timer.SECOND * (onTime + lightning_factor),  this.flashOn, this, that, onTime);
      game.time.events.add(Phaser.Timer.SECOND * (offTime + lightning_factor),  this.flashOff, this, that, offTime);
    }
    game.time.events.add(Phaser.Timer.SECOND * flashTime,  this.killLightning, this, that);
  },
  
  flashOn: function(that, onTime){
    game.add.tween(that.lightning).to({ alpha: that.strike_intensity }, onTime * 10, Phaser.Easing.Linear.None, true);
  },

  flashOff: function(that, offTime){
    game.add.tween(that.lightning).to( { alpha: 0 }, offTime * 100, Phaser.Easing.Linear.None, true);
  },

  killLightning: function(that){
    that.world_events_state.lightning = false;
    var lightning_choice = utilities.randomizer(1, 4);
    game.time.events.add(Phaser.Timer.SECOND * 1, this.startThunder, this, lightning_choice, that);
  },
  
  startThunder: function(num, that){
    that.thunder = game.add.audio('thunder_' + num, that.thunder_volume, false);
    that.thunder.play();
  },

  startRain: function(that){
    that.world_events_state.rain = true;
    that.rain = game.add.audio('rain', 0, true);
    that.rain.play();

    //Rain Second Layer//
    for(i = 0; i < 7; i++){
      that.rainEmitter = game.add.emitter( game.world.centerX, 0, 1200);
      that.effects.add(that.rainEmitter);
      game.world.addAt(that.rainEmitter, 8);
      that.rainEmitter.width = that.worldX;
      that.rainEmitter.makeParticles('rain');
      that.rainEmitter.minParticleScale = 0.3;
      that.rainEmitter.maxParticleScale = 0.6;
      that.rainEmitter.setYSpeed(800, 1200);
      that.rainEmitter.setXSpeed(0, -500);
      that.rainEmitter.minRotation = 0;
      that.rainEmitter.maxRotation = 5;
      that.rainEmitter.minParticleAlpha = 0;
      that.rainEmitter.maxParticleAlpha = 0.2;
      that.rainEmitter.start(false, 1600, 5, 0);
    }

    //Rain First Layer//
    for(i = 0; i < 3; i++){
      that.rainEmitter_2 = game.add.emitter(game.world.centerX, 0, 600);
      that.effects.add(that.rainEmitter_2);
      game.world.addAt(that.rainEmitter_2, 28);
      that.rainEmitter_2.particleBringToTop = true;
      that.rainEmitter_2.width = that.worldX;
      that.rainEmitter_2.makeParticles('rain');
      that.rainEmitter_2.minParticleScale = 0.4;
      that.rainEmitter_2.maxParticleScale = 0.5;
      that.rainEmitter_2.setYSpeed(1500, 1700);
      that.rainEmitter_2.setXSpeed(-100, -200);
      that.rainEmitter_2.minRotation = 0;
      that.rainEmitter_2.maxRotation = 0;
      that.rainEmitter_2.minParticleAlpha = 0;
      that.rainEmitter_2.maxParticleAlpha = 0.2;
      that.rainEmitter_2.start(false, 1600, 5, 0);
    }
    
    game.add.tween(that.rainEmitter).to( { minParticleAlpha: 0.8 }, 10000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.rainEmitter).to( { maxParticleAlpha: 1 }, 10000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.rainEmitter_2).to( { minParticleAlpha: 0.8 }, 10000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.rainEmitter_2).to( { minParticleAlpha: 1 }, 10000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.rain).to( { volume: 1 }, 10000, Phaser.Easing.Circular.None, true);
  },

  stopStorm: function(that){
    var random_alpha = (utilities.randomizer(2, 7) * 0.1);
    that.cloud_tint = '0xffffff';
    that.cloud_speed = 500000;
    that.cloud_cover = 985;
    that.cloud_tint = '0xffffff';
    that.rainEmitter.start(true, 1600, 5, 0);
    that.rainEmitter.start(true, 1600, 5, 0)
    game.add.tween(that.storm_darkness).to( { alpha: 0 }, 15000, Phaser.Easing.Linear.None, true);
    game.add.tween(that.rainbow).to( { alpha: random_alpha }, 15000, Phaser.Easing.Linear.None, true);
    game.add.tween(that.rain).to( { volume: 0 }, 10000, Phaser.Easing.Circular.None, true);
    that.world_events_state.storm = false;
  },

  startNight: function(that){
    that.world_events_state.night = true;
    game.world.addAt(that.darkness, 18);
    this.stopDay(that);
    game.add.tween(that.moon).to( { x: 1600 }, 45000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.moon).to( { y: -200 }, 45000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.moon.scale).to( { x: 1 }, 45000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.moon.scale).to( { y: 1 }, 45000, Phaser.Easing.Circular.None, true);
    
    game.time.events.add(Phaser.Timer.SECOND * 85, this.startDay, this, that);
  },

  stopNight: function(that){
    that.world_events_state.night = false;
    game.add.tween(that.darkness).to( { alpha: 0 }, 5000, Phaser.Easing.Linear.None, true);
    game.add.tween(that.stars).to( { alpha: 0 }, 5000, Phaser.Easing.Linear.None, true);
    that.moon.x = 0;
    that.moon.y = 900;
  },

  startDay: function(that){
    that.enemy_events_state.day = true;
    this.stopNight(that);
    game.add.tween(that.sun).to( { x: 1600 }, 45000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.sun).to( { y: -200 }, 45000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.sun.scale).to( { x: 2 }, 45000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.sun.scale).to( { y: 2 }, 45000, Phaser.Easing.Circular.None, true);
  },

  stopDay: function(that){
    that.enemy_events_state.day = false;
    game.add.tween(that.darkness).to( { alpha: 0.6 }, 5000, Phaser.Easing.Linear.None, true);
    game.add.tween(that.stars).to( { alpha: 0.75 }, 5000, Phaser.Easing.Linear.None, true);
    that.sun.x = 0;
    that.sun.y = 900;
  },

/*  randomizer: function(min, max, exclude){
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
  },*/

  setCloud: function(num){
    return 'cloud_' + num;
  },

  createCloud: function(that){
    var cloud_y = utilities.randomizer(0, that.worldY * 0.55);
    var cloud_scale = 0.60 - (cloud_y/that.worldY * 0.55);
    var cloud_choice = utilities.randomizer(1, 3);
    that.cloud = that.effects.create(1800, cloud_y, this.setCloud(cloud_choice));
    that.cloud.tint = that.cloud_tint;
    
    //Putting cloud in front of moon.
    that.effects.addAt(that.cloud, 2);
    that.cloud.scale.x = cloud_scale;
    that.cloud.scale.y = cloud_scale;
    that.cloud.anchor.setTo(0.5, 0.5);

    //Setting cloud to random alpha, and adding properties.
    that.cloud.alpha = utilities.randomizer(0, 7)/10;
    game.physics.p2.enable(that.cloud);
    that.cloud.body.gravityScale = 0;
    that.cloud.enableBody = true;
    that.cloud.collideWorldBounds = true;
    that.cloud.body.kinematic = true;
    
    //If there is a storm, make more clouds and make them gray.
    if(that.world_events_state.storm == true){
    }else{
    }   
    
    var cloud_time = (1 - cloud_scale) * that.cloud_speed;

    //Moving the cloud across the sky.
    game.add.tween(that.cloud).to( { x: -300 }, cloud_time, Phaser.Easing.Linear.None, true);
    
    
    //Killing clouds once they make it through the scene. 
    game.time.events.add(Phaser.Timer.SECOND * cloud_time * 0.0001, this.killCloud, that, that);
  },
  
  killCloud: function(that){
    that.cloud.destroy();
  },

  updateWorld: function(that){
    if(utilities.randomizer(1, 1000) > that.cloud_cover){
      this.createCloud(play_state);
    }
    
    if(that.world_events_state.storm == true && that.world_events_state.lightning == false){
      if(utilities.randomizer(1, 300) == 300){
        this.startLightning(that); 
      }
    } 
  }
};
