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

    that.apple_data = {
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
    if(that.apple_count < 20){
      this.spawnApple(that);
    }
  },

  spawnApple: function(that) {
    var pos_x = utilities.randomizer(200, 1400); 
    var pos_y = utilities.randomizer(200, 400);
    var apple_data = this.fetchApple(that);
    var apple = that.apples.create(pos_x, pos_y , apple_data.type);
    
    apple.context = that;
    apple.enableBody = true;
    apple.physicsBodyType = Phaser.Physics.P2JS;
    apple.body.setCollisionGroup(that.apple_collision_group);
    game.physics.p2.updateBoundsCollisionGroup();
    this.defineApple(that, apple, apple_data);
    
    if(apple.has_properties == true){
      this.growApple(that, apple);
      apple.body.collides(that.basket_collision_group, this.collectApple, this);
      game.time.events.add(Phaser.Timer.SECOND * 15, this.killApple, this, that, apple);
    }
  },

  fetchApple: function(that) {
    apple_pick = Math.floor(Math.random() * Object.keys(that.apple_data).length + 1);
    return that.apple_data[apple_pick];
  },

  collectApple: function(apple, basket) {
    apple = apple.sprite;
    that = apple.context;
    apple.sound.play();
    that.score += apple.worth;
    that.score_text.text = 'x ' + that.score;
    this.scanApple(that, apple);
    this.showPoints(apple);
    apple.destroy();
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

  scanApple: function(that, apple){
    if(apple.effect == 'poisoned' && that.newton.poisoned == false) {
      that.poisonNewton(that.newton);
    }
  },

  defineApple: function(that, apple, apple_data){
    apple.scale.x = 0.1;
    apple.scale.y = 0.1;
    apple.anchor.setTo(0.5, 0);
    apple.checkWorldBounds = false;
    apple.worth = apple_data.worth;
    apple.effect = apple_data.effect;
    apple.sound = apple_data.sound;
    game.world.addAt(apple, 15);
    that.apple_count += 1;
    game.physics.p2.enable(apple);
    apple.body.data.gravityScale = 0;
    apple.body.data.motionState = 1;
    apple.body.collideWorldBounds = false;
    apple.has_properties = true;
  },

  growApple: function(that, apple) {
    game.add.tween(apple.scale).to({ y: 1 }, 2500, Phaser.Easing.Cubic.In, true);
    game.add.tween(apple.scale).to({ x: 1 }, 2500, Phaser.Easing.Cubic.In, true);
    game.time.events.add(Phaser.Timer.SECOND * 3, this.shakeApple, this, that, apple);
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
    game.add.tween(apple.body)
      .to({ x: '+5' }, 50, Phaser.Easing.Linear.None)
      .to({ x: '-5' }, 50, Phaser.Easing.Linear.None)
      .to({ x: '+5' }, 50, Phaser.Easing.Linear.None)
      .to({ x: '-5' }, 50, Phaser.Easing.Linear.None)
      .to({ x: '+5' }, 50, Phaser.Easing.Linear.None)
      .to({ x: '-5' }, 50, Phaser.Easing.Linear.None)
      .start();
    game.time.events.add(Phaser.Timer.SECOND * 2.5, this.dropApple, this, that, apple);
  },
  
  killApple: function(that, apple) {
    apple.destroy();
    that.apple_count -= 1;
  }
};
