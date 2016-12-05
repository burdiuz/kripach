'use strict';

import {ConvexText} from 'ConvexText';

// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Compositing
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter
// https://developer.mozilla.org/ru/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation

class BaseAssetCanvas {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this._context = this.canvas.getContext('2d');
  }

  setTextDrawer(drawHandler) {
    this._drawHandler = drawHandler;
  }

  callTextDrawer() {
    this._drawHandler(this._context);
  }

  clear() {
    this._context.filter = 'none';
    this._context.globalCompositeOperation = 'source-over';
    this._context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this._context.restore();
  }

  draw(image) {
    this._context.drawImage(image, 0, 0);
  }

  capture() {
    return createImageBitmap(this.canvas, 0, 0, this.canvas.width, this.canvas.height);
  }
}

const LampTextDraw = (Parent) => class extends Parent {

  drawLampText() {
    this.clear();
    this.callTextDrawer();
    ConvexText.applyArea(this._context, 15);
    return this.capture();
  }
};

const LightTextDraw = (Parent) => class extends Parent {
  drawSpecularLightText() {
    this.clear();
    this._context.filter = 'blur(25px)';
    this.callTextDrawer();
    const bmp = this.capture();
    return bmp;
  }
};

const WallLightTextDraw = (Parent) => class extends Parent {

  setBackgroundImage(image) {
    this._backgroundImage = image;
  }

  drawReflectionLightText() {
    this.clear();
    this._context.filter = 'blur(25px)';
    this.callTextDrawer();
    this._context.filter = 'none';
    this._context.globalCompositeOperation = 'source-in';
    this.draw(this._backgroundImage);
    return this.capture();
  }
};

// ES6 mixins http://www.2ality.com/2016/05/six-nifty-es6-tricks.html
export default class AssetCanvas extends WallLightTextDraw(LightTextDraw(LampTextDraw(BaseAssetCanvas))) {

  constructor(id,
              background = AssetCanvas._backgroundMandatoryParam(),
              textDrawer) {
    super(id);
    this.setBackgroundImage(background);
    this.setTextDrawer(textDrawer);
  }

  drawLayers() {
    return this.drawReflectionLightText().then((wall) => {
      return this.drawSpecularLightText().then((light) => {
        return this.drawLampText().then((lamp) => {
          return [wall, light, lamp];
        });
      });
    });
  }

  compose() {
    return this.drawLayers().then((layers) => {
      this.clear();
      for (let layer of layers) {
        this.draw(layer);
      }
      return this.capture();
    });
  }

  static _backgroundMandatoryParam() {
    throw new Error('"background" image is required.');
  }

  static _textDrawerMandatoryParam() {
    throw new Error('"textDrawer" handler function is required.');
  }
}
