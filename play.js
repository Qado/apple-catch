var play_state = {    

  create: function() {
    this.score = 0;
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.world.setBounds(0, 0, 1600, 900);
    game.physics.p2.setImpactEvents(true);
    game.physics.p2.updateBoundsCollisionGroup();
    game.physics.p2.gravity.y = 2000;
    this.cursors = game.input.keyboard.createCursorKeys();
    this.spacekey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.worldX = game.world.width;
    this.worldY = game.world.height;
    
    this.effects = game.add.group();
    this.effects.enableBody = true;
    
    this.basket_collision_group = game.physics.p2.createCollisionGroup();
    this.newton_collision_group = game.physics.p2.createCollisionGroup();
    this.bush_collision_group = game.physics.p2.createCollisionGroup();
    this.ground_collision_group = game.physics.p2.createCollisionGroup();
    this.apple_collision_group = game.physics.p2.createCollisionGroup();
    this.enemy_collision_group = game.physics.p2.createCollisionGroup();

    enemy_events.init(play_state);
    filters.init(play_state);
    flowers.init(play_state);
    world.init(play_state);
    world_events.init(play_state);
    
    this.newton = game.add.sprite(800, 0, 'newton');
    game.physics.p2.enable(this.newton);
    game.world.addAt(this.newton, 100);
    this.newton.physicsBodyType = Phaser.Physics.P2JS
    this.newton.body.setCollisionGroup(this.newton_collision_group);
    this.newton.speed = 750;
    this.newton.anchor.set(0.5, 0.5);
    this.newton.body.fixedRotation = true;
    this.newton.body.mass = 175;
    this.newton.animations.add('walk', [0, 1, 2, 1], 15, false);
    
    this.newton.poisoned = false;
    this.newton_dead = false;
    
    this.basket = game.add.sprite(this.newton.x, this.newton.y, 'basket');
    this.basket.enableBody = true;
    game.physics.p2.enable(this.basket);
    this.basket.physicsBodyType = Phaser.Physics.P2JS;
    this.basket.body.setRectangle(150, 100);
    console.log(this.basket.body);
    this.basket.body.setCollisionGroup(this.basket_collision_group);
    this.basket.anchor.set(-0.15, -0.10);
    this.basket.body.fixedRotation = true;
    game.camera.follow(this.newton);
    
    game.physics.p2.createLockConstraint(this.basket, this.newton, [0, 0], 0);

    //I played around with the world alpha to see what it would look like when
    //I start it and I'm not really feeling it that much...

    game.world.alpha = 0;
    game.world.scale.x = 2;
    game.world.scale.y = 2;
    game.add.tween(game.world).to( { alpha: 1 }, 3000, Phaser.Easing.Linear.Out, true);
    game.add.tween(game.world.scale).to( { x: 1 }, 1500, Phaser.Easing.Linear.Out, true);
    game.add.tween(game.world.scale).to( { y: 1 }, 1500, Phaser.Easing.Linear.Out, true);
    
    this.coin = game.add.sprite(0, 0, 'coin');
    this.coin.animations.add('spin', [1, 2, 3, 4, 5, 6, 5, 4, 3, 2], 17.5, true);
    this.coin.fixedToCamera = true;
    this.coin.scale.x = 2;
    this.coin.scale.y = 2;
    this.coin.animations.play('spin');

    this.normal_theme = game.add.audio('theme-song');
    this.poison_theme = game.add.audio('poison-song');
    this.normal_theme.play();
    
    this.collision_sound = game.add.audio('collision-sound')

    this.setnewtonGravity('day')
    
    this.left_bush.body.collides(this.newton_collision_group, world_events.shakeLeftBush, this);
    this.right_bush.body.collides(this.newton_collision_group, world_events.shakeRightBush, this);
    this.newton.body.collides([this.ground_collision_group, this.bush_collision_group]);
    this.newton.body.collides(this.enemy_collision_group, this.killNewton, this);
    this.basket.body.collides(this.apple_collision_group);
    this.ground.body.collides(this.newton_collision_group, this.registerNewtonGroundContact, this);
    this.ground.body.collides([this.enemy_collision_group, this.apple_collision_group]);

    apples.init(play_state);

    if(this.enemy_events_state.raven == true){
      this.raven.body.collides(this.ground_collision_group);
    }
    if(this.enemy_events_state.canonball == true){
      this.canonball.body.collides(this.ground_collision_group);
    }
  },
  
  registerNewtonGroundContact: function(){
    this.newton.touching_ground = true;
  },

  newtonJump: function(newton) {
    if(this.newton.touching_ground == true){
        this.newton.body.velocity.y = -750;
    }
    this.newton.touching_ground = false;
  },

  control: function(that){ 
    if(this.cursors.right.isDown){
      this.moveRight();
    }
    if (this.cursors.left.isDown){
      this.moveLeft();
    }
    if (this.cursors.right.isUp && this.cursors.left.isUp) {
      this.newton.animations.stop();
      this.newton.frame = 0;
      if (this.world_events_state.rain == false){
        this.newton.body.velocity.x = 0;
      }
    }
    if(this.world_events_state.night == true && this.newton.gravity == 'day'){
      this.setnewtonGravity('night');
    }
    if(this.world_events_state.night == false && this.newton.gravity == 'night'){
      this.setnewtonGravity('day');
    }
    
    this.spacekey.onDown.add(this.newtonJump, this);
  },
  
  setnewtonGravity: function(type){
    if(type == 'day'){
      this.newton.body.data.gravityScale = 1;
      this.newton.gravity = 'day';
    }

    if(type == 'night'){
      this.newton.body.data.gravityScale = 0.75;
      this.newton.gravity = 'night';
    }
  },
 
  moveRight: function() { 
    if(this.newton.x <= 1600){
      if(this.world_events_state.rain == false) {
        this.newton.body.moveRight(this.newton.speed);
      }
      if(this.world_events_state.rain == true) {
        this.newton.body.velocity.x += this.newton.speed;
      }
      this.newton.animations.play('walk');
      this.newton.scale.x = 1;
      this.basket.scale.x = 1;
    }
  },

  moveLeft: function(){
    if(this.newton.x >= 0){
      if(this.world_events_state.rain == false) {
        this.newton.body.moveLeft(this.newton.speed);
      }
      if(this.world_events_state.rain == true) {
        this.newton.body.velocity.x -= this.newton.speed;
      }
      this.newton.animations.play('walk');
      this.newton.scale.x = -1;
      this.basket.scale.x = -1;
    }
  },

  poisonNewton: function(newton, apple) {

    this.alterNewtonState(this.newton)
    game.time.events.add(Phaser.Timer.SECOND * 35, this.alterNewtonState, this, apple);
    this.apple_dimensionY = this.worldY;
    this.apple_dimensionX = 3;
  },

  killNewton: function(){
    if (this.newton_dead == false){
      this.collision_sound.play();
      this.newton_dead = true;
      this.newton.kill();
      newton.init(play_state);
    }
  },
  
  update: function() {
    //enemy_events.updateCanonBall(play_state, level); 
    enemy_events.updateRaven(play_state);
    enemy_events.updateUFO(play_state);
    filters.updateFilter(play_state);
    apples.updateApple(play_state);
    world_events.updateWorld(play_state);
    sequencer.updateSequencer(play_state);
    
    if(this.newton_dead == false) {
      this.control(play_state);
    }
  },
  
  alterNewtonState: function(apple){
    if(this.newton.poisoned == false){
      this.newton.poisoned = true;
      this.marble_background.filters = [this.marble];
      this.marble.alpha = 0;
      game.add.tween(this.marble).to( { alpha: 0.75 }, 3000, Phaser.Easing.Linear.Out, true);
      this.apple_gravity_scale = 0.1;
      this.normal_theme.pause();
      this.poison_theme.play();
    } else {
      this.newton.poisoned = false;
      game.add.tween(this.marble).to( { alpha: 0 }, 3000, Phaser.Easing.Linear.Out, true);
      this.newton.poison_factor = 2;
      game.time.events.add(Phaser.Timer.SECOND * 3.5, filters.killFilter, this, that);
      this.apple_gravity_scale = 0.5;
      this.poison_theme.pause();
      this.normal_theme.resume();
    }

    this.newton.speed = this.newton.speed * -1;
  }
};
