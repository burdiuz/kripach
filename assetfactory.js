'use strict';

// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Compositing
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter
// https://developer.mozilla.org/ru/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation

class BaseAssetCanvas {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.context = this.canvas.getContext('2d');
  }

  setTextDrawer(drawHandler) {
    this._drawHandler = drawHandler;
  }

  callTextDrawer() {
    this._drawHandler(this.context);
  }

  clear() {
    this.context.filter = 'none';
    this.context.globalCompositeOperation = 'source-over';
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.restore();
  }

  draw(image) {
    this.context.drawImage(image, 0, 0);
  }

  capture() {
    return createImageBitmap(this.canvas, 0, 0, this.canvas.width, this.canvas.height);
  }
}

const LampTextDraw = (Parent) => class extends Parent {

  _lookup(pixels, x, y, cx, cy, max) {
    let s = 0;
    do {
      s++;
      x += cx;
      y += cy;
    } while (pixels.getPixelAlpha(x, y) && s < max);
    return s;
  }

  _makeGradientFont(pixels, width) {
    const hsba = new HSBA();
    let pos = 0;
    for (let color of pixels) {
      if (RGBA.getAlpha(color) > 0) {
        const x = pos % width;
        const y = pos / width >> 0;
        const maxDistance = 14;
        const t = this._lookup(pixels, x, y, -1, 0, maxDistance); // go top
        const b = this._lookup(pixels, x, y, 1, 0, maxDistance); // go bottom
        const l = this._lookup(pixels, x, y, 0, -1, maxDistance); // go left
        const r = this._lookup(pixels, x, y, 0, 1, maxDistance); // go right
        const v = t + b;
        const h = l + r;
        const edge = Math.min(t, l, r, b);
        hsba.value = color;
        let c;
        if (v < h) { // vertical
          c = edge / (v * 0.5);
        } else { // horizontal
          c = edge / (h * 0.5);
        }
        hsba.b = 0.3 + 0.7 * c;//Math.min(1, c * 1.4);
        pixels.setPixelByPosition(pos, hsba.value);
      }
      pos++;
    }
  }

  drawLampText() {
    this.clear();
    this.callTextDrawer();
    const width = this.canvas.width;
    const pixels = new Pixels(this.context.getImageData(0, 0, width, this.canvas.height));
    this._makeGradientFont(pixels, width);
    this.context.putImageData(pixels.valueOf(), 0, 0);
    return this.capture();
  }
};

const LightTextDraw = (Parent) => class extends Parent {
  drawSpecularLightText() {
    this.clear();
    this.context.filter = 'blur(25px)';
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
    this.context.filter = 'blur(25px)';
    this.callTextDrawer();
    this.context.filter = 'none';
    this.context.globalCompositeOperation = 'source-in';
    this.draw(this._backgroundImage);
    return this.capture();
  }
};

// ES6 mixins http://www.2ality.com/2016/05/six-nifty-es6-tricks.html
class AssetCanvas extends WallLightTextDraw(LightTextDraw(LampTextDraw(BaseAssetCanvas))) {

  constructor(id,
              background = AssetCanvas._backgroundMandatoryParam(),
              textDrawer = AssetCanvas._textDrawerMandatoryParam()) {
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
