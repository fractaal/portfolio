<template>
  <q-page class="">
    <div class="tw-flex-1 tw-fixed tw-p-8 tw-z-50">
      <q-btn
        @click="volume.muted.value ? volume.unmute() : volume.mute()"
        class="tw-p-4 rounded-full"
        unelevated
      >
        <q-icon
          :name="
            volume.muted.value
              ? 'fa-solid fa-volume-mute'
              : 'fa-solid fa-volume-up'
          "
        />
      </q-btn>

      <q-btn
        @click="hideEverything = !hideEverything"
        class="tw-p-4 rounded-full"
        unelevated
      >
        <q-icon
          :name="hideEverything ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"
        />
      </q-btn>
    </div>
    <div class="tw-flex tw-gap-8 tw-px-8 tw-justify-between">
      <div class="tw-flex-1"></div>
      <div
        class="tw-mt-4 tw-relative tw-flex tw-flex-col tw-flex-1 tw-text-center"
        :class="hideEverything ? 'faint-after-show' : ''"
      >
        <div class="tw-font-black tw-text-md tw-ml-[3px] -tw-mb-2">
          Hey! My name's
        </div>
        <div
          class="tw-font-black tw-text-6xl tw-z-20"
          style="text-shadow: 0 0 50px rgba(0, 0, 0, 1)"
        >
          Ben Jude
        </div>
        <!-- <div
          class="tw-h-1 tw-w-[2000px] tw-absolute -tw-left-[2010px] tw-top-[55%] tw-opacity-75 tw-bg-gradient-to-r tw-to-transparent tw-from-white"
        ></div> -->
      </div>
      <div class="tw-flex-1"></div>
    </div>
    <div class="tw-absolute -tw-z-20">
      <Suspense>
        <FancyWaves
          :colors="actualColors"
          :speed="wavesSpeed"
          :noise-strength="noiseStrength"
          :brightness="brightness"
        />
      </Suspense>
    </div>

    <section
      class="lg:tw-w-4/6 tw-mx-auto tw-flex tw-items-center tw-justify-center"
      v-if="hideEverything"
    >
      <div class="tw-font-mono tw-text-2xl fade-after-show-delayed">
        Enjoy the show.
      </div>
    </section>

    <section
      class="lg:tw-w-4/6 tw-mx-auto"
      :class="hideEverything ? 'faint-after-show' : 'restore-after-show'"
    >
      <div class="tw-flex tw-flex-col xl:tw-grid tw-grid-cols-12">
        <div
          class="tw-flex-1 tw-col-span-7 tw-shrink-0 -tw-mt-8 tw-relative tw-h-[500px] tw-overflow-hidden lg:tw-rounded-3xl tw-w-full tw-mx-auto tw-shadow-2xl tw-shadow-black"
        >
          <div class="tw-absolute tw-top-0 tw-left-0 tw-p-4 tw-flex tw-gap-2">
            <div
              class="tw-h-4 tw-w-4 tw-rounded-full tw-bg-red-400 tw-shadow-md tw-shadow-red-500/50"
            ></div>
            <div
              class="tw-h-4 tw-w-4 tw-rounded-full tw-bg-orange-400 tw-shadow-md tw-shadow-orange-500/50"
            ></div>
            <div
              class="tw-h-4 tw-w-4 tw-rounded-full tw-bg-green-400 tw-shadow-md tw-shadow-green-500/50"
            ></div>
          </div>
          <video
            autoplay
            loop
            muted
            src="/vfx.mp4"
            style="width: 100%; height: 100%"
            class="tw-object-cover"
          />
        </div>
        <div
          class="xl:-tw-mt-8 tw-mt-8 tw-col-span-5 tw-flex-shrink tw-min-w-min tw-flex-grow-0 tw-mx-4 tw-bg-black/50 tw-backdrop-blur-2xl tw-rounded-xl tw-ring-white/20 tw-ring-[2px] tw-p-8 tw-pt-12 tw-font-mono tw-text-lg tw-relative tw-transition-all tw-duration-500 tw-ease-out-expo tw-min-h-[500px] tw-max-h-[500px] tw-flex tw-flex-col"
        >
          <div
            class="tw-absolute tw-top-0 tw-bottom-0 tw-left-0 tw-right-0 tw-rounded-xl tw-overflow-hidden tw-opacity-30 tw-pointer-events-none"
          >
            <img
              src="/frosted_glass_noise.png"
              style="width: 100%; height: 100%"
              class="tw-object-cover tw-pointer-events-none -tw-z-10"
              alt=""
            />
          </div>
          <div class="tw-absolute tw-top-0 tw-left-0 tw-p-4 tw-flex tw-gap-2">
            <div
              class="tw-h-4 tw-w-4 tw-rounded-full tw-bg-red-400 tw-shadow-md tw-shadow-red-500/50"
            ></div>
            <div
              class="tw-h-4 tw-w-4 tw-rounded-full tw-bg-orange-400 tw-shadow-md tw-shadow-orange-500/50"
            ></div>
            <div
              class="tw-h-4 tw-w-4 tw-rounded-full tw-bg-green-400 tw-shadow-md tw-shadow-green-500/50"
            ></div>
          </div>
          <div class="tw-flex tw-flex-col tw-overflow-y-auto" ref="termScroll">
            <div v-for="(line, i) in term.lines.value" :key="line.content">
              <div v-if="line.type === 'prompt'" class="tw-my-4 tw-relative">
                <span class="tw-font-semibold tw-opacity-75"
                  >benjude@sys: $
                </span>
                <span class="tw-font-semibold">{{ line.content }}</span>
                <span
                  v-if="i === term.lines.value.length - 1"
                  :style="{
                    opacity: `${blinkerOpacity}%`,
                    'text-shadow': '0 0 50px rgba(0,0,0,0) !important',
                  }"
                  class="tw-absolute tw-ml-2"
                >
                  █
                </span>
              </div>
              <div v-else class="tw-relative">
                <span>{{ line.content }}</span>
                <span
                  v-if="i === term.lines.value.length - 1"
                  :style="{
                    // opacity: `${blinkerOpacity}%`,
                    'text-shadow': '0 0 50px rgba(0,0,0,0) !important',
                  }"
                  class="tw-absolute tw-ml-2"
                >
                  █
                </span>
              </div>
            </div>
          </div>
          <div class="tw-flex-1 tw-min-h-4"></div>
          <div
            class="tw-left-0 tw-right-0 tw-bottom-0 tw-flex tw-flex-wrap tw-gap-2 tw-max-h-fit"
          >
            <q-btn
              flat
              no-caps
              class="tw-bg-white/5"
              @click="termAnims.whoAreYouCommand"
              :loading="termAnims.termBusy.value"
              >Who are you?</q-btn
            >
            <q-btn
              flat
              no-caps
              class="tw-bg-white/5"
              @click="termAnims.clearCommand"
              :loading="termAnims.termBusy.value"
              >Clear terminal</q-btn
            >
            <q-btn
              flat
              no-caps
              class="tw-bg-white/5"
              @click="termAnims.toggleMusicTerm"
              :loading="termAnims.termBusy.value"
              >Toggle music</q-btn
            >
            <q-btn
              flat
              no-caps
              class="tw-bg-white/5 tw-min-w-6"
              @click="termAnims.rmRf"
              :loading="termAnims.termBusy.value"
              >Delete everything</q-btn
            >
            <q-btn
              flat
              no-caps
              class="tw-bg-white/5 tw-min-w-6"
              @click="termAnims.toggleStatsForNerds"
              :loading="termAnims.termBusy.value"
              >Show stats for nerds</q-btn
            >
          </div>
        </div>
      </div>
    </section>

    <section
      v-if="showStatsForNerds"
      class="lg:tw-w-4/6 tw-mx-auto tw-ring-1 tw-ring-white/20 tw-mt-12 tw-font-mono tw-p-4 tw-rounded-xl tw-bg-black/80 tw-flex tw-flex-col"
    >
      <span class="tw-flex">
        <q-icon name="fas fa-glasses" size="md" class="tw-mr-4" />
        <h1 class="tw-text-2xl tw-font-medium">STATS FOR NERDS</h1>
      </span>
      <h2 class="tw-text-md tw-tracking-wider -tw-mt-4">MUSIC VISUALIZATION</h2>

      <span class="-tw-mt-2"
        ><q-icon name="fas fa-warning" /> Keeping this open may cause
        performance issues.</span
      >

      <div class="tw-mt-4"></div>

      <div>Pattern Display</div>

      <div class="tw-flex tw-gap-1">
        <div
          v-for="(_, index) in music.beatMap.value"
          :key="index"
          class="tw-relative tw-rounded-sm tw-h-8 tw-w-4"
          :class="
            currentBeatNumber === index
              ? music.beatMap.value[currentBeatNumber]
                ? 'tw-bg-purple-400'
                : 'tw-bg-purple-700'
              : music.beatMap.value[index]
                ? 'tw-bg-white/25'
                : 'tw-bg-white/5'
          "
        >
          <div
            class="tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-bottom-0 tw-rounded-sm"
            :class="
              currentBeatNumber === index
                ? music.beatMap.value[currentBeatNumber]
                  ? 'tw-bg-purple-400 tw-animate-ping'
                  : 'tw-bg-purple-700'
                : music.beatMap.value[index]
                  ? 'tw-bg-white/25'
                  : 'tw-bg-white/5'
            "
          ></div>
        </div>
      </div>

      <span class="tw-min-h-8"></span>

      <div class="tw-flex tw-flex-col lg:tw-flex-row tw-justify-start tw-gap-8">
        <div class="tw-flex-col">
          <b>--- Beat ---</b>
          <div>Beat Index: {{ music.realtime.beatIndex }}</div>
          <div>1/4th Beat Index: {{ music.realtime.oneFourthBeatIndex }}</div>
          <div>
            1/4th Beat Index In Pattern:
            {{ music.realtime.oneFourthBeatIndexInPattern }}
          </div>
          <div>
            Pattern Index: {{ music.realtime.patternIndex + 1 }} /
            {{ music.realtime.numPatterns }}
          </div>
        </div>
        <div class="tw-flex-col">
          <b>--- Colors ---</b>
          <div class="tw-flex tw-gap-1">
            <div
              v-for="color in music.realtime.colors"
              :key="color.r + color.g + color.b"
            >
              <ColorDisplay :color="color" />
            </div>
          </div>
        </div>
        <div class="tw-flex-col">
          <b>--- Springs ---</b>
          <div>
            Wave Speed Multiplier: {{ music.realtime.speedMult }} - Display
            {{ speedMultSpring.position }}
          </div>
          <div>
            Noise Strength: {{ music.realtime.noiseStrength }} - Display
            {{ noiseStrengthSpring.position }}
          </div>
          <div>Beat Spring: {{ beatSpring.position }}</div>
          <div>Brightness Spring: {{ brightnessSpring.position }}</div>
          <div>Slow Brightness Spring: {{ slowBrightnessSpring.position }}</div>
        </div>
      </div>
    </section>

    <section
      class="lg:tw-w-4/6 tw-mx-auto"
      :class="hideEverything ? 'faint-after-show' : 'restore-after-show'"
    >
      <div class="tw-h-96 tw-mx-2 md:tw-mx-auto">
        <div class="tw-flex tw-items-center tw-gap-4"></div>
        <div
          class="lg:tw-ml-0 tw-ml-4 tw-relative tw-font-mono tw-mx-auto tw-mt-8 tw-font-semibold tw-text-4xl tw-w-full"
        >
          > PROJECTS

          <div
            class="tw-h-[2px] tw-w-[2500px] tw-absolute -tw-left-[2510px] tw-top-[45%] tw-opacity-75 tw-bg-gradient-to-r tw-to-transparent tw-from-white"
          ></div>
        </div>
        <div class="tw-w-full tw-grid md:tw-grid-cols-2">
          <div>
            <project-item
              v-for="project in projectDataColumn1"
              :key="project.name"
              :project="project"
            />
          </div>

          <div>
            <project-item
              v-for="project in projectDataColumn2"
              :key="project.name"
              :project="project"
            />
          </div>

          <!--

          <div class="tw-w-full 2xl:tw-w-1/2">
            <div
              class="tw-rounded-xl tw-m-4 tw-p-4 tw-w-max-fit tw-h-max-fit tw-bg-green-500"
            >
              Endeavor - Alternative Moodle Frontend
            </div>
          </div>

          <div class="tw-w-full 2xl:tw-w-1/2">
            <div
              class="tw-rounded-xl tw-m-4 tw-p-4 tw-w-max-fit tw-h-max-fit tw-bg-green-500"
            >
              Wherenau - Realtime PUV Tracking System
            </div>
          </div>

          <div class="tw-w-full 2xl:tw-w-1/2">
            <div
              class="tw-rounded-xl tw-m-4 tw-p-4 tw-w-max-fit tw-h-max-fit tw-bg-green-500"
            >
              Tracvac - Vaccination Tracking System
            </div>
          </div>

          <div class="tw-w-full 2xl:tw-w-1/2">
            <div
              class="tw-rounded-xl tw-m-4 tw-p-4 tw-w-max-fit tw-h-max-fit tw-bg-green-500"
            >
              Magi Mod Manager - Minecraft Mod Manager
            </div>
          </div>

          <div class="tw-w-full 2xl:tw-w-1/2">
            <div
              class="tw-rounded-xl tw-m-4 tw-p-4 tw-w-max-fit tw-h-max-fit tw-bg-green-500"
            >
              Shopee UI Clone
            </div>
          </div> -->
        </div>
        <div
          class="tw-flex tw-items-center tw-gap-2 tw-mt-8 tw-mx-auto tw-w-fit"
        >
          <div
            class="tw-bg-gradient-to-r tw-from-transparent tw-via-fuchsia-500 tw-to-white tw-h-[1.5px] tw-rounded-full tw-w-24"
          ></div>
          <div class="tw-font-mono">FIND ME AT</div>
          <div
            class="tw-bg-gradient-to-l tw-from-transparent tw-via-fuchsia-500 tw-to-white tw-h-[1.5px] tw-rounded-full tw-w-24"
          ></div>
        </div>
        <div
          class="tw-flex tw-flex-col xs:tw-flex-row tw-items-center tw-justify-center"
        >
          <div class="tw-flex tw-justify-center tw-my-4">
            <a href="mailto:ben.jude.dev@gmail.com">
              <q-icon name="fa-solid fa-envelope" class="tw-text-2xl tw-mr-2" />
              ben.jude.dev@gmail.com
            </a>
          </div>
        </div>
        <div
          class="tw-flex tw-flex-col xs:tw-flex-row lg:tw-gap-8 tw-gap-4 tw-mt-4 tw-mx-auto tw-w-fit"
        >
          <div
            @click="openYouTube"
            class="tw-bg-gradient-to-tr tw-from-amber-600/25 tw-via-red-500 tw-to-fuchsia-500 tw-p-[1.5px] tw-rounded-3xl tw-shadow-fuchsia-700/25 hover:tw-shadow-fuchsia-700/75 tw-shadow-2xl tw-w-fit hover:tw-scale-110 hover:tw-cursor-pointer tw-transition-all tw-duration-300"
          >
            <div
              class="lg:tw-h-40 lg:tw-w-40 tw-h-28 tw-w-28 tw-rounded-3xl tw-bg-[#02020f] tw-p-4 tw-flex tw-flex-col tw-items-center tw-justify-center hover:tw-bg-transparent tw-duration-300"
            >
              <q-icon
                name="fa-brands fa-youtube"
                class="lg:tw-text-6xl tw-text-2xl"
              />
              <div class="lg:tw-text-xl tw-font-semibold">Filmic</div>
              <div class="tw-text-xs tw-tracking-tighter tw-text-center">
                YouTube | VFX
              </div>
            </div>
          </div>

          <div
            @click="openGitHub"
            class="tw-bg-gradient-to-tr tw-to-teal-600/25 tw-via-emerald-500 tw-from-teal-500 tw-p-[1.5px] tw-rounded-3xl tw-shadow-teal-500/25 hover:tw-shadow-teal-700/75 tw-shadow-2xl tw-w-fit hover:tw-scale-110 hover:tw-cursor-pointer tw-transition-all tw-duration-300"
          >
            <div
              class="lg:tw-h-40 lg:tw-w-40 tw-h-28 tw-w-28 tw-rounded-3xl tw-bg-[#02020f] tw-p-4 tw-flex tw-flex-col tw-items-center tw-justify-center hover:tw-bg-transparent tw-duration-300"
            >
              <q-icon
                name="fa-brands fa-github"
                class="lg:tw-text-6xl tw-text-2xl"
              />
              <div class="lg:tw-text-xl tw-font-semibold">Fractal</div>
              <div class="tw-text-xs tw-tracking-tighter tw-text-center">
                GitHub | Dev
              </div>
            </div>
          </div>

          <div
            @click="openSoundCloud"
            class="tw-bg-gradient-to-tl tw-from-fuchsia-600/25 tw-via-red-500 tw-to-amber-500 tw-p-[1.5px] tw-rounded-3xl tw-shadow-fuchsia-700/25 hover:tw-shadow-fuchsia-700/75 tw-shadow-2xl tw-w-fit hover:tw-scale-110 hover:tw-cursor-pointer tw-transition-all tw-duration-300"
          >
            <div
              class="lg:tw-h-40 lg:tw-w-40 tw-h-28 tw-w-28 tw-rounded-3xl tw-bg-[#02020f] tw-p-4 tw-flex tw-flex-col tw-items-center tw-justify-center hover:tw-bg-transparent tw-duration-300"
            >
              <q-icon
                name="fa-brands fa-soundcloud"
                class="lg:tw-text-6xl tw-text-2xl"
              />
              <div class="lg:tw-text-xl tw-font-semibold">Seventh</div>
              <div class="tw-text-xs tw-tracking-tighter tw-text-center">
                SoundCloud | Music
              </div>
            </div>
          </div>
        </div>
        <div class="tw-h-32"></div>
      </div>
    </section>

    <q-page-sticky
      position="bottom-right"
      :offset="[50, 50]"
      class="tw-text-lg"
    >
      <div
        v-if="music.fetching.value"
        class="tw-flex tw-justify-center tw-items-center"
      >
        <q-spinner size="40px" class="tw-mr-4" />
        Loading some music...
      </div>
      <div
        v-else
        class="stay-for-moment-then-slide-right tw-flex tw-justify-center tw-items-center"
      >
        <q-icon
          name="fas fa-check"
          size="40px"
          class="tw-mr-4 tw-flex tw-items-center tw-justify-center"
        >
        </q-icon>
        Loading music done!
      </div>
    </q-page-sticky>

    <!-- <div class="2xl:tw-w-3/5 tw-w-5/6 tw-mx-auto"></div> -->
    <!-- <div
      class="tw-font-mono tw-tracking-wider tw-text-lg tw-text-center tw-w-full"
      style="text-shadow: 0 0 100px rgba(0, 0, 0, 1)"
    >
      <span class="tw-font-black"> </span>
      <br />
    </div> -->
  </q-page>
