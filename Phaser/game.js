var config = {
    type: Phaser.AUTO,
    width: 1050,
    height: 700,
    pixelArt: true,
    backgroundColor: '#2d2d2d',
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

var playerList;
var map;
var cursors;
var ammo;
var gameOver = false;

var game = new Phaser.Game(config);
var groundLayer;
var skyLayer;
var platformLayer;

//Lädt dinge wie z.B. Bilder.
function preload ()
{
    // map graphics
    this.load.image('arrowUp', 'assets/arrowUp.png');
    this.load.image('arrowDown', 'assets/arrowDown.png');
    this.load.image('arrowLeft', 'assets/arrowLeft.png');
    this.load.image('arrowRight', 'assets/arrowRight.png');
    this.load.image('tiles', 'assets/tilemaps/tiles/TowerFall.png');
    this.load.tilemapTiledJSON({
        key: 'map',
        url: 'assets/tilemaps/maps/TowerFall.json'
    });
    this.load.spritesheet('cowboy', 'assets/cowboy.png', { frameWidth: 43, frameHeight: 85 });
}

//Erstellt die Umgebung und weiteres.
function create (){
    // Create the level
    map = this.make.tilemap({ key: 'map', tileWidth: 21, tileHeight: 21 });

    var tiles = map.addTilesetImage('tileset', 'tiles');

    skyLayer = map.createStaticLayer(0, tiles, 0, 0);
    groundLayer = map.createStaticLayer(1, tiles, 0, 0);
    platformLayer = map.createStaticLayer(2, tiles, 0, 0);
    groundLayer.setCollisionBetween(0, 1848);
    platformLayer.setCollisionBetween(0, 1848);

    //this.cameras.main.setBounds(0, 0, platforms.widthInPixels, platforms.heightInPixels);

    cursors = this.input.keyboard.createCursorKeys();
    ammo = this.physics.add.group();
    var playerCursors = new Array(
    new Array(cursors.left, cursors.right, cursors.up, cursors.space),//65 ist der Key von A
    new Array(this.input.keyboard.addKey(65), this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D), this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W), this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT))
    );
    playerList = new Array(2);
    var i;
    for (i = 0; i < playerList.length; i++) {
      playerList[i] = createPlayer(this, 1+i);
      playerList[i].cursorLeft = playerCursors[i][0];
      playerList[i].cursorRight = playerCursors[i][1];
      playerList[i].cursorUp = playerCursors[i][2];
      playerList[i].cursorShoot= playerCursors[i][3];
      this.physics.add.collider(playerList[i], platformLayer, null, collideInvokerPlayerPlatform, this);
      this.physics.add.collider(playerList[i], groundLayer);
      this.physics.add.collider(playerList[i], ammo, hitAmmo, null, this);
    }

    this.physics.add.collider(ammo, groundLayer, ammoCollide, null, this);
    this.physics.add.collider(ammo, platformLayer, ammoCollide, null, this);
    // var controlConfig = {
    //     camera: this.cameras.main,
    //     left: cursors.left,
    //     right: cursors.right,
    //     up: cursors.up,
    //     down: cursors.down,
    //     speed: 0.2
    // };

    //controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);

}

//Aktualisiert das Spiel
function update (time, delta)
{
  //controls.update(delta);
    if (gameOver)
    {
        return;
    }

    var i;
    for (i = 0; i < playerList.length; i++) {
      updatePlayer(playerList[i]);
    }

}

//Wird ausgelöst wenn ein Spieler einen Tile berührt.
//player = der Spieler
//tile = der Tile
function collideInvokerPlayerPlatform (player, tile)
{
  console.log(player);
    var result = true;
    if (player.body.velocity.y < 0)
    {
        result = false;
    }
    return result;
}
