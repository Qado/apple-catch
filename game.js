var game = new Phaser.Game(1600, 900 , Phaser.AUTO, 'game_div');

var score = 0;
var music_volume = 1;
var sfx_volume = 1;

game.state.add('boot', boot_state);
game.state.add('load', load_state);
game.state.add('menu', menu_state);
game.state.add('play', play_state);

game.state.start('boot');
