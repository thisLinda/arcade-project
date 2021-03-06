//using ES 6, rather than .prototype in app.js as provided in Udacity code
/* Rodrick Bloomfield code instruction from zoom meeting https://zoom.us/recording/play/aulotDlzKFegQFIJTaTzKgWvNkVsYtlwO454vL1UPE1Cm6lOUBQCtfVurPOIAGAS?startTime=1529542978000 including instruction and rationale for creating classes.js */

let modal = document.querySelector('#modal');
let playAgain = document.querySelector('.playAgain');

class Entity {
  constructor() {
    this.sprite = 'images/';
    this.x = 2;
    this.y = 5;
  }

  update() {
    this.outOfBoundsX = this.x > 5;
    this.outOfBoundsY = this.y < 1;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
  }

  //https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Collision_detection
  //https://medium.com/@assertchris/collision-detection-b8bf655cb672
  //collision code instructed by R.Bloomfield

  checkCollisions(playerOrEnemy) {
    if (this.y === playerOrEnemy.y) {
      if (this.x >= playerOrEnemy.x - 0.7 && this.x <= playerOrEnemy.x + 0.7) {
        return true;
      }
    } else {
      return false;
    }
  }
}

class Player extends Entity {
  constructor() {
    super();
    this.sprite = 'images/char-cat-girl.png';
    this.win = false;
    this.isMoving = false;
  }

  update(dt) {
    super.update();
    if (this.outOfBoundsY && !this.isMoving && !this.win) {
      document.getElementById('win-modal');
      this.win = true;
      object.reload(forcedReload)
    }
  }

  render() {
    super.render();
    this.isMoving = false;
  }

  //https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript
  //https:/ / medium.com / @assertchris / player - input - 5 bc1b0d80f54 /
  //switch code instructed by R.Bloomfield
  handleInput(input) {
    switch (input) {
      case 'left':
        this.x = this.x > 0 ? this.x - 1 : this.x;
        break;
      case 'up':
        this.y = this.y > 0 ? this.y - 1 : this.y;
        break;
      case 'right':
        this.x = (this.x > -1 && this.x < 4) ? this.x + 1 : this.x;
        break;
      case 'down':
        this.y = (this.y > -1 && this.y < 5) ? this.y + 1 : this.y;
        break;
    }
    this.isMoving = true;
  }
  checkWin() {
    if (this.y <1) {
      return true;
    }
    else {
      return false;
    }
  }
}

//https://jlongster.com/Making-Sprite-based-Games-with-Canvas
//https://code.tutsplus.com/articles/html5-avoider-game-tutorial-multiple-moving-enemies--active-9956
class Enemy extends Entity {
  constructor(x, y, speed) {
    super();
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  update(dt) {
    super.update();
    if (this.outOfBoundsX) {
      this.x = -1;
    } else {
      this.x += this.speed * dt;
    }
  }
}