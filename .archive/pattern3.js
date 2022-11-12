
var hydra = new Hydra({
    canvas: document.getElementById("myCanvas"),
    detectAudio: false
  });


  s0.initVideo("assets/snack1/ferriswheel.MOV");

src(s0).color(1, 0.7, 0.7).scrollX(0, 0)
    .scale(1, 1, 1)
.out(o0)

src(o0).posterize(10, 3).modulate(osc(1, 1, 0.5))
    .scale(1, 1, 1).scrollX(-1.08)
.out(o2)

src(o2).modulate(osc(0.01, 0.01, 1)).diff(o0).kaleid(6).scrollX(1.5).rotate(0, 0.5).repeatX(2).repeatY(2)
.out(o1)

osc(50, 0.1, 1).modulate(osc(10).rotate(1)).add(noise([0.5, 1, 0.5], 5)).diff(o2).out(o3)

 render()