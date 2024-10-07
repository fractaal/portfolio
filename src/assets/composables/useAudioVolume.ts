import { ref } from 'vue';
import { LocalStorage } from 'quasar';

const context = new AudioContext();

(async () => {
  try {
    console.log('Starting AudioContext...');
    await context.resume();

    console.log('AudioContext resumed successfully');
  } catch (e) {
    console.error('Could not resume AudioContext: ', e);
  }
})();

const useAudioVolume = () => {
  const gainNode = context.createGain();

  gainNode.connect(context.destination);

  const muted = ref(false);

  gainNode.gain.value = 0.6;

  const mute = () => {
    muted.value = true;
    // gainNode.gain.cancelScheduledValues(context.currentTime);
    gainNode.gain.setValueAtTime(0.6, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(0, context.currentTime + 0.75);
    LocalStorage.set('muted', true);
  };

  const unmute = () => {
    muted.value = false;
    // gainNode.gain.cancelScheduledValues(context.currentTime);
    gainNode.gain.setValueAtTime(0, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.6, context.currentTime + 0.75);
    LocalStorage.set('muted', false);
  };

  const muteImmediate = () => {
    muted.value = true;
    // gainNode.gain.cancelScheduledValues(context.currentTime);
    gainNode.gain.setValueAtTime(0, context.currentTime);
    LocalStorage.set('muted', true);
  };

  const unmuteImmediate = () => {
    muted.value = false;
    // gainNode.gain.cancelScheduledValues(context.currentTime);
    gainNode.gain.setValueAtTime(0.6, context.currentTime);
    LocalStorage.set('muted', false);
  };

  if (LocalStorage.getItem('muted')) {
    muteImmediate();
  }

  return {
    gainNode,
    mute,
    unmute,
    muteImmediate,
    unmuteImmediate,
    muted,
    context,
  };
};

export default useAudioVolume;
