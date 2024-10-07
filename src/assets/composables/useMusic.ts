import { PlaybackPositionNode } from 'src/classes/PlaybackPositionNode';
import { reactive, ref } from 'vue';

function repeat<T>(arr: T[], n: number) {
  return Array(n)
    .fill(null)
    .flatMap(() => arr);
}

const ogCompBeatmap = [
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
];

const houseBeatMap = [null, null].flatMap(() => [
  true,
  false, //  2
  false,
  false, // 4
  true,
  false, // 6
  false,
  false,
]);

const simsBeatMap = [
  true,
  false, // 2
  false,
  false, // 4
  false,
  false, // 6
  true,
  false, // 8
  false,
  false, // 10
  false,
  false, // 12
  false,
  false, // 14
  false,
  false, // 16
  false,
  false, // 18
  true,
  false, // 20
  false,
  false, // 22
  true,
  false, // 24
  false,
  false, // 26
  false,
  false, // 28
  false,
  false,
  false,
  false,
];

const music = [
  {
    file: '/music.flac',
    bpm: 87,
    title: 'Original Composition',
    patterns: [
      {
        beatMap: ogCompBeatmap,
        colors: [
          { r: 0.416, g: 0.357, b: 0.988 },
          { r: 0.976, g: 0.502, b: 0.384 },
          { r: 0.827, g: 0.412, b: 0.867 },
          { r: 0.443, g: 0.349, b: 0.98 },
          { r: 0.765, g: 0.49, b: 0.733 },
        ],
        speedMult: 2,
      },
      {
        beatMap: ogCompBeatmap,
        colors: [
          { r: 137 / 255, g: 210 / 255, b: 220 / 255 },
          { r: 101 / 255, g: 100 / 255, b: 219 / 255 },
          { r: 35 / 255, g: 46 / 255, b: 209 / 255 },
          { r: 16 / 255, g: 29 / 255, b: 66 / 255 },
          { r: 137 / 255, g: 210 / 255, b: 220 / 255 },
        ],
        speedMult: 1,
      },
    ],
  },
  {
    file: '/sims.flac',
    bpm: 148,
    patterns: [
      {
        beatMap: repeat(simsBeatMap, 4),
        colors: [
          { r: 0.416, g: 0.357, b: 0.988 },
          { r: 0.976, g: 0.502, b: 0.384 },
          { r: 0.827, g: 0.412, b: 0.867 },
          { r: 0.443, g: 0.349, b: 0.98 },
          { r: 0.765, g: 0.49, b: 0.733 },
        ],
        speedMult: 1,
      },
      {
        beatMap: repeat(simsBeatMap, 4),
        colors: [
          { r: 137 / 255, g: 210 / 255, b: 220 / 255 },
          { r: 101 / 255, g: 100 / 255, b: 219 / 255 },
          { r: 35 / 255, g: 46 / 255, b: 209 / 255 },
          { r: 16 / 255, g: 29 / 255, b: 66 / 255 },
          { r: 137 / 255, g: 210 / 255, b: 220 / 255 },
        ],
        speedMult: 2,
      },
    ],
    title: 'The Sims Neighborhood Themes Remix',
  },
  {
    file: '/music-house.flac',
    bpm: 105,
    title: '',
    patterns: [
      {
        beatMap: repeat(houseBeatMap, 4),
        colors: [
          { r: 0.416, g: 0.357, b: 0.988 },
          { r: 0.976, g: 0.502, b: 0.384 },
          { r: 0.827, g: 0.412, b: 0.867 },
          { r: 0.443, g: 0.349, b: 0.98 },
          { r: 0.765, g: 0.49, b: 0.733 },
        ],
        speedMult: 1.5,
      },
      {
        beatMap: repeat(houseBeatMap, 4),
        colors: [
          { r: 137 / 255, g: 210 / 255, b: 220 / 255 },
          { r: 101 / 255, g: 100 / 255, b: 219 / 255 },
          { r: 35 / 255, g: 46 / 255, b: 209 / 255 },
          { r: 16 / 255, g: 29 / 255, b: 66 / 255 },
          { r: 137 / 255, g: 210 / 255, b: 220 / 255 },
        ],
        speedMult: 1.5,
        noiseStrength: 1.25,
      },
    ],
  },
  {
    file: '/music-house-2.flac',
    bpm: 120,
    title: '',
    patterns: [
      {
        beatMap: repeat(houseBeatMap, 4),
        colors: [
          { r: 0.443 * 0.5, g: 0.349 * 0.5, b: 0.98 * 0.5 },
          { r: 0, g: 0, b: 0 },
          { r: 0, g: 0, b: 0 },
          { r: 0, g: 0, b: 0 },
          { r: 0, g: 0, b: 0 },
        ],
        noiseStrength: 0.5,
        speedMult: 1,
      },
      {
        beatMap: repeat(houseBeatMap, 4 * 4),
        colors: [
          { r: 0.416, g: 0.357, b: 0.988 },
          { r: 0.976, g: 0.502, b: 0.384 },
          { r: 0.827, g: 0.412, b: 0.867 },
          { r: 0.443, g: 0.349, b: 0.98 },
          { r: 0.765, g: 0.49, b: 0.733 },
        ],
        speedMult: 2,
        noiseStrength: 1,
      },
    ],
  },
];

