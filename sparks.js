'use strict';

const PI2 = Math.PI * 2;

class SparksHistory {
  constructor(asset) {

  }

  addStartPoint(x, y) {

  }

  draw(context) {
  }
}

class Sparks {
  constructor(areaWidth, areaHeight, sparkCount = Sparks.getRandomSparkCount()) {
    this._animation = null;
    this._initialize(areaWidth, areaHeight);
    this._generate(areaWidth / 2, sparkCount);

  }

  _initialize(areaWidth, areaHeight) {
    const canvas = this._canvas = document.createElement('canvas');
    canvas.width = areaWidth;
    canvas.height = areaHeight;
    this._context = canvas.getContext('2d');
  }

  _generate(maxDistance, sparkCount) {
    const height = this._canvas.height;
    this._sparks = [];
    while (sparkCount > 0) {
      this._sparks.push(new Spark(this._context, maxDistance, 0, Math.random() > 0.5 ? maxDistance : -maxDistance, height));
      sparkCount--;
    }
  }

  *animate() {
    const time = Date.now(); // TODO calculate speed with acceleration
    while (!this.destroyed) {
      yield 1;
    }
  }

  get destroyed() {
    return !this._sparks || !this._sparks.length;
  }

  destroy() {

  }

  static getRandomSparkCount() {
    return 6 + Math.random() * 5 >> 0;
  }
}

class SparksSource extends Sparks {
  constructor(context, x, y, maxDistance = 250, sparkCount = Sparks.getRandomSparkCount()) {
    this._targetContext = context;
    this._x = x;
    this._y = y;
    super(maxDistance << 1, context.canvas.height - y, sparkCount);
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  draw() {
    // TODO draw on target context, this will iterate animation and draw
  }
}

class SparkPosition {
  constructor(startX, startY, offsetX, offsetY) {
    Object.assign(this, {
      x: startX,
      y: startY,
      startX,
      startY,
      offsetX,
      offsetY
    });
    // add acceleration and curved trajectory y = x^2
  }

  get destroyed() {
    return this.y >= this.endY;
  }

  update(progress) {
    const x = this.offsetX * progress;
    const y = this.offsetY * progress;
    this.x = this.startX + x;
    this.y = this.startY + y;
  }
}

class SparkAsset {
  constructor(context, maxBlur = SparkAsset.getRandomMaxBlur()) {
    this.context = context;
    this.maxBlur = maxBlur;
  }

  draw(x, y, progress) {
    const ap = 1 - progress;
    const context = this.context;
    context.filter = 'blur(' + parseInt(this.maxBlur * ap) + 'px)';
    context.fillStyle = 'rgba(255, 255, 125, ' + String(0.25 + 0.75 * ap) + ')';
    context.beginPath();
    context.arc(x, y, 5 - 5 * progress, 0, PI2, false);
    context.fill();
    context.beginPath();
    context.fillStyle = 'rgb(255, 255, 125)';
    context.filter = 'none';
    context.arc(x, y, 2, 0, PI2, false);
    context.fill();
  }

  static getRandomMaxBlur() {
    return 5 + Math.random() * 5 >> 0;
  }
}

class Spark {
  constructor(context, startX, startY, endX, endY) {
    this._position = new SparkPosition(startX, startY, endX, endY);
    this._asset = new SparkAsset(context);
  }

  update(progress) {
    this._position.update(progress);
    this._asset.draw(this._position.x, this._position.y, progress);
  }
}
