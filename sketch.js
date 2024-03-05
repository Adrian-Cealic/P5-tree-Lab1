var w = 595; // Lățimea canvas-ului
var h = 842; // Înălțimea canvas-ului

let sky = 0; // Variabilă pentru stocarea informațiilor despre cer
let stars = []; // Tablou pentru stocarea informațiilor despre stele

const worldSize = 1000; // Dimensiunea lumii
const nStars = 1200; // Numărul de stele
const maxS = 4.0; // Dimensiunea maximă a stelelor
var s = []; // Tablou pentru dimensiunile stelelor
var x = []; // Tablou pentru coordonatele X ale stelelor
var y = []; // Tablou pentru coordonatele Y ale stelelor

var angle, speed; // Variabile pentru unghi și viteză
var speedX, speedY; // Variabile pentru componente de viteză

//pentu copac
var angle = 20; // Unghiul inițial pentru animație
var slider; // Element de interfață pentru controlul unghiului
var strokeThick = 5; // Grosimea liniei
var branchThinning = 0.7; // Subțierea ramurilor
var sway = 0; // Oscilația copacilor
var swaySpeed = 0.1; // Viteza de oscilație
var maxBend = 3; // Gradul maxim de înclinare a copacilor

function setup() {
    pixelDensity(3); // Setare densitate de pixeli pentru ecrane de înaltă rezoluție
    createCanvas(w, h); // Creare canvas cu lățimea și înălțimea specificate
    angleMode(DEGREES); // Setare modul unghiului la grade

    slider = createSlider(0, TWO_PI, PI / 8, 0.01); // Creare slider cu limite și valoare inițială specificate
    var t = (1.0 - 1.0 / (maxS * maxS * maxS)) / (nStars - 1); // Calcularea unei valori pentru distribuția stelelor
    for (var i = 0; i < nStars; i++) { // Parcurgere stele
        s[i] = pow(1.0 / (1.0 - t * i), 0.33333333); // Calculare dimensiune stea
        x[i] = random(worldSize + 8.0 * s[i]); // Setare coordonată X aleatorie pentru stea
        y[i] = random(worldSize + 8.0 * s[i]); // Setare coordonată Y aleatorie pentru stea
    }

    angle = -0.2; // Setare unghi inițial pentru animație
    speed = 8.0 / maxS; // Setare viteză inițială pentru animație
}

function draw() {
    background(0, 128); // Setare culoare de fundal cu transparență

    // Simulare vânt în copaci
    sway += swaySpeed; // Creștere oscilație pentru animația copacilor
    if (sway > maxBend || sway < -maxBend) { // Verificare dacă oscilația depășește înclinarea maximă sau minimă
        swaySpeed = -swaySpeed; // Schimbare direcție de oscilație
    }

    // Desenare stele
    speedX = speed * cos(angle); // Calculare componentă de viteză orizontală
    speedY = speed * sin(angle); // Calculare componentă de viteză verticală
    for (var i = 0; i < nStars; i++) { // Parcurgere stele
        if (x[i] < worldSize + 2 * s[i] && y[i] < worldSize + 2 * s[i]) { // Verificare dacă steaua se află în limitele canvas-ului
            strokeWeight(s[i]); // Setare grosime linie în funcție de dimensiunea stelei
            stroke(map(s[i], 1.0, maxS, 128, 255)); // Setare culoare linie în funcție de dimensiunea stelei
            line(x[i] - s[i], y[i] - s[i], x[i] - s[i] + speedX * (s[i] - 0.99), y[i] - s[i] + speedY * (s[i] - 0.99)); // Desenare stea
        }
        var wrap = worldSize + 8.0 * s[i]; // Calculare înveliș pentru stele
        x[i] = (x[i] - speedX * (s[i] - 0.99) + wrap) % wrap; // Actualizare coordonată X a stelei cu înveliș
        y[i] = (y[i] - speedY * (s[i] - 0.99) + wrap) % wrap; // Actualizare coordonată Y a stelei cu înveliș
    }

    // Desenare lună
    luna();

    // Desenare peisaj cu vânt în copaci
    translate(w / 2, h / 2 + 200); // Translatare la centrul canvas-ului
    tabara(); // Desenare peisaj tabără
    ramura(75, sway); // Desenare ramuri ale copacilor
}

function luna() {
    fill(255); // Setare culoare umplere alb
    noStroke(); // Dezactivare linie
    ellipse(100, 150, 100); // Desenare cerc alb pentru reprezentarea lunii
}

function tabara() {
    fill("GREEN"); // Setare culoare umplere verde
    ellipse(100, height / 2 - 70, windowWidth + 1000, windowHeight); // Desenare sol
    randomSeed(42); // Setare seed aleator pentru valori aleatoare consistente
    fill(4, 107, 28); // Setare culoare umplere pentru copaci
    noStroke(); // Dezactivare linie
    for (let i = 0; i < 1500; i++) { // Parcurgere pentru desenare copaci
        let x = random(-w / 2, w / 2); // Coordonată X aleatorie pentru copac
        let y = random(+20, h / 4); // Coordonată Y aleatorie pentru copac
        let height = random(10, 30); // Înălțime aleatorie pentru copac
        let sway = random(-5, 5); // Oscilație aleatorie pentru copac
        beginShape(); // Începere desen copac
        vertex(x - sway, y); // Desenare vârf
        vertex(x + sway, y - height); // Desenare vârf
        vertex(x + sway * 2, y - height); // Desenare vârf
        vertex(x + sway * 3, y); // Desenare vârf
        endShape(CLOSE); // Sfârșit desen copac
    }
}

function ramura(len, sway) {
    push(); // Salvare stare de desenare curentă
    if (len > 12) { // Verificare dacă lungimea ramurii este mai mare de 12
        strokeWeight(map(len, 10, 100, 1, 15)); // Setare grosime linie în funcție de lungimea ramurii
        stroke(60, 40, 20); // Setare culoare linie
        line(0, 0, 0, -len); // Desenare linie ramură
        translate(0, -len); // Mutare origine la capătul ramurii
        rotate(random(-30, -30) + sway); // Rotire ramură aleatoriu cu oscilație
        ramura(len * random(0.7, 0.9), sway); // Apel recursiv pentru desenare ramuri mai mici
        rotate(random(70, 50) + sway); // Rotire ramură în direcție opusă
        ramura(len * random(0.7, 0.9), sway); // Apel recursiv pentru desenare ramuri mai mici
    } else {
        var r = 90; // Setare componentă roșie a culorii
        var g = 120; // Setare componentă verde a culorii
        var b = 10; // Setare componentă albastră a culorii
        fill(r, g, b, 150); // Setare culoare umplere cu transparență
        noStroke(); // Dezactivare linie
        ellipse(0, 0, 10); // Desenare bază frunză

        beginShape(); // Începere desen frunză
        for (var i = 45; i < 100; i++) { // Parcurgere pentru desenare frunză
            var rad = 15; // Setare rază frunză
            var x = rad * cos(i); // Calculare coordonată X a punctului frunzei
            var y = rad * sin(i); // Calculare coordonată Y a punctului frunzei
            vertex(x, y); // Desenare vârf
        }
        for (var i = 45; i > 40; i--) { // Parcurgere pentru desenare frunză
            var rad = 15; // Setare rază frunză
            var x = rad * cos(i); // Calculare coordonată X a punctului frunzei
            var y = rad * sin(-i + 20); // Calculare coordonată Y a punctului frunzei
            vertex(x, y); // Desenare vârf
        }
        endShape(CLOSE); // Sfârșit desen frunză
    }
    pop(); // Restaurare stare de desenare anterioară
}
