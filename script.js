window.onload = function () {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("click", function (event) {
      // 獲取商品名稱和價格
      const productName = this.querySelector(".name").textContent.trim();
      const price = this.querySelector(".price").textContent.trim();
      // 獲取當前頁面路徑
      const currentPage = window.location.pathname;
      // 將資料存入 localStorage
      const productData = {
        name: productName,
        price: price,
        fromPage: currentPage,
      };
      localStorage.setItem("selectedProduct", JSON.stringify(productData));

      // 跳轉到目標頁面
      window.location.href = "./old-page-5.html";
    });
  });
  const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
  if (selectedProduct) {
    const productTitleDiv = document.querySelector(".product-title");
    const costSpan = productTitleDiv.querySelector(".cost");
    const cancel = document.querySelector(".cancel");
    productTitleDiv.querySelector("h3").textContent = selectedProduct.name;
    costSpan.textContent = selectedProduct.price;
    cancel.href = selectedProduct.fromPage;
  } else {
    console.error("no data");
  }
};

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
  if (quantity > 1) {
    let button = document.querySelector(".decrease");
    button.style.setProperty("background-color", "#EAC143", "important");
  }
});

document.querySelector(".decrease").addEventListener("click", () => {
  if (quantity > 1) quantity--;
  quantityDisplay.textContent = quantity;
  if (quantity == 1) {
    let button = document.querySelector(".decrease");
    button.style.setProperty("background-color", "#D9D9D9", "important");
  }
});

// 記憶先前連結
