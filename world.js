var world = {

  init: function(that){
    that.background_3 = game.add.tileSprite(0, 0, 1600, 900, 'background_3');
    that.background_2 = game.add.tileSprite(0, 0, 1600, 900, 'background_2');
    that.background_1 = game.add.tileSprite(0, 0, 1600, 900, 'background_1');

    that.ground = game.add.sprite(800, 850, 'background_0');
    game.physics.p2.enable(that.ground);
    that.ground.physicsBodyType = Phaser.Physics.P2JS
    that.ground.body.setCollisionGroup(that.ground_collision_group);
    that.ground.body.static = true;
    that.ground.anchor.setTo(0.5, 0.5);

    that.left_bush = game.add.sprite(-50, 700, 'big-bush');
    game.physics.p2.enable(that.left_bush);
    that.left_bush.physicsBodyType = Phaser.Physics.P2JS
    that.left_bush.body.setRectangle(350, 500);
    that.left_bush.body.setCollisionGroup(that.bush_collision_group);
    that.left_bush.body.data.gravityScale = 0;
    that.left_bush.scale.x = 0.85;
    that.left_bush.scale.y = 0.85;
    that.left_bush.bounce = 0.85
    that.left_bush.fixedBody = true;
    that.left_bush.body.collideWorldBounds = false;
    that.left_bush.body.static = true;

    that.right_bush = game.add.sprite(that.worldX + 50, 700, 'big-bush');
    game.physics.p2.enable(that.right_bush);
    that.right_bush.physicsBodyType = Phaser.Physics.P2JS
    that.right_bush.body.setRectangle(350, 500);
    that.right_bush.body.setCollisionGroup(that.bush_collision_group);
    that.right_bush.body.data.gravityScale = 0;
    that.right_bush.scale.x = -0.85;
    that.right_bush.scale.y = 0.85
    that.right_bush.bounce = 0.85
    that.right_bush.fixedBody = true;
    that.right_bush.body.collideWorldBounds = false;
    that.right_bush.body.static = true;

    that.fade_screen = game.add.sprite(0, 0, 'black_screen');
    that.fade_screen.alpha = 1;
    that.fade_screen.fixedToCamera = true;
 
  },

  updateWorld: function(that){
    that.background_2.tilePosition.x = game.camera.x/8;
    that.background_3.tilePosition.x = game.camera.x/4;
  }
};
