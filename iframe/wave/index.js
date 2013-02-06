var Wave, ampScale, baseline, changeSize, getBaseline, globalPhase, initialize, moveRange, phaseCycle, phaseDelta, rate, waveNum, waveRatio;

baseline = 100;

moveRange = 100;

waveNum = 5;

rate = 30;

ampScale = 1.1;

waveRatio = 2;

phaseCycle = 360;

phaseDelta = 2 * Math.PI / phaseCycle;

window.waves = [];

globalPhase = 0;

Wave = (function() {

  function Wave() {
    this.amp = Math.random() * 7;
    this.freq = (Math.random() + 0.5) * 0.01;
    this.phase = Math.random() * 100;
    this.offset = Math.random() * 5;
  }

  Wave.prototype.point = function(i) {
    return getBaseline() + this.offset + this.amp * (Math.sin(this.freq * i + this.phase + phaseDelta * globalPhase));
  };

  return Wave;

})();

getBaseline = function() {
  var date;
  date = new Date;
  return baseline - moveRange * Math.abs((date.getSeconds() + date.getMilliseconds() / 1000) - 30) / 30;
};

changeSize = function() {
  var content, wave;
  content = document.getElementById('content');
  content.offsetHeight = window.innerHeight;
  content.offsetWidth = window.innerWidth;
  wave = document.getElementById('wave');
  wave.height = window.innerHeight;
  return wave.width = window.innerWidth;
};

initialize = function() {
  var baseWave, canvas, ctx, main, w;
  baseWave = new Wave;
  w = 0;
  while (w < waveNum) {
    waves.push(new Wave);
    w++;
  }
  canvas = document.getElementById('wave');
  ctx = canvas.getContext('2d');
  main = function() {
    var i, j, wave, _i, _len;
    ctx.fillStyle = '#fcd800';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    i = 0;
    while (i < 2) {
      wave = waves[i];
      ctx.beginPath();
      ctx.moveTo(0, 0);
      j = 0;
      while (j <= canvas.width) {
        ctx.lineTo(j, (wave.point(j) * waveRatio + baseWave.point(j)) * ampScale);
        j++;
      }
      ctx.lineTo(canvas.width, 0);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fill();
      i++;
    }
    ctx.fillStyle = "#000";
    ctx.lineWidth = 2;
    for (_i = 0, _len = waves.length; _i < _len; _i++) {
      wave = waves[_i];
      ctx.beginPath();
      ctx.moveTo(-1, wave.point(-1));
      i = 0;
      while (i <= canvas.width) {
        ctx.lineTo(i, ((wave.point(i)) * waveRatio + (baseWave.point(i))) * ampScale);
        i++;
      }
      ctx.stroke();
      ctx.lineWidth = 1;
    }
    globalPhase = (globalPhase + 1) % phaseCycle;
    return setTimeout(main, 1000 / rate);
  };
  return main();
};

window.onload = function() {
  changeSize();
  return initialize();
};

window.onresize = function() {
  return changeSize();
};
