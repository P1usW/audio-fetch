const audioCtx = new AudioContext();
const audio = document.querySelector('audio');
const hiddenAudio = new Audio();

async function func() {
  const audioFetch = await fetch('./viper.mp3');

  const data = audioFetch.body.getReader()
  console.log(`All length ${audioFetch.headers.get('Content-Length')}`);
  const chunks = [];
  let size = 0;
  readFile: while (true) {
    const {done, value} = await data.read();

    if (done) {
      break readFile;
    }

    chunks.push(value);
    size += value.length
    console.log(`Value buffer: ${value.buffer.byteLength}`)
    console.log(`Value length: ${value.length}`)
  }

  let position = 0;
  const fullArray = new Uint8Array(size);
  for (let chunk of chunks) {
    fullArray.set(chunk, position);
    position += chunk.length;
  }

  const res = new Blob([fullArray], {type: 'audio/mp4'});
  const url = URL.createObjectURL(res)

  audio.src = url;
  hiddenAudio.src = url;

  // setTimeout(() => hiddenAudio.play(), 3000);
}
func()