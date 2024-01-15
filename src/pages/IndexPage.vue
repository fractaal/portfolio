<template>
  <q-page class="">
    <div class="tw-my-8 tw-px-8">
      <q-btn
        @click="muted ? unmuteAndLerpValues() : muteAndLerpValues()"
        class="tw-p-4 rounded-full"
        unelevated
      >
        <q-icon
          :name="muted ? 'fa-solid fa-volume-mute' : 'fa-solid fa-volume-up'"
        />
      </q-btn>
    </div>
    <img
      src="~assets/cuteglow.png"
      :style="{ opacity: glow1Opacity }"
      class="tw-w-full absolute tw-h-[1500px] -tw-top-[500px] -tw-z-30"
    />
    <img
      src="~assets/cuteglow-1.png"
      :style="{ opacity: glow2Opacity }"
      class="tw-w-full absolute tw-h-[1500px] -tw-top-[500px] -tw-z-30"
    />
    <img
      src="~assets/cuteglow-2.png"
      :style="{ opacity: glow3Opacity }"
      class="tw-w-full absolute tw-h-[1500px] -tw-top-[500px] -tw-z-30"
    />
    <img
      src="~assets/cuteglow-3.png"
      :style="{ opacity: glow2Opacity }"
      class="tw-w-full absolute tw-h-[1500px] -tw-top-[500px] -tw-z-30"
    />
    <div>
      <div
        class="tw-relative tw-w-screen tw-h-[500px] tw-overflow-hidden -tw-mb-96 tw-border-y-white/10 tw-border-y"
      >
        <video
          autoplay
          loop
          muted
          src="~assets/smaller-vfx.mp4"
          style="width: 100%"
          class="tw-object-cover lg:-tw-mt-72"
        />
        <div
          class="tw-bg-gradient-to-tr tw-from-fuchsia-600/5 tw-to-amber-200/20 tw-border-x-slate-50/25 tw-border-x tw-z-0 tw-h-[500px] tw-w-[425px] tw-absolute tw-top-0 tw-left-[100px] tw-backdrop-blur-md"
        ></div>
      </div>
    </div>
    <div
      class="tw-font-medium tw-ml-32 tw-text-xl -tw-mb-4 tw-relative tw-z-5"
      style="text-shadow: 0 0 50px rgba(0, 0, 0, 0.8)"
    >
      <span class="tw-ml-1">Hi! My name is</span>
    </div>
    <div class="tw-mx-32 tw-z-5 tw-relative">
      <div
        class="tw-font-black tw-text-8xl tw-tracking-tight tw-opacity-20 tw-w-[100vw] absolute tw-whitespace-nowrap"
        :style="{ transform: 'translateX(' + translucentNamesXOffset + 'px)' }"
      >
        Ben Jude Ben Jude Ben Jude Ben Jude Ben Jude Ben Jude Ben Jude Ben Jude
      </div>
      <div
        class="tw-font-black tw-text-8xl tw-tracking-tight"
        style="text-shadow: 0 0 50px rgba(0, 0, 0, 0.8)"
      >
        Ben Jude
      </div>
      <div
        class="tw-font-mono tw-font-medium tw-text-2xl tw-ml-1 -tw-mt-4 tw-uppercase"
        style="text-shadow: 2px 4px 20px rgba(0, 0, 0, 1)"
      >
        Digital Generalist
        <br />
        <span class="tw-text-xs -tw-mt-1 tw-block"
          >DEVELOPER | VFX ARTIST | PRODUCER</span
        >
      </div>
      <div
        class="tw-font-mono tw-font-medium tw-text-2xl tw-ml-1 tw-p-4 tw-flex tw-flex-col"
        style="text-shadow: 2px 4px 20px rgba(0, 0, 0, 1)"
      >
        <span class="tw-text-sm"
          >✨ I specialize in a <i>lot</i> of things,<br />but mostly</span
        >
        <ul class="tw-mt-4">
          <li>🚀 WEBDEV</li>
          <li>🏆 VIDEO EDITING & VFX</li>
          <li>📦 3D ANIMATION</li>
          <li>🎶 MUSIC PRODUCTION</li>
        </ul>
      </div>
    </div>
    <div class="tw-h-24"></div>
    <div class="tw-h-96 xl:tw-mx-96 tw-mx-8">
      <div class="tw-flex tw-items-center tw-gap-4">
        <div
          class="tw-flex-1 tw-bg-gradient-to-tr tw-from-amber-600/25 tw-via-red-500/25 tw-to-fuchsia-500 tw-p-[1.5px] tw-rounded-xl tw-shadow-fuchsia-700/25 tw-shadow-2xl tw-w-fit"
        >
          <div class="tw-w-full tw-h-full tw-rounded-xl tw-bg-[#02020f] tw-p-4">
            <div
              class="tw-font-mono tw-text-2xl tw-font-semibold tracking-wide tw-italic tw-max-w-lg"
            >
              💪 My strength lies in the interdisciplinary knowledge I have.
            </div>
          </div>
        </div>
        <div
          class="tw-w-12 tw-h-[2.5px] tw-bg-gradient-to-r tw-from-transparent tw-via-fuchsia-500/50 tw-to-white tw-rounded-full"
        ></div>
        <div
          class="tw-flex-1 tw-text-3xl tw-font-black tw-italic"
          style="text-shadow: 0px 0px 20px rgba(1, 1, 1, 1)"
        >
          🚀 Cohesive software, visual & acoustic experiences
        </div>
      </div>
      <div
        class="tw-w-fit tw-mx-auto tw-mt-8 tw-font-black tw-text-2xl tw-italic tw-opacity-25"
      >
        More to come...
      </div>
      <div class="tw-flex tw-items-center tw-gap-2 tw-mt-8 tw-mx-auto tw-w-fit">
        <div
          class="tw-bg-gradient-to-r tw-from-transparent tw-via-fuchsia-500 tw-to-white tw-h-[1.5px] tw-rounded-full tw-w-24"
        ></div>
        <div class="tw-font-mono">FIND ME AT</div>
        <div
          class="tw-bg-gradient-to-l tw-from-transparent tw-via-fuchsia-500 tw-to-white tw-h-[1.5px] tw-rounded-full tw-w-24"
        ></div>
      </div>
      <div class="tw-flex tw-gap-8 tw-mt-4 tw-mx-auto tw-w-fit">
        <div
          @click="openYouTube"
          class="tw-bg-gradient-to-tr tw-from-amber-600/25 tw-via-red-500 tw-to-fuchsia-500 tw-p-[1.5px] tw-rounded-3xl tw-shadow-fuchsia-700/25 hover:tw-shadow-fuchsia-700/75 tw-shadow-2xl tw-w-fit hover:tw-scale-110 hover:tw-cursor-pointer tw-transition-all tw-duration-300"
        >
          <div
            class="tw-h-40 tw-rounded-3xl tw-bg-[#02020f] tw-w-40 tw-p-4 tw-flex tw-flex-col tw-items-center tw-justify-center hover:tw-bg-transparent tw-duration-300"
          >
            <q-icon name="fa-brands fa-youtube" class="tw-text-6xl" />
            <div class="tw-text-xl tw-font-semibold">Filmic</div>
            <div class="tw-text-xs tw-tracking-tighter">
              YouTube Channel | VFX
            </div>
          </div>
        </div>

        <div
          @click="openGitHub"
          class="tw-bg-gradient-to-tr tw-to-teal-600/25 tw-via-emerald-500 tw-from-teal-500 tw-p-[1.5px] tw-rounded-3xl tw-shadow-teal-500/25 hover:tw-shadow-teal-700/75 tw-shadow-2xl tw-w-fit hover:tw-scale-110 hover:tw-cursor-pointer tw-transition-all tw-duration-300"
        >
          <div
            class="tw-h-40 tw-rounded-3xl tw-bg-[#02020f] tw-w-40 tw-p-4 tw-flex tw-flex-col tw-items-center tw-justify-center hover:tw-bg-transparent tw-duration-300"
          >
            <q-icon name="fa-brands fa-github" class="tw-text-6xl" />
            <div class="tw-text-xl tw-font-semibold">Fractal</div>
            <div class="tw-text-xs tw-tracking-tighter">GitHub | Webdev</div>
          </div>
        </div>

        <div
          @click="openSoundCloud"
          class="tw-bg-gradient-to-tl tw-from-fuchsia-600/25 tw-via-red-500 tw-to-amber-500 tw-p-[1.5px] tw-rounded-3xl tw-shadow-fuchsia-700/25 hover:tw-shadow-fuchsia-700/75 tw-shadow-2xl tw-w-fit hover:tw-scale-110 hover:tw-cursor-pointer tw-transition-all tw-duration-300"
        >
          <div
            class="tw-h-40 tw-rounded-3xl tw-bg-[#02020f] tw-w-40 tw-p-4 tw-flex tw-flex-col tw-items-center tw-justify-center hover:tw-bg-transparent tw-duration-300"
          >
            <q-icon name="fa-brands fa-soundcloud" class="tw-text-6xl" />
            <div class="tw-text-xl tw-font-semibold">Seventh</div>
            <div class="tw-text-xs tw-tracking-tighter">SoundCloud | Music</div>
          </div>
        </div>
      </div>
      <div class="tw-h-32"></div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core';
