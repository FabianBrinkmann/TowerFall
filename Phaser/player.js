function createPlayer(game, playerOptions,  playerNumber) {
    var player;

    var character = playerOptions.character

    if (playerNumber===1) {
        player = game.physics.add.sprite(200, 450, character);
        player.right=true;
        player.left=false;
    }else {
        player = game.physics.add.sprite(400, 450, character);
        player.right=false;
        player.left=true;
    }

    player.options=playerOptions;

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0);
    player.ammo = 3;
    player.setCollideWorldBounds(true);
    player.body.overlapY = 16;
    player.shootBlocked=false;

    //  Our player animations, turning, walking left and walking right.
    game.anims.create({
            key: character+'Left',
            frames: game.anims.generateFrameNumbers(character, {start: 1, end: 3}),
            frameRate: 10,
            repeat: -1
        });

    game.anims.create({
            key: character+'Right',
            frames: game.anims.generateFrameNumbers(character, {start: 6, end: 8}),
            frameRate: 10,
            repeat: -1
        });

    game.anims.create({
            key: character+'LookLeft',
            frames: [{key: character, frame: 4}],
            frameRate: 20
        });

    game.anims.create({
            key: character+'LookRight',
            frames: [{key: character, frame: 5}],
            frameRate: 20
        });

    game.anims.create({
        key: character+'ShootLeft',
        frames: [{key: character, frame: 0}],
        frameRate: 20
    });

    game.anims.create({
        key: character+'ShootRight',
        frames: [{key: character, frame: 9}],
        frameRate: 20
    });



    // set player text

    var style = {font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};

    player.name = playerOptions.name;

    player.playerText = Phaser.Display.Align.To.TopCenter(game.add.text(16, 16, playerOptions.name + player.ammo, style), player, 0, 0);

    return player;
}




function updatePlayer(player) {

    var character = player.options.character;

    if (player.cursorLeft.isDown)
    {
        player.hasJustShot=false;
        player.setVelocityX(-160);

        player.anims.play(character+'Left', true);
        player.left = true;
        player.right = false;
    }
    else if (player.cursorRight.isDown)
    {
        player.hasJustShot=false;
        player.setVelocityX(160);

        player.anims.play(character+'Right', true);
        player.right = true;
        player.left = false;
    }
    else
    {
        if (player.right && !player.hasJustShot)
        {
            player.anims.play(character+'LookRight', true);
        }
        else if (player.left && !player.hasJustShot)
        {
            player.anims.play(character+ 'LookLeft', true);
        }

        player.setVelocityX(0);
    }

    if (player.cursorShoot.isDown && !player.shootBlocked)
    {
        player.hasJustShot=true;
        if (player.left)
        {
            player.anims.play(character+'ShootLeft');
            shoot(player, 'Left');
            justShotTimer(player);
        }
        else if (player.right)
        {
            player.anims.play(character+'ShootRight');
            shoot(player, 'Right');
            justShotTimer(player);
        }
    }
    //console.log(player.body.touching.down);
    if (player.cursorUp.isDown && player.body.blocked.down)//&& player.body.touching.down
    {
        soundFx.jumpSound.play();
        player.setVelocityY(-330);
    }
    player.playerText.text = player.name +' ' + player.ammo;
    player.playerText.updateText();
    player.playerText = Phaser.Display.Align.To.TopCenter(player.playerText, player, 0, 0);
}
