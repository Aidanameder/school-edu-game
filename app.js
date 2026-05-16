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
