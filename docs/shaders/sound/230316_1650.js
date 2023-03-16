precision highp int;


// memo:
#define BPM 90.0
const float PI = acos(-1.0);
const float TAU = (PI * 2.0);

/*sound common */
float timeToBeat(float t) {return t / 60.0 * BPM; }
float beatToTime(float b) {return b / BPM * 60.0; }


vec2 mainSound(float time) {
  float bpm = timeToBeat(time);
  float signal = sin(TAU * 440.0 * time);
  float outSound = min(1.0, fract(time)) * signal;
  
  return vec2(outSound);
}

