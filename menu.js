var menu_state = {
  
  create: function() {

    this.background_3 = game.add.tileSprite(0, 0, 1600, 900, 'background_3');
    this.background_2 = game.add.tileSprite(0, 0, 1600, 900, 'background_2');
    this.background_1 = game.add.tileSprite(0, 0, 1600, 900, 'background_1');
    
    this.title = game.add.text(game.world.width/2, 150, 'Apple Catch');
    this.title.anchor.setTo(0.5, 0.5);
    this.title.font = 'Arial';
    this.title.fontSize = 100;
    this.title.fontWeight = 'bold';
    this.title.stroke = '#000000';
    this.title.strokeThickness = 5;
    this.title.fill = '#ffffff';

    this.subtitle = game.add.text(game.world.width/2, 250, 'Beta v.0.9');
    this.subtitle.anchor.setTo(0.5, 0.5);
    this.subtitle.font = 'Arial';
    this.subtitle.fontSize = 35;
    this.subtitle.fontWeight = 'bold';
    this.subtitle.stroke = '#000000';
    this.subtitle.strokeThickness = 3;
    this.subtitle.fill = '#ffffff';
    
    this.play_button = game.add.button(800, 700, 'play_button', this.start, this, 1, 0, 1, 1);
    this.play_button.anchor.setTo(0.5, 0.5);
  },

  start: function() {
    this.game.state.start('play');
  },

  update: function() {
  
    this.background_3.tilePosition.x -= 1;
    this.background_2.tilePosition.x -= 2;
    this.background_1.tilePosition.x -= 4;
  },
};

