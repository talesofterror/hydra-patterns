var hydra = new Hydra({
    canvas: document.getElementById("myCanvas"),
    detectAudio: false
  });

// s0.initScreen()
s0.initImage("directory2.png") 
let image = () => src(s0)
// s0.initImage("directory.png");
s3.initCam()
let cam = () => src(s3)


let red = (i) => src(i).color(1,0,0)
let green = () => src(o0).color(0,1,0)
let blue = () => src(o0).color(0,0,1)

let sine1 = () => Math.abs(-0.01 * Math.sin(time * 0.5) + 0);
let sine2 = () => Math.abs(0.1 * Math.sin(time * 0.5) + -1.57);
let sine3 = () => Math.abs(1.0 * Math.sin(time * 1) + 1.5);
let sine4 = () => 0.3 * Math.sin(time * 0.2) + 0.5;
let sine5 = () => 0.0001 * Math.sin(time * 0.2) + sin5mod(); // vert shift: .105
function sin5mod () {
  let mod = 0.5 * Math.sin(time * 0.6) + 0.105
  console.log(mod)
  return mod // vertshift: .105
} 
console.log(sin5mod) 

let random = () => Math.random();

let t = () => time;

let speed = 20
let gridSize = 300 // 120 through 160 are weird. 150 is null
                  // below 100 needs height adjustment
let gridTime = 0.1 
let threshVal = 0.010

let gridOsc1 = () => Math.abs(-0.01 * Math.sin(time * 0.5) + 0);
let gridOsc2 = () => Math.abs(0.1 * Math.sin(time * 0.5) + -1.57);
let grid = () => 
osc(gridSize, gridTime, 0).thresh(threshVal - 0.005).rotate(sine1)
  .mult(osc(gridSize-150, gridTime, 0).thresh(threshVal).rotate(sine2))
  .modulate(osc(5, gridTime, 0))

let modGrid = () => 
  osc(gridSize, gridTime, 0).luma(0.04).rotate(sine1)
  .mult(osc(gridSize-150, gridTime, 0).luma(0.04).rotate(sine2).color(1, 0, -1))
    .modulate(osc(5, gridTime, 0))
    .colorama(5)
    .color(1.5, 0.2, sine1)

grid()
  // .kaleid(100)
// .mult(cam(), 1)
// .thresh(0.1)
// .modulate(cam(), 0.12)

.add(modGrid(), 1)
.layer(modGrid().luma(.5))
.mult(osc(gridSize / 10, gridTime, 0).posterize(20).rotate(sine1))
  .modulate(osc(5, gridTime, 0))
// .mult(grid().modulate(osc(0.01, -0.5, 0)))
.modulate(o0, sine5)
.diff(image(), 1)
.modulate(image(), sine5)
// .modulate(modGrid(), sine5)
// .layer(src(o1).color(sine1, 1, sine4), 1)
// .kaleid([3, 10, 2, 5].fast(1))
// .diff(src(o1)).sub(src(o1), 0.3)
.out(o0);

image()
  // .kaleid([3, 10, 2, 5].fast(sine3))
.out(o1);

render(o0);

setResolution(2560,1440)

