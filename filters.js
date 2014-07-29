var filters = {

  init: function(that) {
    that.marble_background = game.add.sprite(0, 0);
    that.marble_background.width = that.worldX;
    that.marble_background.height = that.worldY;
    that.marble = game.add.filter('Marble', that.worldX, that.worldY);
    that.marble_background.filters = null;
    that.marble.alpha = 0.8;
  },

  updateFilter: function(that) {
    that.marble.update();
  },

  killFilter: function(that) {
    that.marble_background.filters = null;
  }
};