</template>

<script setup lang="ts">
import { useScroll } from '@vueuse/core';
import { useMusic } from 'src/assets/composables/useMusic';
import { useFakeTerminalAnimations } from 'src/assets/composables/useFakeTerminalAnimations';
import { useFakeTerminal } from 'src/assets/composables/useFakeTerminal';
import { LocalStorage } from 'quasar';
import ProjectItem from 'src/components/ProjectItem.vue';
import FancyWaves from 'src/components/FancyWaves.vue';
import ColorDisplay from 'src/components/ColorDisplay.vue';
import ProjectData from 'src/projects-data';

const numProjects = ProjectData.length;
const projectDataColumn1 = ProjectData.slice(0, Math.ceil(numProjects / 2));
const projectDataColumn2 = ProjectData.slice(Math.ceil(numProjects / 2));

const hideEverything = ref(false);

import { ref, onMounted, watch } from 'vue';
import useAudioVolume from 'src/assets/composables/useAudioVolume';
import { SpringRGB, Spring } from 'src/assets/spring';

const blinkerOpacity = ref(100);

const volume = useAudioVolume();

const showStatsForNerds = ref(false);

onMounted(() => {
  if (LocalStorage.has('showStatsForNerds')) {
    showStatsForNerds.value = true;
  }
});

