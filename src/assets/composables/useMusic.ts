import { PlaybackPositionNode } from 'src/classes/PlaybackPositionNode';
import { ref } from 'vue';

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
  // {
  //   file: '/music-dnb.flac',
  //   bpm: 87,
  //   title: 'Original Composition (Drum & Bass Remix)',
  //   beatMap: [
  //     true, // 1
  //     false, // 2
  //     true, // 3
  //     true, // 4
  //     false, // 5
  //     true, // 6
  //     false, // 7
  //     false, // 8
  //     true, // 9
  //     false, // 10
  //     true, // 11
  //     true, // 12
  //     false, // 13
  //     true, // 14
  //     false, // 15
  //     false, // 16
  //     true, // 17
  //     false, // 18
  //     true, // 19
  //     true, // 20
  //     false,
  //     true, // 22
  //     false,
  //     false, // 24
  //     true,
  //     false, // 26
  //     true,
  //     true, // 28
  //     false,
  //     true, // 30
  //     false,
  //     true, // 32
  //   ],
  // },
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

const initialized = false;

const maxVolume = 0.3;

export const useMusic = (context: AudioContext, out: AudioNode) => {
  if (!out) {
    console.error('No output node provided');
    throw new Error('No output node provided');
  }

  if (!context) {
    console.error('No context provided');
    throw new Error('No context provided');
  }

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

  const source = new PlaybackPositionNode(context);
  const gainNode = context.createGain();
  const crashSource = context.createBufferSource();

  source.loop = true;

  source.connect(gainNode);
  crashSource.connect(gainNode);

  gainNode.connect(out);
  gainNode.gain.value = maxVolume;

  (async () => {
    while (true) {
      if (source.buffer == null || crashSource.buffer == null) {
        console.log('Waiting for buffers to load, retrying in 50ms...');
        await new Promise((resolve) => setTimeout(resolve, 50));
        continue;
      }

      source.start();
      return;
    }
  })();

  const beatMap = ref<boolean[]>([]);
  const bpm = ref(music[choiceIndex].bpm);

  beatMap.value = music[choiceIndex].beatMap;

  const getPlaybackPosition = () => {
    return source.playbackPosition;
  };

  const getPlaybackTime = () => {
    return (source.duration ?? 0) * source.playbackPosition;
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
    context,
    crash,
    getPlaybackPosition,
    getPlaybackTime,
    beatMap,
    bpm,
  };
};
