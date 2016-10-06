var youdiedState = {
	init: function(){
		bgmusic.pause();
	},
	create: function(){
	this.playerDie = game.add.sprite(game.camera.width/2,game.camera.height/2,'player',0);
	this.playerDie.anchor.setTo(0.5);
	
	this.emitter = game.add.emitter(0,0,200);
	this.emitter.makeParticles('pixel');
	this.emitter.setYSpeed(-250,250);
	this.emitter.setXSpeed(-250,250);
	this.emitter.setScale(4,0,4,0,8000);
	this.emitter.gravity = 0;
	
	game.time.events.add(1000,function(){
		this.playerDie.kill();	
		this.emitter.x = this.playerDie.x;
		this.emitter.y = this.playerDie.y;
		this.emitter.start(true, 2000,null,50);	
		deathlaugh.play();
		deathlaugh.volume += 2;
		
		game.time.events.add(2000,function(){
			this.createText();
		},this)
		
	
	},this)
	
	
	},
	createText:function(){
		var introTxt = game.add.bitmapText(game.camera.width/2, game.camera.height/2 - 170, 'introFont', 'you', 24);
		introTxt.anchor.setTo(0.5,0.5);
		introTxt.alpha = 0.0;
		var retryTxt = game.add.bitmapText(game.camera.width/2, game.camera.height/2 - 100, 'introFont', 'DIED', 84);
		retryTxt.anchor.setTo(0.5,0.5); 
		retryTxt.alpha = 0.0;
		var introTween = game.add.tween(introTxt).to({alpha: 1.0}, 2500,Phaser.Easing.Linear.None,true,0, 0 ,false);
		var retryTween = game.add.tween(retryTxt).to({alpha: 1.0}, 2500,Phaser.Easing.Linear.None,true,0, 0 ,false);
		retryTween.onComplete.add(function(){
			var yesTxt  = game.add.bitmapText(game.camera.width/2 - 100, game.camera.height/2 + 200, 'introFont', 'Fight On', 30);
			yesTxt.anchor.setTo(0.5,0.5);
			yesTxt.inputEnabled = true;
			yesTxt.events.onInputDown.add(this.toLevel,this);
			var noTxt = game.add.bitmapText(game.camera.width/2 + 100, game.camera.height/2 + 200, 'introFont', 'Give In',30 );
			noTxt.anchor.setTo(0.5,0.5);
			noTxt.inputEnabled = true;
			noTxt.events.onInputDown.add(this.toMenu, this);
		},this)
	},
	toLevel:function(){
		switch(lvlPlaying){
			case 0:
			break;
			case 1:
			game.state.start('playlvl1');
			break;
			default:
			break;
		}
		
	},
	toMenu:function(){
		bgmusic.resume();
		game.state.start('menu');
	}
}