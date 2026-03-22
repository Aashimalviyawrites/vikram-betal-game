let currentScene = 0;

const storyBox = document.getElementById("story-box");
const riddleBox = document.getElementById("riddle-box");
const question = document.getElementById("question");
const optionsDiv = document.getElementById("options");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");

function loadScene() {
  const scene = gameData.scenes[currentScene];

  feedback.innerText = "";
  optionsDiv.innerHTML = "";

  if (scene.type === "story") {
    storyBox.innerText = scene.text;
    riddleBox.classList.add("hidden");
  }

  if (scene.type === "riddle") {
    storyBox.innerText = "";
    riddleBox.classList.remove("hidden");

    question.innerText = scene.question;

    scene.options.forEach((opt, index) => {
      const btn = document.createElement("button");
      btn.innerText = opt;

      btn.onclick = () => checkAnswer(index, scene.correct);

      optionsDiv.appendChild(btn);
    });
  }
}

function checkAnswer(selected, correct) {
  if (selected === correct) {
    feedback.innerText = "Correct. You judged wisely.";
    nextBtn.style.display = "block";
  } else {
    feedback.innerText = "Not quite. Think again.";
  }
}

nextBtn.onclick = () => {
  currentScene++;
  nextBtn.style.display = "none";

  if (currentScene < gameData.scenes.length) {
    loadScene();
  } else {
    storyBox.innerText = "End of Level 1";
    riddleBox.classList.add("hidden");
  }
};

loadScene();
