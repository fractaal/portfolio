<template>
  <q-page class="">
    <div class="tw-flex-1 tw-fixed tw-p-8 tw-z-50">
      <q-btn
        @click="muted ? unmuteAndLerpValues() : muteAndLerpValues()"
        class="tw-p-4 rounded-full"
        unelevated
      >
        <q-icon
          :name="muted ? 'fa-solid fa-volume-mute' : 'fa-solid fa-volume-up'"
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
          :speed="wavesSpeed"
          :noise-strength="noiseStrength"
          :glow1-opacity="glow1Opacity"
          :glow2-opacity="glow2Opacity"
          :glow3-opacity="glow3Opacity"
          :glow4-opacity="glow4Opacity"
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
              @click="whoAreYouCommand"
              :loading="termBusy"
              >Who are you?</q-btn
            >
            <q-btn
              flat
              no-caps
              class="tw-bg-white/5"
              @click="clearCommand"
              :loading="termBusy"
              >Clear terminal</q-btn
            >
            <q-btn
              flat
              no-caps
              class="tw-bg-white/5"
              @click="toggleMusicTerm"
              :loading="termBusy"
              >Toggle music</q-btn
            >
            <q-btn
              flat
              no-caps
              class="tw-bg-white/5 tw-min-w-6"
              @click="rmRf"
              :loading="termBusy"
              >Delete everything</q-btn
            >
          </div>
          <!-- <pre class="tw-absolute -tw-bottom-12 tw-left-0 tw-p-8">
        BEAT DEBUG INFO: {{ debugTDisplay }}</pre
          > -->
          <!-- <div>
          <span class="tw-font-semibold tw-opacity-75"
            >benjude@sys: $ uname -a</span
          >
        </div> -->
          <!-- <br />
        <div></div>
        <div>
          <span class="tw-font-semibold tw-opacity-75">benjude@sys: $ </span>
          <span class="tw-font-semibold">{{ display }}</span>
        </div> -->
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
import { useKeyboardSFX } from 'src/assets/composables/useKeyboardSFX';
import { useFakeTerminal } from 'src/assets/composables/useFakeTerminal';
import { useRouter } from 'vue-router';
import ProjectItem from 'src/components/ProjectItem.vue';
import FancyWaves from 'src/components/FancyWaves.vue';
import ProjectData from 'src/projects-data';

const numProjects = ProjectData.length;
const projectDataColumn1 = ProjectData.slice(0, Math.ceil(numProjects / 2));
const projectDataColumn2 = ProjectData.slice(Math.ceil(numProjects / 2));

const hideEverything = ref(false);

const router = useRouter();

import { computed, ref, onMounted, watch } from 'vue';

const termScroll = ref<HTMLElement | null>(null);

onMounted(() => {
  const scroll = useScroll(termScroll);

  const o = new MutationObserver(() => {
    if (termBusy.value) {
      scroll.y.value = 999;
    }
  });

  o.observe(termScroll.value!, {
    attributes: true,
    childList: true,
    subtree: true,
  });
});

// const scrollValue = ref(0);
// const scroll = useWindowScroll();

// function updateScroll() {
//   requestAnimationFrame(updateScroll);

//   scrollValue.value = scroll.y.value / 2000;
// }

// updateScroll();

const glow1Opacity = ref(1);
const glow2Opacity = ref(1);
const glow3Opacity = ref(1);
const glow4Opacity = ref(1);

let offset = 0;
const translucentNamesXOffset = ref(0);
const blinkerOpacity = ref(100);

const name = 'Ben Jude';
const display = ref(name);

const term = useFakeTerminal();

const termBusy = ref(false);

const {
  mute,
  unmute,
  muted,
  context: audioContext,
  controlsEnabled,
  crash,
  beatMap,
  getPlaybackTime,
  bpm,
} = useMusic();

const keyboardSFX = useKeyboardSFX();

