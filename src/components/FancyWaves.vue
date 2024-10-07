<template>
  <TresCanvas
    window-size
    render-mode="manual"
    class="tw-absolute tw-top-0 tw-bottom-0 tw-left-0 tw-right-0"
  >
    <!-- <OrbitControls /> -->
    <ManualFPS />

    <TresPerspectiveCamera :position="position" :rotation="[1.3, 0, 0]" />
    <!-- <TresPerspectiveCamera /> -->
    <primitive
      v-if="showGlowMesh"
      ref="glowMesh"
      :object="_glowMesh"
      :position="[0, 50, -35]"
      :rotation="[1, 0, 0]"
    >
      <TresShaderMaterial
        :vertex-shader="glowMeshVertexShader"
        :fragment-shader="glowMeshFragmentShader"
        :uniforms="glowMeshUniforms"
      />
    </primitive>

    <primitive ref="mesh" :object="_mesh">
      <TresShaderMaterial
        :uniforms="uniforms"
        :vertex-shader="wavesVertexShader"
        :fragment-shader="wavesFragmentShader"
      />
    </primitive>
  </TresCanvas>
</template>

<script setup lang="ts">
import { ref, shallowRef, PropType, onMounted } from 'vue';
import { TresCanvas, TresPrimitive, useRenderLoop } from '@tresjs/core';
import * as THREE from 'three';

// import { OrbitControls } from '@tresjs/cientos';
import ManualFPS from './ManualFPS.vue';

import { Mesh, PlaneGeometry, ShaderMaterial } from 'three';

import wavesFragmentShader from 'src/components/FancyWaves/waves.frag';
import wavesVertexShader from 'src/components/FancyWaves/waves.vert';

import glowMeshFragmentShader from 'src/components/FancyWaves/glow.frag';
import glowMeshVertexShader from 'src/components/FancyWaves/glow.vert';

const { onLoop } = useRenderLoop();

const props = defineProps({
  speed: { type: Number, default: 1, required: true },
  noiseStrength: { type: Number, default: 1, required: true },
  colors: {
    type: Array as PropType<{ r: number; g: number; b: number }[]>,
    required: true,
  },
  brightness: { type: Number, default: 1, required: true },
});

const glowGeometry = new PlaneGeometry(250, 75, 1, 1);
const _glowMesh = new Mesh(glowGeometry);

const glowMeshUniforms = shallowRef({
  colors: {
    value: [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
  },
  time: { value: 0 },
  brightness: { value: props.brightness },
});

const glowMesh = shallowRef<TresPrimitive | null>(null);
const showGlowMesh = ref(false);

// ### ###

const geometry = new PlaneGeometry(30, 20, 150, 150);
// const mat = new MeshBasicMaterial({ color: 0x444444, wireframe: true });
const _mesh = new Mesh(geometry);

const mesh = shallowRef<TresPrimitive | null>(null);

const position = ref<[number, number, number]>([0, -3, 2]);

function updateScroll() {
  requestAnimationFrame(updateScroll);

  position.value = [0, -3, 2 + (3 - (window.scrollY / 2500) * 3)];
}

updateScroll();

onMounted(() => {
  setTimeout(() => {
    console.log('Force updating glowMesh uniforms');
    showGlowMesh.value = true;
    (glowMesh.value!.material as ShaderMaterial).needsUpdate = true;
    (glowMesh.value!.material as ShaderMaterial).uniformsNeedUpdate = true;
  }, 1000);
});

onLoop(() => {
  if (!mesh.value) return;

  if (!Number.isFinite(mesh.value.material.uniforms.time.value)) {
    mesh.value.material.uniforms.time = { value: 0 };
  }

  if (!Number.isFinite(mesh.value.material.uniforms.noiseStrength.value)) {
    mesh.value.material.uniforms.noiseStrength = { value: 1 };
  }

  const colorVectors = [];

  for (let i = 0; i < props.colors.length; i++) {
    const color = props.colors[i];

    colorVectors.push(new THREE.Vector4(color.r, color.g, color.b, 1));
  }

  mesh.value.material.uniforms.colors.value = colorVectors;

  mesh.value.material.uniforms.time.value += 0.005 * props.speed;
  mesh.value.material.uniforms.noiseStrength.value = props.noiseStrength;
  mesh.value.material.uniforms.brightness.value = props.brightness;

  if (!glowMesh.value) return;

  glowMesh.value.material.uniforms.time.value += 0.005 * props.speed;
  glowMesh.value.material.uniforms.colors.value = colorVectors;
  glowMesh.value.material.uniforms.brightness.value = props.brightness;
});

const uniforms = shallowRef({
  time: { value: 0 },
  noiseStrength: { value: 1 },
  colors: {
    value: [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
  },
  brightness: { value: props.brightness },
});
</script>
