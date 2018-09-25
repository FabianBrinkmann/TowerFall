var ammunition;

var music;
var soundFx = {};

function gameAccessable(options) {
    if(window.sessionStorage.getItem('token') != null) {
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
                    //debug: true
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
        //var ammunition;
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
                key: 'map1',
                url: 'assets/tilemaps/maps/TowerFall.json'
            });
            this.load.tilemapTiledJSON({
				key: 'map2',
				url: 'assets/tilemaps/maps/TowerFall_2.json'
			})
            this.load.spritesheet('cowboy', 'assets/cowboy.png', { frameWidth: 30, frameHeight: 59 });
            //audio
            this.load.audio('hit', 'assets/audio/hit.wav');
            this.load.audio('shoot', 'assets/audio/shoot.mp3');
            this.load.audio('jump', 'assets/audio/jump.mp3');
            this.load.audio('music', 'assets/audio/music.mp3');

        }

//Erstellt die Umgebung und weiteres.
        function create (){
            // Create the level
            map = this.make.tilemap({ key: options.map, tileWidth: 21, tileHeight: 21 });

            var tiles = map.addTilesetImage('tileset', 'tiles');

            skyLayer = map.createStaticLayer(0, tiles, 0, 0);
            groundLayer = map.createStaticLayer(1, tiles, 0, 0);
            platformLayer = map.createStaticLayer(2, tiles, 0, 0);
            groundLayer.setCollisionBetween(0, 1848);
            platformLayer.setCollisionBetween(0, 1848);

            //sound / music settings and play
            music = this.sound.add('music');
            music.setLoop(true);
            soundFx.hitSound = this.sound.add('hit');
            soundFx.shootSound = this.sound.add('shoot');
            soundFx.jumpSound = this.sound.add('jump');

            
            if(!options.musicEnabled)
            	muteMusic();

            if(!options.soundEnabled)
            	muteSoundFx();

            music.play();


            //this.cameras.main.setBounds(0, 0, platforms.widthInPixels, platforms.heightInPixels);

            cursors = this.input.keyboard.createCursorKeys();
            ammunition = this.physics.add.group();
            var playerCursors = new Array(
                new Array(cursors.left, cursors.right, cursors.up, cursors.space),//65 ist der Key von A
                new Array(this.input.keyboard.addKey(65), this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D), this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W), this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT))
            );
            playerList = new Array(2);
            var i;
            for (i = 0; i < playerList.length; i++) {
                playerList[i] = createPlayer(this, options.players[i].name, 1+i);
                playerList[i].cursorLeft = playerCursors[i][0];
                playerList[i].cursorRight = playerCursors[i][1];
                playerList[i].cursorUp = playerCursors[i][2];
                playerList[i].cursorShoot= playerCursors[i][3];
                this.physics.add.collider(playerList[i], platformLayer, null, collideInvokerPlayerPlatform, this);
                this.physics.add.collider(playerList[i], groundLayer);
                this.physics.add.collider(playerList[i], ammunition, hitAmmo, null, this);
                this.physics.add.overlap(playerList[i], ammunition, hitAmmo, null, this);
            }


            this.physics.add.collider(ammunition, groundLayer, ammoCollide, null, this);
            this.physics.add.collider(ammunition, platformLayer, ammoCollide, null, this);
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

        function h (p, d){
            console.log("t");
        }

        //Aktualisiert das Spiel
        function update (time, delta)
        {
            //controls.update(delta);
            if (gameOver)
            {
                music.mute=true;
                return
            }

            var i;
            for (i = 0; i < playerList.length; i++) {
                updatePlayer(playerList[i]);
            }

        }
        function collideInvokerPlayerPlatform (player, tile) {
            //console.log(player);
            var result = true;
            if (player.body.velocity.y < 0)
            {
                result = false;
            }
            return result;
        }

        function changeMuteSoundFx() {
            for (let sound in soundFx){
                if (!soundFx[sound].mute)soundFx[sound].mute=true;
                else soundFx[sound].mute=false;
            }
        }

        function changeMuteMusic() {
            if (!music.mute) music.mute = true;
            else music.mute = false;
        }

        function muteSoundFx(  ) {
			for(let sound in soundFx)
				soundFx[sound].mute = true;
		}

		function muteMusic(  ) {
			music.mute = true;
		}

    } else {
        location.reload();
    }
}

//Wird ausgelöst wenn ein Spieler einen Tile berührt.
//player = der Spieler
//tile = der Tile
