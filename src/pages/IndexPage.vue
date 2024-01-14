<template>
  <q-page class="">
    <div class="tw-my-24"></div>
    <img
      src="~assets/cuteglow.png"
      class="tw-w-full absolute tw-h-[1500px] -tw-top-[500px] -tw-z-30"
    />
    <div
      class="tw-w-screen; margin-top: -200px tw-h-[500px] tw-overflow-hidden -tw-mb-96 tw-border-y-white/10 tw-border-y"
    >
      <video
        autoplay
        loop
        muted
        src="~assets/smaller-vfx.mp4"
        style="width: 100%"
        class="tw-object-cover lg:-tw-mt-72 tw-relative -tw-z-20"
      />
      <div
        class="tw-bg-gradient-to-tr tw-from-fuchsia-600/5 tw-to-amber-200/20 tw-border-x-slate-50/25 tw-border-x tw-z-0 tw-h-[500px] tw-w-[425px] tw-absolute tw-top-0 tw-left-[100px] tw-backdrop-blur-md"
      ></div>
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
        :style="{ left: translucentNamesXOffset + 'px' }"
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
              💪 My strength lies in in the interdisciplinary knowledge I have.
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
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core';
import { computed, ref } from 'vue';

import glow1 from '~assets/cuteglow.png';
import glow2 from '~assets/cuteglow1.png';

const glow1Opacity = ref(0);
const glow2Opacity = ref(0);

const scroll = useWindowScroll();

let t = 0;
let offset = -440;
function animateNames() {
  t = t + 0.001;

  if (t > 1) {
    t = 0;
  }
  offset = -440 + t * -440;
  translucentNamesXOffset.value = offset - scroll.y.value / 2;
  requestAnimationFrame(animateNames);
}

animateNames();

const translucentNamesXOffset = ref(-440);

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
