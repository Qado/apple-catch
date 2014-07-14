var play_state = {    

  create: function() {
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.world.setBounds(0, 0, 1600, 900);
    game.physics.p2.setImpactEvents(true);
    
    this.basket_collision_group = game.physics.p2.createCollisionGroup();
    this.newton_collision_group = game.physics.p2.createCollisionGroup();
    this.bush_collision_group = game.physics.p2.createCollisionGroup();
    this.ground_collision_group = game.physics.p2.createCollisionGroup();
    this.apple_collision_group = game.physics.p2.createCollisionGroup();
    this.newton_material = game.physics.p2.createMaterial('newton_material');
    this.bush_material = game.physics.p2.createMaterial('bush_material');
    
    game.physics.p2.updateBoundsCollisionGroup();
    game.physics.p2.gravity.y = 2000;

    this.worldX = game.world.width;
    this.worldY = game.world.height;

    world_events.init(play_state);
    enemy_events.init(play_state);
    filters.init(play_state);

    this.background_3 = game.add.tileSprite(0, 0, 1600, 900, 'background_3');
    this.background_2 = game.add.tileSprite(0, 0, 1600, 900, 'background_2');
    this.background_1 = game.add.tileSprite(0, 0, 1600, 900, 'background_1');
    
    this.ground = game.add.sprite(800, 850, 'background_0');
    game.physics.p2.enable(this.ground);
    this.ground.body.setCollisionGroup(this.ground_collision_group);
    this.ground.body.static = true;
    this.ground.anchor.setTo(0.5, 0.5);

    this.left_bush = game.add.sprite(-50, 700, 'big-bush');
    game.physics.p2.enable(this.left_bush);
    this.left_bush.body.setCircle(100);
    this.left_bush.body.setCollisionGroup(this.bush_collision_group);
    this.left_bush.body.setMaterial(this.bush_material)
    this.left_bush.scale.x = 0.75;
    this.left_bush.scale.y = 0.75
    this.left_bush.body.static = true;

    this.right_bush = game.add.sprite(this.worldX + 50, 700, 'big-bush');
    game.physics.p2.enable(this.right_bush);
    this.right_bush.body.setCircle(100);
    this.right_bush.body.setCollisionGroup(this.bush_collision_group);
    this.right_bush.body.setMaterial(this.bush_material)
    this.right_bush.scale.x = -0.75;
    this.right_bush.scale.y = 0.75
    this.right_bush.body.static = true;

    //this.newton.physicsBodyType = Phaser.Physics.P2JS;
    this.newton = game.add.sprite(800, 0, 'newton');
    game.physics.p2.enable(this.newton);
    this.newton.body.setCollisionGroup(this.newton_collision_group);
    this.newton.body.setMaterial(this.newton_material)
    this.newton.speed = 750;
    this.newton.anchor.set(0.5, 0.5);
    this.newton.body.fixedRotation = true;
    this.newton.animations.add('walk', [0, 1, 2, 1], 15, true);
    this.newton.poisoned = false;
    //this.newton.collideWorldBounds = true;
    
    this.basket = game.add.sprite(this.newton.x, this.newton.y, 'basket');
    this.basket.enableBody = true;
    game.physics.p2.enable(this.basket);
    this.basket.body.setCollisionGroup(this.basket_collision_group);
    this.basket.physicsBodyType = Phaser.Physics.P2JS
    this.basket.anchor.set(-0.15, -0.10);
    this.basket.body.fixedRotation = true;
    game.camera.follow(this.newton);
    
    
    this.cursors = game.input.keyboard.createCursorKeys();
    this.spacekey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.newton_basket_lock = game.physics.p2.createLockConstraint(this.basket, this.newton, [0, 0], 0);

    this.coin = game.add.sprite(0, 0, 'coin');
    this.coin.animations.add('spin', [1, 2, 3, 4, 5, 6, 5, 4, 3, 2], 17.5, true);
    this.coin.fixedToCamera = true;
    this.coin.scale.x = 2;
    this.coin.scale.y = 2;
    this.coin.animations.play('spin');

    this.normal_theme = game.add.audio('theme-song');
    this.poison_theme = game.add.audio('poison-song');
    //this.normal_theme.play();
    
    this.red_score_sound = game.add.audio('red-score');
    this.green_score_sound = game.add.audio('green-score');
    this.golden_score_sound = game.add.audio('golden-score');
    this.poison_sound = game.add.audio('poison-sound');
    this.collision_sound = game.add.audio('collision-sound')
    this.raven_flap = game.add.audio('flap');
    this.canon_fire = game.add.audio('canon-fire');

    this.newton_dead = false;
    this.enemy = game.add.group();
    this.enemy.enableBody = true;

    newton_cm = this.newton_contact_material;
    bush_cm = this.bush_contact_material;
    var newton_bush_contact_material = game.physics.p2.createContactMaterial(newton_cm, bush_cm);
    newton_bush_contact_material.friction = 40;
    newton_bush_contact_material.restitution = 40;
    newton_bush_contact_material.stiffness = 1e7;
    newton_bush_contact_material.relaxation = 5;
    newton_bush_contact_material.frictionStiffness = 3;
    newton_bush_contact_material.frictionRelaxation = 3;
    newton_bush_contact_material.surfaceVelocity = 1;
    
    this.setnewtonGravity('day')
    this.ranges = game.add.group();
    this.ranges.enableBody = true;
    this.tree_0 = this.ranges.create(100, 150, 'apple-range');
    this.tree_1 = this.ranges.create(480, 190, 'apple-range');
    this.tree_2 = this.ranges.create(890, 200, 'apple-range');
    this.tree_3 = this.ranges.create(1250, 180, 'apple-range');
   
    this.left_bush.body.collides(this.newton_collision_group);
    this.right_bush.body.collides(this.newton_collision_group);
    this.newton.body.collides([this.ground_collision_group, this.bush_collision_group]);
    this.ground.body.collides(this.newton_collision_group, this.registerNewtonGroundContact, this);

    apples.init(play_state);
    //world_events.startRain(play_state);
    //world_events.startNight(play_state);
    enemy_events.spawnUFO(play_state);

    
  },
  
  registerNewtonGroundContact: function(){
    this.newton.touching_ground = true;
  },

  newtonJump: function(newton) {

    if(this.newton.touching_ground == true){
        this.newton.body.velocity.y = -1500;
    }
    this.newton.touching_ground = false;
  },

  control: function(that){ 
    //Blah//
    if(this.cursors.right.isDown){
      this.moveRight();
    }

    //Yakkity Shmakitty//
    if (this.cursors.left.isDown){
      this.moveLeft();
    }

    //Blah//
    if (this.cursors.right.isUp && this.cursors.left.isUp) {
      this.newton.animations.stop();
      this.newton.frame = 0;
      if (this.world_events_state.rain == false){
        this.newton.body.velocity.x = 0;
      }
    }

    //Blahh//
    this.spacekey.onDown.add(this.newtonJump, this);


    //Blarr//
    if(this.world_events_state.night == true && this.newton.gravity == 'day'){
      this.setnewtonGravity('night');
    }

    if(this.world_events_state.night == false && this.newton.gravity == 'night'){
      this.setnewtonGravity('night');
    }
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
    if(this.world_events_state.rain == false) {
      this.newton.body.moveRight(this.newton.speed);
    }
    if(this.world_events_state.rain == true) {
      this.newton.body.velocity.x += this.newton.speed;
    }
    this.newton.animations.play('walk');
    this.newton.scale.x = 1;
    this.basket.scale.x = 1;
  },

  moveLeft: function(){

    if(this.world_events_state.rain == false) {

      this.newton.body.moveLeft(this.newton.speed);
    }
    if(this.world_events_state.rain == true) {

      this.newton.body.velocity.x -= this.newton.speed;
    }
    this.newton.animations.play('walk');
    this.newton.scale.x = -1;
    this.basket.scale.x = -1;
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
    }
  },
  
  update: function() {
    this.background_2.tilePosition.x = game.camera.x/8;
    this.background_3.tilePosition.x = game.camera.x/4;
    
    if(this.newton_dead == false) {
      this.control();
    }

    filters.updateFilter(play_state);
    apples.updateApple(play_state);

    /*if(this.enemy_events_state.UFO_beam == true){
      game.physics.p2.overlap(this.newton, this.lightEmitter, this.beamUp, null, this);
    }*/
    
    enemy_events.updateRaven(play_state);
    enemy_events.updateUFO(play_state);
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
      game.time.events.add(Phaser.Timer.SECOND * 3.5, this.killFilter, this);
      this.apple_gravity_scale = 0.5;
      this.poison_theme.pause();
      this.normal_theme.resume();
    }

    this.newton.speed = this.newton.speed * -1;
  },

  killFilter: function() {
    this.marble_background.filters = null;
  },
};
