const TICK_INTERVAL_SECONDS = 2;

let percentageBuffered = 0;

const concatenateUint8Arrays = (array1, array2) => {
  const concatenatedArray = new Uint8Array(array1.length + array2.length);
  concatenatedArray.set(array1, 0);
  concatenatedArray.set(array2, array1.length);
  return concatenatedArray;
};

const isVideoPlaying = () => {

  const video = document.getElementById('video');

  return video.currentTime > 0 &&
    !video.paused &&
    !video.ended &&
    video.readyState > 2;
}

const needsSyncingWithMaster = (currentMasterPositionDecisecond) => {
  const currentDecisecond = 10 * video.currentTime.toFixed(1);
  if ((currentMasterPositionDecisecond > currentDecisecond + 20) ||
      (currentMasterPositionDecisecond < currentDecisecond - 20)) {
      return true;
  }
  return false;
};

const getPercentageBuffered = () => {
  const video = document.getElementById('video');
  // Loop over buffered ranges
  let bufferedSeconds = 0;
  for (let i = 0; i < video.buffered.length; i++) {
    const start = video.buffered.start(i);
    const end = video.buffered.end(i);
    console.log(`Buffered range: ${start} - ${end}`);
    bufferedSeconds += (end - start);
  }
  return (100 * bufferedSeconds / video.duration).toFixed(1);
};

const tick = async () => {
  const video = document.getElementById('video');
  const currentTimeDecisecond = 10 * video.currentTime.toFixed(1);

  const tickResponse = await fetch(
      '/tick?t=' + currentTimeDecisecond +
      '&p=' + (isVideoPlaying() ? '1' : '0'));
  const tickObj = await tickResponse.json();
  console.log(tickObj);
  if (tickObj.clientId !== tickObj.masterId) {
    // We are not the master. Let's follow along.
    if (needsSyncingWithMaster(tickObj.masterPosition)) {
      video.currentTime = tickObj.masterPosition / 10;
    }
    const videoIsPlaying = isVideoPlaying();
    if (tickObj.masterIsPlaying && !videoIsPlaying) {
      console.log('Master is playing and we are not. Playing.');
      video.play();
    } else if (!tickObj.masterIsPlaying && videoIsPlaying) {
      console.log('We are playing and master is not. Pausing.');
      video.pause();
    }
  }
  window.setTimeout(async () => {
    await tick();
  }, TICK_INTERVAL_SECONDS * 1000);
};

const main = async () => {
  const video = document.getElementById("video");
  const videoSrc = "/video/video.m3u8";
  if (Hls.isSupported()) {
    console.log("HLS supported");
    const hls = new Hls();
    hls.loadSource(videoSrc);
    hls.attachMedia(video);

    Object.keys(Hls.Events).forEach((eventName) => {
      hls.on(Hls.Events[eventName], function (event, data) {
        console.log(`Event: ${event}`, data);

        if (event === Hls.Events.BUFFER_APPENDED) {
          percentageBuffered = getPercentageBuffered();
          console.log('New percentage ' + percentageBuffered);
        }
      });
    });
  } else {
    alert('Video playback not supported here!');
    return;
  }
  console.log(tick);
  tick();
};

main();