const choiceIndex = Math.floor(Math.random() * music.length);

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

  const getPlaybackPosition = () => {
    return source.playbackPosition;
  };

  const getPlaybackTime = () => {
    return (source.duration ?? 0) * source.playbackPosition;
  };

  const hasBeatAtIndex = (index: number) => {
    if (beatMap.value.length === 0) {
      return false;
    }

    return beatMap.value[index % beatMap.value.length];
  };

  const realtime = reactive({
    oneFourthBeatIndex: 0,
    beatIndex: 0,
    patternIndex: 0,
    numPatterns: music[choiceIndex].patterns.length,
    colors: music[choiceIndex].patterns[0].colors,
    oneFourthBeatIndexInPattern: 0,
    speedMult: music[choiceIndex].patterns[0].speedMult,
    noiseStrength: music[choiceIndex].patterns[0].noiseStrength ?? 1,
  });

  function update() {
    const oneFourthBeatPeriod = 60 / bpm.value / 4;
    realtime.oneFourthBeatIndex = Math.floor(
      getPlaybackTime() / oneFourthBeatPeriod,
    );

    const beatPeriod = 60 / bpm.value;
    realtime.beatIndex = Math.floor(getPlaybackTime() / beatPeriod);

    const totalFourthBeats = music[choiceIndex].patterns.reduce(
      (acc, pattern) => acc + pattern.beatMap.length,
      0,
    );

    let oneFourthBeatIndexInPattern =
      realtime.oneFourthBeatIndex % totalFourthBeats;

    realtime.oneFourthBeatIndexInPattern = oneFourthBeatIndexInPattern;

    for (let i = 0; i < music[choiceIndex].patterns.length; i++) {
      const pattern = music[choiceIndex].patterns[i];

      if (oneFourthBeatIndexInPattern < pattern.beatMap.length) {
        beatMap.value = pattern.beatMap;
        realtime.colors = pattern.colors;
        realtime.patternIndex = i;
        realtime.speedMult = pattern.speedMult;
        realtime.noiseStrength = pattern.noiseStrength ?? 1;

        break;
      }

      oneFourthBeatIndexInPattern -= pattern.beatMap.length;
      realtime.oneFourthBeatIndexInPattern = oneFourthBeatIndexInPattern;
    }

    requestAnimationFrame(update);
  }

  update();

  const crash = () => {
    try {
      source.stop();
    } catch (e) {}
    try {
      crashSource.start();
    } catch (e) {}
  };

  return {
    realtime,
    context,
    crash,
    getPlaybackPosition,
    getPlaybackTime,
    hasBeatAtIndex,
    beatMap,
    bpm,
  };
};
