var mutemusic;
var playmusic;
var muteeffect;
var playeffect;
var optionState = {

preload: function(){
	
	},
	create: function(){
		//------------put in the menu ------------------------
		//-------------add and play music---------------------------------
		this.music = game.add.audio('music');
		this.music.fadeIn(500);
		this.music.fadeOut(500);
		this.music.loop = true;
		
		this.music.play();
		//------------------------------------------------------------

		//background   (can be changed later) ------------------
		game.stage.backgroundColor = "#000000";
		//-------------OPTION title ----------------------------------
		var title = game.add.text(game.width / 2, 100, "OPTION", {font: '50px Arial', fill: '#ffffff' });
		title.anchor.setTo(0.5,0.5);


		//-----------mute and play music-----------------------------------------
		mutemusic = game.add.text(game.width / 2, 250, "MUTE MUSIC", {font: '40px Arial', fill: '#ffffff' });
		mutemusic.anchor.setTo(0.5,0.5);
		mutemusic.inputEnabled = true;
		mutemusic.visible = true;

		mutemusic.events.onInputOver.add(this.over, this);
		mutemusic.events.onInputOut.add(this.out, this);
		mutemusic.events.onInputDown.add(this.down, this);
		mutemusic.events.onInputUp.add(this.mutemusic, this);

		playmusic = game.add.text(game.width / 2, 250, "PLAY MUSIC", {font: '40px Arial', fill: '#ffffff' });
		playmusic.anchor.setTo(0.5,0.5);
		playmusic.inputEnabled = true;
		playmusic.visible = false;

		playmusic.events.onInputOver.add(this.over, this);
		playmusic.events.onInputOut.add(this.out, this);
		playmusic.events.onInputDown.add(this.down, this);
		playmusic.events.onInputUp.add(this.playmusic, this);
		//---------------------------------------------------------------------------------

		//----------------------------mute and play effect ---------------------------------
		muteeffect = game.add.text(game.width / 2, 400, "MUTE EFFECT", {font: '40px Arial', fill: '#ffffff' });
		muteeffect.anchor.setTo(0.5,0.5);
		muteeffect.inputEnabled = true;
		muteeffect.visible = true;

		muteeffect.events.onInputOver.add(this.over, this);
		muteeffect.events.onInputOut.add(this.out, this);
		muteeffect.events.onInputDown.add(this.down, this);
		muteeffect.events.onInputUp.add(this.muteeffect, this);

		playeffect = game.add.text(game.width / 2, 400, "PLAY EFFECT", {font: '40px Arial', fill: '#ffffff' });
		playeffect.anchor.setTo(0.5,0.5);
		playeffect.inputEnabled = true;
		playeffect.visible = false;

		playeffect.events.onInputOver.add(this.over, this);
		playeffect.events.onInputOut.add(this.out, this);
		playeffect.events.onInputDown.add(this.down, this);
		playeffect.events.onInputUp.add(this.playeffect, this);
		//---------------------------------------------------------------------------------


		//------------------ back to main menu ---------------------------------------------
		var back = game.add.text(game.width / 2, 650, "BACK", {font: '30px Arial', fill: '#ffffff'});
		back.anchor.setTo(0.5,0.5);		
		back.inputEnabled = true;

		back.events.onInputOver.add(this.over, this);
		back.events.onInputOut.add(this.out, this);
		back.events.onInputDown.add(this.down, this);
		back.events.onInputUp.add(this.back, this);
		//----------------------------------------------------------------------------------

	},
	//change color of text and other function------
	over: function(item) {
		item.fill = '#FFFF66';
	},

	out: function(item) {
		item.fill = '#FFFFFF';
	},

	down: function(item) {
		item.fill = '#FFCC33';
	},

	back: function(back) {
		game.state.start('menu');
	},

	mutemusic: function(mutemusic) {
		game.sound.mute = true;
		mutemusic.visible = false;
		playmusic.visible = true;
		playmusic.events.onInputUp.add(this.playmusic, this);
	},

	playmusic: function(playmusic) {
		game.sound.mute = false;
		playmusic.visible = false;
		mutemusic.visible = true;
		mutemusic.events.onInputUp.add(this.mute, this);
	},

	muteeffect: function(muteeffect) {
		// this line for mute effect (no effect yet)
		muteeffect.visible = false;
		playeffect.visible = true;
		playeffect.events.onInputUp.add(this.playeffect, this);
	},

	playeffect: function(playeffect) {
		//this line for play effect (no effect yet)
		game.sound.mute = false;
		playeffect.visible = false;
		muteeffect.visible = true;
		muteeffect.events.onInputUp.add(this.muteeffect, this);
	},


	update: function() {
		
		
		
},


}