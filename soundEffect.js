'use strict';

class SoundEffect {
  constructor(soundId, maxThreshold, minThreshold = 0.5) {
    this._soundElement = document.getElementById(soundId);
    this._maxThreshold = maxThreshold;
    this._minThreshold = minThreshold;
    this._currentValue = 0;
    this._context = new AudioContext();
    this._sourceNode = this._context.createMediaElementSource(this._soundElement);
    this._scriptNode = this._context.createScriptProcessor(256, 1, 1);

    this._sourceNode.connect(this._scriptNode);
    this._scriptNode.connect(this._context.destination);
    this._scriptNode.addEventListener('audioprocess', (event) => {
      let { inputBuffer, outputBuffer } = event;
      let input = inputBuffer.getChannelData(0);
      outputBuffer.copyToChannel(input, 0);
      let max = Math.abs(input.reduce((value, item) => value > item ? value : item)) * 10;
      let value = 0;
      if (max >= this._minThreshold) {
        value = max < this._maxThreshold ? max : this._maxThreshold;

      }
      if (value !== this._currentValue) {
        this._currentValue = value;
        this._onChange && this._onChange(value, this.currentRatio);
      }
    });
  }

  play (loop) {
    loop !== undefined && (this._soundElement.loop = loop);
    return this._soundElement.play();
  }

  stop () {
    return this._soundElement.stop();
  }

  get loop() {
    return this._soundElement.loop;
  }

  set loop(value) {
    this._soundElement.loop = value;
  }

  get onChange() {
    return this._onChange;
  }

  set onChange(value) {
    this._onChange = value instanceof Function ? value : null;
  }

  get currentValue() {
    return this._currentValue;
  }

  get currentRatio() {
    return 1 - this._currentValue / this._maxThreshold;
  }

  get minThreshold() {
    return this._minThreshold;
  }

  get maxThreshold() {
    return this._maxThreshold;
  }

}
