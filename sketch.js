var w = 595;
var h = 842;

let sky = 0;


function setup()
{
    pixelDensity(3);
    createCanvas(w,h);
    angleMode(DEGREES);
    noLoop(); //pentru a opri executarea codului setup()
}

function draw()
{
    background(sky);
    stele(500);
    translate(w/2,h/2+200);
    camp();
    luna();
    creanga(75);
}

function stele(numStars)
{
    randomSeed(42);
    fill(255);
    noStroke();
    for(let i = 0;i<numStars;i++)
    {
        let x = random(-w,w);
        let y = random(-h,h);
        let size = random(1,4);
        ellipse(x,y,size,size);
    }
    fill(232,232,232);
    noStroke();
    ellipse(100,150,100);
}



function creanga(len) 
{
   push(); //salveaza setarile curente
   //verifica daca lungimea este mai mare decat 10
   if(len > 10)
   {
   strokeWeight(map(len,10,100,1,15));//mseteaza grosimea bazat pe lungime
   stroke(60,40,20); //culoarea grosimii
   line(0, 0, 0,-len);  //desenarea unei linii verticare
   translate(0, -len); //muta originea la finalul crengii
   rotate(random(-20,-30));  //roteste random intre -20 si -30 grade
   creanga(len * random(0.7,0.9)); //pentru desenarea crengilor mai mici,se reapeleaza functia
   rotate(random(50,60)); //adaugarea crengilor intre 50 si 60 grade; 
   creanga(len * random(0.7,0.9)); //desenarea in directie opusa a crengilor
   }
   else
   {
    //generarea de culori random
     var r = 90;
     var g = 120; 
     var b = 10;
    fill(r,g,b,150); //setarea transparentei
    noStroke();
    ellipse(0,0,10); //baza frunzei

    beginShape();
    for(var i = 45;i < 135;i++) //prima jumatatae a frunzei
    {
        var rad = 15; //seZtarea razei funzei
        var x = rad * cos(i);
        var y = rad * sin(i);
        vertex(x,y);
    }
    for(var i = 45;i > 40;i--)
    {
        var rad = 15;
        var x = rad * cos(i);
        var y = rad * sin(-i + 20);
        vertex(x,y);
    }
    endShape(CLOSE);
   }
   pop();
}

function camp()
{
    fill("GREEN");
    ellipse(100,height/2-50,windowWidth+1000,windowHeight);
    randomSeed(42); 
    fill(4,107,28); 
    noStroke();
    for (let i = 0; i < 1500; i++) {
        let x = random(-w /2 , w/2);
        let y = random(-80, h / 4); 
        let height = random(10, 30);
        let sway = random(-5, 5);
        beginShape();
        vertex(x - sway, y);
        vertex(x + sway, y - height);
        vertex(x + sway * 2, y - height);
        vertex(x + sway * 3, y);
        endShape(CLOSE);
    }
}

function luna()
{
    fill("#042457");
    ellipse(500,height/2+50,windowWidth,windowHeight);
}