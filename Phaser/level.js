var gameWidth = 800
var gameHeight = 600
var groundWidth = 800
var groundHeight = 24
var wallWidth = 24
var wallHeight = 600
var platformWidth = 200
var platformHeight = 14

var map;


function createLevel(game) {
    var platforms
    // //  A simple background for our game
    // game.add.image(400, 300, 'sky');
    // //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.physics.add.staticGroup();

    // //  Here we create the ground and the top.
    // platforms.create(groundWidth / 2, gameHeight - (groundHeight / 2), 'ground');
    // platforms.create(groundWidth / 2, groundHeight / 2, 'ground');

    // //  Here we create the left and right wall
    // platforms.create(wallWidth / 2, gameHeight - (wallHeight / 2), 'wall');
    // platforms.create(gameWidth  - (wallWidth / 2), gameHeight - (wallHeight / 2), 'wall');

    map = game.make.tilemap('map');
    var tileset = map.addTilesetImage('tiles_spritesheet', 'tiles');
    game.backgroundLayer = map.createStaticLayer(0, tileset, 400, 300);
    console.log(map);



    return map
}