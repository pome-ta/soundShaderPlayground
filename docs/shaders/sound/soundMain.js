// memo: 
#define BPM 90.0

const float PI = acos(-1.0);
const float TAU = PI * 2.0;

/* sound common */
float timeToBeat(float t) { return t / 60.0 * BPM; }
float beatToTime(float b) { return b / BPM * 60.0; }

float sine(float phase) { return sin(TAU * phase); }
float pitch(float p) { return pow(2.0, p / 12.0) * 440.0; }


vec2 mainSound(float time){
  float bpm = timeToBeat(time);

  return vec2(sine(440.0 * time) * exp(-3.0 * time));
}

