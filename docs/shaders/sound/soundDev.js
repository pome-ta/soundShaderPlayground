// memo: 波形数値音響確認

const float PI = acos(-1.0);
const float TAU = PI * 2.0;
float sine(float phase) {return sin(TAU * phase );}

/* GLSL */
// 2D Random
float _rnd(in vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float random(float t) {
  float rnd_x = sine(123.4 * t);
  float rnd_y = sine(567.8 * t);
  return _rnd(vec2(rnd_x, rnd_y)) - 0.5;
}

vec2 mainSound(float time){
  // float wave = sin(TAU * 440.0 * time);
  float wave = random(time);
  if (wave > 0.0) {
    return vec2(wave);
  } else {
    return vec2(0.0);
  }
}
