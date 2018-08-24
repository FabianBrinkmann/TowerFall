var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var platforms;
var cursors;
var gameOver = false;
var justShot = false;
var playerOne;
var ammo;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('wand', 'assets/wand.png');
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('arrowUp', 'assets/arrowUp.png');
    this.load.image('arrowDown', 'assets/arrowDown.png');
    this.load.image('arrowLeft', 'assets/arrowLeft.png');
    this.load.image('arrowRight', 'assets/arrowRight.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create ()
{
    platforms=createLevel(this);
    playerOne=createPlayer(this, 2);

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    ammo = this.physics.add.group();

    //  Collide the player with the platforms
    this.physics.add.collider(playerOne, platforms);
    this.physics.add.collider(playerOne, ammo, hitArrow, null, this);
    this.physics.add.collider(platforms, ammo, arrowCollide, null, this);

}

function handler (gameObject)
{
    gameObject.tint = 0xff0000;
}

function update () {
    if (gameOver) {
        return;
    }

    updatePlayer(playerOne)
}