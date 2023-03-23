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
  
  float attack = cos(TAU * 24.0 * exp(-0.75 * t)) * pow(fract(-t), 16.0);
  
  float p = sin(t * PI) / 4.0;
  float moveFreq = pitch( (p) * 0.5);
  
  float body = sine(32.0 * t + moveFreq) * fract(-t-2.0);
  
  bdMaster += attack * 0.4;
  bdMaster += body * 0.64;
  bdMaster += mix(attack, body, t) * 0.5;
  
  return bdMaster;

}

vec2 mainSound(float time) {
  float bpm = timeToBeat(time);
  float tempo = sine((mod(bpm, 4.0) >= 1.0 ? 440.0 : 880.0) * time) * exp(-1e2 * fract(bpm));
  
  float outSound;
  float kikTiming = mod(bpm, 16.0) <= 15.0 ? mod(bpm, 1.0) : mod(bpm, 0.5);

  float sineTone = sine(pitch(0.0) * time * mix(0.0, 1.0,fract(-bpm)));
  float bd = bassDrum(kikTiming);
  float base_freq = pitch(0.0);
  float p = sin(bpm * PI) * 4.0;
  
  float move_freq = pitch( (p) * 0.5 + 0.5 );
  float wave_tone = sine(base_freq * time + move_freq);
  float smpl_tone = sine(440.0 * time);

  outSound += bd;
  //outSound += wave_tone;
  // outSound += tempo;
  //outSound = outSound * 0.8;
  
  return vec2(outSound);
}
