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


vec2 mainSound( float time ) {
  float bpm = timeToBeat(time);
  //float mul_freq = pitch(floor(mod(bpm, 2.0)));
  float upDown = 2.0;
  float mul_freq = mod(sin(bpm * PI), 0.0) * upDown + upDown;
  float wave_tone = sine(pitch(mul_freq) * time);
  
  return vec2(wave_tone);
}

