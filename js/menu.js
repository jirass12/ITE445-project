var cursors;
var OptionSelection;
var title;
var menubg;
var menuE;

var menuState = {
	
//temporary preload
	preload: function(){
		
	},
	
	create: function(){
		menubg = game.add.tileSprite(0,0,1734.635,750,'bg');
		menubg.animations.add('loopBg',[0,1,2,3,4,5,6,7]);
		menubg.animations.play('loopBg',8,true);
		
		game.world.setBounds(0,0,1734.625,750);
		cursors = game.input.keyboard.createCursorKeys();
		
		bgplayer = game.add.sprite(game.camera.width/2, game.camera.height*2/5,'player');
		bgplayer.anchor.setTo(0.5);
		bgplayer.animations.add('default',[0,1,2,3,4,5,6,7],8,true,true);
		bgplayer.animations.play('default');
	
		title = game.add.text(1 + game.camera.width/2, game.camera.height/5,'Infern0',{font: '84px Arial', fill: '#ffffff'});
		title.anchor.setTo(0.5);
		
		levelSelectSelection = game.add.text(1 + game.camera.width/2, game.camera.height *3/5 ,'Play',{font: '50px Arial', fill: '#ffffff'})	
		levelSelectSelection.anchor.set(0.5);
		levelSelectSelection.inputEnabled = true;
		levelSelectSelection.events.onInputOver.add(this.over, this);
		levelSelectSelection.events.onInputOut.add(this.out, this);
		levelSelectSelection.events.onInputDown.add(this.down, this);
		levelSelectSelection.events.onInputUp.add(this.lvlListener, this);
		
		OptionSelection = game.add.text(1 + game.camera.width/2, game.camera.height *3.5/5,'Option',{font: '50px Arial', fill: '#ffffff'});
		OptionSelection.anchor.setTo(0.5);
		OptionSelection.inputEnabled = true;
		OptionSelection.events.onInputOver.add(this.over, this);
		OptionSelection.events.onInputOut.add(this.out, this);
		OptionSelection.events.onInputDown.add(this.down, this);
		OptionSelection.events.onInputUp.add(this.OptionListener, this);
		
		creditsSelection = game.add.text(1+ game.camera.width/2, game.camera.height *4/5,'Credits',{font: '50px Arial', fill: '#ffffff'});
		creditsSelection.anchor.setTo(0.5);
		creditsSelection.inputEnabled = true;
		creditsSelection.events.onInputOver.add(this.over, this);
		creditsSelection.events.onInputOut.add(this.out, this);
		creditsSelection.events.onInputDown.add(this.down, this);
		creditsSelection.events.onInputUp.add(this.creditsListener, this);
		
		menuE = game.add.group();
		menuE.add(creditsSelection);
		menuE.add(OptionSelection);
		menuE.add(levelSelectSelection);
		menuE.add(bgplayer);
		menuE.add(title);
		//menuE.add(camera); this shit doesnt work :D
		game.add.tween(menuE).to({x:1284.625},10000,null,true,0,-1,true);
		game.add.tween(game.camera).to({x:1284.625},10000,null,true,0,-1,true);
	},
	over: function(item) {
		item.fill = '#FFFF66';
	},

	out: function(item) {
		item.fill = '#FFFFFF';
	},

	down: function(item) {
		item.fill = '#FFCC33';
	},
//----	
	update: function() {
	//game.add.tween(stars.position).to( {y: 100}, 2200, Phaser.Easing.Back.InOut, true, 2000, 20, true).loop(true);		
	/* 	 if(cursors.left.isDown){
				if(game.camera.x >= 3 && game.camera.x <=1203){
					OptionSelection.position.x -=3;
					title.position.x -=3;
					levelSelectSelection.position.x -=3;
					creditsSelection.position.x -=3;
					bgplayer.position.x -=3;
					 game.camera.x -= 3;
				}
				
		}else if (cursors.right.isDown){
			
				if(game.camera.x >= 0 && game.camera.x <=1200){
					OptionSelection.position.x += 3;
					title.position.x +=3;	
					levelSelectSelection.position.x +=3;
					creditsSelection.position.x +=3;
					bgplayer.position.x +=3;
					game.camera.x += 3;
				}
		} */
},
//----
	OptionListener: function(){
		game.state.start('option');	
		
	},
	lvlListener: function(){
		game.state.start('levelSelect');
	},
	creditsListener: function(){
		game.state.start('credits');
	},
	render: function() {

   // game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 100, 100);
   // game.debug.text("Next tick: " + game.time.events.next.toFixed(0), 32, 64);
	game.debug.cameraInfo(game.camera, 32, 32);
}
	
}
	
	

//