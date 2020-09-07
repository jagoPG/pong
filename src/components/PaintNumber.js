const
    MAX_WIDTH = 20,
    MAX_HEIGHT = 40,
    LINE_BORDER = 5,
    LINE_COLOR = '#39FF13';

class PaintNumber {
  constructor(painter) {
    this.painter = painter;
  }

  paint(baseX, baseY) {
    this.painter.lineWidth = LINE_BORDER;
    this.painter.strokeStyle = LINE_COLOR;
  }
}

class Zero extends PaintNumber {
  paint(baseX, baseY) {
    super.paint(baseX, baseY);
    this.painter.beginPath();
    this.painter.moveTo(baseX, baseY);
    this.painter.lineTo(baseX + MAX_WIDTH, baseY);
    this.painter.lineTo(baseX + MAX_WIDTH, baseY + MAX_HEIGHT);
    this.painter.lineTo(baseX, baseY + MAX_HEIGHT);
    this.painter.lineTo(baseX, baseY);
    this.painter.stroke();
  }
}

class One extends PaintNumber {
  paint(baseX, baseY) {
    super.paint(baseX, baseY);
    this.painter.beginPath();
    this.painter.moveTo(baseX + MAX_WIDTH / 2, baseY);
    this.painter.lineTo(baseX + MAX_WIDTH / 2, MAX_HEIGHT);
    this.painter.stroke();
  }
}

class Two extends PaintNumber {
  paint(baseX, baseY) {
    super.paint(baseX, baseY);
    this.painter.beginPath();
    this.painter.moveTo(baseX, baseY);
    this.painter.lineTo(baseX + MAX_WIDTH, baseY);
    this.painter.lineTo(baseX + MAX_WIDTH, baseY + MAX_HEIGHT / 2);
    this.painter.lineTo(baseX, baseY + MAX_HEIGHT / 2);
    this.painter.lineTo(baseX, baseY + MAX_HEIGHT);
    this.painter.lineTo(baseX + MAX_WIDTH, baseY + MAX_HEIGHT);
    this.painter.stroke();
  }
}

class Three extends PaintNumber {
  paint(baseX, baseY) {
    super.paint(baseX, baseY);
    this.painter.beginPath();
    this.painter.moveTo(baseX, baseY);
    this.painter.lineTo(baseX + MAX_WIDTH, baseY);
    this.painter.moveTo(baseX, baseY + MAX_HEIGHT / 2);
    this.painter.lineTo(baseX + MAX_WIDTH, baseY + MAX_HEIGHT / 2);
    this.painter.moveTo(baseX, baseY + MAX_HEIGHT);
    this.painter.lineTo(baseX + MAX_WIDTH, baseY + MAX_HEIGHT);
    this.painter.moveTo(baseX + MAX_WIDTH, baseY);
    this.painter.lineTo(baseX + MAX_WIDTH, baseY + MAX_HEIGHT);
    this.painter.stroke();
  }
}

class Four extends PaintNumber {
  paint(baseX, baseY) {
    super.paint(baseX, baseY);
    this.painter.beginPath();
    this.painter.moveTo(baseX, baseY);
    this.painter.lineTo(baseX, baseY + MAX_HEIGHT / 2);
    this.painter.lineTo(baseX + MAX_WIDTH, baseY + MAX_HEIGHT / 2);
    this.painter.moveTo(baseX + MAX_WIDTH, baseY);
    this.painter.lineTo(baseX + MAX_WIDTH, baseY + MAX_HEIGHT);
    this.painter.stroke();
  }
}

class Five extends PaintNumber {
  paint(baseX, baseY) {
    super.paint(baseX, baseY);
    this.painter.beginPath();
    this.painter.moveTo(baseX + MAX_WIDTH, baseY);
    this.painter.lineTo(baseX, baseY);
    this.painter.lineTo(baseX, baseY + MAX_HEIGHT / 2);
    this.painter.lineTo(baseX + MAX_WIDTH, baseY + MAX_HEIGHT / 2);
    this.painter.lineTo(baseX + MAX_WIDTH, baseY + MAX_HEIGHT);
    this.painter.lineTo(baseX, baseY + MAX_HEIGHT);
    this.painter.stroke();
  }
}

class Six extends PaintNumber {
  paint(baseX, baseY) {
    super.paint(baseX, baseY);
    this.painter.beginPath();
    this.painter.moveTo(baseX + MAX_WIDTH, baseY);
    this.painter.lineTo(baseX, baseY);
    this.painter.lineTo(baseX, baseY + MAX_HEIGHT);
    this.painter.lineTo(baseX + MAX_WIDTH, baseY + MAX_HEIGHT);
    this.painter.lineTo(baseX + MAX_WIDTH, baseY + MAX_HEIGHT / 2);
    this.painter.lineTo(baseX, baseY + MAX_HEIGHT / 2);
    this.painter.stroke();
  }
}

class Seven extends PaintNumber {
  paint(baseX, baseY) {
    super.paint(baseX, baseY);
    this.painter.beginPath();
    this.painter.moveTo(baseX, baseY + (MAX_HEIGHT / 8));
    this.painter.lineTo(baseX, baseY);
    this.painter.lineTo(baseX + MAX_WIDTH, baseY);
    this.painter.lineTo(baseX, baseY + MAX_HEIGHT);
    this.painter.stroke();
  }
}

class Eight extends PaintNumber {
  paint(baseX, baseY) {
    super.paint(baseX, baseY);
    this.painter.beginPath();
    this.painter.moveTo(baseX, baseY);
    this.painter.lineTo(baseX, baseY + MAX_HEIGHT);
    this.painter.lineTo(baseX + MAX_WIDTH, baseY + MAX_HEIGHT);
    this.painter.lineTo(baseX + MAX_WIDTH, baseY);
    this.painter.lineTo(baseX, baseY);
    this.painter.moveTo(baseX, baseY + MAX_HEIGHT / 2);
    this.painter.lineTo(baseX + MAX_WIDTH, baseY + MAX_HEIGHT / 2);
    this.painter.stroke();
  }
}

class Nine extends PaintNumber {
  paint(baseX, baseY) {
    super.paint(baseX, baseY);
    this.painter.beginPath();
    this.painter.moveTo(baseX, baseY);
    this.painter.lineTo(baseX + MAX_WIDTH, baseY);
    this.painter.lineTo(baseX + MAX_WIDTH, baseY + MAX_HEIGHT);
    this.painter.lineTo(baseX, baseY + MAX_HEIGHT);
    this.painter.moveTo(baseX, baseY);
    this.painter.lineTo(baseX, baseY + MAX_HEIGHT / 2);
    this.painter.lineTo(baseX + MAX_WIDTH, baseY + MAX_HEIGHT / 2);
    this.painter.stroke();
  }
}

export {
  MAX_WIDTH,
  MAX_HEIGHT,
  Zero,
  One,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine
};