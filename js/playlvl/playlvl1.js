var player; //created
var bullet; //created
var hp = 5;	//created
var progressbar; 
var progresscrop;
var lvl1timer = 90; //90 seconds
var laser; //dont forget to add blink before attack launches
var invulnerable = 0;
var pause_label;
var lvl1hearts;
var i;
//^^ required Elements so far

var text1; //temporary
var text2;

var playlvl1State = {
//UNDER CONSTRUCTION
	create: function(){
		var bg = game.add.tileSprite(0,0,450,750,'bg3');
		this.game.world.setBounds(0,0,450,750);
		bg.alpha = 0.4;

		this.bullet = game.add.group();
		this.bullet.enableBody = true;
		game.physics.arcade.enable(this.bullet);
		this.bullet.createMultiple(20, 'bullet');
		game.time.events.loop(350, this.addbullet, this);

		pause_label = game.add.text(415, game.height/45, 'II', { font: '36px Arial', fill: '#ffffff' });
		pause_label.inputEnabled = true;
		pause_label.events.onInputUp.add(function(){
			game.paused = true;	
			//container size is 237 by 80
			exittomenu = game.add.sprite(game.width/2, 280,'exittomenu');
			exittomenu.anchor.setTo(0.5);
			
			resume = game.add.sprite(game.width/2, 400, 'resume');
			resume.anchor.setTo(0.5);
			
			paused_label = game.add.text(game.width/2, game.height/8, 'Paused', { font: '48px Arial', fill: '#ffffff' });	
			paused_label.anchor.setTo(0.5);
			
			bg.tint = 0xf05239;
		});
		
		progressbar = game.add.sprite(50, 50,'lvlprogress');
		progressbar.anchor.setTo(0);
		progresscrop = new Phaser.Rectangle(progressbar.positionX, progressbar.positionY, progressbar.width, progressbar.height);
		var progtween = game.add.tween(progresscrop).to( { width: 0 }, lvl1timer * 1000, null, false, 0, 0, false);
		progressbar.crop(progresscrop);
		progtween.start();
		
		game.input.onDown.add(	function(event){
		if(game.paused){	
			//x1 x2 y1 y2 for exittomenu border;
				var x1 = game.width/2 - 118;
				var x2 = game.width/2 + 118;
				var y1 = 280 - 40;
				var y2 = 280 + 40;
			//y3 y4 for resume border;
				var y3 = 400 - 40;
				var y4 = 400 + 40;
				
				if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
						game.paused = false;
						game.state.start('menu');
						hp = 5;
						lvl1timer = 90;	
						bg.tint = 0xffffff;
				} else if(event.x > x1 && event.x < x2 && event.y > y3 && event.y < y4){
						bg.tint = 0xffffff;
						game.paused = false;
						paused_label.destroy();
						exittomenu.destroy();
						resume.destroy();
				} 
				else{
					
				}
		}	 
		}, self);
	
		this.player = game.add.sprite(game.width/2, 550, 'player');
		this.player.anchor.setTo(0.5);
		this.player.animations.add('playermove',[0,1,2,3,4,5,6,7]);
		this.player.animations.play('playermove',12,true);
		
		this.player.enableBody = true;
		game.physics.arcade.enable(this.player);
		this.player.body.collideWorldBounds = true;
		this.cursor = game.input.keyboard.createCursorKeys();
		//text1 is temporary
		text1 = game.add.text(game.width/2, game.height/5,hp,{font: '84px Arial', fill: '#fff000'});
		text1.anchor.setTo(0.5);
		text1.visible = false;

		text2 = game.add.text(370, 50,lvl1timer,{font: '40px Arial', fill: '#ffffff'});
		text2.anchor.setTo(0.5);
		text2.visible = false;
		
		var statsbar = game.add.sprite(game.width/2, 700, 'container2');
		statsbar.anchor.setTo(0.5,0.5);
		
		lvl1hearts = game.add.group();
		for(i = 0; i< 5; i++){
			var hearts = game.add.sprite(75 * (i+1),700,'hearts');
			hearts.anchor.setTo(0.5,0.5);
			hearts.animations.add('full',[0]);
			hearts.animations.add('fulltohalf',[0,1,0,1,0,1]);
			hearts.animations.add('half',[1]);
			hearts.animations.add('halftonone',[1,2,1,2,1,2]);
			hearts.animations.add('none',[2]);
			hearts.animations.add('fulltonone',[0,2,0,2]);

			hearts.animations.play('full',1,true);
			lvl1hearts.add(hearts);
		}
		
		game.time.events.loop(1000, this.lvl1timer, this);

},
	update: function() {
		
		this.movePlayer();
		game.physics.arcade.overlap(this.player, this.bullet, this.playerhp, null, this);
		
		if(hp <= 0){
			game.state.start('menu');
			hp = 5;
			lvl1timer = 90;
		}
		progressbar.updateCrop();
		//prog crop updating
		
		if(lvl1timer <= 0){
			game.state.start('menu');
			lvl1timer = 90;
			hp = 5;	
		}	
},
	lvl1timer: function() {
		lvl1timer -= 1;
		text2.text -= 1;
},
	addbullet: function() {
		var bullet = this.bullet.getFirstDead();
		if(!bullet) {
			return;
		}
		bullet.anchor.setTo(0.5);
		bullet.reset(game.rnd.integerInRange(10,440) , 0);
		
		bullet.body.velocity.y = 200;
		bullet.checkWorldBounds = true;
		bullet.outOfBoundsKill = true;
},

	playerhp: function(player,bullet) {
		//invulnerable = game.time.now
		if(game.time.now - invulnerable >= 2000){ //
			this.player.enableBody = null;
			this.player.positionY = 580;
			
			hp -= 0.5;
			text1.text = hp ;
			
			var temporaryi = lvl1hearts.getAt(Math.floor(hp));
			if (hp % 1 == 0){
				temporaryi.animations.play('halftonone',3,false);
				temporaryi.animations.currentAnim.onComplete.add(function(){temporaryi.animations.play('none',1,true)},this);
			} else{
				temporaryi.animations.play('fulltohalf',3,false);
				temporaryi.animations.currentAnim.onComplete.add(function(){temporaryi.animations.play('half',1,true)},this);
			}
			
			playerblink = game.add.tween(player).to( { alpha: 0.0 }, 200, null, true, 0, 4, true);
			//Set a TimerEvent to occur after 2 seconds
			bullet.kill();
			game.time.events.add(Phaser.Timer.SECOND * 2, this.okBody, this);
			
			invulnerable = game.time.now;
		}	
},

	okBody: function(){
	this.player.alpha = 1.0;
	this.player.enableBody = true;
	
},
	movePlayer: function(){

			if (this.cursor.left.isDown){
					this.player.body.velocity.x = -300;			
				}	else if (this.cursor.right.isDown){
						this.player.body.velocity.x = 300;
					}	else {
							this.player.body.velocity.x = 0;
						}
},



}