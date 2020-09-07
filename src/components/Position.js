class Position {
  constructor({x, y}) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `Position {x: ${this.x}, y: ${this.y}}`;
  }
}

export default Position;