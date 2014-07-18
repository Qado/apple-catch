var apples = {
  
  init: function(that) {
    that.score = 0;
    that.apple_count = 0;
    that.apple_dimensionY = 1;
    that.apple_dimensionX = 1;
    that.apple_gravity_scale = 0.5;
    that.apples = game.add.group();
    that.apples.enableBody = true;
    that.apples.physicsBodyType = Phaser.Physics.P2JS;

    that.score_text = game.add.text(65, 10, 'x 0');
    that.score_text.font = 'Arial';
    that.score_text.fontSize = 35;
    that.score_text.fontWeight = 'bold';
    that.score_text.stroke = '#000000';
    that.score_text.strokeThickness = 4;
    that.score_text.fill = '#ffd700';
    that.score_text.fixedToCamera = true;
    that.basket.body.collides(that.apple_collision_group);
  },
  

  updateApple: function(that) {
    if(that.apple_count < 12){
      var pos_x = Math.abs(Math.random() * (1600 - 100)) + 50;
      var pos_y = (Math.random() * 300) + 150
      this.spawnApple(pos_x, pos_y, that);
    }
  },

  spawnApple: function(pos_x, pos_y, that) {
    that.apple_data = this.fetchAppleType(that);
    that.apple = that.apples.create(pos_x, pos_y , that.apple_data.type);
    that.apple.context = that;
    that.apple.enableBody = true;
    that.apple.physicsBodyType = Phaser.Physics.P2JS;
    that.apple.body.setCollisionGroup(that.apple_collision_group);
    game.physics.p2.updateBoundsCollisionGroup();
    that.apple.body.collides(that.basket_collision_group, this.collectApple, this);
    //game.physics.p2.overlap(that.apple, that.ranges, this.addAppleProperties, null, this);
    this.addAppleProperties(that.apple);
    game.time.events.add(Phaser.Timer.SECOND * 15, this.killApple, this, that, that.apple);
    this.growApple(that);
  },

  fetchAppleType: function(that) {

    var apple_data = {
      '1': {
        'type': 'red-apple',
        'worth': 1,
        'effect': null,
        'sound': that.red_score_sound
      },
      '2': {
        'type': 'green-apple',
        'worth': 2,
        'effect': null,
        'sound': that.green_score_sound
      },
      '3': {
        'type': 'golden-apple',
        'worth': 3,
        'effect': null,
        'sound': that.golden_score_sound
      },
      '4': {
        'type': 'rotten-apple',
        'worth': -6,
        'effect': null,
        'sound': that.poison_sound
      },
      '5': {
        'type': 'poisoned-apple',
        'worth': -9,
        'effect': 'poisoned',
        'sound': that.poison_sound
      }
    };

    var apple_pick = Math.floor(Math.random() * Object.keys(apple_data).length + 1);
    return apple_data[apple_pick];
  },

  collectApple: function(apple, basket) {
    apple = apple.sprite;
    that = apple.context;
    apple.sound.play();
    that.score += apple.worth;
    that.score_text.text = 'x ' + that.score;
    this.checkAppleProperty(that, apple);
    this.showPoints(apple);
    apple.destroy()
  },

  showPoints: function(apple) {
    var point_text = game.add.text(that.basket.x, that.basket.y, '+' + 0);
    point_text.font = 'Arial';
    point_text.fontSize = 20;
    point_text.fontWeight = 'bold';
    point_text.stroke = '#000000';
    point_text.strokeThickness = 2;
    point_text.fill = '#ffffff';
    point_text.alpha = 1;
    if(apple.worth > 0) {
      point_text.text = '+' + apple.worth;
    } else {
      point_text.text = apple.worth;
    }
    game.add.tween(point_text).to({ y: 0 }, 9000, Phaser.Easing.Linear.In, true);
    game.add.tween(point_text).to({ alpha: 0 }, 3000, Phaser.Easing.Linear.In, true);
  },

  checkAppleProperty: function(that, apple){
    if(apple.effect == 'poisoned' && that.newton.poisoned == false) {
      that.poisonNewton(that.newton);
    }
  },

  addAppleProperties: function(apple, ranges){
    //fetching the context since I can't pass it.i
    that = apple.context;
    that.apple = apple;
    that.apple.scale.x = 0.1;
    that.apple.scale.y = 0.1;
    that.apple.anchor.setTo(0.5, 0);
    that.apple.checkWorldBounds = true;
    that.apple.worth = that.apple_data.worth;
    that.apple.effect = that.apple_data.effect;
    that.apple.sound = that.apple_data.sound;
    that.apple_count += 1;
    that.apple.has_properties = true;
    game.physics.p2.enable(apple);
    //that.apple.body.kinematic = true;
    apple.body.data.gravityScale = 0;
    apple.body.data.motionState = 1;
  },

  growApple: function(that) {
    game.add.tween(that.apple.scale).to({ y: 1 }, 2500, Phaser.Easing.Cubic.In, true);
    game.add.tween(that.apple.scale).to({ x: 1 }, 2500, Phaser.Easing.Cubic.In, true);
    game.time.events.add(Phaser.Timer.SECOND * 3, this.shakeApple, this, that, that.apple);
    game.time.events.add(Phaser.Timer.SECOND * 5, this.dropApple, this, that, that.apple);
  },     

  dropApple: function(that, apple) {
    apple.body.static = false;
    
    if(that.newton.poisoned == true){
      apple.body.data.gravityScale = 0.01;
      game.add.tween(apple.scale).to({ y: that.worldY}, 10000, Phaser.Easing.Cubic.In, true);
      game.add.tween(apple.scale).to({ x: 0.3}, 2000, Phaser.Easing.Linear.In, true);
    } else {
      apple.body.data.gravityScale = 0.5
    }
  },
  
  shakeApple: function(that, apple) {
    for (i=0; i < 4; i++){
      var wait_left = i * 0.15;
      var wait_right = i * 0.20;
      var wait_final = wait_right + 0.20;
      game.time.events.add(Phaser.Timer.SECOND * wait_right, this.shakeAppleRight, this, apple);
      game.time.events.add(Phaser.Timer.SECOND * wait_left, this.shakeAppleLeft, this, apple);
    }
    
    game.time.events.add(Phaser.Timer.SECOND * wait_final, this.shakeAppleStop, this, apple);
    apple.body.velocity.x = 0;
  },
  
  shakeAppleStop: function(apple){
    apple.body.velocity.x = 0;
  },

  shakeAppleRight: function(apple) {
    apple.body.velocity.x = 20;
  },

  shakeAppleLeft: function(apple) {
    apple.body.velocity.x = -20;
  },

  killApple: function(that, apple) {
    apple.destroy();
    that.apple_count -= 1;
  }
};