import { useMusic } from 'src/assets/composables/useMusic';
import { computed, ref } from 'vue';

const glow1Opacity = ref(1);
const glow2Opacity = ref(1);
const glow3Opacity = ref(1);
const glow4Opacity = ref(1);

const scroll = useWindowScroll();

let offset = -440;

const translucentNamesXOffset = ref(-440);

const {
  mute,
  unmute,
  muted,
  context: audioContext,
  controlsEnabled,
} = useMusic();

function easeInOutExpo(x: number): number {
  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? Math.pow(2, 20 * x - 10) / 2
    : (2 - Math.pow(2, -20 * x + 10)) / 2;
}

const decayRate = 10;
const beatPeriod = 60 / 87;

let multiplier = 1;

function smoothHeartbeat(time: number) {
  let _time = time % beatPeriod;

  let samplePoints = 64;
  let sampleRange = 0.75;

  let startingSamplePoint = (_time - sampleRange / 2) % beatPeriod;

  let stepSize = sampleRange / samplePoints;

  const samples = [];

  for (let i = 0; i < samplePoints; i++) {
    let sampleTime = startingSamplePoint + i * stepSize;
    samples.push(Math.exp(-decayRate * sampleTime));
  }

  let sum = 0;

  for (let i = 0; i < samples.length; i++) {
    sum += samples[i];
  }

  return sum / samples.length;
}

