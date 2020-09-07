import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  BOARD_TOP_LIMIT,
  BOARD_BORDER_WIDTH
} from './../components/Board';
import {
  DEFAULT_HEIGHT as RACKET_HEIGHT,
  DEFAULT_WIDTH as RACKET_WIDTH
} from './../components/Racket';
import {
  HEIGHT as BALL_HEIGHT,
  WIDTH as BALL_WIDTH
} from './../components/Ball';

const isWallCollision = ballPosition => isTopCollision(ballPosition)
    || isBottomCollision(ballPosition);

const isTopCollision = ballPosition => ballPosition.y <= BOARD_TOP_LIMIT
    + BOARD_BORDER_WIDTH;

const isBottomCollision = ballPosition => ballPosition.y + BALL_HEIGHT
    >= BOARD_HEIGHT - BOARD_BORDER_WIDTH;

const isGoalScored = ballPosition => isLeftGoal(ballPosition) || isRightGoal(
    ballPosition);

const isLeftGoal = ballPosition => ballPosition.x <= 0;

const isRightGoal = ballPosition => ballPosition.x + BALL_WIDTH >= BOARD_WIDTH;

const isCollisionBetween = (ball, racket) =>
    ball.x < racket.x + RACKET_WIDTH &&
    ball.x + BALL_WIDTH > racket.x &&
    ball.y < racket.y + RACKET_HEIGHT &&
    ball.y + BALL_HEIGHT > racket.y;

const wallCollisionAngle = ball => {
  if (isTopCollision(ball.position)) {
    ball.speedY *= -1;
  } else if (isBottomCollision(ball.position)) {
    ball.speedY *= -1;
  }
}

const racketCollisionAngle = (ball, racket) => {
  const MAX_BOUNCE_ANGLE = 70;
  const
      relativeYtoRacket = (racket.y + (RACKET_HEIGHT / 2)) - ball.y,
      normalizedPosition = relativeYtoRacket / (RACKET_HEIGHT / 2),
      angle = normalizedPosition * MAX_BOUNCE_ANGLE;
  console.log(`ball y: ${ball.y}`);
  console.log(`racket y: ${racket.y}`);
  console.log(`normalized position: ${normalizedPosition}`);
  console.log(`angle: ${angle}`);
  return angle;
};

export {
  isWallCollision,
  isBottomCollision,
  isTopCollision,
  isGoalScored,
  isLeftGoal,
  isRightGoal,
  isCollisionBetween,
  racketCollisionAngle,
  wallCollisionAngle
};