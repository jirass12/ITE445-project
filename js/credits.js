var creditsState = {
	preload: function(){
		
	},
	create: function(){
		game.add.tileSprite(0,0,450,750,'bg3');
	
		
		var back = game.add.text(game.width / 2, 650, "BACK", {font: '30px Arial', fill: '#ffffff'});
		back.anchor.setTo(0.5,0.5);		
		back.inputEnabled = true;

		back.events.onInputOver.add(this.over, this);
		back.events.onInputOut.add(this.out, this);
		back.events.onInputDown.add(this.down, this);
		back.events.onInputUp.add(this.back, this);
	},
	over: function(item) {
		item.fill = '#FFF066';
		item.fontSize += 5;
	},

	out: function(item) {
		item.fill = '#FFFFFF';
		item.fontSize -= 5;
	},
	down: function(item) {
		item.fill = '#FFCC33';
		item.fontSize -= 5;
	},
	back: function(back) {
		game.state.start('menu');
	},
	
}
