precision highp float; /* 既に外側で宣言してるけど */
precision highp int;

// memo:

#define BPM 90.0
const float PI = acos(-1.0);
const float TAU = (PI * 2.0);

/* sound common */
float timeToBeat(float t) {return t / 60.0 * BPM; }
float beatToTime(float b) {return b / BPM * 60.0; }

float sine(float p) { return sin(TAU * p); }
float pitch(float p) { return pow(2.0, p / 12.0) * 440.0; }

vec2 mainSound(float time) {
  float bpm = timeToBeat(time);
  float tempo = sine((mod(bpm, 4.0) >= 1.0 ? 440.0 : 880.0) * time) *
  exp(-1e2 * fract(bpm));
  
  
  float s =
      sin(2.0 * PI * pitch(0.0) * time)
    + sin(2.0 * PI * pitch(3.0) * time)
    + sin(2.0 * PI * pitch(7.0) * time);
  
  //float waveTone = max(0.0, 1.0 - bpm) * (s * 0.3);
  float waveTone =  max(0.0, 1.0 - sin(bpm * PI)) * (s * 0.3);
  return vec2(waveTone);
  //return vec2(wave_tone, smpl_tone + tempo);
}

