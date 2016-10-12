var creditsState = {
	preload: function(){
		
	},
	create: function(){
		game.add.tileSprite(0,0,450,750,'bg3');
	
		var Ltext1 = game.add.text(game.width/2, 100, "Alvin Boworn", {font: '24px Arial', fill: '#ffffff'});
		Ltext1.anchor.setTo(0.5,0.5);
		
		var Ltext2 = game.add.text(game.width/2, 170, "Varatvetch Entamin", {font: '24px Arial', fill: '#ffffff'});
		Ltext2.anchor.setTo(0.5,0.5);
		
		var Ltext3 = game.add.text(game.width/2, 240, "Jirass Kruaval", {font: '24px Arial', fill: '#ffffff'});
		Ltext3.anchor.setTo(0.5,0.5);
		
		var Ltext4 = game.add.text(game.width/2, 320, "All images and assets used are", {font: '20px Arial', fill: '#ffffff'});
		Ltext4.anchor.setTo(0.5,0.5);
		
		var Ltext5 = game.add.text(game.width/2, 350, "credited to their respective", {font: '20px Arial', fill: '#ffffff'});
		Ltext5.anchor.setTo(0.5,0.5);
		
		var Ltext5 = game.add.text(game.width/2, 380, "owners", {font: '20px Arial', fill: '#ffffff'});
		Ltext5.anchor.setTo(0.5,0.5);
		
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
