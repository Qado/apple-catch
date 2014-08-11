var sequencer = {

  updateSequencer: function(that){
  
    //Hedgehog Sequencer//
    if(that.score >= 10 && that.enemy_events_state.hedgehog == false){
      if(utilities.randomizer(1, 1000) == 1){
        enemy_events.spawnHedgehog(play_state);
      }
    }

    //Beehive Sequencer//
    if(that.score >= 20 && that.enemy_events_state.beehive == false){
      if(utilities.randomizer(1, 1000) == 1){
        enemy_events.spawnBeehive(play_state);
      }
    }
   
    //Night Seqeuncer//
    if(that.score >= 30 && that.world_events_state.night == false){
      if(utilities.randomizer(1, 1000) == 1){
        world_events.startNight(play_state);
      }
    }
    
    //Raven Sequencer//
    if(that.score >= 30 && that.enemy_events_state.raven == false){
      if(utilities.randomizer(1, 1000) == 1){
        enemy_events.spawnRaven(play_state);
      }
    }
    
    //CanonBall Sequencer//
    if(that.score >= 50 && that.enemy_events_state.canon == false){
      if(utilities.randomizer(1, 1000) == 1){
        enemy_events.spawnCanonBall(play_state);
      }
    }
    
    //Storm Sequencer//
    if(that.score >= 75 && that.world_events_state.storm == false){
      if(utilities.randomizer(1, 1000) == 1){
        enemy_events.startStorm(play_state);
      }
    }
    
    //UFO Sequencer// 
    if(that.score >= 100 && that.enemy_events_state.UFO == false){
      if(utilities.randomizer(1, 1000) == 1){
        enemy_events.spawnUFO(play_state);
      }
    }
  }
};
