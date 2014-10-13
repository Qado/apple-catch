var game = new Phaser.Game(1600, 900 , Phaser.AUTO, 'game_div');

var music_vol = 1;
var sfx_vol = 1;

game.state.add('load', load_state);
game.state.add('menu', menu_state);
game.state.add('play', play_state);

game.state.start('load');
