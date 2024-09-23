import { ref } from 'vue';

const context = new AudioContext();

const source = context.createBufferSource();
const gainNode = context.createGain();

source.loop = true;

source.connect(gainNode);
gainNode.connect(context.destination);

const buffers: AudioBuffer[] = [];

(async () => {
  buffers.push(
    await context.decodeAudioData(
      await (await fetch('/keys1.wav')).arrayBuffer()
    )
  );
  buffers.push(
    await context.decodeAudioData(
      await (await fetch('/keys2.wav')).arrayBuffer()
    )
  );
  buffers.push(
    await context.decodeAudioData(
      await (await fetch('/keys3.wav')).arrayBuffer()
    )
  );
  buffers.push(
    await context.decodeAudioData(
      await (await fetch('/keys4.wav')).arrayBuffer()
    )
  );
})();

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
