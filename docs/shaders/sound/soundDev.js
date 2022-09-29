// memo: ほげふかみほ
#define BPM 90.0

const float PI = acos(-1.0);
const float TAU = PI * 2.0;

/* sound common */
float timeToBeat(float t) { return t / 60.0 * BPM; }
float beatToTime(float b) { return b / BPM * 60.0; }

float sine(float p) { return sin(TAU * p); }
float pitch(float p) { return pow(2.0, p / 12.0) * 440.0; }


vec2 mainSound(float time){
  float bpm = timeToBeat(time);
  
  float kik_note = sine(64.0 * time);
  float kik_sq = kik_note * fract(-1.0 * bpm);
  return vec2(kik_sq);
}
