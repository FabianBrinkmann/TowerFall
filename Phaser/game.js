// Initiating global variables

var ammunition;
var items;
var music;
var soundFx = {};
var groundLayer;
var gameOver = false;
var game;

// If the user has got a token saved, the game will start
function gameAccessable(options) {
    if(window.sessionStorage.getItem('token') != null) {

        // Defines the main variables for the game like width, height, gravity and physic engine we want to use
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
                }
            },
            scene: {
                preload: preload,
                create: create,
                update: update
            }
        };

        game = new Phaser.Game(config);

        var playerList;
        var map;
        var cursors;
        var skyLayer;
        var platformLayer;

        // Loads images and audio files
        function preload ()
        {
            // map graphics
            this.load.image('ammo', 'assets/ammo.png');
            this.load.image('heart', 'assets/heart.png');
            this.load.image('arrowLeft', 'assets/arrowLeft.png');
            this.load.image('bulletLeft', 'assets/bulletLeft.png');
            this.load.image('arrowRight', 'assets/arrowRight.png');
            this.load.image('bulletRight', 'assets/bulletRight.png');
            this.load.image('tiles', 'assets/tilemaps/tiles/TowerFall.png');
            this.load.tilemapTiledJSON({
                key: 'map1',
                url: 'assets/tilemaps/maps/TowerFall.json'
            });
			this.load.tilemapTiledJSON({
				key: 'map2',
				url: 'assets/tilemaps/maps/TowerFall_2.json'
			});
			this.load.tilemapTiledJSON({
				key: 'map3',
				url: 'assets/tilemaps/maps/TowerFall_3.json'
			});
            this.load.spritesheet('cowboy', 'assets/cowboy.png', { frameWidth: 30, frameHeight: 59 });
            this.load.spritesheet('indian', 'assets/indian.png', { frameWidth: 30, frameHeight: 59 });

            // audio
            this.load.audio('hit', 'assets/audio/hit.wav');
            this.load.audio('arrowShot', 'assets/audio/arrowShot.wav');
            this.load.audio('bulletShot', 'assets/audio/bulletShot.mp3');
            this.load.audio('jump', 'assets/audio/jump.mp3');
            this.load.audio('music', 'assets/audio/music.mp3');

        }

        // Sets the environment and sound. Simply everything that won't change through out the game
        function create (){
            // Create the level
            map = this.make.tilemap({ key: options.map, tileWidth: 21, tileHeight: 21 });

            var tiles = map.addTilesetImage('tileset', 'tiles');

            skyLayer = map.createStaticLayer(0, tiles, 0, 0);
            groundLayer = map.createStaticLayer(1, tiles, 0, 0);
            platformLayer = map.createStaticLayer(2, tiles, 0, 0);
            groundLayer.setCollisionBetween(0, 1848);
            platformLayer.setCollisionBetween(0, 1848);

            // sound / music settings and play
            music = this.sound.add('music');
            music.setLoop(true);
            soundFx.hitSound = this.sound.add('hit');
            soundFx.bulletShotSound = this.sound.add('bulletShot');
            soundFx.arrowShotSound = this.sound.add('arrowShot');
            soundFx.jumpSound = this.sound.add('jump');


            if(!options.musicEnabled)
            	changeMuteMusic();

            if(!options.soundEnabled)
            	changeMuteSoundFx();

            music.play();

            cursors = this.input.keyboard.createCursorKeys();
            ammunition = this.physics.add.group();
            items = this.physics.add.group();
            var playerCursors = new Array(
                new Array(cursors.left, cursors.right, cursors.up, cursors.space),//65 ist der Key von A
                new Array(this.input.keyboard.addKey(65), this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D), this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W), this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT))
            );
            playerList = new Array(2);
            for (var i = 0; i < playerList.length; i++) {
                playerList[i] = createPlayer(this, options.players[i], 1+i);
                playerList[i].cursorLeft = playerCursors[i][0];
                playerList[i].cursorRight = playerCursors[i][1];
                playerList[i].cursorUp = playerCursors[i][2];
                playerList[i].cursorShoot= playerCursors[i][3];
                this.physics.add.collider(playerList[i], platformLayer, null, collideInvokerPlayerPlatform, this);
                this.physics.add.collider(playerList[i], groundLayer);
                this.physics.add.collider(playerList[i], ammunition, hitAmmo, collideAmmoInvoker, this);
                this.physics.add.overlap(playerList[i], ammunition, hitAmmo, overlapAmmoInvoker, this);
                this.physics.add.collider(playerList[i], items, hitItem, null, this);
                this.physics.add.overlap(playerList[i], items, hitItem, null, this);
            }
            this.physics.add.collider(items, groundLayer);
            this.physics.add.collider(items, platformLayer);
            this.physics.add.collider(ammunition, groundLayer, ammoCollide, null, this);
            this.physics.add.collider(ammunition, platformLayer, ammoCollide, null, this);

            // Sets the interval how often an item is spawned
            setInterval( () => {
                spawnItem();
            }, 20000);
        }

        // Updates the game continuously
        function update (time, delta)
        {
            if (gameOver)
            {
                music.mute = true;
                return
            }
            for (var i = 0; i < playerList.length; i++) {
                updatePlayer(playerList[i]);
            }

        }

        function overlapAmmoInvoker (player, ammo)
        {
          var result = true;
          if(ammo.player === player || ammo.ignorePlayer === player)
          {
            result = false;
          }
          return result;
        }

        function collideAmmoInvoker (player, ammo)
        {
          var result = true;
          if(ammo.player !== player && player.lifes > 1 && !ammo.colided)
          {
            player.lifes -= 1;
            ammo.ignorePlayer = player;
            player.alpha = 1;
          }
          if(ammo.ignorePlayer === player)
          {
            result = false;
          }
          return result;
        }

        function collideInvokerPlayerPlatform (player, tile) {
            var result = true;
            if (player.body.velocity.y < 0)
            {
                result = false;
            }
            return result;
        }

    } else {
        location.reload();
    }

    // Displays ingame menu
    document.onkeydown = function(evt) {
        evt = evt || window.event;
        if (evt.keyCode === 27) {
            if (gameOver === false) {
                toggleIngameMenu();
            }
        }

        if (evt.keyCode === 82 && document.getElementById('ingame-overlay').style.display === 'flex') {
            restartGame();
        }
    };
}

// Unmute or mute sounds
function changeMuteSoundFx() {
    for (let sound in soundFx){
        if (!soundFx[sound].mute)soundFx[sound].mute=true;
        else soundFx[sound].mute=false;
    }
}

// Unmute or mute music
function changeMuteMusic() {
    if (!music.mute) music.mute = true;
    else music.mute = false;
}

// Restarts the game with same environments
function restartGame() {
  gameOver = false;
  game.destroy(true);
  gameAccessable(options);
  toggleIngameMenu();
  itemAvailable = false;
}
