var bgmusic;
var lvlProgress = 0;
var bgplayer;

var loadState = {
	
	preload: function(){
		var progressBar = game.add.sprite(game.width/2, 200, 'progressBar');
		progressBar.anchor.setTo(0.5,0.5);
		game.load.setPreloadSprite(progressBar);
		
		game.load.spritesheet('player','assets/dante_walk.png',48,64)
		
		game.load.script('filter', 'js/filters/filter1file.js');
		
		game.load.spritesheet('bg','assets/sprite-fire-cavern.png',1734.625,750);
		game.load.spritesheet('hearts','assets/hearts.png',120,73);
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
	// laser
		game.load.image('laser','assets/laser3.jpg');
	// alert
		game.load.image('alert2','assets/alert.png');
		
		game.load.audio('lvl1mus',['assets/mus_ruins.ogg']);
		game.load.audio('music',['assets/mus_core.ogg']);
		
	},
	
	create: function(){		
		bgmusic = game.add.audio('music');
		lvl1mus = game.add.audio('lvl1mus');
		
		bgmusic.play(0);
		bgmusic.loopFull(0.6);
		game.state.start('menu');
	}
	
}