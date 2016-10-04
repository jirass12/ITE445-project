var player; //created
var hp = 5;	//created
var orihp = hp;
var lvl1hearts;
var invulnerable = 2; //invulnerable for 2 seconds
var isinvul = false;

var bullet; //created
var bulletdmg = 0.5;
var hombullet;
var homdmg = 1;
var homstart = 85; //original is 30
var laser; //dont forget to add blink before attack launches

var progressbar; 
var progresscrop;
var lvl1timer = 90; //90 seconds
var oritimer = lvl1timer;
var pause_label;

var lvlstarttime;
var i;
//^^ required Elements so far


var text1; //temporary
var text2; //temporary

var playlvl1State = {
	init: function(){
		bgmusic.pause();
		lvl1mus.play();
		lvl1mus.loopFull(0.6);
	},
	create: function(){
		lvlstarttime = game.time.now;
		var bg = game.add.tileSprite(0,0,450,750,'bg3');
		this.game.world.setBounds(0,0,450,750);
		bg.alpha = 0.4;
		//background
			
		this.bullet = game.add.group();
		this.bullet.enableBody = true;
		game.physics.arcade.enable(this.bullet);
		this.bullet.createMultiple(20, 'bullet');
		game.time.events.loop(350, this.addbullet, this);
		//normal bullet
			
		this.hombullet = game.add.group();
		this.hombullet.enableBody = true;
		game.physics.arcade.enable(this.hombullet);
		game.time.events.add((oritimer - homstart) * 1000, function(){
			
			this.hombullet.createMultiple(10, 'hombullet',0);
			game.time.events.loop(800, this.addhombullet, this);
			
		},this);
		
				
		
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
						lvl1timer = oritimer;
						hp = orihp;	
						lvl1mus.stop();
						bgmusic.resume(0.6);
						bg.tint = 0xffffff;
						isinvul = false;
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
		//pause state
		
		progressbar = game.add.sprite(50, 50,'lvlprogress');
		progressbar.anchor.setTo(0);
		progresscrop = new Phaser.Rectangle(progressbar.positionX, progressbar.positionY, progressbar.width, progressbar.height);
		var progtween = game.add.tween(progresscrop).to( { width: 0 }, lvl1timer * 1000, null, false, 0, 0, false);
		progressbar.crop(progresscrop);
		progtween.start();
		//progress bar
		
		this.player = game.add.sprite(game.width/2, 550, 'player');
		this.player.anchor.setTo(0.5);
		this.player.animations.add('playermove',[0,1,2,3,4,5,6,7]);
		this.player.animations.play('playermove',12,true);
		this.player.enableBody = true;
		game.physics.arcade.enable(this.player);
		this.player.body.collideWorldBounds = true;
		//player
		
		this.cursor = game.input.keyboard.createCursorKeys();
		//controls
		
		text1 = game.add.text(game.width/2, game.height/5,hp,{font: '84px Arial', fill: '#fff000'});
		text1.anchor.setTo(0.5);
		text1.visible = false;
		text2 = game.add.text(370, 50,lvl1timer,{font: '40px Arial', fill: '#ffffff'});
		text2.anchor.setTo(0.5);
		text2.visible = false;
		//rendering OR fix
		
		var statsbar = game.add.sprite(game.width/2, 700, 'container2');
		statsbar.anchor.setTo(0.5,0.5);
		//bottom stats bar
		
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
		//hearts
		
		game.time.events.loop(1000, this.lvl1timer, this);
		//timer decreasing
},
	update: function() {
		this.movePlayer();
		game.physics.arcade.overlap(this.player, this.bullet, this.playerhp, null, this);
		game.physics.arcade.overlap(this.player, this.hombullet, this.playerhp2, null, this);
		
		progressbar.updateCrop();
		//prog crop updating
		if(lvl1timer <= 0 || hp<=0){
			this.levelreset();
		}	
},
	levelreset: function(){
		lvl1timer = oritimer;
		hp = orihp;	
		lvl1mus.stop();
		bgmusic.resume(0.6);
		isinvul = false;
		game.state.start('menu');
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
	addhombullet: function(){
		var hombullet = this.hombullet.getFirstDead();
		if(!hombullet) {
			return;
		}
		hombullet.anchor.setTo(0.5);
		hombullet.reset(this.player.x , 0);
		hombullet.animations.add('homMove',[0,1,2]);
		hombullet.animations.play('homMove',3,true);
		
		hombullet.body.velocity.y = 250;
		hombullet.checkWorldBounds = true;
		hombullet.outOfBoundsKill = true;
	},
	playerhp: function(player,bullet) {
		//invulnerable = game.time.now
		//if(game.time.now - invulnerable >= 2000){ 
		if(isinvul == false){
		
			isinvul = true;
			this.noBody;
			hp -= bulletdmg;
			text1.text = hp ;
			
			var temporaryi = lvl1hearts.getAt(Math.floor(hp));
			if (hp % 1 == 0){
				temporaryi.animations.play('halftonone',3,false);
				temporaryi.animations.currentAnim.onComplete.add(function(){temporaryi.animations.play('none',1,true)},this);
			} else{
				temporaryi.animations.play('fulltohalf',3,false);
				temporaryi.animations.currentAnim.onComplete.add(function(){temporaryi.animations.play('half',1,true)},this);
			}
			
			playerblink = game.add.tween(player).to( { alpha: 0.5 }, 200, null, true, 0, 4, true);
			//Set a TimerEvent to occur after 2 seconds
			bullet.kill();
			game.time.events.add(invulnerable*900, this.okBody, this);
			
		//	invulnerable = game.time.now;
		}	
},	
	playerhp2: function(player,hombullet){
		if(isinvul == false){
		//if(game.time.now - invulnerable >= 2000){ 
			isinvul = true;
			this.noBody;
			hp -= homdmg;
			text1.text = hp ;
			if(hp<=0){
				return;
			}
			var temporaryi = lvl1hearts.getAt(Math.round(hp)); //if this is array 4
			var temporaryk = lvl1hearts.getAt(Math.floor(hp)); //this is array 3
			if (hp % 1 == 0){
				temporaryi.animations.play('fulltonone',3,false);
				temporaryi.animations.currentAnim.onComplete.add(function(){temporaryi.animations.play('none',1,true)},this);
			} else{
				temporaryi.animations.play('halftonone',3,false);
				temporaryi.animations.currentAnim.onComplete.add(function(){temporaryi.animations.play('none',1,true)},this);
				temporaryk.animations.play('fulltohalf',3,false);
				temporaryk.animations.currentAnim.onComplete.add(function(){temporaryk.animations.play('half',1,true)},this);
			}
			playerblink = game.add.tween(player).to( { alpha: 0.5 }, 200, null, true, 0, 4, true);
			//Set a TimerEvent to occur after 2 seconds
			hombullet.kill();
			game.time.events.add(Phaser.Timer.SECOND * invulnerable, this.okBody, this);
		}	
	},
	noBody: function(){
		this.player.enableBody = false;
	},
	okBody: function(){
	this.player.alpha = 1.0;
	this.player.enableBody = true;
	isinvul = false;
	
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