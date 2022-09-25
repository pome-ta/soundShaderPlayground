// memo: 
#define BPM 90.0

const float PI = acos(-1.0);
const float TAU = PI * 2.0;

/* sound common */
float timeToBeat(float t) { return t / 60.0 * BPM; }
float beatToTime(float b) { return b / BPM * 60.0; }

float sine(float p) { return sin(TAU * p); }
float pitch(float p) { return pow(2.0, p / 12.0) * 440.0; }


float kick(float t) {
  float ce = cos(120.0 * t -28.0 * exp(-32.0 * t));
  float a = asin(ce);
  float c = clamp(1.1 * a, -1.0, 1.0);
  //return c * exp(-4.0 * t);
  // return a;
  return ce;
}


vec2 mainSound(float time){
  float bpm = timeToBeat(time);
  // float k = kick(fract(bpm));
  float k = kick(bpm);

  return vec2(k);
}


