// Enemies our player must avoid
var Enemy = function(enemyRow,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -300;
    this.y = enemyRow * 83 - 23;
    this.speed = speed;

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
    if (this.x > 520) {
        this.x = -105;
        this.speed = Math.random()*400 + 100
    } else {
        this.x += this.speed*dt;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player class
var Player = function(playerColumn,playerUrl){
    this.x = playerColumn * 101;
    this.y = 390;
    this.sprite = playerUrl;
};

// Handle player's collision with enemy
Player.prototype.update = function() {
    for(var i = 0;i < allEnemies.length;i++) {
        if (Math.abs(allEnemies[i].x - this.x) < 70 && Math.abs(allEnemies[i].y - this.y) < 65) {
            this.x = 202;
            this.y = 390;
        };
    };
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.handleInput = function(direction) {
    if(allPlayers.length === 1) {
        switch(direction) { 
            case 'left':
                if(this.x > 100) this.x -= 101;
                break;
            case 'right':
                if(this.x < 400) this.x += 101;
                break;
            case 'up':
                if (this.y < 75) {
                    this.x = 202;
                    this.y = 390;
                } else {
                    this.y -= 83;
                };
                break;
            case 'down':
                if(this.y < 350) this.y += 83;
                break
        };
    };
};


//Selector class
var Selector = function() {
    this.x = 202;
    this.y = 395;
    this.sprite = 'images/Selector.png'
};

Selector.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

//Handle input,when enter is pressed,instantiate selected player,enemies
// and gem,remove selector.
Selector.prototype.handleInput = function(input) {
    switch(input) {
        case 'left':
            if(this.x > 100) this.x -= 101;
            break;
        case 'right':
            if(this.x < 400) this.x += 101;
            break;
        case 'enter':
            for(var i = 0;i < 3;i++) {
                allEnemies.push(new Enemy(i+1,Math.random() * 400 + 100));
            };
            var col = this.x / 101;
            allPlayers = [new Player(col,playerUrls[col])];
            allPlayers[0].x = 202;
            allGems.push(new Gem());
            selectors = [];
            break
    };
};

//Gem class
var Gem = function() {
    this.x = Math.floor(Math.random() * 5) * 101;
    this.y = Math.floor(Math.random() * 3 + 1) * 83 -23;
    this.sprite = gemUrls[Math.floor(Math.random() * 3)];
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
}

//Handle gem's collision with player
Gem.prototype.update = function() {
    for(var i = 0;i < allGems.length;i++) {
        if (Math.abs(allGems[i].x - allPlayers[i].x) < 70 && Math.abs(allGems[i].y - allPlayers[i].y) < 65) {
            allGems = [new Gem()];
        };
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var playerUrls = ['images/char-cat-girl.png','images/char-horn-girl.png','images/char-boy.png','images/char-pink-girl.png','images/char-princess-girl.png']

var allPlayers = [];
for(var i = 0;i < 5;i++) {
    allPlayers.push(new Player(i,playerUrls[i]));
};


var allEnemies = [];



var selectors = [];
selectors.push(new Selector());


var gemUrls = ['images/Gem Blue.png','images/Gem Green.png','images/Gem Orange.png']
var allGems = [];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13:'enter'
    };

    selectors.forEach(function(selector) {
        selector.handleInput(allowedKeys[e.keyCode]);
    });
    allPlayers.forEach(function(player) {
        player.handleInput(allowedKeys[e.keyCode]);
    });
});
