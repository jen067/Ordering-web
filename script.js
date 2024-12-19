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

// 儲存連結

document.addEventListener("DOMContentLoaded", function () {
  const card = document.querySelector(".burger");
  if (card) {
    card.addEventListener("click", function () {
      console.log("链接被点击了！");
    });
  } else {
    console.log("没有找到链接元素");
  }
});

card.addEventListener("click", memoryLink);

function memoryLink(e) {
  e.preventDefault(); // 阻止默認跳轉
  console.log("記錄連結成功！");

  const preLink = e.currentTarget.href; // 獲取點擊的卡片連結
  console.log("記錄的連結是：", preLink);

  // 如果需要將連結設置到某個元素上，比如 #cancel
  const cancel = document.querySelector(".cancel"); // 假設有這個元素
  if (cancel) {
    cancel.href = preLink;
    console.log("取消按鈕的連結已更新！");
  } else {
    console.error("找不到 #cancel 元素！");
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
