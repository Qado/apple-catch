var apples = {
  
  init: function(that) {
    
    //Apples Variables//
    that.apple_amount = 0; //Deals with the current number of apples on the screen.
    that.apple_max = 0; //Deal with the maximum number of apples on the screen.
    that.apple_scale_y = 1; //Deals with the scaling of the apple along the x-axis.
    that.apple_scale_x = 1; //Deals with the scaling of the apple along the y-axis.
    
    //Apples Group//
    that.apples = game.add.group(); //Creates the apples group.
    that.apples.enableBody = true; //Enables the bodies for all members of the apples group.
    that.apples.physicsBodyType = Phaser.Physics.P2JS; //Sets the body type of each member to P2 physics.

    //Apple Sounds//
    that.red_score_sound = game.add.audio('red-score'); //The sound for the red apple when collected.
    that.green_score_sound = game.add.audio('green-score'); //The sound for the green apple when collected.
    that.golden_score_sound = game.add.audio('golden-score'); //The sound for the golden apple when collected.
    that.poison_sound = game.add.audio('poison-sound'); //The sound for the rotten and poison apples when collected.

    //The Apple Type Object//
    that.apple_data = {
      //Red Apple Data//
      'red-apple': {
        'id': 'red-apple',
        'worth': 1,
        'effect': null,
        'sound': that.red_score_sound,
        'rarity': 3
      },
      //Green Apple Data//
      'green-apple': {
        'id': 'green-apple',
        'worth': 2,
        'effect': null,
        'sound': that.green_score_sound,
        'rarity': 2
      },
      //Golden Apple Data//
      'golden-apple': {
        'id': 'golden-apple',
        'worth': 4,
        'effect': null,
        'sound': that.golden_score_sound,
        'rarity': 1
      },
      //Rotten Apple Data//
      'rotten-apple': {
        'id': 'rotten-apple',
        'worth': -4,
        'effect': null,
        'sound': that.poison_sound,
        'rarity': 3
      },
      //Poison Apple Data//
      'poisoned-apple': {
        'id': 'poisoned-apple',
        'worth': -8,
        'effect': 'poisoned',
        'sound': that.poison_sound,
        'rarity': 2
      }
    };

    //The Apple Spawning Loaction Object//
    that.apple_patches = {
      //The First Tree//
      '1': {
        'xmin': 100,
        'ymin': 185,
        'xmax': 325,
        'ymax': 400
      },
      //The Second Tree//
      '2': {
        'xmin': 460,
        'ymin': 210,
        'xmax': 700,
        'ymax': 420
      },
      //The Third Tree//
      '3': {
        'xmin': 890,
        'ymin': 200,
        'xmax': 1110,
        'ymax': 420
      },
      //The Fourth Tree//
      '4': {
        'xmin': 1250,
        'ymin': 175,
        'xmax': 1475,
        'ymax': 400
      }
    };

    //Score Text//
    // (Will Be Moved) //
    that.score_text = game.add.text(65, 10, 'x 0'); //Creating the score text with a size of 65 and a bold of 10.
    that.score_text.font = 'Arial'; //Setting the text type of the score text to Arial.
    that.score_text.fontSize = 45; //Setting the font size to 45.
    that.score_text.fontWeight = 'bold'; //Setting the font type to bold.
    that.score_text.stroke = '#000000'; //Setting the outline of the text to #000000 (black)
    that.score_text.strokeThickness = 4; //Setting the outline thickness to 4.
    that.score_text.fill = '#ffd700'; //Setting the fill of the text to #ffd700 (gold)
    that.score_text.fixedToCamera = true; //Sets the text to a fixed position on the screen.
    
    that.basket.body.collides(that.apple_collision_group);
  },
  

  updateApple: function(that) {
    that.apple_max = Math.abs(Math.round(Math.log(Math.abs(that.score) + 2)) * 3);
    
    if(that.apple_amount < that.apple_max){
      this.spawnApple(that);
    }
  },

  spawnApple: function(that) {
    that.apple_amount += 1;
    var apple_patch = utilities.randomizer(1, Object.keys(that.apple_patches).length); 
    var apple_position = utilities.setPatchPosition(that.apple_patches[apple_patch]);
    var apple_x = apple_position['x'];
    var apple_y = apple_position['y'];
    var apples = this.fetchApples(that);
    var apple_name = apples[utilities.randomizer(0, (apples.length - 1))];
    var apple = that.apples.create(apple_x, apple_y, apple_name);
    apple.context = that;
    apple.body.setCollisionGroup(that.apple_collision_group);
    apple.body.collides(that.ground_collision_group);
    apple.body.collides(that.basket_collision_group, this.collectApple, this);
    game.physics.p2.updateBoundsCollisionGroup();

    this.createApple(that, apple);
  },

  fetchApples: function(that) {
    var apple;
    var apples = [];
    var apple_factor = utilities.randomizer(1, 3);
    
    for(apple_name in that.apple_data){
      apple = that.apple_data[apple_name];
      
      if(apple['rarity'] >= apple_factor){
        apples = apples.concat(apple['id']);
      }
    }
    return apples;
  },

  collectApple: function(apple_body){
    
    apple = apple_body.sprite;
    that = apple.context;
    apple_id = that.apple_data[apple.key];
    
    if(that.newton.body.y > 500){
   
      apple_id.sound.play();
      this.scanApple(that, apple_id);
      that.score += apple_id.worth;
    
      apple.destroy();

      that.score_text.text = 'x ' + that.score;
      this.showPoints(apple);
    }
  },

  showPoints: function(apple){
    that = play_state;
    apple = apple;
    apple_id = that.apple_data[apple.key];
    
    var point_text = game.add.text(that.basket.x, that.basket.y, '+' + 0);
    point_text.font = 'Arial';
    point_text.fontSize = 20;
    point_text.fontWeight = 'bold';
    point_text.stroke = '#000000';
    point_text.strokeThickness = 2;
    point_text.fill = '#ffffff';
    point_text.alpha = 1;
    if(apple_id.worth > 0) {
      point_text.text = '+' + apple_id.worth;
    } else {
      point_text.text = apple_id.worth;
    }
    game.add.tween(point_text).to({ y: 0 }, 9000, Phaser.Easing.Linear.In, true);
    game.add.tween(point_text).to({ alpha: 0 }, 3000, Phaser.Easing.Linear.In, true);
  },

  scanApple: function(that, apple){
    if(apple.effect == 'poisoned' && that.newton.poisoned == false) {
      that.poisonNewton(that.newton);
    }
  },

  createApple: function(that, apple){
    
    apple.physicsBodyType = Phaser.Physics.P2JS;
    game.physics.p2.enable(apple);
    apple.enableBody = true;
    
    apple.checkWorldBounds = false;
    apple.body.collideWorldBounds = false;
    
    apple.scale.x = 0.1;
    apple.scale.y = 0.1;
    apple.anchor.setTo(0.5, 0);
    
    game.world.addAt(apple, that.newton.z + 2);
    
    apple.body.data.gravityScale = 0;
    
    this.growApple(that, apple);
  },

  growApple: function(that, apple) {
    game.add.tween(apple.scale).to({ y: 1 }, 2500, Phaser.Easing.Cubic.In, true);
    game.add.tween(apple.scale).to({ x: 1 }, 2500, Phaser.Easing.Cubic.In, true);
    game.time.events.add(Phaser.Timer.SECOND * 3.5, this.shakeApple, this, that, apple);
  },     

  dropApple: function(that, apple){
    
    if(that.newton.poisoned == true){
      game.add.tween(apple.scale).to({ y: that.worldY}, 10000, Phaser.Easing.Cubic.In, true);
      game.add.tween(apple.scale).to({ x: 0.5}, 2000, Phaser.Easing.Linear.In, true);
      apple.body.data.gravityScale = 0.4;
    } else {
      apple.body.data.gravityScale = 0.5;
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
    game.time.events.add(Phaser.Timer.SECOND * 10, this.fadeApple, this, that, apple);
    game.time.events.add(Phaser.Timer.SECOND * 13, this.killApple, this, that, apple);
  },

  fadeApple: function(that, apple){
    game.add.tween(apple).to({ alpha: 0 }, utilities.randomizer(1000, 5000), Phaser.Easing.Linear.In, true);
  },
  
  killApple: function(that, apple) {
    apple.destroy();
    that.apple_amount -= 1;
  }
};
