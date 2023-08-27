var hydra = new Hydra({
    canvas: document.getElementById("myCanvas"),
    detectAudio: false
  });

// s0.initCam()
// meant to link to an OBS Virtual Cam stream of Dope-137-1989.mp4 from T:\ 
s0.initScreen()
// I can turn initScreen on to record with OBS, since I can't have the virtual
// cam on and records a separate screen at the same time.

var sine = () => Math.sin(1 / time * 1) + 1;
let sine10 = () => Math.sin(time / 1 * 1) + 10;
let sine100 = () => Math.sin(time / 1 * 1) + 2;
let random = () => Math.random();
var kVal = () => Math.sin(time / -1 * -1) * 0.5 + 1;
let nkVal = () => -1 * (Math.sin(time / -1 * -1) * 0.5 +1);
var t = () => time;
var swaySpeed = 20;
 

osc(1, 0, 1)
	.modulate((osc(10, 1, 100)).invert(kVal).rotate(1.6)
	)
	.diff(s0).color(sine, 1, nkVal).luma(0.5)
.out(o0);

src(o0)
  .sub(osc(1, 1, 2)
  // .luma(sine)
  // .pixelate(10,sine)
  , 0.5)
  .modulate(osc(0.5, 1, 1), 1)
  .diff(o0).modulate(osc(sine, 2, 1))
.out(o1);


render(o1);

setResolution(1920,1080)

