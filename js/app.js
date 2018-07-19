
// Enemies our player must avoid
function Enemy(x, y, v) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
	  this.y = y;
    this.v = v;
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
}

let player = new Player(300, 200);
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function() {

};
//Draw player image to canvas
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//Handle key presses and moves the player within the canvas
Player.prototype.handleInput = function(key) {
  switch (key) {
    case 'up': {
      (this.y >= 0) ? this.y -=80 : false;
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