watch(showStatsForNerds, (value) => {
  if (value) {
    LocalStorage.set('showStatsForNerds', true);
  } else {
    LocalStorage.remove('showStatsForNerds');
  }
});

const music = useMusic(volume.context, volume.gainNode);
const term = useFakeTerminal(volume.context, volume.gainNode);
const termAnims = useFakeTerminalAnimations(term, volume, music, {
  showStatsForNerds,
});

let textUsed: string[] = [];

const termScroll = ref<HTMLElement | null>(null);

onMounted(() => {
  const scroll = useScroll(termScroll);

  const o = new MutationObserver(() => {
    if (termAnims.termBusy.value) {
      scroll.y.value = 999;
    }
  });

  o.observe(termScroll.value!, {
    attributes: true,
    childList: true,
    subtree: true,
  });
});

onMounted(async () => {
  while (true) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const texts = [
      'sudo su',
      'digital generalist',
      'who am i?',
      'yarn install',
      'chmod 777 *',
      'rm -rf /',
      'use the buttons!',
    ];

    if (textUsed.length === texts.length) {
      textUsed = [];
    }

    let chosenText: string;

    while (true) {
      chosenText = texts[Math.floor(Math.random() * texts.length)];

      if (!textUsed.includes(chosenText)) {
        break;
      }
    }

    textUsed.push(chosenText);

    if (termAnims.termBusy.value) {
      continue;
    }

    await termAnims.temporarilyChangeText(
      texts[Math.floor(Math.random() * texts.length)],
    );
  }
});

