<template>
  <div
    class="tw-w-full tw-flex tw-flex-col tw-transition-all tw-duration-700 tw-ease-out-expo"
  >
    <!-- THING: {{ project }} -->
    <div
      ref="projectItem"
      class="tw-ring-1 tw-ring-white/25 tw-flex-1 tw-flex tw-relative tw-rounded-xl tw-m-4 tw-p-4 tw-overflow-hidden tw-duration-300 tw-transition-transform tw-ease-out-expo tw-z-50"
      :class="!allImagesLoaded ? 'tw-min-h-64' : ''"
      :style="`aspect-ratio: ${lowestAspectRatio};`"
    >
      <!-- <div
        class="tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-bottom-0 tw-flex tw-justify-center tw-items-center tw-transition-all tw-duration-700 tw-ease-out-expo tw-z-10 tw-group hover:tw-bg-black/50"
      >
        <div
          class="tw-font-mono tw-transition-all tw-duration-200 tw-opacity-0 group-hover:tw-scale-125 group-hover:tw-opacity-100"
        >
        </div>
      </div> -->

      <div
        class="tw-absolute tw-min-h-32 -tw-z-[1] tw-top-0 tw-left-0 tw-right-0 tw-bg-gradient-to-b tw-from-black via-black/60 tw-to-transparent"
      ></div>

      <div
        class="tw-flex tw-flex-col tw-w-full -tw-space-y-1 tw-pointer-events-none"
      >
        <span class="tw-font-black tw-text-lg">
          {{ project?.name ?? 'Unknown Project' }}
        </span>
        <div class="tw-ml-1">
          <q-icon
            class="-tw-mt-1 tw-mr-2"
            :name="project?.main_discipline.icon ?? 'fas fa-question'"
          />
          <span> {{ project?.main_discipline.name ?? 'None' }} </span>
        </div>
        <div class="tw-flex-grow tw-pointer-events-none"></div>
        <div class="tw-flex tw-justify-between">
          <div class="tw-flex tw-w-full tw-justify-between">
            <q-btn
              @click="showDetails = !showDetails"
              flat
              no-caps
              class="tw-bg-black/20 tw-backdrop-blur-md tw-pointer-events-auto tw-transition-all tw-duration-300"
              :class="showDetails && projectHasVideo ? 'tw-mb-16' : ''"
            >
              <q-icon
                :class="chevronClass"
                size="xs"
                class="tw-duration-300 tw-mr-2"
                name="fas fa-chevron-down"
              ></q-icon>

              <span v-if="showDetails"> Less Details </span>
              <span v-else> More Details </span>
            </q-btn>
            <!-- <q-btn
              class="tw-bg-black/20 tw-backdrop-blur-md"
              no-caps
              flat
              @click="showFullscreen = true"
            >
              <q-icon name="fas fa-tv" size="xs" />
            </q-btn> -->
          </div>
        </div>
        <!--spacer-->
        <!-- <div class="tw-font-black tw-text-lg tw-text-right">
          Curator - LLM Powered Horror Game
        </div> -->
      </div>

      <transition-group name="fade">
        <div
          v-if="activeImageURL.includes('.mp4') && allImagesLoaded"
          class="tw-bg-black tw-w-full tw-h-full tw-object-cover tw-absolute tw-top-0 tw-left-0 tw-bottom-0 tw-right-0 -tw-z-10"
        ></div>
        <img
          v-else-if="!activeImageURL.includes('.mp4') && allImagesLoaded"
          :src="activeImageURL"
          :key="activeImageURL"
          class="tw-object-cover tw-blur-lg tw-absolute tw-h-full tw-w-full tw-top-0 tw-left-0 tw-bottom-0 tw-right-0 -tw-z-10"
        />
        <q-skeleton
          v-else
          class="tw-object-cover tw-absolute tw-h-full tw-w-full tw-top-0 tw-left-0 tw-bottom-0 tw-right-0"
        />
      </transition-group>

      <transition-group name="fade">
        <video
          v-if="activeImageURL.includes('.mp4') && allImagesLoaded"
          autoplay
          loop
          muted
          controls
          :src="activeImageURL"
          class="tw-w-full tw-h-full tw-object-contain tw-absolute tw-top-0 tw-left-0 tw-bottom-0 tw-right-0 -tw-z-10"
        ></video>
        <img
          v-else-if="!activeImageURL.includes('.mp4') && allImagesLoaded"
          :src="activeImageURL"
          :key="activeImageURL"
          :class="showDetails ? '' : 'slow-zoom'"
          :style="'animation-delay: ' + slowZoomAnimationDelay + 's'"
          class="tw-object-contain tw-absolute tw-h-full tw-w-full tw-top-0 tw-left-0 tw-bottom-0 tw-right-0 -tw-z-10"
        />
        <div
          v-else
          class="tw-absolute tw-h-full tw-w-full tw-top-0 tw-left-0 tw-bottom-0 tw-right-0 tw-flex tw-justify-center tw-items-center -tw-z-10"
        >
          <div class="tw-font-mono tw-text-lg tw-tracking-wider">LOADING</div>
        </div>
      </transition-group>
    </div>
    <transition mode="out-in" name="details">
      <div
        v-show="showDetails"
        class="tw-duration-500 tw-transition-all tw-ease-in-out-cubic tw-mx-4 tw-rounded-xl tw-ring-1 tw-ring-slate-200/20 tw-bg-black/75 tw-overflow-clip tw-p-4 tw-min-h-[12rem] tw-font-mono tw-flex tw-flex-col tw-relative tw-mb-12 tw-backdrop-blur-lg"
      >
        <div class="tw-w-full tw-flex tw-justify-center tw-mb-6 tw-gap-3">
          <div
            v-for="(image, index) in images"
            :key="index"
            v-ripple
            :class="
              activeImage === index
                ? 'tw-bg-white tw-h-6 tw-w-6 -tw-mt-1'
                : 'tw-h-4 tw-w-4 tw-bg-white/20'
            "
            @click="changeImage(index)"
            class="tw-relative tw-cursor-pointer tw-rounded-full hover:tw-scale-150 tw-duration-200"
          ></div>
        </div>
        <div class="tw-flex tw-gap-4 tw-flex-col lg:tw-flex-row">
          <div class="tw-flex-1">
            <span
              v-if="project"
              class="tw-text-base"
              v-html="project?.description"
            ></span>
          </div>

          <div class="tw-flex-shrink">
            <span class="tw-flex tw-gap-2 tw-ml-2">
              <q-icon
                name="fas fa-yin-yang"
                size="xs"
                class="tw-mt-1.5 -tw-ml-2"
              />
              <p class="tw-text-lg tw-font-semibold">DISCIPLINES</p></span
            >
            <div class="tw-w-full tw-h-[1px] tw-bg-white tw-my-1"></div>
            <ul v-if="project">
              <li
                v-for="discipline in project.disciplines"
                :key="discipline.name"
                class="tw-flex tw-gap-2 tw-ml-1"
              >
                <q-icon :name="discipline.icon" class="tw-mt-1" />{{
                  discipline.name
                }}
              </li>
            </ul>
            <br />

            <span class="tw-flex tw-gap-2 tw-ml-2">
              <q-icon
                name="fas fa-memory"
                size="xs"
                class="tw-mt-1.5 -tw-ml-2"
              />
              <p class="tw-text-lg tw-font-semibold">TECHNOLOGIES</p></span
            >
            <div class="tw-w-full tw-h-[1px] tw-bg-white tw-my-1"></div>

            <ul v-if="project">
              <li
                v-for="technology in project.technologies"
                :key="technology.name"
                class="tw-flex tw-gap-2 tw-ml-1"
              >
                <q-icon :name="technology.icon" class="tw-mt-1" />{{
                  technology.name
                }}
              </li>
            </ul>
          </div>
        </div>

        <div
          class="tw-absolute tw-top-0 tw-bottom-0 tw-left-0 tw-right-0 tw-rounded-xl tw-overflow-hidden tw-opacity-50 tw-pointer-events-none"
        >
          <!-- <img
            src="/frosted_glass_noise.png"
            style="width: 100%; height: 100%"
            class="tw-object-cover"
            alt=""
          /> -->
        </div>
      </div>
    </transition>
    <q-dialog
      v-model="showFullscreen"
      full-height
      full-width
      transition-show="fade"
      transition-hide="fade"
    >
      <div
        class="tw-w-full tw-h-full tw-flex tw-flex-col tw-bg-black/20 tw-backdrop-blur-md tw-relative tw-p-4"
      >
        <div class="tw-text-white tw-font-sans">
          <span class="tw-font-black tw-text-lg">
            {{ project?.name ?? 'Unknown Project' }}
          </span>
          <div class="tw-ml-1">
            <q-icon
              class="-tw-mt-1 tw-mr-2"
              :name="project?.main_discipline.icon ?? 'fas fa-question'"
            />
            <span> {{ project?.main_discipline.name ?? 'None' }} </span>
          </div>
          <div class="tw-my-4 tw-font-mono">{{ project?.description }}</div>
        </div>
        <div
          class="tw-flex-1 tw-w-full tw-flex tw-items-center tw-justify-center tw-overflow-hidden tw-rounded-xl"
        >
          <video
            v-if="activeImageURL.includes('.mp4')"
            autoplay
            loop
            muted
            :src="activeImageURL"
            class="tw-object-contain"
          ></video>
          <img
            v-else
            :src="activeImageURL"
            :key="activeImageURL"
            class="tw-object-contain"
          />
        </div>

        <div class="tw-w-full tw-flex tw-justify-center tw-gap-3 tw-my-8">
          <div
            v-for="(image, index) in images"
            :key="index"
            v-ripple
            :class="
              activeImage === index
                ? 'tw-bg-white tw-h-6 tw-w-6 -tw-mt-1'
                : 'tw-h-4 tw-w-4 tw-bg-white/20'
            "
            @click="changeImage(index)"
            class="tw-relative tw-cursor-pointer tw-rounded-full hover:tw-scale-150 tw-duration-200"
          ></div>
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineProps, onMounted } from 'vue';

