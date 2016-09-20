var game = new Phaser.Game(450, 750, Phaser.AUTO, 'gameDiv');

//game.state.add(all the js files we'll need later on)
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('option', optionState);

game.state.start('boot');
