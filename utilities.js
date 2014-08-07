var utilities  = {

  randomizer: function(min, max, exclude){
    
    function pickRandom(min, max){
      return Math.round(Math.random() * (max - min) + min)
    }
    random_number = pickRandom(min, max);

    while(random_number == exclude){
      random_number = pickRandom(min, max);
    }
    return random_number
  },
  
  setPatchPosition: function(patch){
    
    var xmin = patch.xmin;
    var xmax = patch.xmax;
    var ymin = patch.ymin;
    var ymax = patch.ymax;

    var xpos = this.randomizer(xmin, xmax);
    var ypos = this.randomizer(ymin, ymax);
    return {'x': xpos, 'y': ypos}
  },

  fetchContext: function(){
    return play_state;
  }
};
