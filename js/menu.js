var cursors;
var menuState = {

//temporary preload
	preload: function(){
		game.load.image('bg','assets/bg.jpg');
		
	},
	
	create: function(){
		
		game.add.tileSprite(0,0,1750,750,'bg');
		game.world.setBounds(0,0,1750,750);
		cursors = game.input.keyboard.createCursorKeys();
		
	},
	
	update: function() {
		/* if (cursors.up.isDown)
			{
        game.camera.y -= 4;
		}
		else if (cursors.down.isDown){
        game.camera.y += 4;
		} */

		if (cursors.left.isDown)
		{
			game.camera.x -= 3;
		}
		else if (cursors.right.isDown)
		{
			game.camera.x += 3;
		}

},
	
	
	
}
