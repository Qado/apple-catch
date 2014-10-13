var menu_state = {
  
  create: function() {

    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    //Creates the scrolling background sprite//
    this.background_3 = game.add.tileSprite(0, 0, 1600, 900, 'background_3');
    this.background_2 = game.add.tileSprite(0, 0, 1600, 900, 'background_2');
    this.background_1 = game.add.tileSprite(0, 0, 1600, 900, 'background_1');
    
    var style = { font: "24px Idolwild", fill: "#ff0044", align: "center" };

    //Creates the title sprite and sets it to the middle of the screen//
    this.title = game.add.text(game.world.width/2, 150, 'Apple Catch', style);
    this.title.anchor.setTo(0.5, 0.5);
    //this.title.font = 'Arial';
    this.title.fontSize = 100;
    this.title.fontWeight = 'bold';
    this.title.stroke = '#000000';
    this.title.strokeThickness = 5;
    this.title.fill = '#ffffff';

    //Creates the subtitle sprite and sets it too to the middle of the screen//
    this.subtitle = game.add.text(game.world.width/2, 225, 'Beta v.0.9');
    this.subtitle.anchor.setTo(0.5, 0.5);
    this.subtitle.font = 'Arial';
    this.subtitle.fontSize = 35;
    this.subtitle.fontWeight = 'bold';
    this.subtitle.stroke = '#000000';
    this.subtitle.strokeThickness = 3;
    this.subtitle.fill = '#ffffff';
    
    //Creates the play button and places it to the middle of the screen//
    this.play_button = game.add.button(400, 700, 'play_button', this.start, this, 1, 0, 1, 1);
    this.play_button.anchor.setTo(0.5, 0.5);

    this.music_button = game.add.button(1200, 700, 'music_button', this.muteMusic, this, 1, 0, 1, 2);
    this.music_button.anchor.setTo(0.5, 0.5);
    
    //Creates the menu screen music and plays it at full volume//
    this.title_theme = game.add.audio('title-theme', music_vol, true);
    this.title_theme.play();
  },

  /*===========================================================================*\
  
    Start: Starts the play state.

    Args:
      Nothing.

    Returns:
      Nothing.

    Starts the play state and pauses the menu screen song.
  
  \*===========================================================================*/
  start: function() {
    this.game.state.start('play');
    this.title_theme.pause();
  },

  muteMusic: function() {
    if(music_vol = 1) {
      music_vol = 0;
    } 
    if(music_vol = 0) {
      music_vol = 1;
    }
  },

  update: function() {

    this.title_theme.volume = music_vol;

    //Makes the background scroll//
    this.background_3.tilePosition.x -= 1;
    this.background_2.tilePosition.x -= 2;
    this.background_1.tilePosition.x -= 4;
  },
};

