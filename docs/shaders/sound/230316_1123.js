precision highp int;


// memo:


vec2 mainSound(float time) {
  int t = int(time * 80000.0);
  
  t *= (t >> 8 & 64 << t*t >>9 & t >> 2) / (t & t >> 11);
  
  
  return vec2(float(t & 0xff - 128) / 128.0);
}