async function toggleMusicTerm() {
  termBusy.value = true;

  if (!term.isLatestLinePrompt()) {
    term.newPromptStringLine();
  }

  await term.wipeOutLatestLine();

  if (!controlsEnabled.value) {
    await term.fillInLatestLine('toggle_music');

    await term.keyboardSFX.playFullVolume();
    await term.newOutputStringLine();

    await term.wait(250);

    await term.fillInLatestLinePerWord(
      '⚠ Controls disabled for now, try again later'
    );

    await term.newPromptStringLine();

    await term.wait(500);

    termBusy.value = false;
    return;
  }

  if (muted.value) {
    await term.fillInLatestLine('unmute');

    await term.keyboardSFX.playFullVolume();
    await term.newOutputStringLine();

    unmuteAndLerpValues();

    await term.wait(1250);

    await term.fillInLatestLinePerWord('🔊 Music unmuted');
  } else {
    await term.fillInLatestLine('mute');

    await term.keyboardSFX.playFullVolume();
    await term.newOutputStringLine();

    muteAndLerpValues();

    await term.wait(1250);

    await term.fillInLatestLinePerWord('🔇 Music muted');
  }

  await term.emulatePressEnterOnLatestLine();

  termBusy.value = false;
}

async function clearCommand() {
  termBusy.value = true;
  if (!term.isLatestLinePrompt()) {
    term.newPromptStringLine();
  }

  await term.wipeOutLatestLine();

  await term.fillInLatestLine('clear');
  await term.emulatePressEnterOnLatestLine();

  await term.wait(500);

  await term.clearLines();

  await term.wait(500);

  await term.newPromptStringLine();

  termBusy.value = false;
}

async function whoAreYouCommand() {
  termBusy.value = true;
  if (!term.isLatestLinePrompt()) {
    term.newPromptStringLine();
  }

  await term.wipeOutLatestLine();

  await term.wait(250);

  await term.fillInLatestLine('neofetch');

  await term.keyboardSFX.playFullVolume();
  await term.newOutputStringLine(
    "Hey! My name's Benedict Jude A. Rocat -- but I often just go by Ben Jude."
  );

  await term.wait(500);

  await term.newOutputStringLine(
    '🚀 I make cohesive software, visual & acoustic experiences.'
  );

  await term.wait(700);

  // const lines = [
  //   '      ___   ____________________________    __________  ___    _   __________________',
  //   '   /   | / ____/ ____/ ____/ ___/ ___/   / ____/ __ \\/   |  / | / /_  __/ ____/ __ \\',
  //   '  / /| |/ /   / /   / __/  \__ \\__ \   / / __/ /_/ / /| | /  |/ / / / / __/ / / / /',
  //   ' / ___ / /___/ /___/ /___ ___/ /__/ /  / /_/ / _, _/ ___ |/ /|  / / / / /___/ /_/ /',
  //   '/_/  |_\\____/\\____/_____//____/____/   \\____/_/ |_/_/  |_/_/ |_/ /_/ /_____/_____/',
  // ];

  // for (let i = 0; i < lines.length; i++) {
  //   await term.newOutputStringLine(lines[i]);

  //   await term.wait(Math.random() > 0.9 ? 250 : 20);
  // }

  await term.wait(700);
  await term.newOutputStringLine();
  await term.wait(250);
  await term.newOutputStringLine(
    'My experience is varied, but mainly focused on the following:'
  );

  await term.wait(1250);
  await term.newOutputStringLine();

  // 💻 WEBDEV | ✨ VIDEO & VFX | 📦 3D | 🎮 GAMEDEV | 🎶 MUSIC'

  const lines = [
    '💻 WEBDEV',
    '✨ VIDEO & VFX',
    '📦 3D',
    '🎮 GAMEDEV',
    '🎶 MUSIC',
  ];

  for (let i = 0; i < lines.length; i++) {
    await term.newOutputStringLine(' - ' + lines[i]);

    await term.wait(100);
  }

  await term.newPromptStringLine();

  await term.wait(500);

  termBusy.value = false;
}

