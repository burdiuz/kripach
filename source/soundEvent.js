'use strict';

class SoundEvent {
  constructor(time, handler) {
    this.time = time;
    this.handler = handler;
  }
}

export default class SoundEvents {

  constructor(soundId, interval = 100, autostart = true) {
    this._events = [];
    this._interval = interval;
    this._soundElement = document.getElementById(soundId);
    if (autostart) {
      this.start();
    }
  }

  start(interval = this._interval) {
    this._interval = interval;
    if (this._interval) {
      this._currentTime = 0;
      this._currentIndex = 0;
      this._intervalId = setInterval(() => this.update(), this._interval);
    } else {
      throw new Error('Specify interval duration.');
    }
  }

  stop() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  }

  update() {
    const time = this._soundElement.currentTime * 1000 >>> 0;
    const length = this._events.length;
    let index = this._currentIndex;
    if (time < this._currentTime) {
      index = 0;
    }
    while (index < length && this._events[index].time <= time) {
      this._events[index].handler(time);
      index++;
    }
    this._currentIndex = index;
    this._currentTime = time;
  }

  add(time, handler = null) {
    time = time >>> 0;
    let event = this._events.find((item, index) => item.time === time);
    if (!event) {
      event = new SoundEvent(time, handlerFactory(handler instanceof Function ? handler : null));
      let index = this._events.findIndex((item, index) => item.time > time);
      if (index < 0) {
        this._events.push(event);
      } else {
        this._events.splice(index, 0, event);
      }
    }
    return event.handler;
  }

  get(time) {
    time = time >>> 0;
    return this._events.find((item, index) => item.time === time);
  }

  clear() {
    this._events = [];
  }

  [Symbol.iterator]() {
    return this._events[Symbol.iterator];
  }

  static convertTime(seconds = 0, minutes = 0, hours = 0) {
    return (seconds + minutes * 60 + hours * 3600) * 1000;
  }

}
