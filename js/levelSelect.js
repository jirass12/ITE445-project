var levelE;
var levelSelectState = {
	preload: function(){
		
	},
	create: function(){
	
		var lvlSelBg = game.add.tileSprite(0,0,450,750,'bg3');
		filter = game.add.filter('Fire', 450, 750);
		filter.alpha = 0.0;
		lvlSelBg.filters = [filter];
		
		
		var back = game.add.text(game.width / 2, 650, "BACK", {font: '30px Arial', fill: '#ffffff'});
		back.anchor.setTo(0.5,0.5);		
		back.inputEnabled = true;
		
		
	//	var door1 = game.add.sprite(game.camera.width/2, game.camera.height/2,'door');
	//	door1.anchor.setTo(0.5);
	//	var level = game.add.sprite(game.width/2, game.height/3,'fml1');
	//	level.anchor.setTo(0.5);
	//	level.animations.add('loopingFire',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,311,32,33,34]);
	//	level.animations.play('loopingFire',1080,true);
	//	i wasted 2 hours on something that didnt work, GG;
		
		back.events.onInputOver.add(this.over, this);
		back.events.onInputOut.add(this.out, this);
		back.events.onInputDown.add(this.down, this);
		back.events.onInputUp.add(this.back, this);
		
		levelE = game.add.group();
		
		
		var no1 = game.add.sprite((game.width/2 - 100),game.height*2/8,'no1');
		// no1.tint = 0x000000;
		no1.anchor.setTo(0.5);
		no1.inputEnabled = true;
		no1.events.onInputOver.add(this.imageover, this);
		no1.events.onInputOut.add(this.imageout, this);
		no1.events.onInputDown.add(this.imagedown, this);
		no1.events.onInputUp.add(this.lvl1Start,this);
		
		var no2 = game.add.sprite((game.width/2 + 100),game.height*2.5/8,'no2');
		no2.tint = 0x000000;
		no2.anchor.setTo(0.5);
		no2.inputEnabled = false;
		no2.events.onInputOver.add(this.imageover, this);
		no2.events.onInputOut.add(this.imageout, this);
		no2.events.onInputDown.add(this.imagedown, this);
		no2.events.onInputUp.add(this.lvl2Start,this);
		
		var no3 = game.add.sprite((game.width/2)-100,game.height*1/2,'no3');
		no3.anchor.setTo(0.5);
		no3.tint = 0x000000;
		no3.inputEnabled = false;
		
//		levelE.inputEnabled = true;no3.events.onInputOver.add(this.imageover, this);
		no3.events.onInputOut.add(this.imageout, this);
		no3.events.onInputDown.add(this.imagedown, this);
//		levelE.events.onInputOver.add(this.imageover, this);
//		levelE.events.onInputOut.add(this.imageout, this);
//		levelE.events.onInputDown.add(this.imagedown, this);
//		levelE.anchor.setTo(0.5);
		if(lvlsUnlocked >= 2){
			no2.inputEnabled = true;
			no2.tint = 0xffffff;
		} else{
			no2.inputEnabled = false;
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
	update: function(){
		filter.update();
	},
	lvl1Start:function(){
		lvlPlaying = 1;
		
			game.state.start("intro0");
		
	},
	lvl2Start:function(){
		lvlPlaying = 2;
		game.state.start("playlvl2");
		
	},

}