async function rmRf() {
  termBusy.value = true;
  if (!term.isLatestLinePrompt()) {
    term.newPromptStringLine();
  }

  await term.wipeOutLatestLine();

  await term.wait(250);

  await term.fillInLatestLine('rm -rf --no-preserve-root /');

  await term.keyboardSFX.playFullVolume();
  await term.newOutputStringLine();

  await term.wait(500);

  await term.newOutputStringLine(
    'WARNING! This is a non-standard Linux configuration (faux_linux 5.3.1)'
  );

  await term.wait(300);

  await term.newOutputStringLine(
    "DO NOT PROCEED UNLESS This is a scary warning message that's supposed to show up for just a moment!"
  );

  await term.wait(150);
  await term.newOutputStringLine();
  await term.wait(150);

  await term.newOutputStringLine('Are you sure you want to proceed?');

  await term.wait(150);

  await term.newPromptStringLine();

  await term.fillInLatestLine('y');

  await term.emulatePressEnterOnLatestLine();

  // (async () => {
  //   for (let i = 0; i < 10; i++) {
  //     term.fillInLatestLinePerWord(
  //       '☣ WHAT DID YOU DO ☣ WHAT DID YOU DO ☣ WHAT DID YOU DO ☣ WHAT DID YOU DO '
  //     );

  //     await term.wait(250 + Math.random() * 250);
  //   }
  // })();

  function uuidv4() {
    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
      (
        +c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
      ).toString(16)
    );
  }

  (async () => {
    for (let i = 0; i < 5; i++) {
      await term.newOutputStringLine(`/dev/sd${'abcdefghijklm'[i]}/`);

      await term.wait(Math.random() > 0.9 ? 250 : 20);
    }

    for (let i = 0; i < 100; i++) {
      await term.newOutputStringLine(`/home/users/benjude/${uuidv4()}`);

      await term.wait(Math.random() > 0.99 ? 250 : 20);
    }
  })();

  crash();

  await term.wait(750);

  const closeEvent = new CustomEvent('__destroy');

  window.dispatchEvent(closeEvent);

  // If didn't close one way or another, route to fallback page

  router.push('/rmrf');
}

async function temporarilyChangeText(newText: string) {
  const wipeOutLine = async () => {
    let first = true;

    const line = term.getLatestLine();
    const content = line.content;

    for (let i = 0; i < content.length; i++) {
      if (termBusy.value) {
        return;
      }

      line.content = content.slice(0, content.length - (i + 1));

      keyboardSFX.play();

      if (first) {
        first = false;
        await new Promise((resolve) => setTimeout(resolve, 100));
      } else {
        await new Promise((resolve) => setTimeout(resolve, 60));
      }
    }
  };

  const fillInLine = async (text: string) => {
    const line = term.getLatestLine();
    const content = line.content;

    for (let i = 0; i < text.length; i++) {
      if (termBusy.value) {
        return;
      }

      line.content = text.slice(0, i + 1);

      keyboardSFX.play();

      if (line.content[line.content.length - 1] === ' ') {
        await new Promise((resolve) => setTimeout(resolve, 140));
      } else {
        await new Promise((resolve) => setTimeout(resolve, 70));
      }
    }
  };

  if (termBusy.value) {
    return;
  }

  await wipeOutLine();

  if (termBusy.value) {
    return;
  }

  await new Promise((resolve) => setTimeout(resolve, 250));

  if (termBusy.value) {
    return;
  }

  await fillInLine(newText);

  if (termBusy.value) {
    return;
  }

  await new Promise((resolve) => setTimeout(resolve, 3500));

  if (termBusy.value) {
    return;
  }

  if (termBusy.value) {
    return;
  }

  await new Promise((resolve) => setTimeout(resolve, 250));
}

let textUsed: string[] = [];

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

    if (termBusy.value) {
      continue;
    }

    await temporarilyChangeText(
      texts[Math.floor(Math.random() * texts.length)]
    );
  }
});

function easeInOutExpo(x: number): number {
  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? Math.pow(2, 20 * x - 10) / 2
    : (2 - Math.pow(2, -20 * x + 10)) / 2;
}

const beatPeriod = 60 / (bpm.value * 4);

// Define your beat map

const totalBeats = beatMap.value.length;

function smoothHeartbeat(time: number) {
  const beatNumber = Math.floor(time / beatPeriod);
  const beatIndex = beatNumber % totalBeats;

  // Time elapsed since the current beat
  const currentBeatTime = beatNumber * beatPeriod;
  const timeSinceBeat = time - currentBeatTime;

  let out = 0;

  if (beatMap.value[beatIndex]) {
    // Linearly decay from 1 to 0 over the beat period

    out = Math.pow(1 - timeSinceBeat / beatPeriod, 3);
  }

  debugTDisplay.value = `${beatIndex + 1} (${
    beatMap.value[beatIndex] ? 'ON' : 'OFF'
  }) (${out.toFixed(2)}) (${time.toFixed(2)}) (${currentBeatTime.toFixed(
    2
  )}) (${timeSinceBeat.toFixed(2)})`;

  return out; // Inactive beat
}

