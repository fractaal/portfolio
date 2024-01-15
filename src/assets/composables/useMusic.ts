import { ref } from 'vue';

const context = new AudioContext();

const source = context.createBufferSource();
const gainNode = context.createGain();

source.loop = true;

source.connect(gainNode);
gainNode.connect(context.destination);

let initialized = false;

const controlsEnabled = ref(false);

const muted = ref(false);

export const useMusic = () => {
  if (!initialized) {
    fetch('/music.flac').then((buffer) =>
      buffer
        .arrayBuffer()
        .then((arrayBuffer) =>
          context
            .decodeAudioData(arrayBuffer)
            .then((buffer) => (source.buffer = buffer))
        )
    );

    initialized = true;

    const userInteractionPromise = new Promise((resolve) => {
      document.addEventListener('click', resolve);
      document.addEventListener('keydown', resolve);
      document.addEventListener('touchstart', resolve);
    });

    userInteractionPromise.then(() => {
      source.start();
      gainNode.gain.setValueAtTime(0, context.currentTime);
      gainNode.gain.linearRampToValueAtTime(1, context.currentTime + 3);

      setTimeout(() => {
        controlsEnabled.value = true;
      }, 3000);
    });
  }

  const mute = () => {
    if (!controlsEnabled.value) return;

    controlsEnabled.value = false;
    gainNode.gain.setValueAtTime(1, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(0, context.currentTime + 1);
    muted.value = true;

    setTimeout(() => {
      controlsEnabled.value = true;
    }, 1000);
  };

  const unmute = () => {
    if (!controlsEnabled.value) return;

    controlsEnabled.value = false;
    gainNode.gain.setValueAtTime(0, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, context.currentTime + 1);
    muted.value = false;

    setTimeout(() => {
      controlsEnabled.value = true;
    }, 1000);
  };

  return {
    mute,
    unmute,
    muted,
    context,
    controlsEnabled,
  };
};
