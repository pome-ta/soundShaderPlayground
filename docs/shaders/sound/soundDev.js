// memo: 音をワンショットとするか？
#define BPM 90.0

const float PI = acos(-1.0);
const float TAU = PI * 2.0;

/* sound common */
float timeToBeat(float t) { return t / 60.0 * BPM; }
float beatToTime(float b) { return b / BPM * 60.0; }

float sine(float p) { return sin(TAU * p); }

float saw(float p) {
  float s = 0.0;
  for (int k=1; k<=8; k++) {
    s += (sin(TAU * float(k) * p) / float(k));
  }
  return (1.0 / 2.0) - (1.0 / PI) * s - 0.5;
}

float square(float p) {
  float s = 0.0;
  for (int k=1; k<8; k++) {
    s += sin(TAU * (2.0 * float(k) - 1.0) * p) / (2.0 * float(k) - 1.0);
  }
  return (4.0 / PI) * s;
}

float pitch(float p) { return pow(2.0, p / 12.0) * 440.0; }


vec2 mainSound(float time){
  float bpm = timeToBeat(time);
  float click = 0.0;
  // click = sine((mod(bpm, 4.0) >= 1.0 ? 440.0 : 880.0) * time) * exp(-1e2 * fract(bpm));
  float outNote = 0.0;

  float bass = saw(110.0 * time);

  float sq = smoothstep(0.4, -0.1, mod(bpm, 1.0));
  float kik_note = (cos(TAU * 32.0 * time));
  float kik_sq = kik_note * sq;
  outNote += kik_sq;
  outNote += bass * fract(-sq);
  
  // return vec2(kik_sq, click);
  return vec2(outNote);

}
