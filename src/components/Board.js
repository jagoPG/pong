import Racket from './Racket';
import Ball from './Ball';
import {
  DEFAULT_HEIGHT as RACKET_HEIGHT,
  DEFAULT_WIDTH as RACKET_WIDTH
} from './Racket';
import {
  WIDTH as BALL_WIDTH,
  HEIGHT as BALL_HEIGHT,
  TO_RIGHT,
  TO_LEFT
} from './Ball';
import Score from './Score';
import {centeredPosition} from './../util/positioning';
import {
  racketCollisionAngle,
  isCollisionBetween,
  isGoalScored,
  isLeftGoal
} from './../util/collisions';
import RacketAi from './RacketAi';

const
    BOARD_WIDTH = 500,
    BOARD_HEIGHT = 280,
    BOARD_TOP_LIMIT = 20,
    BOARD_BORDER_WIDTH = 5,
    LEFT_RACKET_X_POSITION = 10,
    RIGHT_RACKET_X_POSITION = 490,
    BOARD_BACKGROUND_COLOR = '#1E1F21',
    BOARD_BORDER_COLOR = '#0C8900',
    FONT_COLOR = '#0C8900',
    LEFT_PLAYER_DOWN_KEY = 83,
    LEFT_PLAYER_UP_KEY = 87,
    RIGHT_PLAYER_DOWN_KEY = 76,
    RIGHT_PLAYER_UP_KEY = 79;

class Board {
  constructor($canvas, onGameFinishedCallback) {
    console.log(onGameFinishedCallback);
    this.$canvas = $canvas;
    this.score = new Score($canvas);
    this.onGameFinishedCallback = onGameFinishedCallback;
    console.log(this.onGameFinishedCallback);
    this.setupSize();
    this.setupRackets();
    this.setupRacketsAi();
  }

  setupSize() {
    this.$canvas.width = BOARD_WIDTH;
    this.$canvas.height = BOARD_HEIGHT;
  }

  setupRackets() {
    const verticalPosition = centeredPosition(BOARD_HEIGHT, RACKET_HEIGHT);
    this.leftPlayer = new Racket({
      x: LEFT_RACKET_X_POSITION,
      y: verticalPosition,
      goDownKey: LEFT_PLAYER_DOWN_KEY,
      goUpKey: LEFT_PLAYER_UP_KEY,
    });
    this.rightPlayer = new Racket({
      x: RIGHT_RACKET_X_POSITION - RACKET_WIDTH,
      y: verticalPosition,
      goDownKey: RIGHT_PLAYER_DOWN_KEY,
      goUpKey: RIGHT_PLAYER_UP_KEY,
    });
    this.ball = new Ball({
      x: centeredPosition(BOARD_WIDTH, BALL_WIDTH),
      y: centeredPosition(BOARD_HEIGHT, BALL_HEIGHT)
    });
  }

  setupRacketsAi() {
    this.leftRacketAi = new RacketAi(this.leftPlayer, this.ball.position);
    this.rightRacketAi = new RacketAi(this.rightPlayer, this.ball.position);
    document.addEventListener('keydown', evt => {
      if (evt.keyCode == LEFT_PLAYER_DOWN_KEY || evt.keyCode == LEFT_PLAYER_UP_KEY) {
        this.leftRacketAi.disable();
        this.rightRacketAi.enable();
      } else if (evt.keyCode == RIGHT_PLAYER_DOWN_KEY || evt.keyCode == RIGHT_PLAYER_UP_KEY) {
        this.leftRacketAi.enable();
        this.rightRacketAi.disable();
      }
    })
  }

  draw() {
    const drawer = this.$canvas.getContext('2d');
    drawer.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    drawer.fillStyle = BOARD_BACKGROUND_COLOR;
    drawer.fillRect(0, 0, this.$canvas.width, BOARD_TOP_LIMIT);
    drawer.fillRect(0, BOARD_TOP_LIMIT, this.$canvas.width, this.$canvas.height - 20);
    this.drawOutline(drawer);
    this.leftPlayer.draw(this.$canvas);
    this.rightPlayer.draw(this.$canvas);
    this.ball.draw(this.$canvas);
    this.score.draw();
  }

  drawOutline(drawer) {
    const border = BOARD_BORDER_WIDTH / 2;
    drawer.beginPath();
    drawer.moveTo(border, BOARD_TOP_LIMIT);
    drawer.lineTo(border, BOARD_HEIGHT - border);
    drawer.lineTo(BOARD_WIDTH - border, BOARD_HEIGHT - border);
    drawer.lineTo(BOARD_WIDTH - border, BOARD_TOP_LIMIT - border);
    drawer.lineTo(BOARD_WIDTH - BOARD_WIDTH / 3, BOARD_TOP_LIMIT);
    drawer.moveTo(0, BOARD_TOP_LIMIT);
    drawer.lineTo(BOARD_WIDTH / 3, BOARD_TOP_LIMIT);
    drawer.lineWidth = BOARD_BORDER_WIDTH;
    drawer.strokeStyle = BOARD_BORDER_COLOR;
    drawer.stroke();
  }

  reset() {
    this.ball.resetBallPosition();
    this.leftPlayer.reset();
    this.rightPlayer.reset();
    this.score.reset();
  }

  tick() {
    if (isCollisionBetween(this.ball.position, this.leftPlayer.position)) {
      this.handleCollisionWithLeftPlayer();
    } else if (isCollisionBetween(this.ball.position, this.rightPlayer.position)) {
      this.handleCollisionWithRightPlayer();
    } else if (isGoalScored(this.ball.position)) {
      this.handleGoalIsScored();
      if (!this.score.isGameFinished()) {
        this.ball.resetBallPosition();
      } else {
        this.onGameFinishedCallback();
        this.ball.resetBallPosition();
        this.draw();

        const drawer = this.$canvas.getContext('2d');
        drawer.font = '24px Arial';
        drawer.fillStyle = FONT_COLOR;
        drawer.fillText(
            'Press <space> to reset the game',
            BOARD_BORDER_WIDTH + 18,
            BOARD_HEIGHT - BOARD_BORDER_WIDTH - 6
        );
        return;
      }
    }
    this.leftRacketAi.render();
    this.rightRacketAi.render();
    this.ball.move();
  }

  handleCollisionWithLeftPlayer() {
    this.ball.changeDirection(TO_RIGHT);
    this.ball.angle = racketCollisionAngle(
        this.ball.position,
        this.leftPlayer.position
    );
  }

  handleCollisionWithRightPlayer() {
    this.ball.changeDirection(TO_LEFT);
    this.ball.angle = racketCollisionAngle(
        this.ball.position,
        this.rightPlayer.position
    );
  }

  handleGoalIsScored() {
    if (isLeftGoal(this.ball.position)) {
      this.score.leftPlayerScored();
    } else {
      this.score.rightPlayerScored();
    }
  }
}

export default Board;

export {BOARD_HEIGHT, BOARD_WIDTH, BOARD_TOP_LIMIT, BOARD_BORDER_WIDTH};