const currentBeatNumber = ref(0);
const wavesSpeed = ref(1);
const noiseStrength = ref(1);

const actualColors = ref<{ r: number; g: number; b: number }[]>([
  { r: 0, g: 0, b: 0 },
  { r: 0, g: 0, b: 0 },
  { r: 0, g: 0, b: 0 },
  { r: 0, g: 0, b: 0 },
  { r: 0, g: 0, b: 0 },
]);

const color1Spring = new SpringRGB();
const color2Spring = new SpringRGB();
const color3Spring = new SpringRGB();
const color4Spring = new SpringRGB();
const color5Spring = new SpringRGB();

const speedMultSpring = new Spring(25, 10, 1);
const noiseStrengthSpring = new Spring(25, 10, 1);

const beatSpring = new Spring(50, 20, 5);

const brightnessSpring = new Spring(100, 20, 1);
const slowBrightnessSpring = new Spring(10, 10, 1);

let brightness = 1;

setInterval(
  () => {
    currentBeatNumber.value = music.realtime.oneFourthBeatIndexInPattern;

    color1Spring.setTarget(music.realtime.colors[0]);
    color2Spring.setTarget(music.realtime.colors[1]);
    color3Spring.setTarget(music.realtime.colors[2]);
    color4Spring.setTarget(music.realtime.colors[3]);
    color5Spring.setTarget(music.realtime.colors[4]);

    speedMultSpring.setTarget(music.realtime.speedMult);

    if (volume.muted.value) {
      noiseStrengthSpring.setTarget(0.5);
    } else {
      noiseStrengthSpring.setTarget(music.realtime.noiseStrength);
    }

    if (
      music.hasBeatAtIndex(music.realtime.oneFourthBeatIndexInPattern) &&
      !volume.muted.value
    ) {
      beatSpring.reset(0.9);
      slowBrightnessSpring.setTarget(1.17);
      brightnessSpring.setTarget(1.17);
    } else {
      beatSpring.setTarget(0);

      if (volume.muted.value) {
        slowBrightnessSpring.setTarget(0.85);
        brightnessSpring.setTarget(0.85);
      } else {
        slowBrightnessSpring.setTarget(1);
        brightnessSpring.setTarget(1);
      }
    }

    color1Spring.update(1 / 30);
    color2Spring.update(1 / 30);
    color3Spring.update(1 / 30);
    color4Spring.update(1 / 30);
    color5Spring.update(1 / 30);

    speedMultSpring.update(1 / 30);
    noiseStrengthSpring.update(1 / 30);
    beatSpring.update(1 / 30);
    brightnessSpring.update(1 / 30);
    slowBrightnessSpring.update(1 / 30);

    actualColors.value = [
      color1Spring.position,
      color2Spring.position,
      color3Spring.position,
      color4Spring.position,
      color5Spring.position,
    ];

    if (volume.muted.value) {
      brightness = slowBrightnessSpring.position;
    } else {
      brightness = brightnessSpring.position;
    }

    wavesSpeed.value =
      (0.5 + Math.pow(beatSpring.position, 5)) * speedMultSpring.position;
    noiseStrength.value =
      (1 + beatSpring.position, 5 * 0.25) * noiseStrengthSpring.position;
  },
  (1 / 30) * 1000,
);

