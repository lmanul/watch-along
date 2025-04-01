const concatenateUint8Arrays = (array1, array2) => {
  const concatenatedArray = new Uint8Array(array1.length + array2.length);
  concatenatedArray.set(array1, 0);
  concatenatedArray.set(array2, array1.length);
  return concatenatedArray;
}

const main = async () => {
  const response = await fetch('/c/0');
  let data = [];

  for await (const chunk of response.body) {
    console.log(chunk);
    data = concatenateUint8Arrays(data, chunk);
  }

  const videoElement = document.getElementById('player');

  const blob = new Blob([data.buffer], { type: 'video/mp4' });
  const url = URL.createObjectURL(blob);

  videoElement.src = url;

  // Revoke the object URL when done to free up resources
  videoElement.onended = () => {
      URL.revokeObjectURL(url);
  };
};

main();