var mutemusic;
var playmusic;
var muteeffect;
var playeffect;
var optionState = {

preload: function(){
	
	},
	create: function(){
		game.add.tileSprite(0,0,450,750,'bg3');
		//------------put in the menu ------------------------
		//-------------add and play music---------------------------------
		
		//------------------------------------------------------------

		//background   (can be changed later) ------------------
		game.stage.backgroundColor = "#000000";
		//-------------OPTION title ----------------------------------
		var title = game.add.text(game.width / 2, 100, "OPTION", {font: '50px Arial', fill: '#ffffff' });
		title.anchor.setTo(0.5,0.5);


		//-----------mute and play music-----------------------------------------

		mutemusic = game.add.text(game.width / 2, 350, "MUTE SOUND", {font: '40px Arial', fill: '#ffffff' });
		mutemusic.anchor.setTo(0.5,0.5);
		mutemusic.inputEnabled = true;
		mutemusic.visible = false;
		//^^
		
		mutemusic.events.onInputOver.add(this.over, this);
		mutemusic.events.onInputOut.add(this.out, this);
		mutemusic.events.onInputDown.add(this.down, this);
		mutemusic.events.onInputUp.add(this.mutemusic, this);
		
		playmusic = game.add.text(game.width / 2, 350, "PLAY SOUND", {font: '40px Arial', fill: '#ffffff' });
		playmusic.anchor.setTo(0.5,0.5);
		playmusic.inputEnabled = true;
		playmusic.visible = false;
		//^^
		
		if(bgmusic.mute === true){
			mutemusic.visible = false;
			playmusic.visible = true;
		} else{
			playmusic.visible = false;
			mutemusic.visible = true;
		}

		playmusic.events.onInputOver.add(this.over, this);
		playmusic.events.onInputOut.add(this.out, this);
		playmusic.events.onInputDown.add(this.down, this);
		playmusic.events.onInputUp.add(this.playmusic, this);
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

	mutemusic: function(mutemusic) {
		mutemusic.fontSize = 40;
		bgmusic.mute = true;
		lvl1mus.mute = true;
		typingEff.mute = true;
		laserEff.mute = true;
		deathlaugh.mute = true;
		mutemusic.visible = false;
		playmusic.visible = true;
	},

	playmusic: function(playmusic) {
		playmusic.fontSize = 40;
		bgmusic.mute = false;
		lvl1mus.mute = false;
		typingEff.mute = false;
		laserEff.mute = false;
		deathlaugh.mute = false;
		playmusic.visible = false;
		mutemusic.visible = true;
	},




}