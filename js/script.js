let wordEl = document.querySelector(".word");

let currentWord;
let numCorrectLetters = 0;
let wrongLettersEl = document.querySelector(".wrong__letters");

let words = ["addiction", "life", "music", "family", "autumn"];

let score = 0;


document.addEventListener("DOMContentLoaded", () => {
  reloadAndStart();
  if (document.documentElement.clientWidth <= 768) {
    document.querySelector('.alert').classList.add('active');
  }
});

window.addEventListener('resize', () => {
  if (document.documentElement.clientWidth <= 768) {
    document.querySelector('.alert').classList.add('active');
  }
  else document.querySelector('.alert').classList.remove('active');
});

function reloadAndStart() {
  wrongLettersEl.innerHTML = "";
  numCorrectLetters = 0;
  let randomNumber = Math.floor(Math.random() * words.length);
  currentWord = words[randomNumber].split("");
  wordEl.innerHTML = "";
  currentWord.forEach(() => {
    wordEl.innerHTML += '<span class="word__letter"></span>';
  });
  document.querySelectorAll(".human").forEach((el) => {
    el.classList.add("hidden");
  });
}

function wrongLetter(letter) {
  if (wrongLettersEl.innerHTML.indexOf(letter) == -1) {
    wrongLettersEl.innerHTML += wrongLettersEl.innerHTML ? `, ${letter}` : letter;
    let humanHiddenEls = document.querySelectorAll(".human.hidden");
    if (humanHiddenEls.length) {
      humanHiddenEls[0].classList.remove("hidden");
    } else {
      score--;
      document.querySelector(".score").innerHTML = score;
      reloadAndStart();
    }
  } else {
    axe("This letter has already been entered and it is not correct");
  }
}

document.addEventListener("keydown", (e) => {
  // Если нажата клавиша с буквой
  if (e.code.slice(0, -1) == "Key") {
    // Если нажатая буква верная
    if (currentWord.indexOf(e.key) != -1 && wordEl.textContent.indexOf(e.key) == -1) {

      let arr = [];
      currentWord.filter((el, i) => {
        if (el == e.key) arr.push(i);
      })
      arr.forEach((el) => {
        numCorrectLetters++;
        wordEl.children[el].innerHTML = e.key;
      });
      // Если введены все буквы в слово
      if (currentWord.length == numCorrectLetters) {
        reloadAndStart();
        score++;
        document.querySelector(".score").innerHTML = score;
      }
    } else if (wordEl.textContent.indexOf(e.key) == -1) {
      wrongLetter(e.key);
    } else {
      axe("This letter has already been guessed");
    }
  }
  // Если нажата клавиша не с буквой
  else {
    axe("It's not even a letter");
  }
});

function axe(text) {
  if (!document.querySelector(".axe.active")) {
    document.querySelector(".axe__text").innerHTML = text;
    document.querySelector(".axe").classList.add("active");
    setTimeout(() => {
      document.querySelector(".axe").classList.remove("active");
    }, 2000);
  }
}
