// memo: random hash 確認
precision highp float;
precision highp int;

uint k = 0x456789abu;  // 算術積に使う大きな桁数の定数
const uint UINT_MAX = 0xffffffffu;  // 符号なし整数の最大値

uint uhash11(uint n) {
  n ^= (n << 1);  // 1左シフトして`XOR`
  n ^= (n >> 1);  // 1右シフトして`XOR`
  n *= k;         // 算術積
  n ^= (n << 1);  // 1左シフトして`XOR`
  return n * k;   // 算術積
}

float hash11(float p) {
  // 浮動小数点数のハッシュ関数
  uint n = floatBitsToUint(p);  // ビット列を符号なし整数に変換
  return float(uhash11(n)) / float(UINT_MAX);  // 値の正規化
}

const float PI = acos(-1.0);
const float TAU = PI * 2.0;
float sine(float phase) {return sin(TAU * phase );}

/* GLSL */
// 2D Random
float _rnd(in vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float random(float t) {
  float rnd_x = sine(123.4 * t);
  float rnd_y = sine(567.8 * t);
  return _rnd(vec2(rnd_x, rnd_y)) - 0.5;
}

vec2 mainSound(float time){
  float hash_l = hash11(time);
  float random_r = random(time);
  return vec2(hash_l, random_r);
}
