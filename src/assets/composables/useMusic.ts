import { PlaybackPositionNode } from 'src/classes/PlaybackPositionNode';
import { ref } from 'vue';
import { LocalStorage } from 'quasar';

const context = new AudioContext();

const source = new PlaybackPositionNode(context);
const gainNode = context.createGain();

const crashSource = context.createBufferSource();

source.loop = true;

source.connect(gainNode);
crashSource.connect(gainNode);
gainNode.connect(context.destination);

const controlsEnabled = ref(false);

const muted = ref(false);

const music = [
  {
    file: '/music.flac',
    bpm: 87,
    title: 'Original Composition',
    beatMap: [
      true,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      true,
      false,
    ],
  },
  {
    file: '/music-dnb.flac',
    bpm: 87,
    title: 'Original Composition (Drum & Bass Remix)',
    beatMap: [
      true, // 1
      false, // 2
      true, // 3
      true, // 4
      false, // 5
      true, // 6
      false, // 7
      false, // 8
      true, // 9
      false, // 10
      true, // 11
      true, // 12
      false, // 13
      true, // 14
      false, // 15
      false, // 16
      true, // 17
      false, // 18
      true, // 19
      true, // 20
      false,
      true, // 22
      false,
      false, // 24
      true,
      false, // 26
      true,
      true, // 28
      false,
      true, // 30
      false,
      true, // 32
    ],
  },
  // {
  //   file: '/sims.flac',
  //   bpm: 148,
  //   title: 'The Sims Neighborhood Themes Remix',
  //   beatMap: [
  //     true,
  //     false, // 2
  //     false,
  //     false, // 4
  //     false,
  //     false, // 6
  //     true,
  //     false, // 8
  //     false,
  //     false, // 10
  //     false,
  //     false, // 12
  //     false,
  //     false, // 14
  //     false,
  //     false, // 16
  //     false,
  //     false, // 18
  //     true,
  //     false, // 20
  //     false,
  //     false, // 22
  //     true,
  //     false, // 24
  //     false,
  //     false, // 26
  //     false,
  //     false, // 28
  //     false,
  //     false,
  //     false,
  //     false,
  //   ],
  // },
  {
    file: '/music-house.flac',
    bpm: 105,
    title: '',
    beatMap: [false, false, false, false].flatMap(() => [
      true,
      false, //  2
      false,
      false, // 4
      true,
      false, // 6
      false,
      false,
    ]),
  },
];

const choiceIndex = Math.floor(Math.random() * music.length);

fetch(music[choiceIndex].file).then((response) => {
  response.arrayBuffer().then((buffer) => {
    context.decodeAudioData(buffer).then((buffer) => {
      source.buffer = buffer;

      console.log('Loaded source buffer - ', source.buffer);
    });
  });
});

fetch('/music-rmrf-bite.flac').then((response) => {
  response.arrayBuffer().then((buffer) => {
    context.decodeAudioData(buffer).then((buffer) => {
      crashSource.buffer = buffer;

      console.log('Loaded crash buffer - ', crashSource.buffer);
    });
  });
});

let initialized = false;

const maxVolume = 0.3;

export const useMusic = () => {
  if (!initialized) {
    initialized = true;

    (async () => {
      while (true) {
        if (source.buffer == null || crashSource.buffer == null) {
          console.log('Waiting for buffers to load, retrying in 50ms...');
          await new Promise((resolve) => setTimeout(resolve, 50));
          continue;
        }

        if (context.state !== 'running') {
          context.resume();
          console.log('AudioContext not running, retrying in 50ms...');
          console.log('state was ', context.state);
          await new Promise((resolve) => setTimeout(resolve, 50));
          continue;
        }

        console.log('Trying to start...');
        source.start();

        if (LocalStorage.getItem('muted') ?? false) {
          gainNode.gain.setValueAtTime(0, context.currentTime);
          muted.value = true;
        } else {
          gainNode.gain.setValueAtTime(0, context.currentTime);
          gainNode.gain.linearRampToValueAtTime(
            maxVolume,
            context.currentTime + 3
          );
          muted.value = false;
        }

        await new Promise((resolve) => setTimeout(resolve, 3000));

        controlsEnabled.value = true;
        return;
      }
    })();
  }

  // const userInteractionPromise = new Promise((resolve) => {
  //   document.addEventListener('click', resolve);
  //   document.addEventListener('keydown', resolve);
  //   document.addEventListener('touchstart', resolve);
  // });

  // userInteractionPromise.then(() => {
  //   source.start();
  //   gainNode.gain.setValueAtTime(0, context.currentTime);
  //   gainNode.gain.linearRampToValueAtTime(1, context.currentTime + 3);

  //   setTimeout(() => {
  //     controlsEnabled.value = true;
  //   }, 3000);
  // });
  // }

  const beatMap = ref<boolean[]>([]);
  const bpm = ref(music[choiceIndex].bpm);

  beatMap.value = music[choiceIndex].beatMap;

  const getPlaybackPosition = () => {
    return source.playbackPosition;
  };

  const getPlaybackTime = () => {
    return (source.duration ?? 0) * source.playbackPosition;
  };

  const mute = () => {
    if (!controlsEnabled.value) return;
    LocalStorage.set('muted', true);

    controlsEnabled.value = false;
    gainNode.gain.setValueAtTime(maxVolume, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(0, context.currentTime + 1);
    muted.value = true;

    setTimeout(() => {
      controlsEnabled.value = true;
    }, 1000);
  };

  const unmute = () => {
    if (!controlsEnabled.value) return;
    LocalStorage.set('muted', false);

    controlsEnabled.value = false;
    gainNode.gain.setValueAtTime(0, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(maxVolume, context.currentTime + 1);
    muted.value = false;

    setTimeout(() => {
      controlsEnabled.value = true;
    }, 1000);
  };

  const muteImmediate = () => {
    gainNode.gain.setValueAtTime(0, context.currentTime);
    muted.value = true;
  };

  const unmuteImmediate = () => {
    gainNode.gain.setValueAtTime(1, context.currentTime);
    muted.value = false;
  };

  const crash = () => {
    try {
      source.stop();
    } catch (e) {}
    try {
      crashSource.start();
    } catch (e) {}
  };

  return {
    mute,
    unmute,
    muted,
    context,
    muteImmediate,
    unmuteImmediate,
    controlsEnabled,
    crash,
    getPlaybackPosition,
    getPlaybackTime,
    beatMap,
    bpm,
  };
};
