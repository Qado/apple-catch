var enemy_events = {

  init: function(that){
    that.enemy_events_state = {};
    
    that.enemy_events_state.hedgehog = false;
    
    that.enemy_events_state.beehive = false;
    
    that.enemy_events_state.raven = false;
    that.enemy_events_state.raven_born = false;
    
    that.enemy_events_state.egg = false;
    that.enemy_events_state.egg_cracked = false;
    
    that.enemy_events_state.yolk = false;
    that.enemy_events_state.yolk_born = false;
    
    that.enemy_events_state.canon = false;
    
    that.enemy_events_state.UFO = false;
    that.enemy_events_state.UFO_beam = false;

    that.UFO_round = 0;
    that.UFO_move = false;
 
    that.enemy = game.add.group();
    that.enemy.enableBody = true;
    that.enemy.physicsBodyType = Phaser.Physics.P2JS;

    that.egg_pieces = game.add.group();
    that.egg_pieces.enableBody = true;
    that.egg_pieces.physicsBodyType = Phaser.Physics.P2JS;

    that.raven_flap = game.add.audio('flap');
    that.raven_caw = game.add.audio('caw', 10);
    that.egg_crush = game.add.audio('egg-crush', 5);
    that.canon_fire = game.add.audio('canon-fire');
  },

  spawnHedgehog: function(that){
    that.enemy_events_state.hedgehog = true;
    
    that.hedgehog_direction = utilities.randomizer(-1, 1, 0);
    
    if(that.hedgehog_direction == -1){
     world_events.shakeRightBush(play_state);
    }
    if(that.hedgehog_direction == 1){
     world_events.shakeLeftBush(play_state);
    }
    game.time.events.add(Phaser.Timer.SECOND * 0.5, this.defineHedgehog, this, that);
  },

  defineHedgehog: function(that){
    that.hedgehog = that.enemy.create(0, 700, 'hedgehog');
    game.world.addAt(that.hedgehog, that.left_bush.z - 1);
    game.physics.p2.enable(that.hedgehog);
    that.hedgehog.scale.x = that.hedgehog_direction;
    that.hedgehog.body.x = Math.abs((that.hedgehog_direction * that.worldX) - that.worldX) / 2;
    that.hedgehog.body.fixedBody = true;
    
    that.hedgehog.body.setCollisionGroup(that.enemy_collision_group);
    that.hedgehog.body.collides([that.ground_collision_group, that.newton_collision_group]);
    
    that.hedgehog.body.mass = 65;
    that.hedgehog.body.collideWorldBounds = false;
    game.add.tween(that.hedgehog).to( { x: 0 }, 1000, Phaser.Easing.Linear.Out, true);
    that.hedgehog.animations.add('walk', [0, 1, 2, 1], 20, true);
    that.hedgehog.animations.play('walk');
    if(that.hedgehog_direction == -1){
      game.add.tween(that.hedgehog.body).to( { x: 0 }, 3000, Phaser.Easing.Linear.Out, true); 
    }else{
      game.add.tween(that.hedgehog.body).to( { x: that.worldX }, 3000, Phaser.Easing.Linear.Out, true); 
    }
    game.time.events.add(Phaser.Timer.SECOND * 3.005, this.__removeHedgehog, this, that);
    game.time.events.add(Phaser.Timer.SECOND * 10, this.__killHedgehog, this, that);
  },

  __removeHedgehog: function(that) {
    if(that.hedgehog_direction == -1){
      world_events.shakeLeftBush(play_state);
    }
    if(that.hedgehog_direction == 1){
      world_events.shakeRightBush(play_state);
    }
  },
 
  __killHedgehog: function(that){
    that.enemy_events_state.hedgehog = false;
    that.hedgehog.destroy();
  },
  
  spawnRaven: function(that){
    that.enemy_events_state.raven = true;
    that.raven_direction = utilities.randomizer(-1, 1, 0);
    that.raven_caw.play();
    game.time.events.add(Phaser.Timer.SECOND * 0.5, this.defineRaven, this, that);
  },

  defineRaven: function(that){
    var ypos = (that.score + 250 < 450 ? that.score + 250 : 450);
    that.raven = that.enemy.create(0, ypos, 'raven');
    that.enemy_events_state.raven_born = true;
    game.world.addAt(that.raven, that.left_bush.z - 1);
    that.raven.scale.x = (that.raven_direction * -1);
    that.raven.body.x = Math.abs((that.raven_direction * that.worldX) - that.worldX) / 2;
    that.raven.body.fixedBody = true;
    that.raven.body.data.gravityScale = 0;
    
    that.raven.body.setCollisionGroup(that.enemy_collision_group);
    that.raven.body.collides([that.ground_collision_group, that.newton_collision_group]);
    
    that.raven.body.collideWorldBounds = false;
    game.add.tween(that.raven).to( { x: 0 }, 1000, Phaser.Easing.Linear.Out, true);
    that.raven.animations.add('flap', [0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1], 75, true);
    that.raven.animations.play('flap');
    that.raven_flap.play();
    if(that.raven_direction == -1){
      game.add.tween(that.raven.body).to( { x: -100 }, 3000, Phaser.Easing.Linear.Out, true); 
    }else{
      game.add.tween(that.raven.body).to( { x: that.worldX + 100 }, 3000, Phaser.Easing.Linear.Out, true); 
    }
    
    game.time.events.add(Phaser.Timer.SECOND * 3.5, this.__killRaven, this, that);
  },

  updateRaven: function(that){
    var newton_distance = Math.abs(Math.round(that.raven.body.x) - Math.round(that.newton.x));
    if(newton_distance < 30 && that.enemy_events_state.egg == false){
      this.dropEgg(that);
    }
  },

  dropEgg: function(that){
    that.enemy_events_state.egg = true;
    that.egg = that.enemy.create(that.raven.x, that.raven.y, 'egg');
    that.egg.animations.add('crack', [0, 1], 10, false);
    game.world.addAt(that.egg, that.newton.z + 1);
    that.egg.scale.x = 0.1;
    that.egg.scale.y = 0.1;
    
    game.add.tween(that.egg.scale).to( { x: 1 }, 750, Phaser.Easing.Linear.Out, true); 
    game.add.tween(that.egg.scale).to( { y: 1 }, 750, Phaser.Easing.Linear.Out, true);

    that.egg.body.setCollisionGroup(that.enemy_collision_group);
    that.egg.body.collides(that.newton_collision_group, this.__crackEggNewton, this);
    that.egg.body.collides(that.ground_collision_group, this.__crackEggGround, this);
  },

  __crackEgg: function(that){
 
    that.egg_piece1 = that.egg_pieces.create(that.egg.x, that.egg.y, 'egg_piece1');
    game.world.addAt(that.egg_piece1, that.newton.z + 1);
    that.egg_piece1.body.setCollisionGroup(that.egg_piece_collision_group);
    that.egg_piece1.body.collides([that.egg_piece_collision_group, that.ground_collision_group]);
    that.egg_piece1.body.mass = utilities.randomizer(1, 10000) * utilities.randomizer(1, 5);
    
    that.egg_piece2 = that.egg_pieces.create(that.egg.x, that.egg.y, 'egg_piece2');
    game.world.addAt(that.egg_piece2, that.newton.z + 1);
    that.egg_piece2.body.setCollisionGroup(that.egg_piece_collision_group);
    that.egg_piece2.body.collides([that.egg_piece_collision_group, that.ground_collision_group]);
    that.egg_piece2.body.mass = utilities.randomizer(1, 10000) * utilities.randomizer(1, 5);
    
    that.egg_piece3 = that.egg_pieces.create(that.egg.x, that.egg.y, 'egg_piece3');
    game.world.addAt(that.egg_piece3, that.newton.z + 1);
    that.egg_piece3.body.setCollisionGroup(that.egg_piece_collision_group);
    that.egg_piece3.body.collides([that.egg_piece_collision_group, that.ground_collision_group]);
    that.egg_piece3.body.mass = utilities.randomizer(1, 10000) * utilities.randomizer(1, 5);
    
    that.egg_piece4 = that.egg_pieces.create(that.egg.x, that.egg.y, 'egg_piece4');
    game.world.addAt(that.egg_piece4, that.newton.z + 1);
    that.egg_piece4.body.setCollisionGroup(that.egg_piece_collision_group);
    that.egg_piece4.body.collides([that.egg_piece_collision_group, that.ground_collision_group]);
    that.egg_piece4.body.mass = utilities.randomizer(1, 10000) * utilities.randomizer(1, 5);
    
    that.egg_piece5 = that.egg_pieces.create(that.egg.x, that.egg.y, 'egg_piece5');
    game.world.addAt(that.egg_piece5, that.newton.z + 1);
    that.egg_piece5.body.setCollisionGroup(that.egg_piece_collision_group);
    that.egg_piece5.body.collides([that.egg_piece_collision_group, that.ground_collision_group]);
    that.egg_piece5.body.mass = utilities.randomizer(1, 10000) * utilities.randomizer(1, 5);
    
    that.egg_piece6 = that.egg_pieces.create(that.egg.x, that.egg.y, 'egg_piece6');
    game.world.addAt(that.egg_piece6, that.newton.z + 1);
    that.egg_piece6.body.setCollisionGroup(that.egg_piece_collision_group);
    that.egg_piece6.body.collides([that.egg_piece_collision_group, that.ground_collision_group]);
    that.egg_piece6.body.mass = utilities.randomizer(1, 10000) * utilities.randomizer(1, 5);
    
    that.egg_piece7 = that.egg_pieces.create(that.egg.x, that.egg.y, 'egg_piece7');
    game.world.addAt(that.egg_piece7, that.newton.z + 1);
    that.egg_piece7.body.setCollisionGroup(that.egg_piece_collision_group);
    that.egg_piece7.body.collides([that.egg_piece_collision_group, that.ground_collision_group]);
    that.egg_piece7.body.mass = utilities.randomizer(1, 10000) * utilities.randomizer(1, 5);
  },

  __crackEggNewton: function(){
    that = play_state;

    if(that.enemy_events_state.egg_cracked == false){
      that.enemy_events_state.egg_cracked = true;
      that.egg_crush.play();
      that.egg.animations.play('crack');
      this.__crackEgg(that);
      this.__killEgg(that);
    }
  },
  
  __crackEggGround: function(){
    that = play_state;

    if(that.enemy_events_state.egg_cracked == false){
      that.enemy_events_state.egg_cracked = true;
      that.egg_crush.play();
      that.egg.animations.play('crack');
      this.__crackEgg(that);
      this.__spawnYolk(that);
      this.__killEgg(that);
    }
  },

  __spawnYolk: function(that){
    that.yolk = game.add.sprite(that.egg.x, (that.egg.y + 30), 'yolk');
    game.physics.p2.enable(that.yolk);
    that.yolk.enableBody = true;
    that.yolk.physicsBodyType = Phaser.Physics.P2JS;
    that.yolk.body.static = true;
    that.yolk.body.data.gravityScale = 0;
    that.yolk.body.setCollisionGroup(that.yolk_collision_group);
    that.yolk.body.collides(that.newton_collision_group);
    that.yolk.anchor.setTo(0.5, 0);
    that.yolk.alpha = 0;
    game.add.tween(that.yolk.scale).to( { x: 1 }, 500, Phaser.Easing.Linear.Out, true); 
    game.add.tween(that.yolk.scale).to( { y: 0.75 }, 500, Phaser.Easing.Linear.Out, true); 
    game.add.tween(that.yolk).to( { alpha: 0.5 }, 500, Phaser.Easing.Linear.Out, true); 
    game.time.events.add(Phaser.Timer.SECOND * 0.5, this.__fadeawayYolk, this, that);

  },

  __fadeawayYolk: function(that){
    game.add.tween(that.yolk).to( { alpha: 0 }, 10000, Phaser.Easing.Linear.Out, true); 
    game.time.events.add(Phaser.Timer.SECOND * 10, this.__killYolk, this, that);
  },

  __killYolk: function(that){
    that.yolk.destroy();
    that.enemy_events_state.yolk = false;
  },

  __killEgg: function(that){
    that.egg.destroy();
    that.enemy_events_state.egg = false;
    that.enemy_events_state.egg_cracked = false;
    
    game.add.tween(that.egg_piece1).to( { alpha: 0 }, this.__shellFadeTime(), Phaser.Easing.Linear.Out, true); 
    game.add.tween(that.egg_piece2).to( { alpha: 0 }, this.__shellFadeTime(), Phaser.Easing.Linear.Out, true); 
    game.add.tween(that.egg_piece3).to( { alpha: 0 }, this.__shellFadeTime(), Phaser.Easing.Linear.Out, true); 
    game.add.tween(that.egg_piece4).to( { alpha: 0 }, this.__shellFadeTime(), Phaser.Easing.Linear.Out, true); 
    game.add.tween(that.egg_piece5).to( { alpha: 0 }, this.__shellFadeTime(), Phaser.Easing.Linear.Out, true); 
    game.add.tween(that.egg_piece6).to( { alpha: 0 }, this.__shellFadeTime(), Phaser.Easing.Linear.Out, true); 
    game.add.tween(that.egg_piece7).to( { alpha: 0 }, this.__shellFadeTime(), Phaser.Easing.Linear.Out, true);
    game.time.events.add(Phaser.Timer.SECOND * 2.5, this.__killEggShell, this, that);
  },

  __killEggShell: function(that){
  
    that.egg_piece1.destroy();
    that.egg_piece2.destroy();
    that.egg_piece3.destroy();
    that.egg_piece4.destroy();
    that.egg_piece5.destroy();
    that.egg_piece6.destroy();
    that.egg_piece7.destroy();
  
  },

  __shellFadeTime: function(that){
    return utilities.randomizer(1.0, 2.5) * 1000;
  },

  __killRaven: function(that){
    that.enemy_events_state.raven = false;
    that.enemy_events_state.raven_born = false;
    that.raven.destroy();
  },

  spawnBeehive: function(that){
    that.enemy_events_state.beehive = true;
    var patch = utilities.randomizer(1, Object.keys(that.apple_patches).length);
    var position = utilities.setPatchPosition(that.apple_patches[patch]);
    var xpos = position['x'];
    var ypos = position['y'];
    that.beehive = that.enemy.create(xpos, ypos, 'beehive');
    game.physics.p2.enable(that.beehive);
    game.world.addAt(that.beehive, that.newton.z + 1);
    that.beehive.body.setCircle(50);
    that.beehive.scale.x = 0.01;
    that.beehive.scale.y = 0.01;
    that.beehive.body.setCollisionGroup(that.enemy_collision_group);
    that.beehive.body.collides([that.ground_collision_group, that.newton_collision_group]);
    that.beehive.body.data.gravityScale = 0;
    that.beehive.body.mass = 500;
    that.beehive.fixedBody = true;
    that.beehive.alpha = 1;
    that.beehive.anchor.set(0.5, 0.25);
    that.beehive.animations.add('buzz', [0, 1, 2, 3, 2, 1], 10, true);
    that.beehive.animations.play('buzz');
    game.add.tween(that.beehive.scale).to( { x: 1 }, 3500, Phaser.Easing.Linear.Out, true)
    game.add.tween(that.beehive.scale).to( { y: 1 }, 3500, Phaser.Easing.Linear.Out, true)
    game.time.events.add(Phaser.Timer.SECOND * 5, this.__dropBeehive, this, that);
    game.time.events.add(Phaser.Timer.SECOND * 12.5, this.__fadeBeehive, this, that);
    game.time.events.add(Phaser.Timer.SECOND * 15, this.__killBeehive, this, that);
  },

  __dropBeehive: function(that){
    that.beehive.body.static = false;
    that.beehive.body.data.gravityScale = 0.5;
  },
  
  __fadeBeehive: function(that){
    game.add.tween(that.beehive).to( { alpha: 0 }, 3500, Phaser.Easing.Linear.Out, true)
  },
  __killBeehive: function(that){
    that.enemy_events_state.beehive = false;
    that.beehive.destroy();
  },

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\\
  spawnCanonBall: function(that) {
    that.enemy_events_state.canon_ball = true;
    that.fake_canon_ball = that.effects.create(0, 700, 'canon-ball');
    game.physics.p2.enable(that.fake_canon_ball);
    game.world.addAt(that.fake_canon_ball, 2);
    that.fake_canon_ball.x = utilities.randomizer(0, that.worldX);
    that.fake_canon_ball.scale.y = 0.001;
    that.fake_canon_ball.scale.x = 0.001;
    that.fake_canon_ball.enableBody = true;
    that.canon_fire.play();
    
    game.add.tween(that.fake_canon_ball).to( { y: -100 }, 8500, Phaser.Easing.Linear.Out, true);
    game.add.tween(that.fake_canon_ball).to( { x: that.newton.body.x }, 8500, Phaser.Easing.Linear.Out, true);
    game.add.tween(that.fake_canon_ball.scale).to( { x: 0.5 }, 8000, Phaser.Easing.Linear.Out, true);
    game.add.tween(that.fake_canon_ball.scale).to( { y: 0.5 }, 8000, Phaser.Easing.Linear.Out, true);
    
    game.time.events.add(Phaser.Timer.SECOND * 11.5, this.__dropCanonBall, this, that);
  },

  __dropCanonBall: function(that) { 
    that.real_canon_ball = that.enemy.create(that.fake_canon_ball.body.x, -500, 'canon_ball_vertical_shadow');
    that.fake_canon_ball_2 = game.add.sprite(0, -500, 'canon_ball');
    game.world.addAt(that.real_canon_ball, that.basket.z + 1);
    that.real_canon_ball.anchor.set(0.5, 0);
    that.real_canon_ball.scale.x = 0.1;
    that.real_canon_ball.alpha = 0;
    game.add.tween(that.real_canon_ball.scale).to({ x: 1 }, 1000, Phaser.Easing.Linear.Out, true);
    game.add.tween(that.real_canon_ball).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.Out, true);
    game.time.events.add(Phaser.Timer.SECOND * 1, this.defineCanonBall, this, that);
  },
  
  defineCanonBall: function(that){
    game.physics.p2.enable(that.real_canon_ball);
    that.real_canon_ball.physicsBodyType = Phaser.Physics.P2JS;
    that.real_canon_ball.body.mass = 5e10
    that.real_canon_ball.anchor.set(0.5, 0);
    that.real_canon_ball.scale.y = 1;
    that.real_canon_ball.scale.x = 1;
    game.add.tween(that.real_canon_ball.scale).to({ x: 1.5 }, 800, Phaser.Easing.Linear.Out, true);
    game.add.tween(that.real_canon_ball.scale).to({ y: 1.5 }, 800, Phaser.Easing.Linear.Out, true);
    game.time.events.add(Phaser.Timer.SECOND * that.fake_canon_ball.kill_time, this.__killCanonBall, this, that);
  },

  updateCanonBall: function(that, level) {
    if(that.enemy_events_state.canon_ball == false){
      this.spawnCanonBall(that, level);
    }
  },

  __killCanonBall: function(that) {
    that.fake_canon_ball.destroy();
    that.enemy_events_state.canon_ball = false;
  },

  spawnUFO: function(that) {
    that.enemy_events_state.UFO = true;
    that.UFO = game.add.group();
    that.UFO.enableBody = true;
    that.UFO_horizontal_shadow = that.UFO.create(800, 800, 'ufo-horizontal-shadow');
    that.UFO_vertical_shadow = that.UFO.create(800, 300, 'ufo-vertical-shadow');
    that.UFO_horizontal_shadow.alpha = 0.75;
    that.UFO_horizontal_shadow.anchor.set(0.5, 0.5);
    that.UFO_vertical_shadow.anchor.set(0.5, 0.5);
    that.UFO_horizontal_shadow.animations.add('light-up', [0, 1], 5, true);
    that.UFO_horizontal_shadow.animations.play('light-up');
    that.UFO.moving = true;
  },

  __moveUFO: function(that) {
    that.UFO_move = true;
    var newton_position = that.newton.x;
    var random_time = (Math.floor(Math.random() * 5) + 1);
    game.add.tween(that.UFO_horizontal_shadow).to( { x: newton_position }, random_time * 1000, Phaser.Easing.Linear.Out, true);
    game.add.tween(that.UFO_vertical_shadow).to( { x: newton_position }, random_time * 1000, Phaser.Easing.Linear.Out, true);
    game.time.events.add(Phaser.Timer.SECOND * random_time + 1, this.__stopUFO, this, that);
  },

  __stopUFO: function(that) {
    that.UFO_move = false;
    if(that.UFO_round == 1){
      game.time.events.add(Phaser.Timer.SECOND * 3, this.__chargeBeam, this, that);
      game.time.events.add(Phaser.Timer.SECOND * 5, this.__fireBeam, this, that);
    }
  },

  __fireBeam: function(that) {
    that.beam = that.UFO.create(that.UFO_horizontal_shadow.x, -200, 'beam');
    that.enemy_events_state.UFO_beam = true;
    that.beam.anchor.setTo(0.5, 0);
    that.beam.alpha = 0;
    that.beam.scale.x = 0.01;
    that.beam.scale.y = 0.01;
    that.blue_light = that.enemy.create(that.beam.x, that.beam.y + 550, 'blue-light');
    that.blue_light.anchor.setTo(0.5, 0.5);
    that.blue_light.alpha = 0;
    that.blue_light.scale.x = 2.5;
    that.blue_light.scale.y = 2.5;
    game.add.tween(that.beam).to( { alpha: 1 }, 3000, Phaser.Easing.Linear.Out, true);
    game.add.tween(that.blue_light).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.Out, true);
    game.add.tween(that.UFO_horizontal_shadow).to( { alpha: 0 }, 1500, Phaser.Easing.Linear.Out, true);
    game.add.tween(that.UFO_vertical_shadow).to( { alpha: 0 }, 1500, Phaser.Easing.Linear.Out, true);
    game.add.tween(that.beam.scale).to( { x: 1 }, 3000, Phaser.Easing.Linear.Out, true);
    game.add.tween(that.beam.scale).to( { y: 1 }, 750, Phaser.Easing.Linear.Out, true);
  },

  __chargeBeam: function(that){
    that.lightEmitter = game.add.emitter(900, 800, 100);
    that.lightEmitter.width = 200;
    that.lightEmitter.makeParticles('corona');
    that.lightEmitter.setAlpha(0.3, 0.8);
    that.game.world.addAt(that.lightEmitter, 0);
    that.lightEmitter.minParticleScale = 0.05;
    that.lightEmitter.maxParticleScale = 0.35;
    that.lightEmitter.setYSpeed(-750, -1000);
    that.lightEmitter.setXSpeed(-100, 100);
    that.lightEmitter.minRotation = -10;
    that.lightEmitter.maxRotation = 10;
    that.lightEmitter.x = that.UFO_horizontal_shadow.x;
    that.lightEmitter.start(false, 1600, 20, 0);
    },


  updateUFO: function(that){
    if(that.enemy_events_state.UFO == true && that.UFO_round < 1){
      if(that.UFO_move == false){
        this.__moveUFO(that);
        that.UFO_round += 1;
      }
    }
  }
};
