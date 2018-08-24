var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
            //setBounds: {
                  //  width: 800,
                //    height: 600,
              //  }
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
var playerOne;
var ammo;
var gameOver = false;
var justShot = false;

var game = new Phaser.Game(config);

//Lädt dinge wie z.B. Bilder.
function preload ()
{
    // map graphics
    this.load.image('wall', 'assets/wall.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('platform', 'assets/platform.png');
    this.load.image('sky', 'assets/sky.png');
    this.load.image('arrowUp', 'assets/arrowUp.png');
    this.load.image('arrowDown', 'assets/arrowDown.png');
    this.load.image('arrowLeft', 'assets/arrowLeft.png');
    this.load.image('arrowRight', 'assets/arrowRight.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

//Erstellt die Umgebung und weiteres.
function create (){

    // Create the level
    platforms=createLevel(this);

    //Creates Player One
    playerOne=createPlayer(this, 1);

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    ammo = this.physics.add.group();

    //  Collide the player with the platforms
    this.physics.add.collider(playerOne, platforms, null, collideInvokerPlayerPlatform, this);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.collider(playerOne, ammo, hitAmmo, null, this);
    this.physics.add.collider(platforms, ammo, ammoCollide, null, this);

}

//Aktualisiert das Spiel
function update ()
{
    if (gameOver)
    {
        return;
    }

    updatePlayer(playerOne);

}

//Wird ausgelöst wenn ein Spieler eine Platform berührt.
//player = der Spieler
//platform = die Platform
function collideInvokerPlayerPlatform (playerOne, platform)
{
    var result = true;
    if (platform.texture.key == 'platform' && playerOne.body.velocity.y < 0)
    {
        result = false;
    }
    return result;
}