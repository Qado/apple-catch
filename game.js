var game = new Phaser.Game(1600, 900 , Phaser.AUTO, 'game_div');
var sfx_volume;
var music_volume;

game.state.add('load', load_state);
game.state.add('menu', menu_state);
game.state.add('play', play_state);

game.state.start('load');
