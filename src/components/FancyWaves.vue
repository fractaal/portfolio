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
    <primitive ref="glowMesh" :object="_glowMesh">
      <TresShaderMaterial
        :vertex-shader="glowMeshVertexShader"
        :fragment-shader="glowMeshFragmentShader"
        :uniforms="glowMeshUniforms"
      />
    </primitive>

    <primitive ref="mesh" :object="_mesh">
      <TresShaderMaterial
        :uniforms="uniforms"
        :vertex-shader="vertexShader"
        :fragment-shader="fragmentShader"
      />
    </primitive>
  </TresCanvas>
</template>

<script setup lang="ts">
import { ref, shallowRef, computed, watch } from 'vue';
import {
  TresCanvas,
  TresPrimitive,
  useRenderLoop,
  useTexture,
} from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';
import ManualFPS from './ManualFPS.vue';

import { Mesh, PlaneGeometry } from 'three';

const { onLoop } = useRenderLoop();

// ###### lights

const glowGeometry = new PlaneGeometry(500, 75, 1, 1);
const _glowMesh = new Mesh(glowGeometry);

const glowMeshUniforms = {
  glow1: { type: 't', value: await useTexture(['/cuteglow.png']) },
  glow2: { type: 't', value: await useTexture(['/cuteglow-1.png']) },
  glow3: { type: 't', value: await useTexture(['/cuteglow-2.png']) },
  glow4: { type: 't', value: await useTexture(['/cuteglow-3.png']) },

  glow1Opacity: { value: 0.5 },
  glow2Opacity: { value: 0.5 },
  glow3Opacity: { value: 0.5 },
  glow4Opacity: { value: 0.5 },
};

const glowMeshVertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const glowMeshFragmentShader = `
varying vec2 vUv;
uniform sampler2D glow1;
uniform sampler2D glow2;
uniform sampler2D glow3;
uniform sampler2D glow4;

uniform float glow1Opacity;
uniform float glow2Opacity;
uniform float glow3Opacity;
uniform float glow4Opacity;

void main() {
  vec4 color = vec4(0.0);  // Start with an empty color (transparent black)

  float totalOpacity = 1.0; // glow1Opacity + glow2Opacity + glow3Opacity + glow4Opacity;

  // Normalize the opacities so they sum up to 1
  float glow1OpacityNormalized = glow1Opacity / totalOpacity;
  float glow2OpacityNormalized = glow2Opacity / totalOpacity;
  float glow3OpacityNormalized = glow3Opacity / totalOpacity;
  float glow4OpacityNormalized = glow4Opacity / totalOpacity;

  // Get the glow colors and multiply their alpha channels by the normalized opacities
  vec4 glow1Color = texture2D(glow1, vUv);
  glow1Color.a *= glow1OpacityNormalized;

  vec4 glow2Color = texture2D(glow2, vUv);
  glow2Color.a *= glow2OpacityNormalized;

  vec4 glow3Color = texture2D(glow3, vUv);
  glow3Color.a *= glow3OpacityNormalized;

  vec4 glow4Color = texture2D(glow4, vUv);
  glow4Color.a *= glow4OpacityNormalized;

  // Blend the colors in order, using alpha blending
  // Color blending equation: C_final = C1 * A1 + C2 * A2 * (1 - A1)
  // This repeats for each additional color
  color = glow1Color; // Start with the first glow

  // Blend glow2 over glow1
  color.rgb = mix(color.rgb, glow2Color.rgb, glow2Color.a);
  color.a += glow2Color.a * (1.0 - color.a);  // Accumulate the alpha properly

  // Blend glow3 over the result
  color.rgb = mix(color.rgb, glow3Color.rgb, glow3Color.a);
  color.a += glow3Color.a * (1.0 - color.a);

  // Blend glow4 over the result
  color.rgb = mix(color.rgb, glow4Color.rgb, glow4Color.a);
  color.a += glow4Color.a * (1.0 - color.a);

  // Output the final blended color
  gl_FragColor = color;
}
`;

const glowMesh = shallowRef<TresPrimitive | null>(null);

watch(glowMesh, (value) => {
  if (!value) return;

  value.rotation.x = 3.14 / 2;
  value.position.y = 50;
  value.position.z = -35;
});

// ### ###

