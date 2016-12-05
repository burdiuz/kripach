/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _assetFactory = __webpack_require__(1);

	var _assetFactory2 = _interopRequireDefault(_assetFactory);

	var _scene = __webpack_require__(2);

	var _scene2 = _interopRequireDefault(_scene);

	var _sparks = __webpack_require__(3);

	var _sparks2 = _interopRequireDefault(_sparks);

	var _soundEffect = __webpack_require__(4);

	var _soundEffect2 = _interopRequireDefault(_soundEffect);

	var _soundEvent = __webpack_require__(5);

	var _soundEvent2 = _interopRequireDefault(_soundEvent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var animatedImg = void 0,
	    staticImg = void 0;
	var sound = new _soundEffect2.default('sound', 5, 2);
	var scene = new _scene2.default(null, 24);
	var bgImg = new Image();
	var events = new _soundEvent2.default('sound');

	var _animatedText = function _animatedText(cnx, x, y, angle) {
	  cnx.fillStyle = '#F433FF';
	  cnx.rotate(angle);
	  cnx.font = '220px "AANeon"';
	  cnx.fillText("C", x, y);
	  cnx.rotate(-angle);
	};

	var _staticText = function _staticText(cnx, x, y, angle) {
	  cnx.fillStyle = '#F433FF';
	  cnx.font = '92px "AANeon"';
	  cnx.rotate(angle);
	  cnx.fillText("Я_ВСЕГДА_ХОТЕЛ_БЫТЬ", x + 60, y);
	  cnx.font = '220px "AANeon"';
	  cnx.fillText("  КРИПАЧEМ", x, y + 220);
	  cnx.rotate(-angle);
	};

	bgImg.src = 'data/background.jpg';

	var sparks = void 0;

	var start = function start() {
	  sparks = new _sparks2.default(canvas.getContext('2d'));
	  sound.play(true);
	  events.add(1891, function () {
	    return sparks.start(305, 667);
	  });
	  events.add(3015, function () {
	    return sparks.start(457, 643);
	  });
	};

	bgImg.addEventListener('load', function () {
	  var assetFactory = void 0;
	  assetFactory = new _assetFactory2.default('asset_factory', bgImg, function (context) {
	    _animatedText(context, 182, 720, -(Math.PI / 180) * 10);
	  });
	  assetFactory.compose().then(function (image) {
	    animatedImg = image;
	    assetFactory.setTextDrawer(function (context) {
	      _staticText(context, 120, 500, -(Math.PI / 180) * 10);
	    });
	    assetFactory.compose().then(function (image) {
	      staticImg = image;
	      start();
	    });
	  });
	});

	scene.onFrame = function () {
	  var canvas = document.getElementById('canvas');
	  var context = canvas.getContext('2d');

	  return function () {
	    if (!sound.playing) return;
	    var ratio = sound.currentRatio;
	    context.clearRect(0, 0, canvas.width, canvas.height);
	    // use source-in to make lightened wall
	    context.filter = 'opacity(' + parseInt(75 + (1 - ratio) * 25 >>> 0) + '%)';
	    context.drawImage(staticImg, 0, 0);
	    context.filter = 'opacity(' + parseInt(ratio * 100 >>> 0) + '%)';
	    context.drawImage(animatedImg, 0, 0);
	    context.filter = 'none';
	    if (sparks.animate()) {
	      scene.invalid();
	    }
	  };
	}();
	sound.onChange = function () {
	  scene.invalid();
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Compositing
	// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter
	// https://developer.mozilla.org/ru/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BaseAssetCanvas = function () {
	  function BaseAssetCanvas(id) {
	    _classCallCheck(this, BaseAssetCanvas);

	    this.canvas = document.getElementById(id);
	    this._context = this.canvas.getContext('2d');
	  }

	  _createClass(BaseAssetCanvas, [{
	    key: 'setTextDrawer',
	    value: function setTextDrawer(drawHandler) {
	      this._drawHandler = drawHandler;
	    }
	  }, {
	    key: 'callTextDrawer',
	    value: function callTextDrawer() {
	      this._drawHandler(this._context);
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      this._context.filter = 'none';
	      this._context.globalCompositeOperation = 'source-over';
	      this._context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	      this._context.restore();
	    }
	  }, {
	    key: 'draw',
	    value: function draw(image) {
	      this._context.drawImage(image, 0, 0);
	    }
	  }, {
	    key: 'capture',
	    value: function capture() {
	      return createImageBitmap(this.canvas, 0, 0, this.canvas.width, this.canvas.height);
	    }
	  }]);

	  return BaseAssetCanvas;
	}();

	var LampTextDraw = function LampTextDraw(Parent) {
	  return function (_Parent) {
	    _inherits(_class, _Parent);

	    function _class() {
	      _classCallCheck(this, _class);

	      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	    }

	    _createClass(_class, [{
	      key: 'drawLampText',
	      value: function drawLampText() {
	        this.clear();
	        this.callTextDrawer();
	        ConvexText.applyArea(this._context, 15);
	        return this.capture();
	      }
	    }]);

	    return _class;
	  }(Parent);
	};

	var LightTextDraw = function LightTextDraw(Parent) {
	  return function (_Parent2) {
	    _inherits(_class2, _Parent2);

	    function _class2() {
	      _classCallCheck(this, _class2);

	      return _possibleConstructorReturn(this, (_class2.__proto__ || Object.getPrototypeOf(_class2)).apply(this, arguments));
	    }

	    _createClass(_class2, [{
	      key: 'drawSpecularLightText',
	      value: function drawSpecularLightText() {
	        this.clear();
	        this._context.filter = 'blur(25px)';
	        this.callTextDrawer();
	        var bmp = this.capture();
	        return bmp;
	      }
	    }]);

	    return _class2;
	  }(Parent);
	};

	var WallLightTextDraw = function WallLightTextDraw(Parent) {
	  return function (_Parent3) {
	    _inherits(_class3, _Parent3);

	    function _class3() {
	      _classCallCheck(this, _class3);

	      return _possibleConstructorReturn(this, (_class3.__proto__ || Object.getPrototypeOf(_class3)).apply(this, arguments));
	    }

	    _createClass(_class3, [{
	      key: 'setBackgroundImage',
	      value: function setBackgroundImage(image) {
	        this._backgroundImage = image;
	      }
	    }, {
	      key: 'drawReflectionLightText',
	      value: function drawReflectionLightText() {
	        this.clear();
	        this._context.filter = 'blur(25px)';
	        this.callTextDrawer();
	        this._context.filter = 'none';
	        this._context.globalCompositeOperation = 'source-in';
	        this.draw(this._backgroundImage);
	        return this.capture();
	      }
	    }]);

	    return _class3;
	  }(Parent);
	};

	// ES6 mixins http://www.2ality.com/2016/05/six-nifty-es6-tricks.html

	var AssetCanvas = function (_WallLightTextDraw) {
	  _inherits(AssetCanvas, _WallLightTextDraw);

	  function AssetCanvas(id) {
	    var background = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : AssetCanvas._backgroundMandatoryParam();
	    var textDrawer = arguments[2];

	    _classCallCheck(this, AssetCanvas);

	    var _this4 = _possibleConstructorReturn(this, (AssetCanvas.__proto__ || Object.getPrototypeOf(AssetCanvas)).call(this, id));

	    _this4.setBackgroundImage(background);
	    _this4.setTextDrawer(textDrawer);
	    return _this4;
	  }

	  _createClass(AssetCanvas, [{
	    key: 'drawLayers',
	    value: function drawLayers() {
	      var _this5 = this;

	      return this.drawReflectionLightText().then(function (wall) {
	        return _this5.drawSpecularLightText().then(function (light) {
	          return _this5.drawLampText().then(function (lamp) {
	            return [wall, light, lamp];
	          });
	        });
	      });
	    }
	  }, {
	    key: 'compose',
	    value: function compose() {
	      var _this6 = this;

	      return this.drawLayers().then(function (layers) {
	        _this6.clear();
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = layers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var layer = _step.value;

	            _this6.draw(layer);
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }

	        return _this6.capture();
	      });
	    }
	  }], [{
	    key: '_backgroundMandatoryParam',
	    value: function _backgroundMandatoryParam() {
	      throw new Error('"background" image is required.');
	    }
	  }, {
	    key: '_textDrawerMandatoryParam',
	    value: function _textDrawerMandatoryParam() {
	      throw new Error('"textDrawer" handler function is required.');
	    }
	  }]);

	  return AssetCanvas;
	}(WallLightTextDraw(LightTextDraw(LampTextDraw(BaseAssetCanvas))));

	exports.default = AssetCanvas;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Scene = function () {
	  function Scene() {
	    var onFrame = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

	    var _this = this;

	    var fps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 24;
	    var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	    _classCallCheck(this, Scene);

	    this.onFrame = onFrame;
	    this._framesPerSecond = fps;
	    this._intervalHandler = function () {
	      if (_this._invalid) {
	        _this._invalid = false;
	        if (_this._onFrame) {
	          window.requestAnimationFrame(_this._onFrame);
	        }
	      }
	    };
	    start && this.start();
	  }

	  _createClass(Scene, [{
	    key: 'start',
	    value: function start() {
	      this._startTime = Date.now();
	      this._intervalId = setInterval(this._intervalHandler, 1000 / this._framesPerSecond);
	      this._intervalHandler();
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      clearInterval(this._intervalId);
	      this._startTime = 0;
	    }
	  }, {
	    key: 'invalid',
	    value: function invalid() {
	      this._invalid = true;
	    }
	  }, {
	    key: 'isInvalid',
	    value: function isInvalid() {
	      return this._invalid;
	    }
	  }, {
	    key: 'framesPerSecond',
	    get: function get() {
	      return Boolean(this._intervalId);
	    }
	  }, {
	    key: 'started',
	    get: function get() {
	      return Boolean(this._intervalId);
	    }
	  }, {
	    key: 'startTime',
	    get: function get() {
	      return this._startTime;
	    }
	  }, {
	    key: 'onFrame',
	    get: function get() {
	      return this._onFrame;
	    },
	    set: function set(value) {
	      if (value instanceof Function) {
	        this._onFrame = value;
	        this._invalid = true;
	      } else {
	        this._onFrame = null;
	      }
	    }
	  }]);

	  return Scene;
	}();

	exports.default = Scene;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PI2 = Math.PI * 2;

	var SparksHistory = function () {
	  function SparksHistory(context) {
	    _classCallCheck(this, SparksHistory);

	    this._context = context;
	    this._history = [];
	  }

	  _createClass(SparksHistory, [{
	    key: 'start',
	    value: function start(x, y) {
	      var sparks = new Sparks(this._context, x, y);
	      this._history.push(sparks.animate());
	    }
	  }, {
	    key: 'animate',
	    value: function animate() {
	      var length = this._history.length;
	      if (!length) return false;
	      for (var index = 0; index < length; index++) {
	        var item = this._history[index];
	        var state = item.next();
	        if (state.done) {
	          this._history.splice(index, 1);
	          index--;
	          length--;
	        }
	      }
	      return true;
	    }
	  }]);

	  return SparksHistory;
	}();

	exports.default = SparksHistory;

	var SparksSource = function () {
	  function SparksSource(context, x, y, duration) {
	    var maxDistance = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 200;
	    var sparkCount = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 5;

	    _classCallCheck(this, SparksSource);

	    this._context = context;
	    this._x = x;
	    this._y = y;
	    this._generate(maxDistance << 1, context.canvas.height - y, sparkCount, duration);
	  }

	  _createClass(SparksSource, [{
	    key: '_generate',
	    value: function _generate(maxDistance, height, sparkCount, maxDuration) {
	      this._sparks = [];
	      while (sparkCount > 0) {
	        var eff = Math.random();
	        var distance = eff * maxDistance;
	        var duration = maxDuration * 0.5 + eff * (maxDuration * 0.5);
	        this._sparks.push(new Spark(this._context, this._x, this._y, Math.random() > 0.5 ? distance : -distance, height, SparkMovement.getSpeed(duration)));
	        sparkCount--;
	      }
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      var length = this._sparks.length;
	      for (var index = 0; index < length; index++) {
	        var item = this._sparks[index];
	        item.update();
	        if (item.destroyed) {
	          this._sparks.splice(index, 1);
	          index--;
	          length--;
	        }
	      }
	    }
	  }, {
	    key: 'destroyed',
	    get: function get() {
	      return !this._sparks || !this._sparks.length;
	    }
	  }, {
	    key: 'x',
	    get: function get() {
	      return this._x;
	    }
	  }, {
	    key: 'y',
	    get: function get() {
	      return this._y;
	    }
	  }]);

	  return SparksSource;
	}();

	var Sparks = exports.Sparks = function (_SparksSource) {
	  _inherits(Sparks, _SparksSource);

	  function Sparks(context, x, y) {
	    var maxDistance = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 200;
	    var sparkCount = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : Sparks.getRandomSparkCount();

	    _classCallCheck(this, Sparks);

	    return _possibleConstructorReturn(this, (Sparks.__proto__ || Object.getPrototypeOf(Sparks)).call(this, context, x, y, maxDistance / 150, maxDistance, sparkCount));
	  }

	  _createClass(Sparks, [{
	    key: 'animate',
	    value: regeneratorRuntime.mark(function animate() {
	      return regeneratorRuntime.wrap(function animate$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              if (this.destroyed) {
	                _context.next = 6;
	                break;
	              }

	              _context.next = 3;
	              return true;

	            case 3:
	              this.update();
	              _context.next = 0;
	              break;

	            case 6:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, animate, this);
	    })
	  }], [{
	    key: 'getRandomSparkCount',
	    value: function getRandomSparkCount() {
	      return 6 + Math.random() * 5 >> 0;
	    }
	  }]);

	  return Sparks;
	}(SparksSource);

	/*
	 http://www.timotheegroleau.com/Flash/experiments/easing_function_generator.htm
	 */

	var SparkPosition = function () {
	  function SparkPosition(startX, startY, offsetX, offsetY) {
	    _classCallCheck(this, SparkPosition);

	    Object.assign(this, {
	      x: startX,
	      y: startY,
	      startX: startX,
	      startY: startY,
	      offsetX: offsetX,
	      offsetY: offsetY,
	      endX: startX + offsetX,
	      endY: startY + offsetY
	    });
	  }

	  _createClass(SparkPosition, [{
	    key: 'update',
	    value: function update(progress) {
	      var x = this.offsetX * progress;
	      var y = this.offsetY * progress * progress * progress;
	      this.x = this.startX + x;
	      this.y = this.startY + y;
	    }
	  }, {
	    key: 'destroyed',
	    get: function get() {
	      return this.y >= this.endY;
	    }
	  }]);

	  return SparkPosition;
	}();

	var SparkMovement = function (_SparkPosition) {
	  _inherits(SparkMovement, _SparkPosition);

	  function SparkMovement(startX, startY, offsetX, offsetY, speed) {
	    var acceleration = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

	    _classCallCheck(this, SparkMovement);

	    var _this2 = _possibleConstructorReturn(this, (SparkMovement.__proto__ || Object.getPrototypeOf(SparkMovement)).call(this, startX, startY, offsetX, offsetY));

	    _this2._destroyed = false;
	    _this2._progress = 0;
	    _this2.setSpeed(speed, acceleration);
	    return _this2;
	  }

	  _createClass(SparkMovement, [{
	    key: 'setSpeed',
	    value: function setSpeed(speed) {
	      var acceleration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	      this._speed = speed;
	      this._acceleration = acceleration;
	    }
	  }, {
	    key: 'update',
	    value: function update(progress) {
	      if (this._destroyed) return;
	      this._progress += this._speed;
	      this._speed += this._acceleration;
	      _get(SparkMovement.prototype.__proto__ || Object.getPrototypeOf(SparkMovement.prototype), 'update', this).call(this, this._progress);
	      if (this._progress > 1 || _get(SparkMovement.prototype.__proto__ || Object.getPrototypeOf(SparkMovement.prototype), 'destroyed', this)) {
	        this._progress = 1;
	        this._destroyed = true;
	      }
	    }
	  }, {
	    key: 'progress',
	    get: function get() {
	      return this._progress;
	    }
	  }, {
	    key: 'destroyed',
	    get: function get() {
	      return this._destroyed;
	    }
	  }], [{
	    key: 'getSpeed',
	    value: function getSpeed(duration) {
	      var fps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 24;

	      return 1 / (duration * fps);
	    }
	  }]);

	  return SparkMovement;
	}(SparkPosition);

	var SparkAsset = function () {
	  function SparkAsset(context) {
	    var maxBlur = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SparkAsset.getRandomMaxBlur();

	    _classCallCheck(this, SparkAsset);

	    this.context = context;
	    this.maxBlur = maxBlur;
	  }

	  _createClass(SparkAsset, [{
	    key: 'draw',
	    value: function draw(x, y, progress) {
	      var POS = SparkAsset.SIZE >> 1;
	      if (!this._cached) {
	        this._cached = SparkAsset.createAsset(this.maxBlur);
	      }
	      this.context.filter = 'opacity(' + parseInt(25 + (1 - progress) * 75 >>> 0) + '%)';
	      this.context.drawImage(this._cached, x - POS, y - POS);
	    }
	  }], [{
	    key: 'getRandomMaxBlur',
	    value: function getRandomMaxBlur() {
	      return 3 + Math.random() * 7 >> 0;
	    }
	  }, {
	    key: 'createAsset',
	    value: function createAsset(blur) {
	      SparkAsset._drawAsset(blur);
	      var img = new Image();
	      img.src = SparkAsset._getAssetCanvas().toDataURL('image/png', 1);
	      img.width = SparkAsset.SIZE;
	      img.height = SparkAsset.SIZE;
	      return img;
	    }
	  }, {
	    key: '_drawAsset',
	    value: function _drawAsset(blur) {
	      var POS = SparkAsset.SIZE >> 1;
	      var context = SparkAsset._getAssetContext();
	      context.clearRect(0, 0, SparkAsset.SIZE, SparkAsset.SIZE);
	      context.filter = 'blur(' + parseInt(blur) + 'px)';
	      context.fillStyle = 'rgba(255, 255, 125, ' + String(0.25 + 0.75 * Math.random()) + ')';
	      context.beginPath();
	      context.arc(POS, POS, 5, 0, PI2, false);
	      context.fill();
	      context.beginPath();
	      context.fillStyle = 'rgb(255, 255, 125)';
	      context.filter = 'none';
	      context.arc(POS, POS, 2, 0, PI2, false);
	      context.fill();
	    }
	  }, {
	    key: '_createAssetCanvas',
	    value: function _createAssetCanvas() {
	      var canvas = SparkAsset._canvas = document.createElement('canvas');
	      canvas.width = SparkAsset.SIZE;
	      canvas.height = SparkAsset.SIZE;
	      SparkAsset._context = canvas.getContext('2d');
	    }
	  }, {
	    key: '_getAssetCanvas',
	    value: function _getAssetCanvas() {
	      if (!SparkAsset._canvas) {
	        SparkAsset._createAssetCanvas();
	      }
	      return SparkAsset._canvas;
	    }
	  }, {
	    key: '_getAssetContext',
	    value: function _getAssetContext() {
	      if (!SparkAsset._context) {
	        SparkAsset._createAssetCanvas();
	      }
	      return SparkAsset._context;
	    }
	  }]);

	  return SparkAsset;
	}();

	SparkAsset.SIZE = 24;

	var Spark = exports.Spark = function () {
	  function Spark(context, startX, startY, endX, endY, speed) {
	    var acceleration = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;

	    _classCallCheck(this, Spark);

	    this._position = new SparkMovement(startX, startY, endX, endY, speed, acceleration);
	    this._asset = new SparkAsset(context);
	  }

	  _createClass(Spark, [{
	    key: 'update',
	    value: function update() {
	      this._position.update();
	      if (!this._position.destroyed) {
	        this._asset.draw(this._position.x, this._position.y, this._position.progress);
	      }
	    }
	  }, {
	    key: 'destroyed',
	    get: function get() {
	      return this._position.destroyed;
	    }
	  }]);

	  return Spark;
	}();

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SoundEffect = function () {
	  function SoundEffect(soundId, maxThreshold) {
	    var _this = this;

	    var minThreshold = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.5;

	    _classCallCheck(this, SoundEffect);

	    this._soundElement = document.getElementById(soundId);
	    this._maxThreshold = maxThreshold;
	    this._minThreshold = minThreshold;
	    this._currentValue = 0;
	    this._context = new AudioContext();
	    this._sourceNode = this._context.createMediaElementSource(this._soundElement);
	    this._scriptNode = this._context.createScriptProcessor(1024, 1, 1);
	    //this._scriptNode = this._context.createScriptProcessor(256, 1, 1);

	    this._sourceNode.connect(this._scriptNode);
	    this._scriptNode.connect(this._context.destination);
	    this._scriptNode.addEventListener('audioprocess', function (event) {
	      var inputBuffer = event.inputBuffer,
	          outputBuffer = event.outputBuffer;

	      var input = inputBuffer.getChannelData(0);
	      outputBuffer.copyToChannel(input, 0);
	      var max = Math.abs(input.reduce(function (value, item) {
	        return value > item ? value : item;
	      })) * 10;
	      var value = 0;
	      if (max >= _this._minThreshold) {
	        value = max < _this._maxThreshold ? max : _this._maxThreshold;
	      }
	      if (value !== _this._currentValue) {
	        _this._currentValue = value;
	        _this._onChange && _this._onChange(value, _this.currentRatio);
	      }
	    });
	  }

	  _createClass(SoundEffect, [{
	    key: 'play',
	    value: function play(loop) {
	      loop !== undefined && (this._soundElement.loop = loop);
	      return this._soundElement.play();
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      return this._soundElement.stop();
	    }
	  }, {
	    key: 'loop',
	    get: function get() {
	      return this._soundElement.loop;
	    },
	    set: function set(value) {
	      this._soundElement.loop = value;
	    }
	  }, {
	    key: 'onChange',
	    get: function get() {
	      return this._onChange;
	    },
	    set: function set(value) {
	      this._onChange = value instanceof Function ? value : null;
	    }
	  }, {
	    key: 'currentValue',
	    get: function get() {
	      return this._currentValue;
	    }
	  }, {
	    key: 'currentRatio',
	    get: function get() {
	      return this._currentValue / this._maxThreshold;
	    }
	  }, {
	    key: 'minThreshold',
	    get: function get() {
	      return this._minThreshold;
	    }
	  }, {
	    key: 'maxThreshold',
	    get: function get() {
	      return this._maxThreshold;
	    }
	  }, {
	    key: 'playing',
	    get: function get() {
	      return !this._soundElement.paused;
	    }
	  }, {
	    key: 'currentTime',
	    get: function get() {
	      return this._soundElement.currentTime;
	    }
	  }, {
	    key: 'duration',
	    get: function get() {
	      return this._soundElement.duration;
	    }
	  }]);

	  return SoundEffect;
	}();

	exports.default = SoundEffect;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SoundEvent = function SoundEvent(time, handler) {
	  _classCallCheck(this, SoundEvent);

	  this.time = time;
	  this.handler = handler;
	};

	var SoundEvents = function () {
	  function SoundEvents(soundId) {
	    var interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
	    var autostart = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	    _classCallCheck(this, SoundEvents);

	    this._events = [];
	    this._interval = interval;
	    this._soundElement = document.getElementById(soundId);
	    if (autostart) {
	      this.start();
	    }
	  }

	  _createClass(SoundEvents, [{
	    key: 'start',
	    value: function start() {
	      var _this = this;

	      var interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._interval;

	      this._interval = interval;
	      if (this._interval) {
	        this._currentTime = 0;
	        this._currentIndex = 0;
	        this._intervalId = setInterval(function () {
	          return _this.update();
	        }, this._interval);
	      } else {
	        throw new Error('Specify interval duration.');
	      }
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      if (this._intervalId) {
	        clearInterval(this._intervalId);
	        this._intervalId = null;
	      }
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      var time = this._soundElement.currentTime * 1000 >>> 0;
	      var length = this._events.length;
	      var index = this._currentIndex;
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
	  }, {
	    key: 'add',
	    value: function add(time) {
	      var handler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	      time = time >>> 0;
	      var event = this._events.find(function (item, index) {
	        return item.time === time;
	      });
	      if (!event) {
	        event = new SoundEvent(time, handlerFactory(handler instanceof Function ? handler : null));
	        var index = this._events.findIndex(function (item, index) {
	          return item.time > time;
	        });
	        if (index < 0) {
	          this._events.push(event);
	        } else {
	          this._events.splice(index, 0, event);
	        }
	      }
	      return event.handler;
	    }
	  }, {
	    key: 'get',
	    value: function get(time) {
	      time = time >>> 0;
	      return this._events.find(function (item, index) {
	        return item.time === time;
	      });
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      this._events = [];
	    }
	  }, {
	    key: Symbol.iterator,
	    value: function value() {
	      return this._events[Symbol.iterator];
	    }
	  }], [{
	    key: 'convertTime',
	    value: function convertTime() {
	      var seconds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var minutes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	      var hours = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

	      return (seconds + minutes * 60 + hours * 3600) * 1000;
	    }
	  }]);

	  return SoundEvents;
	}();

	exports.default = SoundEvents;

/***/ }
/******/ ]);