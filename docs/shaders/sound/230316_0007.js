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
  
  float f0 = pitch(0.0);
  float f1 = pitch(2.0);
  float f2 = pitch(4.0);
  float f3 = pitch(5.0);
  float r = 0.0;
  
  int pair = int(floor(mod(bpm, 4.0)));
  float a = smoothstep(0.4, 0.6, mod(bpm, 1.0));
  
  if (pair == 0) {
    r = mix(f0, f1, a);
  } else if (pair == 1) {
    r = mix(f1, f2, a);
  } else if (pair == 2) {
    r = mix(f2, f3, a);
  } else {
    r = mix(f3, f0, a);
  }
  
  
  /*
  float base_freq = pitch(0.0);
  float p = sin(bpm * PI) * 4.0;
  
  float move_freq = pitch( (p) * 0.5 + 0.5 );
  float wave_tone = sine(base_freq * time + move_freq);
  */
  float wave_tone = sine((440.0 * r) * time);
  float smpl_tone = sine(440.0 * time);
  
  //return vec2(wave_tone);
  return vec2(wave_tone, smpl_tone + tempo);
}

