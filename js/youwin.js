var youwinState = {
	init: function(){
		
	},
	
	create:function(){
		var introTxt = game.add.bitmapText(game.camera.width/2, game.camera.height/2 - 170, 'introFont', 'you', 35);
		introTxt.anchor.setTo(0.5,0.5);
		introTxt.alpha = 0.0;
		var retryTxt = game.add.bitmapText(game.camera.width/2, game.camera.height/2 - 50, 'introFont', 'Win', 84);
		retryTxt.anchor.setTo(0.5,0.5); 
		retryTxt.alpha = 0.0;
		var introTween = game.add.tween(introTxt).to({alpha: 1.0}, 2500,Phaser.Easing.Linear.None,true,0, 0 ,false);
		var retryTween = game.add.tween(retryTxt).to({alpha: 1.0}, 2500,Phaser.Easing.Linear.None,true,0, 0 ,false);
		retryTween.onComplete.add(function(){
			var nextTxt  = game.add.bitmapText(game.camera.width/2, game.camera.height/2 + 200, 'introFont', 'Next', 40);
			nextTxt.anchor.setTo(0.5,0.5);
			nextTxt.inputEnabled = true;
			nextTxt.events.onInputOver.add(this.over, this);
			nextTxt.events.onInputOut.add(this.out, this);
			nextTxt.events.onInputDown.add(this.down, this);
			nextTxt.events.onInputUp.add(this.toLevel,this);
			
		},this)
	},
	toLevel:function(){
		bgmusic.play();
		game.state.start('levelSelect');
		
	},
	over: function(item) {
		item.fontSize += 5;
	},

	out: function(item) {
		item.fontSize -= 5;
	},
	down: function(item) {
		item.fontSize -= 5;
	},
	
};