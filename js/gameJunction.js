var game = new Phaser.Game(450, 750);

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
game.state.add('intro0',intro0State);
//INTRO0
game.state.add('youdied',youdiedState);
//YOUDIED
game.state.add('youwin',youwinState);
//YOUWIN
game.state.add('playlvl1', playlvl1State);
//LVL1
game.state.add('playlvl2', playlvl2State);
//LVL2

game.state.start('boot');
