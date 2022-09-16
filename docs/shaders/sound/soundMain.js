/* 時報っぽい */

const float BPM = 60.0;
const float PI = acos(-1.0);
const float PI2 = PI * 2.0;

float timeToBeat(float time) {
  return time / 60.0 * BPM;
}

float sine(float freq, float time) {
  return sin(freq * PI2 * time);
}


vec2 mainSound(float time) {
  float beat = timeToBeat(time);
  
  float w88 = sin(PI2 * 880.0 * time) * fract(time / -4.0);
  
  float freq = mod(beat, 4.0) <= 3.0 ? 440.0 : 880.0;
  float amp = exp(-6.0 * fract(beat));
  return vec2(0.4 * (sine(freq, time) * amp));
  //return vec2(w44 / amp);
}

