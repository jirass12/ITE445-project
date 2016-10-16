var invul2IceLaserDur = 500;
var playlvl2State = {
	init: function(){
		bgmusic.pause();
		lvl1mus.play();
		lvl1mus.loopFull(0.6);
		isinvul = false;
	},
	create: function(){
		this.cursor = game.input.keyboard.createCursorKeys(); game.input.keyboard.addKeyCapture([
	Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]); this.ad = {
		left: game.input.keyboard.addKey(Phaser.Keyboard.A), 
		right: game.input.keyboard.addKey(Phaser.Keyboard.D)
		};
		hp = 5;
		lvlstarttime = game.time.now;
		var bg = game.add.tileSprite(0,0,450,750,'bg4');
		this.game.world.setBounds(0,0,450,750);
		bg.alpha = 0.4;
		//background
		
					if (!game.device.desktop) {
this.addMobileInputs();
}
			
		this.player = game.add.sprite(game.width/2, 550, 'player');
		this.player.anchor.setTo(0.5);
		this.player.animations.add('playermove',[0,1,2,3,4,5,6,7]);
		this.player.animations.play('playermove',12,true);
		this.player.enableBody = true;
		game.physics.arcade.enable(this.player);
		this.player.body.enable = true;
		this.player.body.setSize(30,60,9,2);
		this.player.body.collideWorldBounds = true;	
			
		this.bullet = game.add.group();
		this.bullet.enableBody = true;
		game.physics.arcade.enable(this.bullet);
		this.bullet.createMultiple(999, 'bullet');
		game.time.events.loop(275, this.addbullet, this);
		//normal bullet
			
		this.hombullet = game.add.group();
		this.hombullet.enableBody = true;
		game.physics.arcade.enable(this.hombullet);
		game.time.events.add((5000), function(){
		this.hombullet.createMultiple(999, 'hombullet',0);
		game.time.events.loop(900, this.addhombullet, this);
		},this);
		
		// icelaser --
		this.icelaser = game.add.group();
		this.icelaser.enableBody = true;
		game.physics.arcade.enable(this.icelaser);
		this.icelaser.createMultiple(10, 'icelaser');
		game.time.events.add((5000), function(){   //
		game.time.events.loop(9000, this.addalert2, this); //loop every 10 sec
		},this);
		
		// icebullet -- 
		this.icebullet = game.add.group();
		this.icebullet.enableBody = true;
		game.physics.arcade.enable(this.icebullet);
		this.icebullet.createMultiple(100, 'icebullet');
		game.time.events.loop(1100, this.spawnice, this); 
		//--
		
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
			hearts.animations.add('fulltohalf',[0,1,0,1,0,1,0,1,0,1]);
			hearts.animations.add('half',[1]);
			hearts.animations.add('halftonone',[1,2,1,2,1,2,1,2,1,2]);
			hearts.animations.add('none',[2]);
			hearts.animations.add('fulltonone',[0,2,0,2,0,2,0,2,0,2]);

			hearts.animations.play('full',1,false);
			lvl1hearts.add(hearts);
		}
		//hearts
		
		game.time.events.loop(1000, this.lvl1timer, this);
		//timer decreasing
},
	update: function() {
		this.movePlayer();
		progressbar.updateCrop();
		//prog crop updating
		
		game.physics.arcade.overlap(this.player, this.bullet,this.damaged, this.addDmg1,null, this);
		game.physics.arcade.overlap(this.player, this.hombullet, this.damaged,this.addDmg2, null, this);
		game.physics.arcade.overlap(this.player, this.laser, this.damaged,this.addDmg3, null, this);
		game.physics.arcade.overlap(this.player, this.icebullet,this.damaged, this.addDmg1, null, this);
		
		game.physics.arcade.overlap(this.player, this.icelaser,this.icelaserDmg, null, this);
		
		
		// ice laser destroy enemies
		game.physics.arcade.overlap(this.icelaser, this.hombullet, this.laserdestroyhom, null, this);
		game.physics.arcade.overlap(this.icelaser, this.bullet, this.laserdestroybullet, null, this);
		game.physics.arcade.overlap(this.icelaser, this.icebullet, this.laserdestroyicebullet, null, this);
		
		if(lvl1timer <= 0 ){
			this.levelreset();
			game.state.clearCurrentState();
			game.state.start('youwin');
		} else if(hp<=0){
			this.levelreset();
			game.state.clearCurrentState();
			game.state.start('youdied');
		}	
	},	
