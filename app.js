function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username && password) {
    localStorage.setItem("loggedInUser", username);
    window.location.href = "home.html";
  } else {
    document.getElementById("loginMessage").innerText =
      "Атыңызды жана паролду киргизиңиз.";
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

function showGame(sectionId) {
  document.getElementById("kyzKuumaiSection").classList.add("hidden");
  document.getElementById("altynShakekSection").classList.add("hidden");
  document.getElementById(sectionId).classList.remove("hidden");
}

// Кыз куумай
let girlQuestions = [];
let boyQuestions = [];
let girlQuestionIndex = 0;
let boyQuestionIndex = 0;
let girlPosition = 120;
let boyPosition = 40;
let finishPosition = 720;

function addKyzKuumaiQuestions() {
  const girlQuestion = document.getElementById("girlQuestion").value.trim();
  const boyQuestion = document.getElementById("boyQuestion").value.trim();

  if (!girlQuestion || !boyQuestion) {
    alert("Кыздар жана балдар үчүн суроолорду киргизиңиз.");
    return;
  }

  girlQuestions.push(girlQuestion);
  boyQuestions.push(boyQuestion);

  document.getElementById("girlQuestion").value = "";
  document.getElementById("boyQuestion").value = "";

  alert("Суроолор кошулду!");
}

function startKyzKuumaiGame() {
  if (girlQuestions.length === 0 || boyQuestions.length === 0) {
    alert("Алгач суроолорду кошуңуз.");
    return;
  }

  girlPosition = 120;
  boyPosition = 40;
  girlQuestionIndex = 0;
  boyQuestionIndex = 0;

  document.getElementById("girlRider").style.left = girlPosition + "px";
  document.getElementById("boyRider").style.left = boyPosition + "px";
  document.getElementById("kyzKuumaiResult").innerText = "";

  showKyzKuumaiQuestions();
}

function showKyzKuumaiQuestions() {
  document.getElementById("currentGirlQuestion").innerText =
    girlQuestions[girlQuestionIndex % girlQuestions.length];

  document.getElementById("currentBoyQuestion").innerText =
    boyQuestions[boyQuestionIndex % boyQuestions.length];
}

function moveGirl() {
  girlPosition += 60;
  girlQuestionIndex++;

  document.getElementById("girlRider").style.left = girlPosition + "px";

  if (girlPosition >= finishPosition) {
    document.getElementById("kyzKuumaiResult").innerText =
      "🎉 Кыздар тобу финишке жетти! Кыздар жеңди!";
    return;
  }

  showKyzKuumaiQuestions();
}

function moveBoy() {
  boyPosition += 60;
  boyQuestionIndex++;

  document.getElementById("boyRider").style.left = boyPosition + "px";

  if (boyPosition >= girlPosition) {
    document.getElementById("kyzKuumaiResult").innerText =
      "🎉 Балдар тобу кызды кууп жетти! Балдар жеңди!";
    return;
  }

  showKyzKuumaiQuestions();
}

// Алтын шакек
let altynStudents = [];
let altynQuestionList = [];
let handStates = [];

function createHands() {
  const namesText = document.getElementById("studentNames").value.trim();
  const questionsText = document.getElementById("altynQuestions").value.trim();

  if (!namesText || !questionsText) {
    alert("Окуучулардын аттарын жана суроолорду киргизиңиз.");
    return;
  }

  altynStudents = namesText.split("\n").map(name => name.trim()).filter(Boolean);
  altynQuestionList = questionsText.split("\n").map(q => q.trim()).filter(Boolean);
  handStates = altynStudents.map(() => true);

  const container = document.getElementById("handsContainer");
  container.innerHTML = "";

  altynStudents.forEach((student, index) => {
    const handCard = document.createElement("div");
    handCard.className = "hand-card";
    handCard.id = "handCard" + index;
    handCard.onclick = function () {
      closeHand(index);
    };

    handCard.innerHTML = `
      <strong>${student}</strong>
      <div class="hand" id="hand${index}">🤲</div>
    `;

    container.appendChild(handCard);
  });

  document.getElementById("ringResult").innerText =
    "Колдор даяр. Эми мугалим колдорду басып жаба алат.";
}

function closeHand(index) {
  handStates[index] = false;

  document.getElementById("hand" + index).innerText = "✊";
  document.getElementById("handCard" + index).classList.add("closed-hand");
}

function chooseRingHand() {
  if (altynStudents.length === 0 || altynQuestionList.length === 0) {
    alert("Алгач окуучуларды жана суроолорду киргизиңиз.");
    return;
  }

  const randomIndex = Math.floor(Math.random() * altynStudents.length);
  const randomQuestion =
    altynQuestionList[Math.floor(Math.random() * altynQuestionList.length)];

  document.getElementById("hand" + randomIndex).innerHTML = "💍📜";
  document.getElementById("handCard" + randomIndex).classList.remove("closed-hand");

  document.getElementById("ringResult").innerHTML =
    `<strong>${altynStudents[randomIndex]}</strong> окуучусуна суроо:<br><br>${randomQuestion}`;
}

// Катаны тап
let mistakeTasks = JSON.parse(localStorage.getItem("mistakeTasks")) || [];
let currentMistakeIndex = 0;
let mistakePoints = 0;

function addMistakeTask() {
  const wrongText = document.getElementById("wrongText").value;
  const correctText = document.getElementById("correctText").value;

  if (!wrongText || !correctText) {
    alert("Ката жазылган текстти жана туура вариантты киргизиңиз.");
    return;
  }

  mistakeTasks.push({ wrongText, correctText });
  localStorage.setItem("mistakeTasks", JSON.stringify(mistakeTasks));

  document.getElementById("wrongText").value = "";
  document.getElementById("correctText").value = "";

  alert("Тапшырма кошулду");
}

function startMistakeGame() {
  if (mistakeTasks.length === 0) {
    alert("Алгач тапшырма кошуңуз.");
    return;
  }

  currentMistakeIndex = 0;
  mistakePoints = 0;
  document.getElementById("mistakePoints").innerText = mistakePoints;
  document.getElementById("mistakeResult").innerText = "";

  showMistakeTask();
}

function showMistakeTask() {
  if (currentMistakeIndex >= mistakeTasks.length) {
    document.getElementById("taskText").innerText = "Оюн бүттү!";
    document.getElementById("mistakeResult").innerText =
      "Жалпы упай: " + mistakePoints;
    return;
  }

  document.getElementById("taskText").innerText =
    mistakeTasks[currentMistakeIndex].wrongText;
}

function checkMistakeAnswer() {
  if (currentMistakeIndex >= mistakeTasks.length) {
    return;
  }

  const answer = document.getElementById("studentAnswer").value.trim();
  const correct = mistakeTasks[currentMistakeIndex].correctText.trim();

  if (!answer) {
    alert("Туура жоопту киргизиңиз.");
    return;
  }

  if (answer === correct) {
    mistakePoints++;
    document.getElementById("mistakeResult").innerText =
      "✅ Туура! +1 упай";
  } else {
    document.getElementById("mistakeResult").innerText =
      "❌ Туура эмес. Туура жооп: " + correct;
  }

  document.getElementById("mistakePoints").innerText = mistakePoints;
  document.getElementById("studentAnswer").value = "";

  currentMistakeIndex++;
  showMistakeTask();
}

// Математика тапшырма генератору
let generatedTasks = [];

function generateMathTasks() {
  const count = Number(document.getElementById("taskCount").value);
  const operations = Array.from(
    document.querySelectorAll(".operation:checked")
  ).map(op => op.value);

  if (operations.length === 0) {
    alert("Жок дегенде бир амал тандаңыз.");
    return;
  }

  generatedTasks = [];

  for (let i = 0; i < count; i++) {
    const a = Math.floor(Math.random() * 50) + 1;
    const b = Math.floor(Math.random() * 20) + 1;
    const operation = operations[Math.floor(Math.random() * operations.length)];

    generatedTasks.push(`${i + 1}) ${a} ${operation} ${b} = ______`);
  }

  document.getElementById("mathTasks").innerHTML = generatedTasks.join("<br>");
}

function downloadPDF() {
  if (generatedTasks.length === 0) {
    alert("Алгач тапшырмаларды түзүңүз.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("Математика тапшырмалары", 10, 10);

  generatedTasks.forEach((task, index) => {
    doc.text(task, 10, 20 + index * 10);
  });

  doc.save("matematika-tapshyrmalary.pdf");
}
