import { ref } from 'vue';

const buffers: AudioBuffer[] = [];

export const useKeyboardSFX = (context: AudioContext, out: AudioNode) => {
  if (!out) {
    throw new Error('Output node is required');
  }

  const source = context.createBufferSource();
  const gainNode = context.createGain();

  source.loop = true;
  source.connect(gainNode);

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

  const muted = ref(false);

  const play = () => {
    if (muted.value) return;

    if (context.state === 'suspended') {
      console.log('Not playing keyboard sfx because context is suspended');
      context.resume();
      return;
    }

    try {
      gainNode.gain.setValueAtTime(0.2, context.currentTime);
      const selectedBuffer =
        buffers[Math.floor(Math.random() * buffers.length)];

      const source = context.createBufferSource();
      source.buffer = selectedBuffer;
      source.connect(out);
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