const muteAndLerpValues = async () => {
  if (!controlsEnabled.value) return;

  mute();

  for (let i = 0; i < 50; i++) {
    a = i / 50;
    await new Promise((resolve) => setTimeout(resolve, 10));
  }

  a = 1;
};

const unmuteAndLerpValues = async () => {
  if (!controlsEnabled.value) return;

  unmute();

  for (let i = 0; i < 50; i++) {
    a = 1 - i / 50;
    await new Promise((resolve) => setTimeout(resolve, 10));
  }

  a = 0;
};

let a = 0;

if (muted.value) {
  a = 1;
} else {
  a = 0;
}

function stepped(t: number) {
  return t < 0.5 ? 0 : 1;
}

const debugTDisplay = ref('0');
const debugTDisplay2 = ref(0);

let multiplier = 1;
let multiplierAcceleration = 0;

const recentMultipliers: number[] = [];

const wavesSpeed = ref(1);
const noiseStrength = ref(1);

setInterval(() => {
  let twiceAsFastT =
    (getPlaybackTime() % (60 / (bpm.value * (2 / 3)))) /
    (60 / (bpm.value * (2 / 3)));

  let twiceAsFastFallbackT = (performance.now() % 2000) / 2000;
  let fallbackT = (performance.now() % 4000) / 4000;

  const twiceAsFastFinalT =
    twiceAsFastT + (twiceAsFastFallbackT - twiceAsFastT) * easeInOutExpo(a);

  debugTDisplay2.value = twiceAsFastFinalT;

  blinkerOpacity.value = stepped(twiceAsFastFinalT) * 100;

  const timeMs = performance.now();

  // multiplier = 0.5 + smoothHeartbeat(getPlaybackTime()) * 0.5;

  // multiplier gradually accelerates to 0

  multiplierAcceleration += 0.0025;

  multiplier -= multiplierAcceleration;

  const newMultiplier = 0.75 + smoothHeartbeat(getPlaybackTime()) * 0.25;

  if (multiplier < newMultiplier) {
    multiplier = newMultiplier;
    multiplierAcceleration = 0;
  }

  multiplier = Math.max(0.75, multiplier);

  recentMultipliers.unshift(multiplier);
  recentMultipliers.length = 5;

  let sum = 0;
  for (let i = 0; i < recentMultipliers.length; i++) {
    sum += recentMultipliers[i];
  }

  const actualMultiplier = Math.pow(sum / recentMultipliers.length, 3);
  const fallbackMultiplierWhenMuted = 0.75;

  const finalMultiplier =
    a * fallbackMultiplierWhenMuted + (1 - a) * actualMultiplier;

  wavesSpeed.value = 0.5 + Math.pow(actualMultiplier, 5) * 2;
  noiseStrength.value = 1 + Math.pow(actualMultiplier, 5) * 0.25;

  wavesSpeed.value = a * 0.5 + (1 - a) * wavesSpeed.value;
  noiseStrength.value = a * 1 + (1 - a) * noiseStrength.value;

  // recentMultipliers.unshift(multiplier);
  // recentMultipliers.length = 15;

  // let sum = 0;
  // for (let i = 0; i < recentMultipliers.length; i++) {
  //   sum += recentMultipliers[i];
  // }

  // const finalMultiplier = sum / recentMultipliers.length + a * 2;

  multiplier;

  glow1Opacity.value = (Math.sin(timeMs / 1000) / 2 + 0.5) * finalMultiplier;
  glow2Opacity.value =
    (Math.sin(timeMs / 1000 + Math.PI / 2) / 2 + 0.5) * finalMultiplier;
  glow3Opacity.value =
    (Math.sin(timeMs / 1000 + Math.PI) / 2 + 0.5) * finalMultiplier;
  glow4Opacity.value =
    (Math.sin(timeMs / 1000 + (3 * Math.PI) / 2) / 2 + 0.5) * finalMultiplier;
}, 25);

// function animate() {
//   requestAnimationFrame(animate);

//   let now = Math.round((FPS * Date.now()) / 1000);
//   console.log(now);
//   if (now === prevTick) return;

//   prevTick = now;

// }

// animate();

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
