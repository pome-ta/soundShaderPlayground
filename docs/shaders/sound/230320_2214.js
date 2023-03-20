precision highp int;


// memo:
#define BPM 90.0
const float PI = acos(-1.0);
const float TAU = (PI * 2.0);

/*sound common */
float timeToBeat(float t) {return t / 60.0 * BPM; }
float beatToTime(float b) {return b / BPM * 60.0; }

float pitch(float p) { return pow(2.0, p / 12.0) * 440.0; }



vec2 mainSound(float time) {
  float bpm = timeToBeat(time);
  float f = pitch(0.0);
  float s = sin(TAU * f * time);
  
  float outSound = s;
  outSound *= max(0.0, 1.0 - fract(time));
  outSound *= min(1.0, fract(time) * 40.0);
  
  
  return vec2(outSound);
}

