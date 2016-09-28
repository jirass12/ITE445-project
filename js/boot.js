var bootState = {
//is this necessary?
/* 	preload: function(){
	},
	 */
	create: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.renderer.renderSession.roundPixels = true;
		game.state.start('load');
	}

}