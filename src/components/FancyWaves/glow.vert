varying vec2 vUv;
varying vec3 pos;
uniform vec4 colors[5];
varying vec4 vColors[5];

void main() {
  vUv = uv;
  pos = position;
  vColors = colors;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
