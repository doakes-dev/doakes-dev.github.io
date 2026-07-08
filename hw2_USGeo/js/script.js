document.querySelector("button").addEventListener("click", gradeQuiz);

let attempts = localStorage.getItem("total_attempts");

displayQ4Choices();
displayQ6Choices();
displayQ10Choices();

if (attempts === null) {
  attempts = 0;
} else {
  attempts = Number(attempts);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function displayQ4Choices() {
  let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
  shuffleArray(q4ChoicesArray);

  let choicesContainer = document.querySelector("#q4Choices");
  choicesContainer.textContent = "";

  for (let choice of q4ChoicesArray) {
    let input = document.createElement("input");
    input.type = "radio";
    input.name = "q4";
    input.id = choice;
    input.value = choice;

    let label = document.createElement("label");
    label.htmlFor = choice;
    label.textContent = choice;

    choicesContainer.appendChild(input);
    choicesContainer.appendChild(label);
    choicesContainer.appendChild(document.createTextNode(" "));
  }
}

function displayQ6Choices() {
  let q6ChoicesArray = ["Alaska", "Pennsylvania", "Arizona", "Texas", "Montana"];
  shuffleArray(q6ChoicesArray);

  let choicesContainer = document.querySelector("#q6Choices");
  choicesContainer.textContent = "";

  for (let choice of q6ChoicesArray) {
    let input = document.createElement("input");
    input.type = "radio";
    input.name = "q6";
    input.id = choice;
    input.value = choice;

    let label = document.createElement("label");
    label.htmlFor = choice;
    label.textContent = choice;

    choicesContainer.appendChild(input);
    choicesContainer.appendChild(label);
    choicesContainer.appendChild(document.createTextNode(" "));
  }
}

function displayQ10Choices() {
  let q10ChoicesArray = ["Washington", "Virginia", "Wyoming", "Oklahoma", "Vermont"];
  shuffleArray(q10ChoicesArray);

  let choicesContainer = document.querySelector("#q10Choices");
  choicesContainer.textContent = "";

  for (let choice of q10ChoicesArray) {
    let input = document.createElement("input");
    input.type = "radio";
    input.name = "q10";
    input.id = choice;
    input.value = choice;

    let label = document.createElement("label");
    label.htmlFor = choice;
    label.textContent = choice;

    choicesContainer.appendChild(input);
    choicesContainer.appendChild(label);
    choicesContainer.appendChild(document.createTextNode(" "));
  }
}

function setMarkImage(index, imageName, altText) {
  let markContainer = document.querySelector(`#markImg${index}`);
  markContainer.textContent = "";

  let img = document.createElement("img");
  img.src = `img/${imageName}`;
  img.alt = altText;
  markContainer.appendChild(img);
}

function rightAnswer(index) {
  let feedback = document.querySelector(`#q${index}Feedback`);
  feedback.textContent = "Correct!";
  feedback.className = "bg-success text-white";
  setMarkImage(index, "checkmark.png", "Checkmark");
  score += 10;
}

function wrongAnswer(index) {
  let feedback = document.querySelector(`#q${index}Feedback`);
  feedback.textContent = "Incorrect!";
  feedback.className = "bg-warning text-white";
  setMarkImage(index, "xmark.png", "X mark");
}

function isFormValid() {
  let isValid = true;
  let q1Response = document.querySelector("#q1").value;
  let validationFdbk = document.querySelector("#validationFdbk");

  if (q1Response === "") {
    isValid = false;
    validationFdbk.textContent = "Question 1 was not answered";
  }

  return isValid;
}

function gradeQuiz() {
    document.querySelector("#validationFdbk").textContent = "";

    if (!isFormValid()) {
        return;
    }

    score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;
    let q7Response = document.querySelector("#q7").value;
    let q8Response = document.querySelector("#q8").value.toLowerCase();

    if (q1Response === "sacramento") {
        rightAnswer(1);
    } else {
        wrongAnswer(1);
    }

    if (q2Response === "mo") {
        rightAnswer(2);
    } else {
        wrongAnswer(2);
    }

    if (document.querySelector("#Jefferson").checked &&
    document.querySelector("#Roosevelt").checked &&
    !document.querySelector("#Jackson").checked &&
    !document.querySelector("#Franklin").checked) {
        rightAnswer(3);
    } else {
        wrongAnswer(3);
    }

    let selectedQ4 = document.querySelector("input[name=q4]:checked");

    if (selectedQ4 !== null && selectedQ4.value === "Rhode Island") {
        rightAnswer(4);
    } else {
        wrongAnswer(4);
    }

    if (document.querySelector("#austin").checked &&
    document.querySelector("#houston").checked &&
    !document.querySelector("#newYork").checked &&
    !document.querySelector("#chicago").checked &&
    !document.querySelector("#pittsburgh").checked &&
    !document.querySelector("#boise").checked) {
        rightAnswer(5);
    } else {
        wrongAnswer(5);
    }

    let selectedQ6 = document.querySelector("input[name=q6]:checked");

    if (selectedQ6 !== null && selectedQ6.value === "Texas") {
        rightAnswer(6);
    } else {
        wrongAnswer(6);
    }

    if (q7Response === "nv") {
        rightAnswer(7);
    } else {
        wrongAnswer(7);
    }

    if (q8Response === "san andreas") {
        rightAnswer(8);
    } else {
        wrongAnswer(8);
    }

    if (document.querySelector("#mo").checked &&
    document.querySelector("#il").checked &&
    document.querySelector("#in").checked &&
    !document.querySelector("#id").checked &&
    !document.querySelector("#ny").checked &&
    !document.querySelector("#co").checked) {
        rightAnswer(9);
    } else {
        wrongAnswer(9);
    }

    if (selectedQ10 !== null && selectedQ10.value === "Wyoming") {
        rightAnswer(10);
    } else {
        wrongAnswer(10);
    }

    document.querySelector("#totalScore").textContent = `Total Score: ${score}`;
    
    const total = document.getElementById("totalScore");

    total.classList.remove("text-info", "text-danger", "text-success");

    if (score < 80) {
        total.classList.add("text-danger");
        document.querySelector("#scoreFdbk").textContent = "";
    } else {
        total.classList.add("text-success");
        document.querySelector("#scoreFdbk").textContent = "You scored above 80.";
    }

    attempts++;
    document.querySelector("#totalAttempts").textContent = `Total Attempts: ${attempts}`;
    localStorage.setItem("total_attempts", attempts);
}