function openYouTube() {
  window.open('https://www.youtube.com/@filmicvisuals');
}

function openGitHub() {
  window.open('https://github.com/fractaal/');
}

function openSoundCloud() {
  window.open('https://soundcloud.com/filmic_seventh');
}
</script>

<style>
.fade-after-show {
  animation: fadeOut 1s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
  transform: translateZ(-1px);
}

.faint-after-show {
  animation: faint 1s cubic-bezier(0.77, 0, 0.175, 1) forwards;
  transform: translateZ(-1px);
}

.faint-after-show-delayed {
  animation: faint 5s cubic-bezier(0.95, 0.05, 0.795, 0.035) 1s forwards;
  transform: translateZ(-1px);
}

.restore-after-show {
  animation: fadeIn 1s cubic-bezier(0.19, 1, 0.22, 1) forwards;
  transform: translateZ(-1px);
}

.stay-for-moment-then-slide-right {
  animation: slideRight 1s cubic-bezier(0.86, 0, 0.07, 1) 1s forwards;
  transform: translateZ(-1px);
}

@keyframes slideRight {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(200%);
  }
}

/* @keyframes ping {
  0%,
  100% {
    transform: scale(2);
    opacity: 0;
  }
} */

@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes fadeIn {
  from {
    transform: translateX(-200%);
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes faint {
  from {
    filter: opacity(1);
  }

  to {
    filter: opacity(0.05);
    transform: translateX(-200%);
  }
}
</style>
