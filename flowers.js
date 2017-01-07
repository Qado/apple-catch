var flowers = {

  init: function(that){

    that.flowers = game.add.group();
    that.flowers.enableBody = true;

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
    };

    that.flower_patches_1 = {
      '1': {
        'xmin': 330,
        'ymin': 650,
        'xmax': 505,
        'ymax': 710
      },
      '2': {
        'xmin': 885,
        'ymin': 750,
        'xmax': 1040,
        'ymax': 875
      },
      '3': {
        'xmin': 1445,
        'ymin': 785,
        'xmax': 1540,
        'ymax': 850
      },
      '4': {
        'xmin': 500,
        'ymin': 775,
        'xmax': 595,
        'ymax': 850
      },
      '5': {
        'xmin': 0,
        'ymin': 830,
        'xmax': 160,
        'ymax': 875
      },
      '6': {
        'xmin': 0,
        'ymin': 860,
        'xmax': 1600,
        'ymax': 900
      },

      '7': {
        'xmin': 1280,
        'ymin': 700,
        'xmax': 1320,
        'ymax': 765
      }
    };
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
    var flower;
    var flower_x;
    var flower_y;
    var flower_name;
    var flower_direction;
    var flower_height;
    var flower_time;
    var flower_patch;
    var flower_position;
    var flower_size;
    var previous_flower = {};
    var flower_amount = utilities.randomizer(20, 35);
    previous_flower.z = 'start';

    for(i = 0; i < flower_amount; i++){
      flower_basket = this.fetchFlowerType(that);
      flower_patch = utilities.randomizer(1, Object.keys(that.flower_patches_1).length);
      flower_position = utilities.setPatchPosition(that.flower_patches_1[flower_patch]);
      flower_x = flower_position['x'];
      flower_y = flower_position['y'];
      flower_name = flower_basket[utilities.randomizer(0, (flower_basket.length - 1))];
      flower_direction = utilities.randomizer(-1, 1, 0);
      flower_height = utilities.randomizer(4, 6) * 0.1;
      flower_size = 33.33 * flower_height;
      flower_time = utilities.randomizer(10, 15) * 1000;
      flower = that.flowers.create(flower_x, flower_y, flower_name);

      if((flower.y + flower_size) >= 825){
        game.world.addAt(flower, (that.newton.z + (1 + (flower.y * 0.001))));
      }else{
        game.world.addAt(flower, (that.newton.z - (1 + (flower.y * 0.001))));
      }
        previous_flower = flower;

      flower.anchor.setTo(0.5, 1);
      flower.scale.x = 0.01 * flower_direction;
      flower.scale.y = 0.01;
      flower_direction = utilities.randomizer(-1, 1, 0);
      var flower_life = utilities.randomizer(20, 40);
      game.add.tween(flower.scale).to({ x: flower_height * flower_direction }, flower_time, Phaser.Easing.Cubic.In, true);
      game.add.tween(flower.scale).to({ y: flower_height }, flower_time, Phaser.Easing.Cubic.In, true);

    }
  }
};
