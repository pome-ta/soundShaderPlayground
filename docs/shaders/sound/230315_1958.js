precision highp float;  /* 既に内部で呼んでるけど */
precision highp int;

// memo:

#define BPM 90.0
const float PI = acos(-1.0);
const float TAU = PI * 2.0;

/* sound common */
float timeToBeat(float t) {return t / 60.0 * BPM;}
float beatToTime(float b) {return b / BPM * 60.0;}


float sine(float p) { return sin(TAU * p); }
float pitch(float p) { return pow(2.0, p / 12.0) * 440.0; }


vec2 mainSound( float time ) {
float bpm = timeToBeat(time);
float tempo = sine((mod(bpm, 4.0) >= 1.0 ? 440.0 : 880.0) * time) *
exp(-1e2 * fract(bpm));

float base_freq = pitch(-64.0);
float p = 0.0;
 p = sin(dot(bpm, PI));

float move_freq = pitch( abs(p)) ;
//float move_freq = pitch(asin(cos(bpm * PI)));
float wave_tone = sine(base_freq * time + move_freq) * exp(-2.0 * fract(bpm));
float smpl_tone = sine(440.0 * time);

// return vec2(wave_tone);
return vec2(wave_tone, smpl_tone + tempo);
}