type Discipline = {
  name: string;
  icon: string;
};

type Technology = {
  name: string;
  icon: string;
};

type Project = {
  name: string;
  // tileAspectRatio: number;
  description: string;
  images: string[];
  main_discipline: Discipline;
  disciplines: Discipline[];
  technologies: Technology[];
};

const { project } = defineProps({
  project: {
    type: Object as () => Project,
  },
});

const projectItem = ref<HTMLElement>();
const showFullscreen = ref(false);

setInterval(() => {
  if (projectItem.value) {
    if (projectItem.value.matches(':hover')) {
    }
  }
});

const showDetails = ref(false);
const chevronClass = computed(() => (showDetails.value ? 'upside-down' : ''));

const detailsClass = computed(() => (showDetails.value ? 'tw-h-96' : 'tw-h-0'));

const activeImage = ref(0);

const changeImage = (index: number) => {
  autoChange.value = false;
  activeImage.value = index;
};

const changeGuaranteeImage = () => {
  let nextImage = (activeImage.value + 1) % images.value.length;

  let nextImageIsVideo = images.value[nextImage].includes('.mp4');

  while (nextImageIsVideo) {
    nextImage = (nextImage + 1) % images.value.length;
    nextImageIsVideo = images.value[nextImage].includes('.mp4');
  }

  activeImage.value = nextImage;
};

