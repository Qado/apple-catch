var menu_state = {
  
  create: function() {
   
    this.music_on = true;
    this.sfx_on = true;

    this.title = game.add.text(game.world.width/2, 150, 'Apple Catch');
    this.title.anchor.setTo(0.5, 0.5);
    this.title.font = 'Arial';
    this.title.fontSize = 100;
    this.title.fontWeight = 'bold';
    this.title.stroke = '#000000';
    this.title.strokeThickness = 5;
    this.title.fill = '#ffffff';


    this.play_button = game.add.button(800, 700, 'play_button', this.start, this, 1, 0, 1, 1);
    this.play_button.anchor.setTo(0.5, 0.5);
  },

  start: function() {
    this.game.state.start('play');

  },
};

