precision highp float;  /* 既に内部で呼んでるけど */
precision highp int;

// memo: 

#define BPM 90.0
const float PI = acos(-1.0);
const float TAU = PI * 2.0;

/* sound common */
float timeToBeat(float t) {return t / 60.0 * BPM;}
float beatToTime(float b) {return b / BPM * 60.0;}


float sine(float p) { return sin(TAU * p); }
float pitch(float p) { return pow(2.0, p / 12.0) * 440.0; }



float tri(in float freq, in float time) {
  return -abs(1.0 - mod(freq * time * 2.0, 2.0));
}

vec2 mainSound( float time ) {
  float freq = 440.0;
  // freq *= pow(1.06 * 1.06, floor(mod(time, 6.0)));
  freq *= pow(1.06 * 1.06, floor(mix(-1.0, 0.5, sin(time * PI))));
  // freq *= pow(1.06 * 1.06, floor(mod(time, 6.0)) + sin(mod(time, 6.0)));
  return vec2(
    tri(freq, time) * sin(time * PI),
    tri(freq * 1.5, time) * sin(time * PI)
  );
}
