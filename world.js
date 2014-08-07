var world = {

  init: function(that){
    that.background_3 = game.add.tileSprite(0, 0, 1600, 900, 'background_3');
    that.background_2 = game.add.tileSprite(0, 0, 1600, 900, 'background_2');
    that.background_1 = game.add.tileSprite(0, 0, 1600, 900, 'background_1');
  },

  updateWorld: function(that){
    that.background_2.tilePosition.x = game.camera.x/8;
    that.background_3.tilePosition.x = game.camera.x/4;
  }
};
