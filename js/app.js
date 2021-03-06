let win = 0;

// Enemies our player must avoid
function Enemy(x, y, v) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
	  this.y = y;
    this.v = v;
    this.width = 60;
    this.height = 20;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.v * dt;
    //enemies will appear constantly
    (this.x > 500) ? this.x=-100 : false;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//create enemies in different rows and with different speeds
let enemy1 = new Enemy(-100, 60, 300);
let enemy2 = new Enemy(-100, 140, 130);
let enemy3 = new Enemy(-100, 230, 180);

// Now write your own player class
function Player(x, y) {
  this.x = y;
  this.y = x;
  this.sprite = 'images/char-pink-girl.png';
  this.width = 60;
  this.height = 20;
}

let player = new Player(300, 200);
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function() {
  this.collision();
  this.winGame();
};

//Draw player image and winning message to canvas
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  if(win==1){
      ctx.textAlign='center';
      ctx.fillStyle = "white";
      ctx.font = "40px Forte Regular";
      ctx.fillText("Congratulation, you won!", ctx.canvas.width/2, 100);
      ctx.fillText("Refresh the page to start again", ctx.canvas.width/2, 500 )
    }
};

//Handle key presses and moves the player within the canvas
Player.prototype.handleInput = function(key) {
  switch (key) {
    case 'up': {
      (this.y >= 30) ? this.y -=80 : false;
      break;
    }
    case 'right': {
      (this.x <= 300) ? this.x +=100 : false;
      break;
    }
    case 'down': {
      (this.y <=300) ? this.y +=80 : false;
      break;
    }
    case 'left': {
      (this.x >=100) ? this.x -=100 : false;
      break;
    }
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);

// Place the player object in a variable called player

//Enemy-player collisions
Player.prototype.collision = function() {
  for (i=0; i < allEnemies.length; i++) {
    if (this.x < allEnemies[i].x + allEnemies[i].width &&
        this.x + this.width > allEnemies[i].x &&
        this.y < allEnemies[i].y + allEnemies[i].height &&
        this.y + this.height > allEnemies[i].y) {
          this.x = 200;
				  this.y = 300;
    }
  }
}

Player.prototype.winGame = function() {
  if(this.y == -20 && (this.x == 0 || this.x == 100 || this.x == 200
    || this.x == 300 || this.x == 400)) {
      allEnemies = [];
      this.x = 200;
      this.y = 300;
      win = 1;
  }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
