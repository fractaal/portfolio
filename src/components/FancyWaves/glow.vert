uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;
varying vec3 pos;

void main() {
  vUv = uv;
  pos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
