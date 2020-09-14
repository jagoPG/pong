import Position from './Position';
import {BOARD_HEIGHT, BOARD_TOP_LIMIT, BOARD_BORDER_WIDTH} from './Board';

const
    DEFAULT_HEIGHT = 60,
    DEFAULT_WIDTH = 12,
    RACKET_COLOR = '#2BC20E';

class Racket {
  constructor({x, y, goUpKey, goDownKey}) {
    this.height = DEFAULT_HEIGHT;
    this.width = DEFAULT_WIDTH;
    this.defaultX = x;
    this.defaultY = y;
    this.position = new Position({x, y});
    this.isPressingUp = false;
    this.isPressingDown = false;
    this.bindControls(goUpKey, goDownKey);
  }

  bindControls(goUpKey, goDownKey) {
    addEventListener('keydown', evt => {
      if (evt.keyCode === goUpKey) {
        this.isPressingUp = true;
      } else if (evt.keyCode === goDownKey) {
        this.isPressingDown = true;
      }
    });

    addEventListener('keyup', evt => {
      if (evt.keyCode === goUpKey) {
        this.isPressingUp = false;
      } else if (evt.keyCode === goDownKey) {
        this.isPressingDown = false;
      }
    });
  }

  goUp() {
    if (this.position.y <= BOARD_TOP_LIMIT + BOARD_BORDER_WIDTH) {
      this.position.y = BOARD_TOP_LIMIT + BOARD_BORDER_WIDTH;
      return;
    }
    this.position.y -= 5;
  }

  goDown() {
    if (this.position.y + DEFAULT_HEIGHT >= BOARD_HEIGHT
      - BOARD_BORDER_WIDTH) {
      this.position.y = BOARD_HEIGHT - DEFAULT_HEIGHT - BOARD_BORDER_WIDTH;
      return;
    }
    this.position.y += 5;
  }

  toString() {
    return `Racket {height: ${this.width}, width: ${this.height}}, position: ${this.position.toString()}`;
  }

  draw($canvas) {
    const ctx = $canvas.getContext('2d');
    ctx.fillStyle = RACKET_COLOR;

    if (this.isPressingUp) {
      this.goUp();
    }
    if (this.isPressingDown) {
      this.goDown();
    } 

    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  reset() {
    this.position.x = this.defaultX;
    this.position.y = this.defaultY;
  }
}

export default Racket;

export {DEFAULT_HEIGHT, DEFAULT_WIDTH}; 
