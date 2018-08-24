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

var player;
var arrows;
var walls;
var platforms;
var cursors;
var gameOver = false;
var text1;
var right;
var left;
var justShot = false;

var gameWidth = 800
var gameHeight = 600
var groundWidth = 800
var groundHeight = 24
var wallWidth = 24
var wallHeight = 600
var platformWidth = 200
var platformHeight = 14

var game = new Phaser.Game(config);

//Lädt dinge wie z.B. Bilder.
function preload ()
{
    // map graphics
    this.load.image('wall', 'assets/wall.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('platform', 'assets/platform.png');
    this.load.image('sky', 'assets/sky.png');

    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('arrowUp', 'assets/arrowUp.png');
    this.load.image('arrowDown', 'assets/arrowDown.png');
    this.load.image('arrowLeft', 'assets/arrowLeft.png');
    this.load.image('arrowRight', 'assets/arrowRight.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

//Erstellt die Umgebung und weiteres.
function create ()
{
    //  A simple background for our game
    this.add.image(400, 300, 'sky');
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground and the top.
    platforms.create(groundWidth / 2, gameHeight - (groundHeight / 2), 'ground');
    platforms.create(groundWidth / 2, groundHeight / 2, 'ground');

    //  Here we create the left and right wall
    platforms.create(wallWidth / 2, gameHeight - (wallHeight / 2), 'wall');
    platforms.create(gameWidth  - (wallWidth / 2), gameHeight - (wallHeight / 2), 'wall');

    //  Here we create the plaforms
    //  left
    platforms.create((platformWidth / 2) + 100, gameHeight - 180, 'platform');
    //  right
    platforms.create((gameWidth - platformWidth / 2) - 100, gameHeight - 180, 'platform');
    //  top
    platforms.create(gameWidth / 2, gameHeight - 350, 'platform');

    right = false;
    left = false;

    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'dude');

    var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    text1 = this.add.text(16, 16, 'Fritz 3', style);
    text1 = Phaser.Display.Align.To.TopCenter(text1, player, 0, 0);

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0);
    player.arrows = 3;
    player.setCollideWorldBounds(true);
    player.body.overlapY = 16;

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'lookLeft',
        frames: [ { key: 'dude', frame: 0 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'lookRight',
        frames: [ { key: 'dude', frame: 5 } ],
        frameRate: 20
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    arrows = this.physics.add.group();

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms, null, collideInvokerPlayerPlatform, this);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function

    this.physics.add.collider(player, arrows, hitArrow, null, this);
    this.physics.add.collider(platforms, arrows, arrowCollide, null, this);

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

//Aktualisiert das Spiel
function update ()
{
    if (gameOver)
    {
        return;
    }

    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
        left = true;
        right = false;
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
        right = true;
        left = false;
    }
    else
    {
        if (right)
        {
          player.anims.play('lookRight', true);
        }
        else if (left)
        {
          player.anims.play('lookLeft', true);
        }
        else {
          {
            player.anims.play('turn', true);
          }
        }
        player.setVelocityX(0);
    }

    if (Phaser.Input.Keyboard.JustDown(cursors.space) && !justShot)
    {
      if (left)
      {
        shootArrow(player, 'arrowLeft');
        justShotTimer();
      }
      else if (right)
      {
          shootArrow(player, 'arrowRight');
          justShotTimer();
      }
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
    text1.text = 'Fritz ' + player.arrows;
    text1.updateText();
    text1 = Phaser.Display.Align.To.TopCenter(text1, player, 0, 0);
}

function justShotTimer(){
  justShot = true;
  setTimeout( () => {
    justShot = false
  }, 500);
}

//Erstellt einen Pfeil und schießt ihn ab.
//shootingPlayer = der Spieler der schießt.
//imageName = das Bild das für den Pfeil benutzt werden soll.
function shootArrow(shootingPlayer, imageName)
{
  if(player.arrows > 0)
  {
    player.arrows += - 1;
    var arrow = arrows.create(16, 16, imageName);
    arrow.setBounce(0);
    arrow.setCollideWorldBounds(true);
    arrow.allowGravity = true;
    arrow.colided = false;
    //arrow.rotation = -50;
    //arrow.angularVelocity = -10;
    arrow.body.setGravity(0, 0);
    //arrow.on('', arrowCollide)

    switch (imageName)
    {
      case 'arrowRight':
      arrow.setVelocity(500, -80);
      Phaser.Display.Align.To.RightCenter(arrow, shootingPlayer, 0, 10);
        break;
      default:
      arrow.setVelocity(-500, -80);//-400
      Phaser.Display.Align.To.LeftCenter(arrow, player, 0, 10);
    }
    //console.log(arrow.body.velocity);
  }
}

//Wird ausgelöst wenn ein Pfeil auf eine Platform trifft.
//platform = die Platform die getroffen wurde.
//collidedArrow = der Pfeil der die Platform trifft.
function arrowCollide(platform, collidedArrow)
{
  collidedArrow.setVelocity(0, 0);
  collidedArrow.colided = true;
  collidedArrow.body.allowGravity = false;
}

//Wird ausgelöst wenn ein Spieler einen Pfeil berührt.
//Wenn der Pfeil noch in bewegung ist stirbt der Spieler und wenn er liegt sammelt er ihn auf.
//player = der Spieler der den Pfeil berührt.
//arrow = der Pfeil der den Spieler berührt.
function hitArrow (player, arrow)
{
  if(arrow.colided)
  {
    arrow.destroy();
    player.arrows += 1;
  }
  else
  {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
  }
}
