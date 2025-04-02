const concatenateUint8Arrays = (array1, array2) => {
  const concatenatedArray = new Uint8Array(array1.length + array2.length);
  concatenatedArray.set(array1, 0);
  concatenatedArray.set(array2, array1.length);
  return concatenatedArray;
}

const main = async () => {

  const video = document.getElementById('video');
  const videoSrc = '/video/playlist.m3u8';
  if (Hls.isSupported()) {
    console.log('HLS supported');
    const hls = new Hls();
    hls.loadSource(videoSrc);
    hls.attachMedia(video);
    // hls.on(Hls.Events.MANIFEST_PARSED, function () {
    //   video.play();
    // });
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = videoSrc;
    // video.addEventListener('loadedmetadata', function () {
    //   video.play();
    // });
  }
};

main();