icelaserDmg: function(player,icelaser){
		if(isinvul == true){
			return;
		}
		isinvul = true;
		game.time.events.add(invul2IceLaserDur, function(){
			isinvul = false;
		},this);
		
		var theHearts = lvl1hearts.getAt(Math.round(hp-1));
		
		
		if(hp %1 == 0){
			theHearts.animations.play('half');
		}
		if(hp%1 != 0){
			theHearts.animations.play('none');
		}
		hp -= 0.5;
		
	},
	
	killBullet: function(laser,bullet){
	bullet.kill();
},	
	killHombullet: function(laser,hombullet){
	hombullet.kill();
},
	addDmg1: function(player,bullet){
		if(isinvul == true){
			return;
		}
		dmg = bulletdmg;
		bullet.kill();
	
	},
	addDmg2: function(player,bullet){
		if(isinvul == true){
			return;
		}
		dmg = homdmg;
		bullet.kill();
	},
	addDmg3: function(player,bullet){
		if(isinvul == true){
			return;
		}
		dmg = laserDamage;
		if(hp<=0){
			bullet.enableBody = true;
		} else{
		bullet.enableBody = false;
		}
	},
	levelreset: function(){
		this.okBody();
		lvl1timer = oritimer;
		this.player.enableBody = true;
		isinvul = false;
		hp = fullHP;	
		lvl1mus.stop();
		bgmusic.resume(0.6);
		isinvul = false;
		game.state.start('menu');
	},
	lvl1timer: function() {
		lvl1timer -= 1;
		text2.text -= 1;
},

addMobileInputs: function() {
	this.moveLeft = false;
	this.moveRight = false;
	var leftButton = game.add.sprite(10, 60, 'leftButton'); leftButton.inputEnabled = true;
	leftButton.alpha = 0;
	leftButton.events.onInputOver.add(this.setLeftTrue, this); leftButton.events.onInputOut.add(this.setLeftFalse, this); leftButton.events.onInputDown.add(this.setLeftTrue, this); leftButton.events.onInputUp.add(this.setLeftFalse, this);
	var rightButton = game.add.sprite(250, 60, 'rightButton'); rightButton.inputEnabled = true; rightButton.alpha = 0; rightButton.events.onInputOver.add(this.setRightTrue, this); rightButton.events.onInputOut.add(this.setRightFalse, this); rightButton.events.onInputDown.add(this.setRightTrue, this); rightButton.events.onInputUp.add(this.setRightFalse, this);
},

	setLeftTrue: function() { this.moveLeft = true;
},
	setLeftFalse: function() { this.moveLeft = false;
},
	setRightTrue: function() { this.moveRight = true;
},
	setRightFalse: function() { this.moveRight = false;
},

orientationChange: function() {
	if (game.scale.isPortrait) {
		game.paused = true;
	this.rotateLabel.text = 'rotate your device in landscape';
}
	else {
	game.paused = false;
	this.rotateLabel.text = '';
}
},
	addbullet: function() {
		var bullet = this.bullet.getFirstDead();
		if(!bullet) {
			return;
		}
		bullet.anchor.setTo(0.5);
		bullet.reset(game.rnd.integerInRange(10,440) , 0);
		
		bullet.body.velocity.y = 450;
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
		
		hombullet.body.velocity.y = 325;
		hombullet.body.setSize(40,40,5,5);
		hombullet.checkWorldBounds = true;
		hombullet.outOfBoundsKill = true;
		
	},

