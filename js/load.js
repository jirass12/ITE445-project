var loadState = {
	
	preload: function(){
		game.load.audio('music', 'assets/music.mp3');
	},
	
	create: function(){
		game.state.start('option');
	}
	
}