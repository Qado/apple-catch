var flowers = {

  init: function(that){
    
    that.flowers = game.add.group();
    that.flowers.enableBody = true;

    that.flower_bed = game.add.group();
    that.flower_bed.enableBody = true;

    that.flower_bed_1 = that.flower_bed.create(800, 800, 'flower_bed_1_1');
    game.physics.p2.enable(that.flower_bed_1);
    that.flower_bed_1.physicsBodyType = Phaser.Physics.P2JS;
    //that.flower_bed_1.body.setCollisionGroup(that.flower_bed_collision_group);
    game.world.addAt(that.flower_bed, 22);

    that.flower_data = {
      'white_daisy': {
        'id': 'flower_1',
        'rarity': 3
      },
      
      'pink_tulip': {
        'id': 'flower_2',
        'rarity': 3
      },

      'red_poppy': {
        'id': 'flower_3',
        'rarity': 2
      },
      
      'yellow_lily': {
        'id': 'flower_4',
        'rarity': 2
      },
      
      'blue_geranium': {
        'id': 'flower_5',
        'rarity': 1
      },
      
      'violet': {
        'id': 'flower_6',
        'rarity': 1
      },

      'mushroom': {
        'id': 'mushroom_1',
        'rarity': 2
      },
      
      'glow_mushroom': {
        'id': 'mushroom_2',
        'rarity': 1
      }
    }
  },

  fetchFlowerType: function(that){
    var flower;
    var flower_basket = [];
    var flower_factor = utilities.randomizer(1, 3);
    
    for(flower_name in that.flower_data){
      flower = that.flower_data[flower_name];
      if(flower['rarity'] >= flower_factor){
        flower_basket = flower_basket.concat(flower['id']);
      }
    }
    return flower_basket;
  },

  spawnFlower: function(that){
    var flower_basket;
    var flower_name;
    var flower_direction;
    var flower_height;
    var flower_time;
    var flower_x;
    var flower_y;

    for(i = 0; i < 25; i++){

      flower_basket = this.fetchFlowerType(that);
      flower_name = flower_basket[utilities.randomizer(0, flower_basket.length)];
      flower_direction = utilities.randomizer(-1, 1, 0);
      flower_height = utilities.randomizer(3, 6) * 0.1;
      flower_x = utilities.randomizer(200, 1400);
      flower_y = utilities.randomizer(850, 900);
      flower_time = utilities.randomizer(10, 15) * 1000;
      that.flower = that.flowers.create(flower_x, flower_y, flower_name);
      if(flower_name == 'mushroom_2' || flower_name == 'glow_mushroom' ){
        game.world.addAt(that.flower, 22);
      }
      game.world.addAt(that.flower, 17);
      
      that.flower.anchor.setTo(0.5, 1);
      that.flower.scale.x = 0.1 * flower_direction;
      that.flower.scale.y = 0.1;
      flower_direction = utilities.randomizer(-1, 1, 0);
      game.add.tween(that.flower.scale).to({ x: flower_height * flower_direction }, flower_time, Phaser.Easing.Cubic.In, true);
      game.add.tween(that.flower.scale).to({ y: flower_height }, flower_time, Phaser.Easing.Cubic.In, true);
    }
  }
};
