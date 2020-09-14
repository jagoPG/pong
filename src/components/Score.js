import {
  MAX_WIDTH, Zero, One, Two, Three, Four, Five, Six, Seven, Eight, Nine
} from './PaintNumber';
import {BOARD_WIDTH, BOARD_TOP_LIMIT} from './Board';
import Position from './Position';

const MAX_SCORE = 9;

class Score {
  constructor($canvas) {
    const TOP_SIDE_MARGIN = 5;
    this.leftPlayer = new PlayerScore();
    this.rightPlayer = new PlayerScore();
    this.leftPlayerScorePosition = new Position({
      x: BOARD_WIDTH / 3 + BOARD_TOP_LIMIT,
      y: TOP_SIDE_MARGIN
    });
    this.rightPlayerScorePosition = new Position({
      x: BOARD_WIDTH - BOARD_WIDTH / 3 - BOARD_TOP_LIMIT - MAX_WIDTH,
      y: TOP_SIDE_MARGIN
    });
    this.drawer = $canvas.getContext('2d');
  }

  leftPlayerScored() {
    this.leftPlayer.increase();
  }

  rightPlayerScored() {
    this.rightPlayer.increase();
  }

  isGameFinished() {
    return this.leftPlayer.hasWon() || this.rightPlayer.hasWon();
  }

  reset() {
    this.leftPlayer.reset();
    this.rightPlayer.reset();
  }

  draw() {
    this.drawScore(this.leftPlayer, this.leftPlayerScorePosition);
    this.drawScore(this.rightPlayer, this.rightPlayerScorePosition);
  }

  drawScore(playerScore, playerScorePosition) {
    switch (playerScore.score) {
      case 0:
        new Zero(this.drawer).paint(
            playerScorePosition.x,
            playerScorePosition.y
        );
        break;
      case 1:
        new One(this.drawer).paint(
            playerScorePosition.x,
            playerScorePosition.y
        );
        break;
      case 2:
        new Two(this.drawer).paint(
            playerScorePosition.x,
            playerScorePosition.y
        );
        break;
      case 3:
        new Three(this.drawer).paint(
            playerScorePosition.x,
            playerScorePosition.y
        );
        break;
      case 4:
        new Four(this.drawer).paint(
            playerScorePosition.x,
            playerScorePosition.y
        );
        break;
      case 5:
        new Five(this.drawer).paint(
            playerScorePosition.x,
            playerScorePosition.y
        );
        break;
      case 6:
        new Six(this.drawer).paint(
            playerScorePosition.x,
            playerScorePosition.y
        );
        break;
      case 7:
        new Seven(this.drawer).paint(
            playerScorePosition.x,
            playerScorePosition.y
        );
        break;
      case 8:
        new Eight(this.drawer).paint(
            playerScorePosition.x, playerScorePosition.y
        );
        break;
      case 9:
        new Nine(this.drawer).paint(
            playerScorePosition.x, playerScorePosition.y
        );
        break;
      default:
        console.error('Cannot be printed');
    }
  }
}

class PlayerScore {
  constructor() {
    this.score = 0;
  }

  increase() {
    if (this.score === MAX_SCORE) {
      return;
    }
    this.score += 1;
  }

  hasWon() {
    return this.score === MAX_SCORE;
  }

  reset() {
    this.score = 0;
  }
}

export default Score;