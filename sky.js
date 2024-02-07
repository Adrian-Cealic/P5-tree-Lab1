let itter = 240
let minSize = 0.5
let maxSize = 2
let minOpacity = 50
let maxOpacity = 200
let bgColor

function setup() {
  pixelDensity(3)
  createCanvas(375, 667)
  bgColor = color(33,23,70)
  noLoop()
}

function draw() {
  background(bgColor);
  for(let y = 0; y < itter; y++) {
      let randomSize = random(minSize, maxSize)
      let randomX = random(width)
      let randomY = random(height)
      noStroke()
      let rOpacity = map(randomSize, minSize, maxSize, minOpacity, maxOpacity)
      fill(255,255,255,rOpacity)
      ellipse(randomX, randomY, randomSize, randomSize)
  }
}