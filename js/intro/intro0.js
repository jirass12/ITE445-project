var intro0text = "\"Dante and Virgil descend into the abyss. They enter the first of the concentric rings of Hell, that of LIMBO, the Rim, where dwell, neither in joy nor in suffering, all unbaptized infants are those men and women who lived virtuosly but who lacked the true faith...\""
var typewriter;
var intro0State = {
	init:function(){
		bgmusic.pause();
	},
	create: function(){
		game.stage.backgroundColor = "#000000";
		var skip = game.add.text(game.camera.width - 50,game.camera.height - 50,"Skip",{font: '30px Arial', fill: '#ffffff'})
		skip.anchor.setTo(0.5,0.5);
		skip.inputEnabled = true;
		skip.events.onInputOver.add(this.over, this);
		skip.events.onInputOut.add(this.out, this);
		skip.events.onInputDown.add(this.down, this);
		skip.events.onInputUp.add(this.toLevel, this);
		typingEff.play(0);
		typingEff.loopFull(0.6);
		
		typewriter = new Typewriter();
		typewriter.init(this, {
			x: 50,
			y: 100,
			fontFamily: "introFont",
			fontSize: 28,
			sound: null,
			maxWidth: 350,
			text: intro0text
		});
		typewriter.start();
	},
	update:function(){
		
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
	toLevel:function(){
		typingEff.stop();
		game.state.clearCurrentState();
		game.state.start('playlvl1');
	}
	
}


