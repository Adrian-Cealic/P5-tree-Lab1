const worldSize = 1000;
const nStars = 1200; 
const maxS = 4.0;
var s = [];
var x = [];
var y = [];

var angle, speed;
var speedX, speedY;

function setup() {
  var canvasSize = min( windowWidth, windowHeight );
  createCanvas( canvasSize, canvasSize );
  background( 0 );
 
  var t = (1.0 - 1.0 / (maxS*maxS*maxS)) / (nStars-1);
  for( var i=0; i<nStars; i++ ) {
    s[i] = pow( 1.0 / (1.0 - t * i), 0.33333333);
    x[i] = random( worldSize + 8.0 * s[i] );
    y[i] = random( worldSize + 8.0 * s[i] );
  }

  angle = -0.2;
  speed = 8.0 / maxS;
}
 
function draw() {
  background( 0, 128 );
  scale( min( width, height ) / worldSize );
  
  speedX = speed * cos( angle );
  speedY = speed * sin( angle );
 
  for( var i=0; i<nStars; i++ ) {
    if( x[i] < worldSize+2*s[i] && y[i] < worldSize+2*s[i] ) { //se verifica daca steaua se afla in canvas ca sa nu fie desenate in afara zonei vizibile
      strokeWeight( s[i] ); //grosimea linei pentru stea
      stroke( map( s[i], 1.0, maxS, 128, 255 ) ); //cele mai mari vor avea culoarea mai inchisa cele mai mici culaorea mai inchisa
      line( x[i]-s[i], y[i]-s[i], 
            x[i]-s[i]+speedX*(s[i]-0.99), y[i]-s[i]+speedY*(s[i]-0.99) ); //traiectoria stelei in functie de viteza si directia navei spatiale
    }
    var wrap = worldSize + 8.0 * s[i]; //in caz ca ies sstelele din canvas sa apara din partea opusa
    x[i] = (x[i] - speedX * (s[i]-0.99) + wrap) % wrap; //se actualizeaza coordonata x a stelei prin scaderea 
    //unui anumit procent din viteza navei spatiale,astfel incat stelele sa apara a fi pe fundalul miscator.
    // totodata se asigura ca stelele reapar uniform pe partea opusa a ecranului atunci cand trec de marginea lumii
    y[i] = (y[i] - speedY * (s[i]-0.99) + wrap) % wrap;
  }
 
  push();
  noStroke();
  fill( 255, 255, 128 );
  scale(2);
  text( floor(speed * 1000), 10, 40 );
  pop();
  translate( worldSize/2, worldSize/2 );
    
  push();
  rotate( angle );
  scale( 5.0 );
  drawShip();
  pop();
  
  checkControls();
}
 
function drawShip() {
  colorMode( HSB, 100, 100, 100, 100 );
  noStroke();
 
  // wings
  fill( 60, 90, 90 );
  triangle( 12, 0, -3, -2, -8, -8 );
  triangle( 12, 0, -3,  2, -8,  8 );
    
  // body
  fill( 30, 80, 80 );
  triangle( 12, 0, -3, -2, -3, 2 );
    
  // tail
  fill( 160, 90, 90 );
  triangle( 0, 0, -6, -2, -6, 2 );
  colorMode( RGB, 256, 256, 256 );
}

function checkControls() {
  if( keyIsDown( LEFT_ARROW ) ) {
    angle -= 0.04;
  }
  if( keyIsDown( RIGHT_ARROW ) ) {
    angle += 0.04;
  }
  if( keyIsDown( UP_ARROW ) ) {
    speed += 0.40 / maxS;
    if( speed > maxS * 5 ) {
      speed = maxS * 5;
    }
  }
  if( keyIsDown( DOWN_ARROW ) ) {
    speed -= 0.2 / maxS;
    if( speed < 0.0 ) {
      speed = 0.0;
    }
  }
}
 

function windowResized() {
  var canvasSize = min( windowWidth, windowHeight );
  resizeCanvas( canvasSize, canvasSize );
}

