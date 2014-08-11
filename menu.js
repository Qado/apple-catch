var menu_state = {

  create: function() {
   
    this.title = game.add.text(game.world.width/2, 150, 'Apple Catch');
    this.title.anchor.setTo(0.5, 0.5);
    this.title.font = 'Arial';
    this.title.fontSize = 100;

    this.play_button = game.add.sprite(400, 750, 'play_button');
  },

  start: function() {
    this.game.state.start('play');

  }
};

