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

  setLayer: function(object, layer){
  
    game.world.addAt(object, that.newton.z + layer);
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
  },

  formatText: function(text, pos_x, pos_y, size, thickness){
    //I tried padding fonts so the text wont overlap
    //but it didn't work, so I added two spaces in order
    //to keep the text from clipping.

    text = " " + text + " ";
    text = game.add.text(pos_x, pos_y, text);
    text.anchor.setTo(0.5, 0.5);
    text.font = 'idolwild';
    text.fontSize = size;
    text.fontWeight = 'bold';
    text.stroke = '#b81515';
    text.strokeThickness = thickness;
    text.fill = '#efe296';
    
    //Required to reset new text.
    text.pos_x = pos_x;
    text.pos_y = pos_y;
    text.size = size;
    text.thickness = thickness;
    return text;
  },

 updateText: function(text, text_object){
   pos_x = text_object.pos_x;
   pos_y = text_object.pos_y;
   size = text_object.size;
   thickness = text_object.thickness;

   text_object.destroy();
   text = this.formatText(text, pos_x, pos_y, size, thickness);
   return text
 }
};
