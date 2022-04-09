let words = ["addiction", "life", "music", "family", "autumn"];

let wordEl = document.querySelector("#word");
const axeEl = document.querySelector("#axe");
const axeTextEl = document.querySelector("#axe__text");
const alertEl = document.querySelector("#alert");
const hideAlertBtn = document.querySelector("#hideAlert");

let score = 0;
let amountRightLetters = 0;

let currentWord;
let wrongLettersEl = document.querySelector(".wrong__letters");

document.addEventListener("DOMContentLoaded", () => {
  loadNewWord();
  if (document.documentElement.clientWidth <= 768) {
    alertEl.classList.add("active");
  }
});

window.addEventListener("resize", () => {
  if (document.documentElement.clientWidth <= 768) {
    alertEl.classList.add("active");
  } else alertEl.classList.remove("active");
});

hideAlertBtn.addEventListener('click', () => {
  alertEl.classList.remove("active");
});

function loadNewWord() {
  wrongLettersEl.innerHTML = "";
  wordEl.innerHTML = "";
  amountRightLetters = 0;

  // choose random word
  currentWord = words[Math.floor(Math.random() * words.length)].split("");
  currentWord.forEach(() => {
    wordEl.innerHTML += '<span class="word__letter"></span>';
  });
  document.querySelectorAll(".human").forEach((el) => {
    el.classList.add("hidden");
  });
}

function handleWrongLetter(letter) {
  if (wrongLettersEl.innerHTML.indexOf(letter) === -1) {
    wrongLettersEl.innerHTML += wrongLettersEl.innerHTML ? `, ${letter}` : letter;
    let humanHiddenEls = document.querySelectorAll(".human.hidden");
    if (humanHiddenEls.length) {
      humanHiddenEls[0].classList.remove("hidden");
    } else {
      setScore(--score);
      loadNewWord();
    }
  } else {
    showAxe("This letter has already been entered and it is not correct");
  }
}

function setScore(score) {
  document.querySelector(".score").innerHTML = score;
}

document.addEventListener("keydown", (e) => {
  if (e.code.slice(0, -1) == "Key") {
    if (currentWord.indexOf(e.key) !== -1 && wordEl.textContent.indexOf(e.key) === -1) {
      let arr = [];
      currentWord.forEach((el, i) => {
        if (el == e.key) arr.push(i);
      });

      arr.forEach((el) => {
        amountRightLetters++;
        wordEl.children[el].innerHTML = e.key;
      });
      if (currentWord.length == amountRightLetters) {
        loadNewWord();
        setScore(++score);
      }
    } else if (wordEl.textContent.indexOf(e.key) === -1) {
      handleWrongLetter(e.key);
    } else {
      showAxe("This letter has already been guessed");
    }
  }
  else {
    showAxe("It's not even a letter");
  }
});

function showAxe(text) {
  if (!axeEl.classList.contains('active')) {
    document.querySelector("#axe__text").innerHTML = text;
    axeEl.classList.add("active");
    setTimeout(() => {
      axeEl.classList.remove("active");
    }, 2000);
  }
}
