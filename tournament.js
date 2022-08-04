"use strict";

let playData = [];
let tmpData = [];
let cnt = 0;
let round = 1;
let playing = true;
const roundName = ["Round of 8", "Semifinal", "Final"];
const roundLimit = [8, 4, 2];
const tournamentContainer = document.querySelector(".tournament-container");

const loadFn = () => {
  loadLocalStorage();
  loadImgsHTML();
};

const loadLocalStorage = () => {
  const json = localStorage.getItem("playData");
  const parsed = JSON.parse(json);
  playData = parsed;
  console.log(playData);
};
window.addEventListener("load", loadFn);

const loadImgsHTML = () => {
  if (cnt >= roundLimit[round - 1]) {
    round++;
    cnt = 0;
    playData = tmpData;
    console.log(playData);
    tmpData = [];
    if (round === 4) {
      tournamentContainer.style.gridTemplateColumns = "1fr";
      let html = `
      <div class="tfood-content">
        <div class="tfood-title-container">
          <h3 class="tfood-title">${playData[0].title}</h3>
        </div>
        <img class="tfood-img" src="img/${playData[0].id}_${playData[0].description}.jpg" alt="${playData[0].description}" />
        <p class="tfood-description">₩${playData[0].price} / ${playData[0].calories}kcal</p>
      </div>
      <h1 class="winner">당신은 지금  <${playData[0].title}>  이/가 먹고 싶습니다!</h1>
    `;
      tournamentContainer.innerHTML = "";
      tournamentContainer.insertAdjacentHTML("beforeend", html);
      playing = false;
      return;
    }
  }

  for (let i = cnt; i < cnt + 2; i++) {
    let html = `
    <div class="tfood-content">
      <div class="tfood-title-container">
        <h3 class="tfood-title">${playData[i].title}</h3>
      </div>
      <img class="tfood-img" src="img/${playData[i].id}_${playData[i].description}.jpg" alt="${playData[i].description}" />
      <p class="tfood-description">₩${playData[i].price} / ${playData[i].calories}kcal</p>
    </div>
    `;
    if (i === cnt) {
      html += `
      <div class="middle">
        <div class="round">${roundName[round - 1]}</div>
        <div class="versus">VS</div>
      </div>
      `;
    }
    tournamentContainer.insertAdjacentHTML("beforeend", html);
  }
  cnt += 2;
};

const selectFunction = (e) => {
  if (playing === false) return;
  const selectedFood = e.target
    .closest(".tfood-content")
    .querySelector(".tfood-title").textContent;

  const food = playData.find((f) => f.title === selectedFood);

  tmpData.push(food);
  console.log(tmpData);
  console.log(cnt);

  tournamentContainer.innerHTML = "";
  loadImgsHTML();
};

tournamentContainer.addEventListener("click", selectFunction);
