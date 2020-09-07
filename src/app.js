import Board from './components/Board';

const onLoaded = () => {
  const $canvas = document.querySelector('canvas');
  if ($canvas === null) {
    return;
  }
  const game = new Game($canvas);
  game.resume();
};

class Game {
  constructor($canvas) {
    this.board = new Board($canvas, this.onGameFinishedCallback.bind(this));
    this.paused = false;
    this.gameFinished = false;
    this.bindControls();
  }

  bindControls() {
    addEventListener('keydown', evt => {
      switch (evt.keyCode) {
        case 189:
          if (this.paused) {
            this.pause();
          } else {
            this.resume();
          }
          break;
        case 32:
          if (this.gameFinished) {
           this.board.reset();
           this.resume();
          }
          break;
      }
    });
  }

  pause() {
    this.paused = true;
    clearInterval(this.gameFrames);
  }

  resume() {
    this.paused = false;
    this.gameFrames = setInterval(this.game, 10, this.board);
  }

  game(board) {
    board.draw();
    board.tick();
  }

  onGameFinishedCallback() {
    this.pause(); // TODO Fix binding error
    this.gameFinished = true;
  }
}

document.addEventListener('DOMContentLoaded', onLoaded);
