// memo: 波形数値音響確認

const float PI = acos(-1.0);
const float TAU = PI * 2.0;

vec2 mainSound(float time){
  float wave = sin(TAU * 440.0 * time);
  if (wave > 0.0) {
    return vec2(wave);
  } else {
    return vec2(0.0);
  }
  

}
