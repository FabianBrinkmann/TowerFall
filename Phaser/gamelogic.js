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
var stars;
var arrows;
var walls;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var text1;
var right;
var left;
var justShot = false;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('wand', 'assets/wand.png');
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('arrowUp', 'assets/arrowUp.png');
    this.load.image('arrowDown', 'assets/arrowDown.png');
    this.load.image('arrowLeft', 'assets/arrowLeft.png');
    this.load.image('arrowRight', 'assets/arrowRight.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create ()
{
    //  A simple background for our game
    this.add.image(400, 300, 'sky');
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    //  Now let's create some ledges
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
    platforms.create(-30, 400, 'wand').setScale(2).refreshBody();
    platforms.create(830, 400, 'wand').setScale(2).refreshBody();
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

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {

        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    arrows = this.physics.add.group();

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, stars, collectStar, null, this);

    this.physics.add.collider(player, arrows, hitArrow, null, this);
    this.physics.add.collider(platforms, arrows, arrowCollide, null, this);

}

function handler (gameObject)
{
    gameObject.tint = 0xff0000;
}

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
    else if (Phaser.Input.Keyboard.JustDown(cursors.space) && !justShot)
    {
      if (left)
      {
        shootArrow(player, 'arrowLeft');
      }
      else if (right)
      {
          shootArrow(player, 'arrowRight');
      }

      justShot = true;
      setTimeout( () => {
        justShot = false
      }, 500);
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
        //player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
    text1.text = 'Fritz ' + player.arrows;
    text1.updateText();
    text1 = Phaser.Display.Align.To.TopCenter(text1, player, 0, 0);
}

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
    console.log(arrow.body.velocity);
  }
}

function arrowCollide(platform, collidedArrow)
{
  collidedArrow.setVelocity(0, 0);
  collidedArrow.colided = true;
  collidedArrow.body.allowGravity = false;
}

function collectStar (player, star)
{
    star.disableBody(true, true);

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0)
    {
        //  A new batch of stars to collect
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var arrow = arrows.create(x, 16, 'bomb');
        arrow.setBounce(0);
        arrow.setCollideWorldBounds(true);
        arrow.setVelocity(Phaser.Math.Between(-200, 200), 20);
        arrow.allowGravity = false;

    }
}

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
