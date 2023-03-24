precision highp int;


// memo:
#define BPM 110.0
const float PI = acos(-1.0);
const float TAU = (PI * 2.0);

// start hash
uvec3 k = uvec3(0x456789abu, 0x6789ab45u, 0x89ab4567u);
uvec3 u = uvec3(1, 2, 3);
const uint UINT_MAX = 0xffffffffu;

uint uhash11(uint n) {
  n ^= (n << u.x);
  n ^= (n >> u.x);
  n *= k.x;
  n ^= (n << u.x);
  return n * k.x;
}

float hash11(float p) {
  uint n = floatBitsToUint(p);
  return float(uhash11(n)) / float(UINT_MAX);
}

float random1d(float p) {
  return hash11(p) * 2.0 - 0.5;
}



/*sound common */
float timeToBeat(float t) {return t / 60.0 * BPM; }
float beatToTime(float b) {return b / BPM * 60.0; }

float sine(float p) { return sin(TAU * p); }
float pitch(float p) { return pow(2.0, p / 12.0) * 440.0; }

float bassDrum(in float t) {
  float bdMaster;
  
  // todo: とりま他のを進める
  
  float attack = cos(TAU * 24.0 * exp(-1.0 * t));// * pow(fract(-t), 16.0);
  bdMaster += attack;
  
  return bdMaster;

}

vec2 mainSound(float time) {
  float bpm = timeToBeat(time);
  float tempo = sine((mod(bpm, 4.0) >= 1.0 ? 440.0 : 880.0) * time) * exp(-1e2 * fract(bpm));
  
  float outSound;
  
  float kikTiming = mod(bpm, 16.0) <= 15.0 ? mod(bpm, 1.0) : mod(bpm, 0.5);

  float bd = bassDrum(kikTiming);
  
  //float tone = sine(hash11(time));
  float tone = sine(random1d(time));
  

  //outSound += bd;
  outSound += tone;
  
  
  return vec2(outSound);
}
