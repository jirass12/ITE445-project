var game = new Phaser.Game(450, 750, Phaser.AUTO, 'gameDiv');

//game.state.add(all the js files we'll need later on)
game.state.add('boot', bootState);
//BOOT
game.state.add('load', loadState);
//LOAD
game.state.add('menu', menuState);
//MENU
game.state.add('option', optionState);
//OPTIONS
game.state.add('credits', creditsState); 
//CREDITS
game.state.add('levelSelect', levelSelectState);
//LVLSELECT
game.state.add('playlvl1', playlvl1State);
//LVL1

game.state.start('boot');