//laser by rit
	addicelaser: function() {
		
		var icelaser = this.icelaser.getFirstDead(); // command to spawn icelaser
		if(!icelaser) { //protection clash
			return;
		}
		icelaser.anchor.setTo(1);
		icelaser.reset(game.rnd.integerInRange(80,460) , 0);
		icelaser.body.velocity.y = 900;
		
		icelaser.checkWorldBounds = true;
		icelaser.outOfBoundsKill = true;
		
},
 	addalert2: function() {	
		
		var sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'alert2');
		sprite.anchor.setTo(0.5, 1);
		sprite.alpha = 0;
		game.add.tween(sprite).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 1, true); // 500 kwanrew   1 jumnounv blink 2 sec 

		game.time.events.add((2500), function(){ //delay 2.5 sec before go to icelaser function
		this.addicelaser();
		},this);		
		
}, 
//icebullet
  spawnice: function() {
	if(hp<=4.5){
	game.add.sprite(1, 10, 'machine');
	   var icebullet = this.icebullet.getFirstDead();
		icebullet.reset(10 , 0);
        this.physics.arcade.moveToObject(icebullet, this.player, 750);
		icebullet.checkWorldBounds = true;
		icebullet.outOfBoundsKill = true;	
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
			if (game.input.totalActivePointers == 0){
		this.moveLeft = false; this.moveRight = false;
		}
		if (this.cursor.left.isDown || this.ad.left.isDown
			|| this.moveLeft) { this.player.body.velocity.x = -250; this.player.animations.play('left');
}
	else if (this.cursor.right.isDown || this.ad.right.isDown || this.moveRight) {
	this.player.body.velocity.x = 250; this.player.animations.play('right');
}
	else {
	this.player.body.velocity.x = 0;
	}
	
},
	damaged: function(player,bullet){
		//bullet.kill();
		if(isinvul == true || hp<=0){
			return;
		}
		isinvul = true;
		var blinkTimes =5 ;
		
		player.enableBody = false;
		var blinkPlayer =	game.add.tween(player).to({alpha:0},(invulnerable/blinkTimes)/2,Phaser.Easing.Linear.None,true,0, blinkTimes-1 ,true);

		game.time.events.add(invulnerable,function(){
			player.alpha = 1.0;
			player.enableBody = true;
		isinvul = false;
			},this)
		
		var LheartsArr = [];
		var Lhearts = 0;
		var preHP = hp;
		
		var exception = 0;
		
		hp -= dmg;
		if(hp <= 0){
			return;
		}
		switch (true){
		//we compare hp and dmg for %1==0 or not
			case (preHP%1 == 0 && dmg%1 == 0): //5 -- 2 //fulltonone
				for(Lhearts = 0; Lhearts<dmg; Lhearts++){
					LheartsArr[Lhearts] = lvl1hearts.getAt(preHP-1);
					LheartsArr[Lhearts].animations.play('fulltonone',5,false);
					preHP -= 1;
				}
				break;
				
			case (preHP%1 == 0 && dmg%1 != 0): //5 -- 2.5 OR 5 -- 0.5 //fulltonone + fulltohalf
				for(Lhearts = 0; Lhearts<dmg; Lhearts++){
					LheartsArr[Lhearts] = lvl1hearts.getAt(preHP-1);
					preHP -= 1;
					if(preHP <= hp){
						LheartsArr[Lhearts].animations.play('fulltohalf',5,false);
					} else{
						LheartsArr[Lhearts].animations.play('fulltonone',5,false);
					}
				}
				break;
			case (preHP%1 != 0 && dmg%1 == 0): // 4.5 -- 2 OR 3.5 -- 1 //halftonone + fulltonone + fulltohalf
				for(Lhearts = 0; Lhearts<dmg+1 ; Lhearts++){ //heart no. 5,4,3
					
					LheartsArr[Lhearts] = lvl1hearts.getAt(Math.round(preHP)-1);
					preHP -= 1;
										
					if(exception == 0){ //
						LheartsArr[Lhearts].animations.play('halftonone',5,false);
						
							
					} else if(exception == 1){
						LheartsArr[Lhearts].animations.play('fulltonone',5,false);							
							
					} else if(exception == 2){
						LheartsArr[Lhearts].animations.play('fulltohalf',5,false);
					}	
					if(dmg - Lhearts > 1){
							exception = 1
							} else{
								exception = 2;
							}
					
				}
				break;
			case (preHP%1 != 0 && dmg%1 != 0)://3.5 -- 1.5 OR 4.5 -- 2.5 //halftonone + fulltonone
				for(Lhearts = 0; Lhearts<dmg+1 ; Lhearts++){
					LheartsArr[Lhearts] = lvl1hearts.getAt(Math.round(preHP)-1);
					preHP -= 1;
						if(exception == 0){
							LheartsArr[Lhearts].animations.play('halftonone',5,false);
							
							exception = 1;
							
						} else if(exception == 1){
							LheartsArr[Lhearts].animations.play('fulltonone',5,false);
						}
						if(preHP<=hp){
								break;
							}
				}
				break;
			default:
				break;
		}
		
	},
/* 	render: function(){
		game.debug.body(this.player);
		
	} */
laserdestroyhom: function(icelaser,hombullet) {
	hombullet.destroy();

},
laserdestroybullet: function(icelaser,bullet) {
	bullet.destroy();

},
laserdestroyicebullet: function(icelaser,icebullet) {
	icebullet.destroy();

},
	imageover: function(item){
		this.add.tween(item.scale).to({x:1.3,y:1.3},300, null, true,1,0,false);
		item.tint = 0xffffff
	},

	imageout: function(item) {
		this.add.tween(item.scale).to({x:1.0,y:1.0},300,null,true,1,0,false);
	},

	imagedown: function(item) {
		item.tint = 0xff0000;
	},
}