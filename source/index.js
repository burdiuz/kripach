import AssetCanvas from './assetFactory';
import Scene from './scene';
import SparksHistory from './sparks';
import SoundEffect from './soundEffect';
import SoundEvents from './soundEvent';

  let animatedImg, staticImg;
  const sound = new SoundEffect('sound', 5, 2);
  const scene = new Scene(null, 24);
  const bgImg = new Image();
  const events = new SoundEvents('sound');

  const _animatedText = (cnx, x, y, angle) => {
    cnx.fillStyle = '#F433FF';
    cnx.rotate(angle);
    cnx.font = '220px "AANeon"';
    cnx.fillText("C", x, y);
    cnx.rotate(-angle);
  };

  const _staticText = (cnx, x, y, angle) => {
    cnx.fillStyle = '#F433FF';
    cnx.font = '92px "AANeon"';
    cnx.rotate(angle);
    cnx.fillText("Я_ВСЕГДА_ХОТЕЛ_БЫТЬ", x + 60, y);
    cnx.font = '220px "AANeon"';
    cnx.fillText("  КРИПАЧEМ", x, y + 220);
    cnx.rotate(-angle);
  };

  bgImg.src = 'data/background.jpg';

  let sparks;

  const start = () => {
    sparks = new SparksHistory(canvas.getContext('2d'));
    sound.play(true);
    events.add(1891, () => sparks.start(305, 667));
    events.add(3015, () => sparks.start(457, 643));
  }

  bgImg.addEventListener('load', () => {
    let assetFactory;
    assetFactory = new AssetCanvas('asset_factory', bgImg, (context) => {
      _animatedText(context, 182, 720, -(Math.PI / 180) * 10);
    });
    assetFactory.compose().then((image) => {
      animatedImg = image;
      assetFactory.setTextDrawer((context) => {
        _staticText(context, 120, 500, -(Math.PI / 180) * 10);
      });
      assetFactory.compose().then((image) => {
        staticImg = image;
        start();
      });
    });
  });

  scene.onFrame = (() => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    return () => {
      if (!sound.playing) return;
      let ratio = sound.currentRatio;
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
  })();
  sound.onChange = () => {
    scene.invalid();
  };
