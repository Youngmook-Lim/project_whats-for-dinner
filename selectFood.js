"use strict";

const data = [
  {
    title: "바베큐",
    id: 1,
    description: "barbeque",
    price: 30000,
    calories: 1200,
  },
  {
    title: "비빔밥",
    id: 2,
    description: "bibimbap",
    price: 9000,
    calories: 600,
  },
  {
    title: "파스타",
    id: 3,
    description: "pasta",
    price: 11000,
    calories: 953,
  },
  {
    title: "초밥",
    id: 4,
    description: "sushi",
    price: 20000,
    calories: 1100,
  },
  {
    title: "피자",
    id: 5,
    description: "pizza",
    price: 24000,
    calories: 2000,
  },
  {
    title: "김밥",
    id: 6,
    description: "kimbap",
    price: 3000,
    calories: 485,
  },
  {
    title: "햄버거",
    id: 7,
    description: "hamburger",
    price: 8000,
    calories: 900,
  },
  {
    title: "든든한 싸피 한 끼",
    id: 8,
    description: "ssafy",
    price: 0,
    calories: 700,
  },
  {
    title: "촉촉한 닭가슴살",
    id: 9,
    description: "chicken-breast",
    price: 1490,
    calories: 164,
  },
  {
    title: "치킨",
    id: 10,
    description: "chicken",
    price: 22000,
    calories: 2500,
  },
  {
    title: "탕수육(부먹)",
    id: 11,
    description: "tang-su",
    price: 12000,
    calories: 350,
  },
  {
    title: "떡볶이",
    id: 12,
    description: "tteokbokki",
    price: 14000,
    calories: 304,
  },
  {
    title: "닭볶음탕",
    id: 13,
    description: "dak-bokkeumtang",
    price: 19000,
    calories: 370,
  },
  {
    title: "감자탕",
    id: 14,
    description: "gamjatang",
    price: 15000,
    calories: 429,
  },
  {
    title: "만두전골",
    id: 15,
    description: "mandu",
    price: 18000,
    calories: 500,
  },
  {
    title: "김계란의 프로틴",
    id: 16,
    description: "protein",
    price: 1200,
    calories: 280,
  },
  {
    title: "4반과 단란한 회식",
    id: 17,
    description: "zzal",
    price: 10000,
    calories: 0,
  },
  {
    title: "김치찌개",
    id: 18,
    description: "kimchi-stew",
    price: 12000,
    calories: 600,
  },
  {
    title: "카레",
    id: 19,
    description: "curry",
    price: 30000,
    calories: 1200,
  },
  {
    title: "소주",
    id: 20,
    description: "soju",
    price: 1900,
    calories: 400,
  },
  {
    title: "생맥주",
    id: 21,
    description: "beer",
    price: 4000,
    calories: 250,
  },
  {
    title: "마라탕",
    id: 22,
    description: "maratang",
    price: 15000,
    calories: 800,
  },
  {
    title: "삼겹살",
    id: 23,
    description: "samgyupsal",
    price: 25000,
    calories: 1100,
  },
  {
    title: "부리또",
    id: 24,
    description: "burrito",
    price: 5000,
    calories: 500,
  },
];

const playData = [];

const listContainer = document.querySelector(".list-container");
const counter = document.querySelector(".counter");
const btnGame = document.querySelector(".btn-game");

const loadImgsHTML = () => {
  alert("8개를 선택하세요!");
  data.forEach((menu) => {
    const html = `
    <div class="food-content">
      <div class="food-title-container">
        <h3 class="food-title">${menu.title}</h3>
        <input class="checkbox" type="checkbox" />
      </div>
      <img class="food-img" src="/img/${menu.id}_${menu.description}.jpg" alt="${menu.description}" />
      <p class="food-description">₩${menu.price} / ${menu.calories}kcal</p>
    </div>
    `;
    listContainer.insertAdjacentHTML("beforeend", html);
  });
};

window.addEventListener("load", loadImgsHTML);

const addToPlayData = (e) => {
  const box = e.target;
  if (!box.classList.contains("checkbox")) return;
  const foodTitle = box.parentElement.querySelector(".food-title").textContent;

  const food = data.find((f) => f.title === foodTitle);

  if (box.checked) {
    if (playData.length < 8) {
      playData.push(food);
    } else {
      alert("8개 까지만 선택이 가능합니다!");
      e.preventDefault();
      return;
    }
  } else {
    let idx = 0;
    for (let i = 0; i < playData.length; i++) {
      if (playData[i].title === food.title) {
        idx = i;
      }
    }
    playData.splice(idx, 1);
  }
  updateCnt(playData.length);
  checkStartCondition();
  console.log(playData);
};

const updateCnt = (cnt) => {
  counter.innerHTML = `${cnt}<span>개</span>`;
};

const checkStartCondition = () => {
  if (!(playData.length === 8)) {
    btnGame.setAttribute("style", "pointer-events: none; opacity: 50%;");
    counter.style.backgroundColor = "#219cba80";
  } else {
    btnGame.setAttribute("style", "pointer-events: all; opacity: 100%;");
    counter.style.backgroundColor = "#219ebc";
    const stringifyData = JSON.stringify(playData);
    localStorage.setItem("playData", stringifyData);
  }
};

listContainer.addEventListener("click", addToPlayData);
