var world_events = {

  init: function(that){
    //World
    that.world_events_state = {};
    that.world_events_state.rain = false;
    that.world_events_state.rained = false;
    that.world_events_state.storm = false;
    that.world_events_state.night = false;
    that.world_events_state.lightning = false;
    that.world_events_state.day = true;
   
    that.effects = game.add.group();
    that.effects.enableBody = true;

    //Clouds
    that.cloud_cover = 985;
    that.cloud_tint = '0xffffff';
    that.cloud_speed = 500000;

    //Storm
    that.storm_time = (that.cloud_speed * 0.0001) + utilities.randomizer(40, 60);
    
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

    //Darkness
    that.darkness = that.effects.create(0, 0, 'black_screen');
    that.darkness.alpha = 0;
    
    //Creating storm darkness
    that.storm_darkness = that.effects.create(0, 0, 'black_screen');
    that.storm_darkness.alpha = 0;

    //Creating lightning
    that.lightning = that.effects.create(0, 0, 'lightning');
    game.world.addAt(that.lightning, 1);
    that.lightning.alpha = 0;
    
    //Foreground Rain Emitter//
    that.rainEmitter_1 = game.add.emitter(game.world.centerX, 0, 6000);
    that.effects.add(that.rainEmitter_1);
    that.rainEmitter_1.particleBringToTop = true;
    that.rainEmitter_1.width = that.worldX;
    that.rainEmitter_1.makeParticles('rain');
    that.rainEmitter_1.minParticleScale = 0.4;
    that.rainEmitter_1.maxParticleScale = 0.5;
    that.rainEmitter_1.setYSpeed(1500, 1700);
    that.rainEmitter_1.setXSpeed(-100, -200);
    that.rainEmitter_1.minRotation = 0;
    that.rainEmitter_1.maxRotation = 0;
    that.rainEmitter_1.minParticleAlpha = 0;
    that.rainEmitter_1.maxParticleAlpha = 0.2;
    
    //Background Rain Emitter//
    that.rainEmitter_2 = game.add.emitter( game.world.centerX, 0, 6000);
    that.effects.add(that.rainEmitter_2);
    that.rainEmitter_2.width = that.worldX;
    that.rainEmitter_2.makeParticles('rain');
    that.rainEmitter_2.minParticleScale = 0.3;
    that.rainEmitter_2.maxParticleScale = 0.6;
    that.rainEmitter_2.setYSpeed(800, 1200);
    that.rainEmitter_2.setXSpeed(0, -500);
    that.rainEmitter_2.minRotation = 0;
    that.rainEmitter_2.maxRotation = 5;
    that.rainEmitter_2.minParticleAlpha = 0;
    that.rainEmitter_2.maxParticleAlpha = 0.2;

    //Leaf Emitter for bush//
    that.leafEmitter = game.add.emitter(800, 700, 10);
    that.leafEmitter.makeParticles('leaf_1');
    that.effects.add(that.leafEmitter);
    that.leafEmitter.width = 200;
    that.leafEmitter.height = 200;
    that.leafEmitter.minParticleScale = 0.25;
    that.leafEmitter.maxParticleScale = 0.5;
    that.leafEmitter.setYSpeed(-10, -15);
    that.leafEmitter.setXSpeed(-100, 100);
    that.leafEmitter.minRotation = -360;
    that.leafEmitter.maxRotation = 360;

    //Bush Rustle Sound//
    that.bush_rustle = game.add.audio('bush_rustle');
  },

  startStorm: function(that){
    that.world_events_state.storm = true;
    that.cloud_tint = '0x999999';
    that.cloud_speed = 90000;
    that.cloud_cover = 475;
    game.world.addAt(that.storm_darkness, 18);
    game.add.tween(that.storm_darkness).to( { alpha: 0.45 }, 15000, Phaser.Easing.Linear.None, true);
    game.time.events.add(Phaser.Timer.SECOND * (that.storm_time * 0.1), this.startRain, that, that);
    game.time.events.add(Phaser.Timer.SECOND * that.storm_time, this.stopStorm, this, that);
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
    that.world_events_state.rained = true;
    that.rain = game.add.audio('rain', 0, true);
    that.rain.play();

    if(that.world_events_state.rained == true){
      game.world.addAt(that.rainEmitter_2, that.background_2.z + 1);
      game.world.addAt(that.rainEmitter_1, that.storm_darkness.z + 2);
      that.rainEmitter_2.start(false, 2000, 1000, that.storm_time * 100, true);
      that.rainEmitter_1.start(false, 2000, 1000, that.storm_time * 100, true);
    }else{
      that.rainEmitter_2.on = false;
      that.rainEmitter_1.on = false;
    }
    
    game.add.tween(that.rainEmitter_1).to( { minParticleAlpha: 0.8 }, 30000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.rainEmitter_1).to( { maxParticleAlpha: 1 }, 30000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.rainEmitter_2).to( { minParticleAlpha: 0.8 }, 30000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.rainEmitter_2).to( { maxParticleAlpha: 1 }, 30000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.rainEmitter_1).to( { frequency: 0 }, 30000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.rainEmitter_2).to( { frequency: 0 }, 30000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.rain).to( { volume: 1 }, 90000, Phaser.Easing.Circular.None, true);
  },

  stopStorm: function(that){
    that.cloud_tint = '0xffffff';
    that.cloud_speed = 500000;
    that.cloud_cover = 985;
    that.cloud_tint = '0xffffff';
    that.rainEmitter_2.start(true, 1600, 5, 0);
    that.rainEmitter_2.start(true, 1600, 5, 0)
    game.add.tween(that.storm_darkness).to( { alpha: 0 }, 45000, Phaser.Easing.Linear.None, true);
    game.add.tween(that.rainEmitter_1).to( { frequency: 1000 }, 75000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.rainEmitter_2).to( { frequency: 1000 }, 75000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.rainEmitter_1).to( { minParticleAlpha: 0 }, 30000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.rainEmitter_1).to( { maxParticleAlpha: 0 }, 30000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.rainEmitter_2).to( { minParticleAlpha: 0 }, 30000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.rainEmitter_2).to( { maxParticleAlpha: 0 }, 30000, Phaser.Easing.Circular.None, true);
    game.add.tween(that.rain).to( { volume: 0 }, 15000, Phaser.Easing.Circular.None, true);
    game.time.events.add(Phaser.Timer.SECOND * 5, flowers.spawnFlower, flowers, that);
    game.time.events.add(Phaser.Timer.SECOND * 10, this.stopRain, that, that);
    game.time.events.add(Phaser.Timer.SECOND * 20, this.startRainbow, that, that);
    that.world_events_state.storm = false;
  },

  stopRain: function(that){ 
    that.world_events_state.rained = true;

  },
  
  startRainbow: function(that){
    var rainbow_x = utilities.randomizer(-400, 400);
    var rainbow_y = utilities.randomizer(400, 600);
    var rainbow_alpha = (utilities.randomizer(1, 3) * 0.1);
    that.rainbow = that.effects.create(-400, 400, 'rainbow');
    that.rainbow.anchor.setTo(0.5, 0.5);
    that.rainbow.alpha = 0;
    that.rainbow.scale.x = 2;
    that.rainbow.scale.y = 2;
    
    game.add.tween(that.rainbow)
    .to( { alpha: rainbow_alpha }, 10000, Phaser.Easing.Linear.None, true)
    .to( { alpha: 0 }, 20000, Phaser.Easing.Linear.None, true)
    .start();
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
  
  setCloud: function(num){
    return 'cloud_' + num;
  },
  
  createCloudySky: function(that){
    that.cloud_speed = 1;
    that.cloud_cover = 1;

    for(i=0; i > 20; i++){
      this.createCloud(that);
    }
  },
  

  createCloud: function(that){
    var cloud_x = utilities.randomizer(0, 1800);
    var cloud_y = utilities.randomizer(0, that.worldY * 0.55);
    var cloud_scale = 0.60 - (cloud_y/that.worldY * 0.55);
    var cloud_choice = utilities.randomizer(1, 3);
    var cloud = that.effects.create(cloud_x, cloud_y, this.setCloud(cloud_choice));
    var cloud_alpha = utilities.randomizer(1, 8)/10;
    var cloud_time = (1 - cloud_scale) * (that.cloud_speed * cloud_x/1800);
    var cloud_fadein_time = utilities.randomizer(1, (cloud_time * 0.001)/8);
    var cloud_fadeout_time = utilities.randomizer(1, cloud_time);
    
    //Putting cloud in front of moon.
    that.effects.addAt(cloud, 2);
    cloud.scale.x = cloud_scale;
    cloud.scale.y = cloud_scale;
    cloud.tint = that.cloud_tint;
    cloud.alpha = 0;
    cloud.anchor.setTo(0.5, 0.5);
    game.physics.p2.enable(cloud);
    cloud.body.gravityScale = 0;
    cloud.enableBody = true;
    cloud.collideWorldBounds = true;
    cloud.body.kinematic = true;

    //Moving the cloud across the sky.
    game.add.tween(cloud).to( { alpha: cloud_alpha }, cloud_fadein_time * 1000, Phaser.Easing.Linear.None, true);
    game.add.tween(cloud).to( { x: -300 }, cloud_time, Phaser.Easing.Linear.None, true);
    
    //Killing clouds once they make it through the scene. 
    game.time.events.add(Phaser.Timer.SECOND * (cloud_time * 0.001) / 2 , this.fadeOutCloud, that, that, cloud, cloud_fadeout_time);
    game.time.events.add(Phaser.Timer.SECOND * (cloud_time * 0.001) + 1, this.killCloud, that, that, cloud);
  },

  fadeOutCloud: function(that, cloud, cloud_fadeout_time){
  
    var cloud_alpha = utilities.randomizer(0, 5)/10;
    game.add.tween(cloud).to( { alpha: cloud_alpha }, cloud_fadeout_time * 1000, Phaser.Easing.Linear.None, true);
  },

  killCloud: function(that, cloud){
    cloud.destroy();
  },

  shakeRightBush: function(){
    that = utilities.fetchContext();

    that.bush_rustle.play();
    game.world.addAt(that.leafEmitter, that.right_bush.z + 1);
    that.leafEmitter.x = 1575;
    that.leafEmitter.start(true, 1000, 10, 100, true);
    game.add.tween(that.right_bush.body)
      .to( { x: '+4' }, 50, Phaser.Easing.Linear.None, true)
      .to( { x: '-4' }, 50, Phaser.Easing.Linear.None, true)
      .to( { x: '+4' }, 50, Phaser.Easing.Linear.None, true)
      .to( { x: '-4' }, 50, Phaser.Easing.Linear.None, true)
      .to( { x: '+4' }, 50, Phaser.Easing.Linear.None, true)
      .to( { x: '-4' }, 50, Phaser.Easing.Linear.None, true)
      .to( { x: that.worldX + 50 }, 50, Phaser.Easing.Linear.None, true)
      .start();
  },

  shakeLeftBush: function(){
    that = utilities.fetchContext();

    that.bush_rustle.play();
    game.world.addAt(that.leafEmitter, that.right_bush.z + 1);
    that.leafEmitter.x = 25;
    that.leafEmitter.start(true, 1000, 10, 100, true);
    game.add.tween(that.left_bush.body)
      .to( { x: '+4' }, 50, Phaser.Easing.Linear.None, true)
      .to( { x: '-4' }, 50, Phaser.Easing.Linear.None, true)
      .to( { x: '+4' }, 50, Phaser.Easing.Linear.None, true)
      .to( { x: '-4' }, 50, Phaser.Easing.Linear.None, true)
      .to( { x: '+4' }, 50, Phaser.Easing.Linear.None, true)
      .to( { x: '-4' }, 50, Phaser.Easing.Linear.None, true)
      .to( { x: -50 }, 50, Phaser.Easing.Linear.None, true)
      .start();
  },

  updateWorld: function(that){
    if(utilities.randomizer(1, 1000) > that.cloud_cover){
      this.createCloud(that);
    }
    
    /*if(that.world_events_state.storm == true && that.world_events_state.lightning == false){
      if(utilities.randomizer(1, 300) == 300){
        this.startLightning(that); 
      }
    }*/ 
  }
};
