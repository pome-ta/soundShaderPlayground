precision highp float;
precision highp int;

// memo: 8ビートのベースコード乗せ

#define BPM 90.0
const float PI = acos(-1.0);
const float TAU = PI * 2.0;

/* sound common */
float timeToBeat(float t) {return t / 60.0 * BPM;}
float beatToTime(float b) {return b / BPM * 60.0;}

float sine(float phase) {
  return sin(TAU * phase);
}


float rand(vec2 st) {
  vec2 magic2 = vec2(12.9898, 78.233);
  float _rnd = sin(dot(st, magic2));
  return fract(_rnd * 43758.5453123);
}

float calcHertz(float scale) {
  return 440.0 * pow(2.0, scale / 12.0);
}

float bassDrum(float beat) {
  float t = mod(beat / 2.0, 1.0) / 3.0 * 8.0;
  float bd = sin(beatToTime(beat) * calcHertz(0.0));
  return bd * max(0.0, 1.0 - fract(t) * 8.0);
}


float snereDrum(float beat) {
  float t = mod((beat / 2.0) + 0.5, 1.0);
  float sd = rand(vec2(beatToTime(beat) * 32.0, 0.0));
  return sd * max(0.0, 1.0 - t * 4.0);
}

float hiHat(float beat) {
  // xxx:
  float t = beat / 2.0 * 16.0;
  if (mod(t, 16.0) > 3.0 && mod(t, 2.0) > 1.0) {
    return 0.0;
  }
  float hh = rand(vec2(beatToTime(beat) * 32.0, 0.0));
  return hh * max(0.0, 1.0 - fract(t) * 4.0);
}


float rect(float beat) {
  if (fract(beat / PI / 2.0) < 0.5) {
    return 1.0;  
  } else {
    return 0.0;
  }
}

float strings(float beat) {
  float tb = beat / 2.0;
  float t = mod(tb * 4.0, 1.0);
  float sound = 0.0;
  if (mod(tb, 8.0) < 4.0) {
    sound += rect(beatToTime(beat) * calcHertz(24.0));
    sound += rect(beatToTime(beat) * calcHertz(28.0));
    sound += rect(beatToTime(beat) * calcHertz(31.0));
    sound += rect(beatToTime(beat) * calcHertz(35.0));
  } else {
    sound += rect(beatToTime(beat) * calcHertz(23.0));
    sound += rect(beatToTime(beat) * calcHertz(26.0));
    sound += rect(beatToTime(beat) * calcHertz(30.0));
    sound += rect(beatToTime(beat) * calcHertz(33.0));
  }
  return sound * max(0.0, (1.0 - t * 2.0));
}

float bass(float beat) {
  float t = mod(beat / 2.0, 8.0);
  if (t < 2.0) {
    return rect(beatToTime(beat) * calcHertz(0.0));
  }
  if (t > 3.0 && t < 3.5) {
    return rect(beatToTime(beat) * calcHertz(0.0));
  }
  if (t < 4.0) {
    return rect(beatToTime(beat) * calcHertz(12.0));
  }
  if (t < 6.0) {
    return rect(beatToTime(beat) * calcHertz(11.0));
  }
  if (t < 8.0) {
    return rect(beatToTime(beat) * calcHertz(-1.0));
  }
  return 0.0;
}

vec2 mainSound(float time) {
  float bpm = timeToBeat(time);
  
  float tempo = sine((mod(bpm, 4.0) >= 1.0 ? 440.0 : 880.0) * time) * exp(-1e2 * fract(bpm));
  
  float sound = 0.0;
  sound += bassDrum(bpm) * 0.65;
  sound += snereDrum(bpm) * 0.5;
  sound += hiHat(bpm) * 0.4;
  sound += strings(bpm) * 0.125;
  sound += bass(bpm) * sine(-beatToTime(bpm)) * 0.3;
  //sound += tempo;
  
  if (abs(sound) > 1.0) sound /= abs(sound);
  
  return vec2(sound);
}



