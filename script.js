document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".burger");
  if (card) {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("成功綁定事件！");
    });
  } else {
    console.error("找不到 .burger 元素！");
  }
});

const navBtn = document.querySelectorAll(".nav-btn");
const btnWrapper = document.querySelectorAll(".btn-wrapper");
const setWrapper = document.querySelector(".set-wrapper");
const mainWrapper = document.querySelector(".main-wrapper");
const drinkWrapper = document.querySelector(".drink-wrapper");
const total = document.querySelectorAll(".total");
const quantityDisplay = document.querySelector(".quantity");
const cancel = document.querySelector(".cancel");
let priceCalc = 0;
let quantity = 1;

// 修正總價
total.forEach((element) => {
  element.innerHTML = priceCalc;
});

// 標準模式類別切換
navBtn.forEach((e) => {
  e.addEventListener("click", navStatusChange);
});

function navStatusChange() {
  navBtn.forEach((btn) => btn.classList.remove("nav-active"));
  btnWrapper.forEach((btn) => btn.classList.remove("normal-active"));
  this.classList.add("nav-active");
  if (this.innerHTML == "套餐") {
    setWrapper.classList.add("normal-active");
  } else if (this.innerHTML == "主食") {
    mainWrapper.classList.add("normal-active");
  } else if (this.innerHTML == "飲品") {
    drinkWrapper.classList.add("normal-active");
  }
}

// 點餐數量切換
document.querySelector(".increase").addEventListener("click", () => {
  quantity++;
  quantityDisplay.textContent = quantity;
});

document.querySelector(".decrease").addEventListener("click", () => {
  if (quantity > 1) quantity--;
  quantityDisplay.textContent = quantity;
});

// 記憶先前連結
