precision highp int;


// memo:
#define BPM 90.0
const float PI = acos(-1.0);
const float TAU = (PI * 2.0);

/*sound common */
float timeToBeat(float t) {return t / 60.0 * BPM; }
float beatToTime(float b) {return b / BPM * 60.0; }

float sine(float p) { return sin(TAU * p); }
float pitch(float p) { return pow(2.0, p / 12.0) * 440.0; }



vec2 mainSound(float time) {
  float bpm = timeToBeat(time);
  float tempo = sine((mod(bpm, 4.0) >= 1.0 ? 440.0 : 880.0) * time) *
  exp(-1e2 * fract(bpm));
  float outSound;
  float bdTone = pitch(0.0);
  float bd = sin(TAU * 42.0 * time) * exp(-4.0 * fract(bpm));
  
  outSound += bd;
  //outSound += tempo;
  //outSound = outSound * 0.8;
  
  return vec2(outSound);
}

