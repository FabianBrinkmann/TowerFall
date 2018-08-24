function createLevel(game) {
    var platforms;
    //  A simple background for our game
    game.add.image(400, 300, 'sky');
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    //  Now let's create some ledges
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground').setScale(1, 0.25).refreshBody();
    var y = platforms.create(750, 220, 'ground');
    var t = platforms.create(-30, 400, 'wand').setScale(2).refreshBody();
    platforms.create(830, 400, 'wand').setScale(2).refreshBody();
    console.log(y);
    console.log(t);
    return platforms
}