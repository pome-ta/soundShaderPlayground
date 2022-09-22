// memo: 
#define BPM 90.0

const float PI = acos(-1.0);
const float TAU = PI * 2.0;

/* sound common */
float timeToBeat(float t) { return t / 60.0 * BPM; }
float beatToTime(float b) { return b / BPM * 60.0; }

float sine(float phase) { return sin(TAU * phase); }
float pitch(float p) { return pow(2.0, p / 12.0) * 440.0; }


float kick(float t) {
  return clamp(1.1 * asin(cos(120.0 * t -28.0 * exp(-32.0 * t))), -1.0, 1.0) * exp(-4.0 * t);
}


vec2 mainSound(float time){
  float bpm = timeToBeat(time);
  float k = kick(fract(bpm));

  return vec2(k);
}

