const concatenateUint8Arrays = (array1, array2) => {
  const concatenatedArray = new Uint8Array(array1.length + array2.length);
  concatenatedArray.set(array1, 0);
  concatenatedArray.set(array2, array1.length);
  return concatenatedArray;
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
          // Loop over buffered ranges
          for (let i = 0; i < video.buffered.length; i++) {
            const start = video.buffered.start(i);
            const end = video.buffered.end(i);
            console.log(`Buffered range: ${start} - ${end}`);
          }
        }
      });
    });
  } else {
    alert('Video playback not supported here!');
  }
};

main();
