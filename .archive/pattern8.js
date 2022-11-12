var hydra = new Hydra({
    canvas: document.getElementById("myCanvas"),
    detectAudio: false
  });  

  var oscSize = 50
  var oscSize2 = oscSize * 0.8
  var steadyRingSpeed = 2.5
  var steadyRingAmp = 0.5
  var ringSpeedMod = 1.5

  var ring = (amp, speed, mod, phase) => 
    Math.abs(amp * Math.sin(time * speed + mod)) + phase
  
  var sine = (speed) => Math.sin(speed)

  osc(oscSize2, 0, 0).
    luma( () => Math.abs(Math.sin(time* 0.05)), 1).
    add(osc(oscSize, ()=>Math.sin(-0.05), 10)).
    posterize(1, 1).
    modulatePixelate(osc(100, ()=>Math.sin(0.05), 0.5).luma(0, 0).
    rotate(1.57), ()=>Math.sin(time*1.5), ()=>Math.sin(time*0.5)).
    add(shape(100, 0.5, 0.005).scale(1, 0.5, 1)).
    // luma().
    out(o0)

  osc(oscSize2 * 2, 0.01, 0).
    luma( () => Math.abs(Math.sin(50)), 1).
    add(osc(oscSize, 0, 10)).
    posterize(0.8, 1).
    modulate(osc(100, 0.6, 0.5).luma(0, 0).
    rotate(1.57, () => Math.sin(-30))).
    modulate(osc(oscSize2, 0, 0).
      rotate(0, () => Math.abs(Math.sin(30)))).
    mult(shape(100, 0.5, 0.005).scale(1, 0.5, 1)).
    sub(shape(100, 0.7, 0.005).scale(1, 0.5, 1).modulate(noise(10, 0.5, 0).rotate(1.59))).
      add(shape(100, () => Math.abs(steadyRingAmp * Math.sin(time * steadyRingSpeed) + 0.9), 0.005).scale(1, 0.5, 1).modulate(noise(10, 0.5, 0).rotate(1.59))).
    sub(shape(100, () => Math.abs(steadyRingAmp * Math.sin(time * steadyRingSpeed) + 1.4), 0.005).scale(1, 0.5, 1)).
      add(shape(100, () => Math.abs(steadyRingAmp * Math.sin(time * steadyRingSpeed) + 1.5), 0.005).scale(1, 0.5, 1)).
    sub(shape(100, () => Math.abs(steadyRingAmp * Math.sin(time * steadyRingSpeed) + 1.6), 0.005).scale(1, 0.5, 1).modulate(noise(10, 0.5, 0).rotate(1.59))).
      add(shape(100, () => Math.abs(steadyRingAmp * Math.sin(time * steadyRingSpeed) + 1.7), 0.005).scale(1, 0.5, 1)).
    out(o1)

  osc(8, 0.5, 0).
    scrollX(0.5).
    luma( () => Math.abs(Math.sin(time*0.5)), 1).
    add(osc(8, 0.5, 10)).
    posterize(0.8, 1).
    modulate(osc(0.4, 10, 0.5).luma(1, 0).
      rotate(1.57, 11.5)).
    modulate(osc(8, 2, 0).
      rotate(2, 1.5)).
    rotate(-1.5, 0).
    kaleid(1).
    mult(shape(100, 0.5, 0.005).scale(1, 0.5, 1)).
    sub(shape(100, 1.5, 0.005).scale(1, 0.5, 1).modulate(noise(10, 0.5, 0).rotate(1.59))).
      add(shape(100, () => Math.abs(steadyRingAmp * Math.sin(time * steadyRingSpeed + ringSpeedMod) + 1.2), 0.005).scale(1, 0.5, 1)).
    sub(shape(100, () => Math.abs(steadyRingAmp * Math.sin(time * steadyRingSpeed + ringSpeedMod) + 1.4), 0.005).scale(1, 0.5, 1).modulate(noise(10, 0.5, 0).rotate(1.59))).
      add(shape(100, () => Math.abs(steadyRingAmp * Math.sin(time * steadyRingSpeed + ringSpeedMod) + 1.5), 0.005).scale(1, 0.5, 1)).
    sub(shape(100, () => Math.abs(steadyRingAmp * Math.sin(time * steadyRingSpeed + ringSpeedMod) + 1.6), 0.005).scale(1, 0.5, 1)).
      add(shape(100, () => Math.abs(steadyRingAmp * Math.sin(time * steadyRingSpeed + ringSpeedMod) + 1.7), 0.005).scale(1, 0.5, 1)).
    out(o2)

  src(o0).
    diff(o1).
      invert().
    diff(o2).
    modulateScale(osc(2, 2, ()=>Math.sin(time * 5)).
      sub(shape(100, 0.5, 0.005).scale(1, 0.5, 1))
        ).
    // modulatePixelate(o0).
    out(o3)

    render(o3);

    setResolution(1080, 1080);



    /*
    
    ORIG o1 SOURCE

    osc(oscSize2, 0.01, 0).
    luma( () => Math.abs(Math.sin(50)), 1).
    add(osc(oscSize, 0, 10)).
    posterize(0.8, 1).
    modulate(osc(100, 0.6, 0.5).luma(0, 0).
    rotate(1.57, () => Math.sin(-25))).
    modulate(osc(oscSize2, 0, 0).
      rotate(0, () => Math.abs(Math.sin(30)))).
    mult(shape(100, 0.5, 0.005).scale(1, 0.5, 1)).
    out(o1) 
    */