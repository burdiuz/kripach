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

class SparksSource {
  constructor(context, x, y, duration, maxDistance = 250, sparkCount = 5) {
    this._context = context;
    this._x = x;
    this._y = y;
    this._generate(maxDistance << 1, context.canvas.height - y, sparkCount, duration);
  }

  _generate(maxDistance, height, sparkCount, maxDuration) {
    this._sparks = [];
    while (sparkCount > 0) {
      let eff = Math.random();
      let distance = maxDistance >> 1 + eff * (maxDistance >> 1);
      let duration = maxDuration * 0.5 + eff * (maxDuration * 0.5);
      this._sparks.push(new Spark(this._context, this._x, this._y, Math.random() > 0.5 ? distance : -distance, height, SparkMovement.getSpeed(duration)));
      sparkCount--;
    }
  }

  get destroyed() {
    return !this._sparks || !this._sparks.length;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  update() {
    let length = this._sparks.length;
    for (let index = 0; index < length; index++) {
      let item = this._sparks[index];
      item.update();
      if (item.destroyed) {
        this._sparks.splice(index, 1);
        index--;
        length--;
      }
    }
  }
}

class Sparks extends SparksSource {
  constructor(context, x, y, maxDistance = 250, sparkCount = Sparks.getRandomSparkCount()) {
    super(context, x, y, maxDistance / 125, maxDistance, sparkCount);
  }

  *animate() {
    while (!this.destroyed) {
      yield true;
      this.update();
    }
  }

  static getRandomSparkCount() {
    return 6 + Math.random() * 5 >> 0;
  }
}

/*
 http://www.timotheegroleau.com/Flash/experiments/easing_function_generator.htm
 */

class SparkPosition {
  constructor(startX, startY, offsetX, offsetY) {
    Object.assign(this, {
      x: startX,
      y: startY,
      startX,
      startY,
      offsetX,
      offsetY,
      endX: startX + offsetX,
      endY: startY + offsetY
    });
  }

  get destroyed() {
    return this.y >= this.endY;
  }

  update(progress) {
    const x = this.offsetX * progress;
    const y = this.offsetY * (progress * progress * progress / 3);
    this.x = this.startX + x;
    this.y = this.startY + y;
  }

}

class SparkMovement extends SparkPosition {
  constructor(startX, startY, offsetX, offsetY, speed, acceleration = 0) {
    super(startX, startY, offsetX, offsetY);
    this._destroyed = false;
    this._progress = 0;
    this.setSpeed(speed, acceleration);
  }

  setSpeed(speed, acceleration = 0) {
    this._speed = speed;
    this._acceleration = acceleration;
  }

  get progress() {
    return this._progress;
  }

  get destroyed() {
    return this._destroyed;
  }

  update(progress) {
    if (this._destroyed) return;
    this._progress += this._speed;
    this._speed += this._acceleration;
    super.update(this._progress);
    if (this._progress > 1 || super.destroyed) {
      this._progress = 1;
      this._destroyed = true;
    }
  }

  static getSpeed(duration, fps = 24) {
    return 1 / (duration * fps);
  }
}

class SparkAsset {
  constructor(context, maxBlur = SparkAsset.getRandomMaxBlur()) {
    this.context = context;
    this.maxBlur = maxBlur;
  }

  draw(x, y, progress) {
    // FIXME Must be cached, takes too longto redraw
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
    context.arc(x, y, 1, 0, PI2, false);
    context.fill();
  }

  static getRandomMaxBlur() {
    return 5 + Math.random() * 5 >> 0;
  }
}

class Spark {
  constructor(context, startX, startY, endX, endY, speed, acceleration = 0) {
    this._position = new SparkMovement(startX, startY, endX, endY, speed, acceleration);
    this._asset = new SparkAsset(context);
  }

  get destroyed() {
    return this._position.destroyed;
  }

  update() {
    this._position.update();
    if (!this._position.destroyed) {
      this._asset.draw(this._position.x, this._position.y, this._position.progress);
    }
  }
}
