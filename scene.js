'use strict';

class Scene {
  constructor(onFrame = null, fps = 24, start = true) {
    this.onFrame = onFrame;
    this._framesPerSecond = fps;
    this._intervalHandler = () => {
      if (this._invalid) {
        this._invalid = false;
        if (this._onFrame) {
          window.requestAnimationFrame(this._onFrame);
        }
      }
    };
    start && this.start();
  }

  start() {
    this._startTime = Date.now();
    this._intervalId = setInterval(this._intervalHandler, 1000 / this._framesPerSecond);
    this._intervalHandler();
  }

  stop() {
    clearInterval(this._intervalId);
    this._startTime = 0;
  }

  invalid() {
    this._invalid = true;
  }

  get framesPerSecond() {
    return Boolean(this._intervalId);
  }

  get started() {
    return Boolean(this._intervalId);
  }

  get startTime() {
    return this._startTime;
  }

  isInvalid() {
    return this._invalid;
  }

  get onFrame() {
    return this._onFrame;
  }

  set onFrame(value) {
    if (value instanceof Function) {
      this._onFrame = value;
      this._invalid = true;
    } else {
      this._onFrame = null;
    }
  }

}
