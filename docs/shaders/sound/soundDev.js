//precision highp float;
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

vec2 mainSound(const float time) {
  float bpm = timeToBeat(time);
  float p;
  bool swtch = true;
  if (swtch) {
    
  }
  vec2 loopng = vec2(-1.0, 1.0);
  p = sin(bpm);
  //p -= fract(-bpm);
  float sound = sine(pitch(p) * time);

  return vec2(sound);
}


