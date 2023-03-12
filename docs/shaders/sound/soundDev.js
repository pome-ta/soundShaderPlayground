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

vec2 mainSound(float time) {
  //float sound = sine(pitch(0.0) * (time ));
  float hertz = 440.0;
  float waveTime = clamp(sin(time), -1.0, 1.0) * 2.0;
  float waveTone = sin(TAU * hertz * waveTime);

  return vec2(waveTone);
}


