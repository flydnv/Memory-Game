const flipSound = new Audio("sounds/shuffleEfect.mp3");
const scoreTable = document.querySelector(".score_table");
const pointsElement = document.querySelector("#pointCount");
const lifeElement = document.querySelector("#lifeCount");
const section = document.querySelector(".elements");
let elements = ["javascript", "laravel", "mongo", "nodejs", "php", "react"];
elements = [...elements, ...elements];
let selected = [];
// elements.sort(() => Math.random() - 0.5);

let pointCount = 0;
let lifeCount = 3;
let allow = true;
const updateScore = () => {
  pointsElement.textContent = `Xal:${pointCount}`;
  lifeElement.textContent = `Life:${lifeCount}`;
};
updateScore();

const flipCards = () => {
  document
    .querySelectorAll(".back")
    .forEach((a) => (a.style.transform = "rotateY(180deg)"));
};
setTimeout(flipCards, 2000);
elements.forEach((a) => {
  let img = document.createElement("img");
  img.setAttribute("src", `images/${a}.png`);
  let back_img = document.createElement("img");
  back_img.setAttribute("src", "images/back.jpg");
  let card = document.createElement("div");
  card.classList.add("card");
  card.addEventListener("click", () => {
    if (!allow || card.classList.contains("active") || selected.length === 2) {
      return;
    }
    flipSound.play();
    card.classList.add("active");
    selected.push(a);
    if (selected.length === 2) {
      if (selected[0] === selected[1]) {
        pointCount++;
        updateScore();
        setTimeout(() => {
          document
            .querySelectorAll(".active")
            .forEach((a) => a.classList.add("active2"));
          // document
          //   .querySelectorAll(".active")
          //   .forEach((a) => a.classList.remove("active"));
          selected = [];
        }, 1000);
      } else {
        lifeCount--;
        updateScore();
        if (!lifeCount) {
          document.querySelectorAll(".card:not(.active)").forEach((t) => {
            t.classList.add(".active");
          });
          return;
        }
        setTimeout(() => {
          flipSound.play();
          document
            .querySelectorAll(".active:not(.active2)")
            .forEach((a) => a.classList.remove("active"));
          selected = [];
        }, 2000);
      }
    }
    console.log(selected);
  });
  let card__inner = document.createElement("div");
  card__inner.classList.add("card__inner");
  let front = document.createElement("div");
  front.classList.add("front");
  let back = document.createElement("div");
  back.classList.add("back");
  back.append(img);
  back.classList.add("back");
  front.append(back_img);
  card__inner.append(front, back);
  card.append(card__inner);
  section.append(card);
});

document.addEventListener("transitionstart", () => {
  allow = false;
});
document.addEventListener("transitionend", () => {
  allow = true;
});
