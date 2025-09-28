/*
  Isak Alenkvist
  2025-09-27
*/

x = 300;
y = 250;
d = 15;
speed = 1;
xSpeed = 1;
ySpeed = 1;

plattformX = 300;

score = 0;
steg = 1;

function setup() {
  createCanvas(600, 500);
}

function draw() {
  background(41, 16, 255);
  fill(0);
  stroke(0, 0, 0);
  textSize(15);
  textAlign(LEFT);
  text(speed, 5, 15);
  textAlign(CENTER);
  text("Poäng: " + score, 300, 15);
  if (steg == 2) {
    // Skriv ut GAME OVER
    textSize(70);
    text("GAME OVER", width / 2, height / 2);
    textSize(40);
    text("Poäng: " + score, width / 2, (height / 3) * 1.8);
  }

  if (steg == 1) {
    // Flytta boll och plattform
    x = x + xSpeed;
    y = y + ySpeed;
    plattformX = mouseX;
  }

  // Rita ut boll och plattform
  fill(0);
  stroke(255, 0, 0);
  circle(x, y, d);
  rect(plattformX, height - 20, 100, 15);

  if (x > width - d / 2) {
    // Studs mot vänster vägg
    xSpeed = -speed;
  }
  if (x < d / 2) {
    // Studs mot höger vägg
    xSpeed = speed;
  }
  if (y > height - 20 - d / 2 && x < plattformX + 100 && x > plattformX) {
    // Träff på plattform
    increaseSpeed();
    ySpeed = -speed;
    score += 1;
  } else if (y > height) {
    // Missar plattformen - Game over
    steg = 2;
  }
  if (y < d / 2) {
    // Studs mot tak
    ySpeed = speed;
  }
}

function increaseSpeed() {
  // Öka bollens hastighet
  if (speed < 7) {
    speed = speed + 0.5;
  }
}

function mouseClicked() {
  if (steg == 2) {
    // Starta om spelet
    steg = 1;
    x = width / 2;
    y = height / 2;
    xSpeed = 1;
    ySpeed = 1;
    speed = 1;
    score = 0;
  }
}