var menu_state = {

  create: function() {

    /*var prev_score = score;*/

    var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space_key.onDown.add(this.start, this);

    var instyle = { font: "25px Arial", fill: "#ffffff" };
    var x = game.world.width/2, y = game.world.height/2;

    var intext = this.game.add.text(x, y-20, "Press Space to Begin", instyle);
    intext.anchor.setTo(0.5, 0.5);

    var tistyle = { font: "50px Arial", fill: "#ffffff" };
    
    var titext = this.game.add.text(x, y-120, "Swimmy Shark", tistyle);
    titext.anchor.setTo(0.5, 0.5);

    if (score > 0)  {
      var score_label = this.game.add.text(x, y+50, "Score: " + score, instyle);
      score_label.anchor.setTo(0.5, 0.5);
    };

    /*if (score >= prev_score) {
      var high_score = score;
      var high_score_label = this.game.add.text(x, y+70, "Highscore: " high_score, instyle);
      high_score_label.anchor.setTo(0.5, 0.5);
    }*/
    
  },

  start: function() {
    this.game.state.start('play');

  }
};

