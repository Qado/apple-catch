var menu_state = {

  create: function() {

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    this.worldX = game.world.width;
    this.worldY = game.world.height;


    game.stage.backgroundColor = '#C2E7FF';

    world_events.init(menu_state);
    this.cloud_cover = 900;
    this.cloud_tint = '0xffffff';
    this.cloud_speed = 50000;

    //Creates the scrolling background sprite//
    this.background_3 = game.add.tileSprite(0, 0, 1600, 900, 'background_3');
    this.background_2 = game.add.tileSprite(0, 0, 1600, 900, 'background_2');
    this.background_1 = game.add.tileSprite(0, 0, 1600, 900, 'background_1');

    var title = utilities.formatText('Apple Catch', 800, 200, 125, 10);
    //Creates the play button and places it to the middle of the screen//

    this.play_button = game.add.button(800, 675, 's_blank_button', this.fadeOut, this, 1, 0, 1, 1);
    this.play_button.anchor.setTo(0.5, 0.5);
    this.play_button.alpha = 0;
    var play_text = utilities.formatText('PLAY', 800, 675, 50, 5);

    this.fade_screen = game.add.sprite(800, 450, 'black_screen');
    this.fade_screen.anchor.setTo(0.5, 0.5);
    this.fade_screen.alpha = 1;
    game.add.tween(this.fade_screen).to( { alpha: 0 }, 5000, Phaser.Easing.Linear.Out, true);

    //this.music_button = game.add.button(1200, 700, 'music_button', this.muteMusic, this, 1, 0, 1, 2);
    //this.music_button.anchor.setTo(0.5, 0.5);

    //Creates the menu screen music and plays it at full volume//
    this.title_theme = game.add.audio('title-theme', music_volume, true);
    this.title_theme.play();
  },

  fadeOut: function(){

    game.add.tween(this.fade_screen).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.Out, true);
    game.add.tween(this.title_theme).to( { volume: 0 }, 1000, Phaser.Easing.Linear.Out, true);
    game.time.events.add(Phaser.Timer.SECOND * 1.2, this.start, this);

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
    if(music_volume = 1) {
      music_volume = 0;
    }
    if(music_volume = 0) {
      music_volume = 1;
    }
  },

  update: function() {

    //this.title_theme.volume = music_volume;

    //Makes the background scroll//
    this.background_3.tilePosition.x -= 1;
    this.background_2.tilePosition.x -= 2;
    this.background_1.tilePosition.x -= 4;
    world_events.updateWorld(menu_state);
  },
};

