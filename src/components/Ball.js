import Position from './Position';
import {
  isWallCollision,
  wallCollisionAngle
} from './../util/collisions';
import {centeredPosition} from './../util/positioning';
import {BOARD_WIDTH, BOARD_HEIGHT} from './Board';

const
    WIDTH = 12,
    HEIGHT = 12,
    SPEED = 2,
    INITIAL_ANGLE = 45,
    TO_RIGHT = 1,
    TO_LEFT = 0,
    BALL_COLOR = '#2BC20E';

class Ball {
  constructor({x, y}) {
    this.position = new Position({x, y});
    this.speedX = SPEED;
    this.speedY = SPEED;
    this.angle = INITIAL_ANGLE;
    this.heading = TO_RIGHT;
  }

  toString() {
    return `Ball {
            height: ${HEIGHT},
            width: ${WIDTH}},
            position: ${this.position.toString()},
            angle: ${this.angle}
        }`;
  }

  draw($canvas) {
    const ctx = $canvas.getContext('2d');
    ctx.fillStyle = BALL_COLOR;
    ctx.fillRect(this.position.x, this.position.y, WIDTH, HEIGHT);
  }

  move() {
    if (isWallCollision(this.position)) {
      this.changeWallBouncingAngle();
    }
    this.makeMovement();
  }

  makeMovement() {
    this.position.x += this.speedX * Math.cos(Ball.toRadians(this.angle));
    this.position.y -= this.speedY * Math.sin(Ball.toRadians(this.angle));
  }

  static toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  changeDirection(heading) {
    if (heading === this.heading) {
      return;
    }
    this.heading = heading;
    this.speedX = this.speedX * -1;
  }

  changeWallBouncingAngle() {
    wallCollisionAngle(this);
  }

  resetBallPosition() {
    this.position.x = centeredPosition(BOARD_WIDTH, WIDTH);
    this.position.y = centeredPosition(BOARD_HEIGHT, HEIGHT);
  }
}

export default Ball;

export {WIDTH, HEIGHT, TO_LEFT, TO_RIGHT};
