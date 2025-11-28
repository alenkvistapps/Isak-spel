let table = null;
let questions = [];
let currentIndex = 0;
let startTime;
let input;
let resultMessage = "";
let buttonStart;
let buttonNext;

function setup() {
  createCanvas(600, 300);
  textFont("Arial");
  textSize(32);
  textAlign(CENTER, CENTER);

  input = createInput("");
  input.position(20, 320);
  input.size(200);
  input.attribute("placeholder", "Välj tabell (1-10)");

  buttonStart = createButton("Starta");
  buttonStart.position(240, 320);
  buttonStart.mousePressed(startTraining);

  buttonNext = createButton("Nästa fråga");
  buttonNext.position(240, 320);
  buttonNext.mousePressed(nextQuestion);
  buttonNext.hide();
}

function startTraining() {
  table = int(input.value());
  if (table < 1 || table > 10) {
    alert("Ange en tabell mellan 1 och 10.");
    return;
  }

  questions = [];
  for (let i = 1; i <= 10; i++) {
    questions.push({ a: table, b: i, answer: table * i });
  }

  questions = shuffle(questions);
  currentIndex = 0;
  resultMessage = "";

  input.value("");
  input.attribute("placeholder", "Skriv ditt svar här");

  buttonStart.hide();
  buttonNext.show();

  startTime = millis();
}

function draw() {
  background(240);

  if (table === null) {
    text("Välj vilken tabell du vill öva på", width / 2, height / 2);
    return;
  }

  if (currentIndex < questions.length) {
    let q = questions[currentIndex];
    text(`${q.a} × ${q.b} = ?`, width / 2, height / 2);
  } else {
    text(resultMessage, width / 2, height / 2);
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    nextQuestion();
  }
}

function nextQuestion() {
  if (table === null || currentIndex >= questions.length) return;

  let q = questions[currentIndex];
  let userAnswer = int(input.value());

  if (userAnswer === q.answer) {
    currentIndex++;
    input.value("");

    if (currentIndex === questions.length) {
      let totalTime = floor((millis() - startTime) / 1000);
      resultMessage = `Bra jobbat!\nTid: ${totalTime} sekunder.`;
      buttonNext.hide();
      buttonStart.show();
      input.attribute("placeholder", "Välj tabell (1-10)");
    }
  } else {
    alert("Fel svar, försök igen!");
  }
}