const geometry = new PlaneGeometry(30, 20, 250, 250);
// const mat = new MeshBasicMaterial({ color: 0x444444, wireframe: true });
const _mesh = new Mesh(geometry);

const mesh = shallowRef<TresPrimitive | null>(null);

const position = ref([0, -3, 2]);

function updateScroll() {
  requestAnimationFrame(updateScroll);

  position.value = [0, -3, 2 + (3 - (window.scrollY / 2500) * 3)];
}

updateScroll();

const props = defineProps({
  speed: { type: Number, default: 1 },
  noiseStrength: { type: Number, default: 1 },

  glow1Opacity: { type: Number, default: 0.5 },
  glow2Opacity: { type: Number, default: 0.5 },
  glow3Opacity: { type: Number, default: 0.5 },
  glow4Opacity: { type: Number, default: 0.5 },
});

onLoop(({ elapsed }) => {
  if (!mesh.value) return;

  if (!Number.isFinite(mesh.value.material.uniforms.time.value)) {
    mesh.value.material.uniforms.time = { value: 0 };
  }

  if (!Number.isFinite(mesh.value.material.uniforms.noiseStrength.value)) {
    mesh.value.material.uniforms.noiseStrength = { value: 1 };
  }

  mesh.value.material.uniforms.time.value += 0.005 * props.speed;
  mesh.value.material.uniforms.noiseStrength.value = props.noiseStrength;

  if (!glowMesh.value) return;

  glowMesh.value.material.uniforms.glow1Opacity.value = props.glow1Opacity;
  glowMesh.value.material.uniforms.glow2Opacity.value = props.glow2Opacity;
  glowMesh.value.material.uniforms.glow3Opacity.value = props.glow3Opacity;
  glowMesh.value.material.uniforms.glow4Opacity.value = props.glow4Opacity;
});

const uniforms = shallowRef({
  time: { value: 0 },
  noiseStrength: { value: 1 },
});

const vertexShader = ref(`
//
// Description : Array and textureless GLSL 2D/3D/4D simplex
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : ijm
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v)
  {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

// Permutations
  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients: 7x7 points over a square, mapped onto an octahedron.
// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
  }

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

varying vec4 vColor;
varying vec2 vUv;
uniform float time;
uniform float noiseStrength;

void main() {


  float tilt = -0.8  * uv.y;

  float noise = snoise(vec3(uv.x * 4.0 + time * 0.2, uv.y * 8.0, time * 0.2)) * 7.0;

  noise = noise * noiseStrength;


  vec3 pos = vec3(position.x, position.y, position.z);
  pos.z = pos.z + noise * 0.1 + tilt;
  pos.z -= 0.1;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

  vec4 colors[5] = vec4[5](
    vec4(41.6/100.0, 35.7/100.0, 98.8/100.0, 1.0),
    vec4(97.6/100.0, 50.2/100.0, 38.4/100.0, 1.0),
    vec4(82.7/100.0, 41.2/100.0, 86.7/100.0, 1.0),
    vec4(44.3/100.0, 34.9/100.0, 98.0/100.0, 1.0),
    vec4(76.5/100.0, 49.0/100.0, 73.3/100.0, 1.0)
  );

  vColor = colors[0];

  for (int i = 1; i < 5; i++) {
    float noiseFlow = (1.0 + float(i) * 0.5) * 0.05;
    float noiseSpeed = (2.0 + float(i) * 0.3) * 0.05;
    float noiseSeed = (1.0 + float(i) * 10.0) * 0.05;

    float noiseFloor = 0.1;
    float noiseCeil = 0.6 + float(i) * 0.07;

    float noise = smoothstep(noiseFloor, noiseCeil, snoise(vec3(
    uv.x * 3.0 + time * noiseFlow,
    uv.y * 3.0,
    time * noiseSpeed + noiseSeed)));

    vColor = mix(vColor, colors[i], noise);

    vec4 _ = vColor;
  vColor = mix(vColor, vec4(2.0/255.0, 2.0/255.0, 15.0/255.0, 1.0), map(pos.z, -1.0, 1.0, 0.2, 1.5));
    // vColor = mix(vColor, vec4(1.0,1.0,1.0,1.0), pos.z * 0.001);
  }



  vUv = uv;
}
`);

const fragmentShader = ref(`
uniform float time;
varying vec2 vUv;
varying vec4 vColor;

void main() {
  gl_FragColor = vColor;
}
`);
</script>