const autoChange = ref(true);

watch(showDetails, (val) => {
  if (val) {
    autoChange.value = false;

    const videoImageIndex = images.value.findIndex((url) =>
      url.includes('.mp4')
    );

    if (videoImageIndex !== -1) {
      activeImage.value = videoImageIndex;
    }
  } else {
    changeGuaranteeImage();
    autoChange.value = true;
  }
});

const projectHasVideo = computed(() =>
  project?.images.some((url) => url.includes('.mp4'))
);

const activeImageURL = computed(() => images.value[activeImage.value]);

const images = ref([...(project?.images ?? [])]);

const lowestAspectRatio = ref(0);

const allImagesLoaded = ref(false);

onMounted(async () => {
  const ratios = await Promise.all(
    images.value.map(async (url) => {
      if (url.includes('.mp4')) {
        return 16 / 9;
      }

      const img = new Image();
      img.src = url;
      await img.decode();

      console.log(
        `Image ${url} has aspect ratio of ${img.width / img.height} (${
          img.width
        }x${img.height})`
      );
      return img.width / img.height;
    })
  );

  allImagesLoaded.value = true;

  lowestAspectRatio.value = Math.min(...ratios);
  // lowestAspectRatio.value =
  //   lowestAspectRatio.value + lowestAspectRatio.value * (1 / 6);

  await new Promise((resolve) =>
    setTimeout(resolve, Math.round(Math.random() * 5) * 1000)
  );

  setInterval(() => {
    if (autoChange.value) {
      changeGuaranteeImage();
    }
  }, 7500);
});

const slowZoomAnimationDelay = ref(Math.round(Math.random() * 5));
</script>

<style scoped>
.upside-down {
  transform: rotate(180deg);
}

.details-enter-active {
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.details-leave-active {
  transition: all 0.2s cubic-bezier(0.895, 0.03, 0.685, 0.22);
}

.details-enter-from,
.details-leave-to {
  transform: translate3d(0, -100px, 0px);
  filter: opacity(0.5);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slow-zoom {
  animation: slow-zoom 60s infinite linear;
}

@keyframes slow-zoom {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
