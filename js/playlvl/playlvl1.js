var player; //created
var hp = 5;	//created
var orihp = hp;
var fullHP = 5;
var lvl1hearts;
var invulnerable = 2500; //invulnerable for 2.5 seconds
var isinvul = false;

var bullet; //created
var bulletdmg = 0.5;
var hombullet;
var homdmg = 1;
var homstart = 90; //original is 30
var laser; //dont forget to add blink before attack launches
var laserDamage = 2;
var laserStrt = 8000; //start after how many miliseconds
var laserDur =  2000; //lasts for 2 seconds

var dmg;

var progressbar; 
var progresscrop;
var lvl1timer = 90; //90 seconds
var oritimer = lvl1timer;
var pause_label;

var lvlstarttime;
var i;
//^^ required Elements so far




var playlvl1State = {
	init: function(){
		bgmusic.pause();
		lvl1mus.play();
		lvl1mus.loopFull(0.6);
		isinvul = false;
	},
	create: function(){
		hp = 5;
		lvlstarttime = game.time.now;
		var bg = game.add.tileSprite(0,0,450,750,'bg3');
		this.game.world.setBounds(0,0,450,750);
		bg.alpha = 0.4;
		//background
			
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
		game.time.events.loop(500, this.addbullet, this);
		//normal bullet
			
		this.hombullet = game.add.group();
		this.hombullet.enableBody = true;
		game.physics.arcade.enable(this.hombullet);
		
		game.time.events.add((oritimer - homstart) * 1000, function(){
			this.hombullet.createMultiple(999, 'hombullet',0);
			game.time.events.loop(1500, this.addhombullet, this);
		},this);
		
		this.laser = game.add.group();
		this.laser.enableBody = true;
		game.physics.arcade.enable(this.laser);
		game.time.events.add(laserStrt, function(){
			this.laser.createMultiple(999,'laser',this);
			game.time.events.loop(laserStrt, this.addlaser, this);
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
			
			paused_label = game.add.text(game.width/2, game.height/7 + 30, 'Paused', { font: '48px Arial', fill: '#ffffff' });	
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
		game.physics.arcade.overlap(this.laser, this.hombullet, this.killHombullet, null, this);
		game.physics.arcade.overlap(this.laser, this.bullet, this.killBullet, null, this);
		if(lvl1timer <= 0 ){
			this.levelreset();
			lvlsUnlocked = 2;
			game.state.clearCurrentState();
			game.state.start('youwin');

		} else if(hp<=0){
			this.levelreset();
			game.state.clearCurrentState();
			game.state.start('youdied');
		}
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
		hombullet.body.setSize(40,40,5,5);
		hombullet.checkWorldBounds = true;
		hombullet.outOfBoundsKill = true;
		
	},
	addlaser: function(){
	var laser = this.laser.getFirstDead();
	if(!laser){
		return;
	}
	var rndX = game.rnd.pick([45,135,225,315,405])	
	var laserAlrt = game.add.sprite(rndX,0,'alert');
	laserAlrt.enableBody = false;
	laserAlrt.alpha = 0.0;
	laserAlrt.anchor.setTo(0.5,0);
	var Ltween = game.add.tween(laserAlrt).to({alpha: 1.0},250, Phaser.Easing.Linear.None, true, 0, 3, true);
	Ltween.onComplete.add(function(){
		laserAlrt.kill();
		laser.reset(rndX,650);
		laserEff.play();
		laser.anchor.setTo(0.5,1);
		laser.body.setSize(80,650,5); //90 - 650
		game.time.events.add(laserDur,function(){
			laser.kill();
			laserEff.stop();
		},this);
	},this);

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
	// render: function(){
	// 	game.debug.body(this.player);
		
	// }


}