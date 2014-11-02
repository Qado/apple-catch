var boot_state = {

  create: function() {
  
    this.text = utilities.formatText('Loading...', 800, 450, 50, 5);
    game.load.onFileComplete.add(this.fileComplete, this);
    game.load.onLoadComplete.add(this.loadComplete, this);
    game.state.start('load');
  },
  
  fileComplete: function(progress, success, totalLoaded, totalFiles) {
    update = "Loading: " + progress + "%"
    this.text = utilities.updateText(update, this.text);
  },

  loadComplete: function(){
    this.text.updateText('Complete', this.text);
  }
};
