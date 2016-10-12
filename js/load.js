var bgmusic;
var lvlProgress = 0;
var bgplayer;

var loadState = {
	
	preload: function(){
		var progressBar = game.add.sprite(game.width/2, 200, 'progressBar');
		progressBar.anchor.setTo(0.5,0.5);
		game.load.setPreloadSprite(progressBar);
		
		game.load.spritesheet('player','assets/dante_walk.png',48,64)
		
		game.load.bitmapFont('introFont','assets/font1/font.png','assets/font1/font.fnt');
		
		game.load.script('filter', 'js/filters/filter1file.js');
		
		game.load.spritesheet('bg','assets/sprite-fire-cavern.png',1734.625,750);
		game.load.spritesheet('hearts','assets/hearts.png',45,45);
		game.load.spritesheet('hombullet','assets/ghost.png',50,50);
	//	game.load.spritesheet('fml1','assets/fml1.png',158.6,150);
		
		game.load.image('no1','assets/no1.png');
		game.load.image('no2','assets/no2.png');
		game.load.image('no3','assets/no3.png');
		game.load.image('bg3','assets/lvlSelect.jpg');
		game.load.image('bullet','assets/bullet.png');
		
		game.load.image('exittomenu','assets/exittomenu.png');
		game.load.image('resume','assets/resume.png');
		game.load.image('lvlprogress','assets/fireprogress.png')
		game.load.image('container2','assets/container2.png');
		game.load.image('pixel','assets/pixel.png');
		game.load.image('laser','assets/lavalaser.png');
		game.load.image('alert','assets/alert.png');
		
		game.load.audio('laserEff',['assets/laser.ogg']);
		game.load.audio('lvl1mus',['assets/mus_ruins.ogg']);
		game.load.audio('music',['assets/mus_core.ogg']);
		game.load.audio('typingEff',['assets/font1/pencilsketching.mp3']);
		game.load.audio('deathlaugh',['assets/deathlaugh.ogg']);
		//
		game.load.image('icebullet','assets/icebullet1.png');
		game.load.image('machine','assets/1.png');
		game.load.image('bg4','assets/ice.jpg');
		game.load.image('alert2','assets/alert2.png');
		game.load.image('icelaser','assets/icelaser.png');
		
		
	},
	
	create: function(){	
		lvlsUnlocked = 1;
		lvlPlaying = 0;
		
		bgmusic = game.add.audio('music');
		lvl1mus = game.add.audio('lvl1mus');
		
		deathlaugh = game.add.audio('deathlaugh');
		laserEff = game.add.audio('laserEff');
		typingEff = game.add.audio('typingEff');
		
		bgmusic.play(0);
		bgmusic.loopFull(0.6);//0.6 is volume out of 1
		game.state.start('menu');
	}
	
}