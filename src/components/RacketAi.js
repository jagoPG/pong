import { BOARD_WIDTH } from './Board';
import { WIDTH as BALL_WIDTH, HEIGHT as BALL_HEIGHT } from './Ball';
import { DEFAULT_HEIGHT as RACKET_HEIGHT } from './Racket';

class RacketAi {
  constructor(racket, ballPosition) {
    this.enabled = true;
    this.racket = racket;
    this.ballPosition = ballPosition;
    this.isLeftPlayer = racket.position.x < BOARD_WIDTH / 2;
  }

  render() {
    if (!this.enabled) {
      return;
    }
    if (!this.isBallClose()) {
      return;
    }
    const
      ballCenter = (this.ballPosition.y + BALL_HEIGHT) / 2,
      racketCenter = (this.racket.position.y + RACKET_HEIGHT) / 2;
    if (ballCenter > racketCenter) {
        this.racket.goDown();
    } else {
        this.racket.goUp();
    }
  }

  isBallClose() {
    const 
      boardMiddle = BOARD_WIDTH / 2,
      ballPosition = this.ballPosition.x + BALL_WIDTH / 2,
      boardMiddleOffset = BOARD_WIDTH * 0.35;
    return this.isLeftPlayer ? 
        boardMiddle - boardMiddleOffset > ballPosition : 
        boardMiddle + boardMiddleOffset < ballPosition;
  }

  disable() {
    this.enabled = false;
  }

  enable() {
    this.enabled = true;
  }
}

export default RacketAi;
