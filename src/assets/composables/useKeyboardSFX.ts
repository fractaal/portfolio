import { ref } from 'vue';

const context = new AudioContext();

const source = context.createBufferSource();
const gainNode = context.createGain();

source.loop = true;

source.connect(gainNode);
gainNode.connect(context.destination);

const key1Buffer = await context.decodeAudioData(
  await (await fetch('/keys1.wav')).arrayBuffer()
);
const key2Buffer = await context.decodeAudioData(
  await (await fetch('/keys2.wav')).arrayBuffer()
);
const key3Buffer = await context.decodeAudioData(
  await (await fetch('/keys3.wav')).arrayBuffer()
);
const key4Buffer = await context.decodeAudioData(
  await (await fetch('/keys4.wav')).arrayBuffer()
);
const key5Buffer = await context.decodeAudioData(
  await (await fetch('/keys5.wav')).arrayBuffer()
);
const key6Buffer = await context.decodeAudioData(
  await (await fetch('/keys6.wav')).arrayBuffer()
);
const key7Buffer = await context.decodeAudioData(
  await (await fetch('/keys7.wav')).arrayBuffer()
);
const key8Buffer = await context.decodeAudioData(
  await (await fetch('/keys8.wav')).arrayBuffer()
);
const key9Buffer = await context.decodeAudioData(
  await (await fetch('/keys9.wav')).arrayBuffer()
);
const key10Buffer = await context.decodeAudioData(
  await (await fetch('/keys10.wav')).arrayBuffer()
);
const key11Buffer = await context.decodeAudioData(
  await (await fetch('/keys11.wav')).arrayBuffer()
);

const buffers = [
  key1Buffer,
  key2Buffer,
  key3Buffer,
  key4Buffer,
  key5Buffer,
  key6Buffer,
  key7Buffer,
  key8Buffer,
  key9Buffer,
  key10Buffer,
  key11Buffer,
];

export const useKeyboardSFX = () => {
  const muted = ref(false);

  const play = () => {
    if (muted.value) return;

    try {
      gainNode.gain.setValueAtTime(0.25, context.currentTime);
      const selectedBuffer =
        buffers[Math.floor(Math.random() * buffers.length)];

      const source = context.createBufferSource();
      source.buffer = selectedBuffer;
      source.connect(gainNode);
      source.start();
    } catch (e) {
      console.log('Could not play keyboard sfx: ', e);
    }
  };

  const playFullVolume = () => {
    if (muted.value) return;

    try {
      const selectedBuffer = buffers[0];

      const source = context.createBufferSource();
      source.buffer = selectedBuffer;
      source.connect(context.destination);
      source.start();
    } catch (e) {
      console.log('Could not play keyboard sfx: ', e);
    }
  };

  const mute = () => {
    muted.value = true;
  };

  const unmute = () => {
    muted.value = false;
  };

  return {
    mute,
    unmute,
    play,
    playFullVolume,
    context,
  };
};
