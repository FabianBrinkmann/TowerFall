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

var playerList;
var platforms;
var cursors;
var playerOne;
var playerTwo;
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
    platforms=createLevel(this);S

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();
    ammo = this.physics.add.group();
    var playerCursors = new Array(
    new Array(cursors.left, cursors.right, cursors.up, cursors.space),
    new Array(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A), this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D), this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W), this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT))
    //new Array(cursors.a, cursors.d, cursors.w, cursors.s)
    );
    playerList = new Array(null, null, null);
    var i;
    for (i = 0; i < 2; i++) {
      playerList[i] = createPlayer(this, 1+i);
      playerList[i].cursorLeft = playerCursors[i][0];
      playerList[i].cursorRight = playerCursors[i][1];
      playerList[i].cursorUp = playerCursors[i][2];
      playerList[i].cursorShoot= playerCursors[i][3];
      this.physics.add.collider(playerList[i], platforms, null, collideInvokerPlayerPlatform, this);
      this.physics.add.collider(playerList[i], ammo, hitAmmo, null, this);
    }
    //  Collide the player with the platforms

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.collider(platforms, ammo, ammoCollide, null, this);

}

//Aktualisiert das Spiel
function update ()
{
    if (gameOver)
    {
        return;
    }

    var i;
    for (i = 0; i < 2; i++) {
      updatePlayer(playerList[i]);
    }

}

//Wird ausgelöst wenn ein Spieler eine Platform berührt.
//player = der Spieler
//platform = die Platform
function collideInvokerPlayerPlatform (player, platform)
{
    var result = true;
    if (platform.texture.key == 'platform' && player.body.velocity.y < 0)
    {
        result = false;
    }
    return result;
}
