precision highp int;


// memo:
#define BPM 110.0
const float PI = acos(-1.0);
const float TAU = (PI * 2.0);

/*sound common */
float timeToBeat(float t) {return t / 60.0 * BPM; }
float beatToTime(float b) {return b / BPM * 60.0; }

float sine(float p) { return sin(TAU * p); }
float pitch(float p) { return pow(2.0, p / 12.0) * 440.0; }

float bassDrum(in float t) {
  float bdMaster;
  float amp = exp(-0.5 * t);
  //float phase = 32.0 * t - 24.0 * exp(-1.25 * t);
  float phase = 24.0 * exp(-0.75 * t);
  // float attack = sine(phase) * amp;
  //float attack = sine(phase);
  float attack = cos(TAU * 24.0 * exp(-0.75 * t)) * pow(fract(-t), 16.0);
  bdMaster += attack;
  
  return bdMaster;
  
}

vec2 mainSound(float time) {
  float bpm = timeToBeat(time);
  float tempo = sine((mod(bpm, 4.0) >= 1.0 ? 440.0 : 880.0) * time) *
  exp(-1e2 * fract(bpm));
  float outSound;
  
  float kikTiming = mod(bpm, 8.0) < 7.0 ? mod(bpm, 1.0) : mod(bpm, 0.5);
  
  float sineTone = sine(pitch(0.0) * time) * kikTiming;
  float bd = bassDrum(kikTiming);
  
  outSound += bd;
  //outSound += sineTone;
  // outSound += tempo;
  //outSound = outSound * 0.8;
  
  return vec2(outSound);
}

