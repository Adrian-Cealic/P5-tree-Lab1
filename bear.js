function setup() {
  createCanvas(600, 600); //createCanvas(latimea panzei,inaltimea panzei)
  line(15,25,70,90)
}

function draw() {
  background("#4260f5");


  strokeWeight(5);
    //elipsa
  fill("#c7450e");       
  ellipse(300,640,640,440);

  //urechi
  fill("#c7450e");
  ellipse(125,135,170,170);
  ellipse(475,135,170,170);

  //inner ears
  fill("#c7450e");
  ellipse(125,135,130,130);
  ellipse(475,135,130,130);

  //face
  fill("#c7450e");
  ellipse(300,300,450,450);

  //nose
  fill("#1c0408");
  ellipse(300,300,150,100);

  
  //eyes
  fill("#f20a2d");
  ellipse(250,200,90,90);
  ellipse(350,200,90,90);

  
  //pupils
  fill("#fff");
  ellipse(250,200,90,40);
  ellipse(350,200,90,40);

  fill("000000");
  arc(300,420,70,65,0,PI);
}
