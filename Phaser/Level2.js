var gameWidth = 1100
var gameHeight = 700
var groundWidth = 1100
var groundHeight = 24
var wallWidth = 24
var wallHeight = 700
var platformWidth = 200
var platformHeight = 14

function createLevel(game) {
    var platforms
    //  A simple background for our game
    game.add.image(550, 350, 'sky').setScale(1.375, 1.166666);
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.physics.add.staticGroup();

    //  Here we create the ground and the top.
    platforms.create(groundWidth / 6 - 9, gameHeight - (groundHeight / 2), 'ground').setScale(0.4375, 3).refreshBody();
    platforms.create(groundWidth / 2, gameHeight - (groundHeight / 2), 'ground').setScale(0.5, 1).refreshBody();
    platforms.create(groundWidth / 6 * 5 + 9, gameHeight - (groundHeight / 2), 'ground').setScale(0.4375, 3).refreshBody();
    platforms.create(groundWidth / 2, groundHeight / 2, 'ground').setScale(1.375, 1).refreshBody();

    //  Here we create the left and right wall
    platforms.create(wallWidth / 2 - 30, gameHeight - (wallHeight / 2), 'wall').setScale(3.5, 1).refreshBody();
    platforms.create(gameWidth  - (wallWidth / 2), gameHeight - (wallHeight / 2), 'wall');

    //  Here we create the plaforms
    //  left
    platforms.create((platformWidth / 2) + 100, gameHeight - 180, 'platform');
    //  right
    platforms.create((gameWidth - platformWidth / 2) - 100, gameHeight - 180, 'platform');
    //  top
    platforms.create(gameWidth / 2, gameHeight - 350, 'platform');
    return platforms
}
