const setting_height = 2.5;

export function wavVisualize(canvasTag, analyze) {
  const vcctx = canvasTag.getContext('2d');
  const intendedWidth = document.querySelector('#canvas-div').clientWidth;
  canvasTag.setAttribute('width', intendedWidth);
  //canvasTag.setAttribute('height', intendedWidth / setting_height);
  canvasTag.setAttribute('height', intendedWidth);
  const WIDTH = canvasTag.width;
  const HEIGHT = canvasTag.height;

  const wavAnalyze = analyze;

  wavAnalyze.fftSize = 2048;
  //wavAnalyze.fftSize = 512;
  const bufferLength = wavAnalyze.fftSize;
  const dataArray = new Uint8Array(bufferLength);
  vcctx.clearRect(0, 0, WIDTH, HEIGHT);

  draw();
  function draw() {
    requestAnimationFrame(draw);
    wavAnalyze.getByteTimeDomainData(dataArray);

    //vcctx.fillStyle = 'rgb(233, 233, 233)';
    //vcctx.fillStyle = 'rgba(35, 35, 35, 1)';
    //vcctx.fillRect(0, 0, WIDTH, HEIGHT);
    //vcctx.fillStyle = 'rgba(35, 35, 35, 0)';
    //vcctx.fillRect(0, 0, WIDTH, HEIGHT);
    vcctx.clearRect(0, 0, WIDTH, HEIGHT);
    vcctx.lineWidth = 1;
    //vcctx.strokeStyle = 'rgb(35, 35, 35)';
    vcctx.strokeStyle = 'rgb(233, 233, 233)';
    vcctx.beginPath();
    const sliceWidth = (WIDTH * 1.0) / bufferLength;

    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
      const v = (255 - dataArray[i]) / 128.0;
      //const v = dataArray[i] / 128.0;
      const y = (v * HEIGHT) / 2;

      // todo: ショートハンドすぎる？
      i === 0 ? vcctx.moveTo(x, y) : vcctx.lineTo(x, y);
      x += sliceWidth;
    }
    vcctx.lineTo(canvasTag.width, canvasTag.height / 2);
    vcctx.stroke();
  }
}

export function barVisualize(canvasTag, analyze) {
  const vcctx = canvasTag.getContext('2d');
  const intendedWidth = document.querySelector('#canvas-div').clientWidth;
  canvasTag.setAttribute('width', intendedWidth);
  //canvasTag.setAttribute('height', intendedWidth / setting_height);
  canvasTag.setAttribute('height', intendedWidth);
  const WIDTH = canvasTag.width;
  const HEIGHT = canvasTag.height;
  //console.log('t' + HEIGHT);
  const barAnalyze = analyze;
  //barAnalyze.fftSize = 512;

  const bufferLengthAlt = barAnalyze.frequencyBinCount;
  const dataArrayAlt = new Uint8Array(bufferLengthAlt);
  const dataArrayLength = dataArrayAlt.length;
  vcctx.clearRect(0, 0, WIDTH, HEIGHT);

  drawAlt();
  function drawAlt() {
    requestAnimationFrame(drawAlt);

    barAnalyze.getByteFrequencyData(dataArrayAlt);

    //vcctx.fillStyle = 'rgb(233, 233, 233)';
    //vcctx.fillStyle = 'rgb(35, 35, 35)';
    //vcctx.fillRect(0, 0, WIDTH, HEIGHT);
    vcctx.clearRect(0, 0, WIDTH, HEIGHT);

    const barWidth = (WIDTH / bufferLengthAlt) * 2.5;
    //const barWidth = WIDTH / dataArrayLength;
    let barHeight;
    //console.log(dataArrayLength);

    let x = 0;
    for (let i = 0; i < dataArrayLength; i++) {
      barHeight = dataArrayAlt[i];
      // xxx: 数値適当
      const r = barHeight + 25 * (i / dataArrayLength);
      const g = 512 * (i / dataArrayLength);
      const b = 50;
      //vcctx.fillStyle = `rgb(${barHeight+64}, 64, 64)`;
      //vcctx.fillStyle = `rgb(${barHeight + 35}, ${barHeight + 35}, ${barHeight + 35})`;
      vcctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      //vcctx.fillRect(x, HEIGHT - barHeight / setting_height, barWidth, barHeight / setting_height);
      vcctx.fillRect(x, HEIGHT / 2, barWidth, -barHeight);
      vcctx.fillRect(x, HEIGHT / 2, barWidth, barHeight);
      x += barWidth + 1;
    }
  }
}
