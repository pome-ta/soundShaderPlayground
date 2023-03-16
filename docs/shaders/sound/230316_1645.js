precision highp int;


// memo:
const float PI = acos(-1.0);
const float TAU = (PI * 2.0);


vec2 mainSound(float time) {
  float signal = sin(TAU * 440.0 * time);
  float outSound = max(0.0, 1.0 - time) * signal;
  
  return vec2(outSound);
}