const recentMultipliers: number[] = [];

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

function animate() {
  let t = (audioContext.currentTime % ((60 / 87) * 4)) / 3;
  let fallbackT = (performance.now() % 4000) / 4000;

  t = easeInOutExpo(t);

  const finalT = t + (fallbackT - t) * easeInOutExpo(a);

  offset = -440 + finalT * -440;

  translucentNamesXOffset.value = offset - scroll.y.value / 2;

  const timeMs = performance.now();

  multiplier = 0.5 + smoothHeartbeat(audioContext.currentTime) * 0.5;

  recentMultipliers.unshift(multiplier);
  recentMultipliers.length = 15;

  let sum = 0;
  for (let i = 0; i < recentMultipliers.length; i++) {
    sum += recentMultipliers[i];
  }

  const finalMultiplier = sum / recentMultipliers.length + a * 2;

  glow1Opacity.value = (Math.sin(timeMs / 1000) / 2 + 0.5) * finalMultiplier;
  glow2Opacity.value =
    (Math.sin(timeMs / 1000 + Math.PI / 2) / 2 + 0.5) * finalMultiplier;
  glow3Opacity.value =
    (Math.sin(timeMs / 1000 + Math.PI) / 2 + 0.5) * finalMultiplier;
  glow4Opacity.value =
    (Math.sin(timeMs / 1000 + (3 * Math.PI) / 2) / 2 + 0.5) * finalMultiplier;

  requestAnimationFrame(animate);
}

animate();

function animateGlow() {
  // TODO: Stuff
  requestAnimationFrame(animateGlow);
}

animateGlow();

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
