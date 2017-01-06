var newton = {

  init: function(that){

    that.newton_x = that.newton.body.x;;
    that.newton_y = that.newton.body.y;;
    that.newton = game.add.group();
    game.world.addAt(that.newton, that.newton.z);

    that.newton_left_thigh = that.newton.create(that.newton_x + 15, that.newton_y, 'newton_thigh');
    that.newton_left_thigh.physicsBodyType = Phaser.Physics.P2JS;
    that.newton_left_thigh.enableBody = true;
    game.physics.p2.enable(that.newton_left_thigh);
    that.newton_left_thigh.body.data.gravityScale = utilities.randomizer(0.5, 1);
    that.newton_left_thigh.body.setCollisionGroup(that.newton_collision_group);
    that.newton_left_thigh.scale.x = that.newton.scale.x;
    game.world.addAt(that.newton_left_thigh, that.newton.z);
    that.newton_left_thigh.body.collideWorldBounds = false;
    that.newton_left_thigh.body.velocity.x = utilities.randomizer(-5000, 5000);
    that.newton_left_thigh.body.velocity.y = utilities.randomizer(-5000, 500);

    that.newton_right_thigh = that.newton.create(that.newton_x, that.newton_y, 'newton_thigh');
    that.newton_right_thigh.physicsBodyType = Phaser.Physics.P2JS;
    that.newton_right_thigh.enableBody = true;
    game.physics.p2.enable(that.newton_right_thigh);
    that.newton_right_thigh.body.data.gravityScale = utilities.randomizer(0.5, 1);
    that.newton_right_thigh.body.setCollisionGroup(that.newton_collision_group);
    game.world.addAt(that.newton_right_thigh, that.newton.z);
    that.newton_right_thigh.body.collideWorldBounds = false;
    that.newton_right_thigh.body.velocity.x = utilities.randomizer(-5000, 5000);
    that.newton_right_thigh.body.velocity.y = utilities.randomizer(-5000, 500);

    that.newton_left_leg = that.newton.create(that.newton_x, that.newton_y, 'newton_leg');
    that.newton_left_leg.physicsBodyType = Phaser.Physics.P2JS;
    that.newton_left_leg.enableBody = true;
    game.physics.p2.enable(that.newton_left_leg);
    that.newton_left_leg.body.data.gravityScale = utilities.randomizer(0.5, 1);
    that.newton_left_leg.body.setCollisionGroup(that.newton_collision_group);
    game.world.addAt(that.newton_left_leg, that.newton.z);
    that.newton_left_leg.body.collideWorldBounds = false;
    that.newton_left_leg.body.velocity.x = utilities.randomizer(-5000, 5000);
    that.newton_left_leg.body.velocity.y = utilities.randomizer(-5000, 500);

    that.newton_right_leg = that.newton.create(that.newton_x, that.newton_y, 'newton_leg');
    that.newton_right_leg.physicsBodyType = Phaser.Physics.P2JS;
    that.newton_right_leg.enableBody = true;
    game.physics.p2.enable(that.newton_right_leg);
    that.newton_right_leg.body.data.gravityScale = utilities.randomizer(0.5, 1);
    that.newton_right_leg.body.setCollisionGroup(that.newton_collision_group);
    game.world.addAt(that.newton_right_leg, that.newton.z);
    that.newton_right_leg.body.collideWorldBounds = false;
    that.newton_right_leg.body.velocity.x = utilities.randomizer(-5000, 5000);
    that.newton_right_leg.body.velocity.y = utilities.randomizer(-5000, 500);

    that.newton_trousers = that.newton.create(that.newton_x, that.newton_y, 'newton_trousers');
    that.newton_trousers.physicsBodyType = Phaser.Physics.P2JS;
    that.newton_trousers.enableBody = true;
    game.physics.p2.enable(that.newton_trousers);
    that.newton_trousers.body.data.gravityScale = utilities.randomizer(0.5, 1);
    that.newton_trousers.body.setCollisionGroup(that.newton_collision_group);
    game.world.addAt(that.newton_trousers, that.newton.z);
    that.newton_trousers.body.collideWorldBounds = false;
    that.newton_trousers.body.velocity.x = utilities.randomizer(-5000, 5000);
    that.newton_trousers.body.velocity.y = utilities.randomizer(-5000, 500);

    that.newton_torso = that.newton.create(that.newton_x, that.newton_y, 'newton_torso');
    that.newton_torso.physicsBodyType = Phaser.Physics.P2JS;
    that.newton_torso.enableBody = true;
    game.physics.p2.enable(that.newton_torso);
    that.newton_torso.body.data.gravityScale = utilities.randomizer(0.5, 1);
    that.newton_torso.body.setCollisionGroup(that.newton_collision_group);
    game.world.addAt(that.newton_torso, that.newton.z);
    that.newton_torso.body.collideWorldBounds = false;
    that.newton_torso.body.velocity.x = utilities.randomizer(-5000, 5000);
    that.newton_torso.body.velocity.y = utilities.randomizer(-5000, 500);

    that.newton_head = that.newton.create(that.newton_x, that.newton_y, 'newton_head');
    that.newton_head.enableBody = true;
    game.physics.p2.enable(that.newton_head);
    that.newton_head.physicsBodyType = Phaser.Physics.P2JS;
    that.newton_head.body.data.gravityScale = utilities.randomizer(0.5, 1);
    that.newton_head.body.setCollisionGroup(that.newton_collision_group);
    game.world.addAt(that.newton_head, that.newton.z);
    that.newton_head.body.collideWorldBounds = false;
    that.newton_head.body.velocity.x = utilities.randomizer(-5000, 5000);
    that.newton_head.body.velocity.y = utilities.randomizer(-5000, 500);

    that.newton_eyes = that.newton.create(that.newton_x, that.newton_y, 'newton_eyes');
    that.newton_eyes.enableBody = true;
    game.physics.p2.enable(that.newton_eyes);
    that.newton_eyes.physicsBodyType = Phaser.Physics.P2JS;
    that.newton_eyes.body.data.gravityScale = utilities.randomizer(0.5, 1);
    that.newton_eyes.body.setCollisionGroup(that.newton_collision_group);
    game.world.addAt(that.newton_eyes, that.newton.z);
    that.newton_eyes.body.collideWorldBounds = false;

    that.newton_mouth = that.newton.create(that.newton_x, that.newton_y, 'newton_mouth');
    that.newton_mouth.enableBody = true;
    game.physics.p2.enable(that.newton_mouth);
    that.newton_mouth.physicsBodyType = Phaser.Physics.P2JS;
    that.newton_mouth.body.data.gravityScale = utilities.randomizer(0.5, 1);
    that.newton_mouth.body.setCollisionGroup(that.newton_collision_group);
    game.world.addAt(that.newton_torso, that.newton.z);
    that.newton_mouth.body.collideWorldBounds = false;

    that.newton_hair = that.newton.create(that.newton_x, that.newton_y, 'newton_hair');
    that.newton_hair.enableBody = true;
    game.physics.p2.enable(that.newton_hair);
    that.newton_hair.physicsBodyType = Phaser.Physics.P2JS;
    that.newton_hair.body.data.gravityScale = utilities.randomizer(0.5, 1);
    that.newton_hair.body.setCollisionGroup(that.newton_collision_group);
    game.world.addAt(that.newton_torso, that.newton.z);
    that.newton_hair.body.collideWorldBounds = false;
    that.newton_hair.body.velocity.x = utilities.randomizer(-5000, 5000);
    that.newton_hair.body.velocity.y = utilities.randomizer(-5000, 500);

    game.physics.p2.createLockConstraint(that.newton_eyes, that.newton_head, [25, -10], 0);
    game.physics.p2.createLockConstraint(that.newton_mouth, that.newton_head, [25, 2], 0);
    game.physics.p2.createLockConstraint(that.newton_hair, that.newton_head, [0, 2], 0);

    that.newton_right_leg.body.collides([that.ground_collision_group, that.bush_collision_group, that.enemy_collision_group, that.newton_collision_group]);
    that.newton_left_leg.body.collides([that.ground_collision_group, that.bush_collision_group, that.enemy_collision_group, that.newton_collision_group]);
    that.newton_head.body.collides([that.ground_collision_group, that.bush_collision_group, that.enemy_collision_group, that.newton_collision_group]);
    that.newton_torso.body.collides([that.ground_collision_group, that.bush_collision_group, that.enemy_collision_group, that.newton_collision_group]);
    that.newton_trousers.body.collides([that.ground_collision_group, that.bush_collision_group, that.enemy_collision_group, that.newton_collision_group]);
    that.newton_right_thigh.body.collides([that.ground_collision_group, that.bush_collision_group, that.enemy_collision_group, that.newton_collision_group]);
    that.newton_left_thigh.body.collides([that.ground_collision_group, that.bush_collision_group, that.enemy_collision_group, that.newton_collision_group]);

    if(utilities.randomizer(1, 1000000) == 1){

      enemy_events.gravitateRaven(that);
    }
  },
};
