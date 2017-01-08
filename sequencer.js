var sequencer = {

  updateSequencer: function(that){

    //console.log(that.game.time.totalElapsedSeconds());

    //Hedgehog Sequencer//
    if(that.score >= 0 && that.enemy_events_state.hedgehog == false){
      if(utilities.randomizer(1,  500) == 1){
        enemy_events.spawnHedgehog(play_state);
      }
    }

    //Beehive Sequencer//
    if(that.score >= 5 && that.enemy_events_state.beehive == false){
      if(utilities.randomizer(1, (1000 - (that.score *5))) == 1){
        enemy_events.spawnBeehive(play_state);
      }
    }

    //Night Seqeuncer//
    if(that.score >= 8 && that.world_events_state.night == false){
      if(utilities.randomizer(1, 1500) == 1){
        world_events.startNight(play_state);
      }
    }

    //Raven Sequencer//
    if(that.score >= 3 && that.enemy_events_state.raven == false){
      if(utilities.randomizer(1, (700 - (that.score * 5))) == 1){
        enemy_events.spawnRaven(play_state);
      }
    }


    //CanonBall Sequencer//
    if(that.score >= 10 && that.enemy_events_state.canon_ball == false){
      if(utilities.randomizer(1, (900 - (that.score * 10))) == 1){
        enemy_events.spawnCanonBall(play_state);
      }
    }

    //Storm Sequencer//
    if(that.score >= 1 && that.world_events_state.storm == false){
      if(utilities.randomizer(1, 5000) == 1){
        world_events.startStorm(play_state);
      }
    }
  }
};
