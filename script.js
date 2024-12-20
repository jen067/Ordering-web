window.onload = function () {
  const cards = document.querySelectorAll(".card");
  const cardsN = document.querySelectorAll(".card1");
  const quantityDisplay = document.querySelector(".quantity");
  const quantityDisplayN = document.querySelector(".normal-quantity");
  let quantity = 1;
  let quantityN = 1;

  // 通用函數：保存商品數據並跳轉頁面
  function saveProductData(
    card,
    nameSelector,
    priceSelector,
    storageKey,
    targetPage
  ) {
    const productName = card.querySelector(nameSelector).textContent.trim();
    const price = card.querySelector(priceSelector).textContent.trim();
    const currentPage = window.location.pathname;
    const productData = {
      name: productName,
      price: price,
      fromPage: currentPage,
    };
    localStorage.setItem(storageKey, JSON.stringify(productData));
    window.location.href = targetPage;
  }

  // 點餐數量切換
  function setupQuantityControls(
    increaseBtn,
    decreaseBtn,
    display,
    quantityVar
  ) {
    const updateButtonStyle = (quantity, button) => {
      button.style.setProperty(
        "background-color",
        quantity > 1 ? "#EAC143" : "#D9D9D9",
        "important"
      );
    };

    increaseBtn.addEventListener("click", () => {
      quantityVar++;
      display.textContent = quantityVar;
      updateButtonStyle(quantityVar, decreaseBtn);
    });

    decreaseBtn.addEventListener("click", () => {
      if (quantityVar > 1) quantityVar--;
      display.textContent = quantityVar;
      updateButtonStyle(quantityVar, decreaseBtn);
    });
  }

  // 綁定卡片點擊事件
  cards.forEach((card) => {
    card.addEventListener("click", function () {
      saveProductData(
        card,
        ".name",
        ".price",
        "selectedProduct",
        "./old-page-5.html"
      );
    });
  });

  cardsN.forEach((card) => {
    card.addEventListener("click", function () {
      saveProductData(
        card,
        ".name1",
        ".price1",
        "selectedProduct1",
        "./normal-1.html"
      );
    });
  });

  // 處理 selectedProduct 資料
  const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
  if (selectedProduct) {
    const productTitleDiv = document.querySelector(".product-title");
    const costSpan = productTitleDiv.querySelector(".cost");
    const cancel = document.querySelector(".cancel");

    productTitleDiv.querySelector("h3").textContent = selectedProduct.name;
    costSpan.textContent = selectedProduct.price;
    cancel.href = selectedProduct.fromPage;

    setupQuantityControls(
      document.querySelector(".increase"),
      document.querySelector(".decrease"),
      quantityDisplay,
      quantity
    );
  } else {
    console.error("No data for selectedProduct.");
  }

  // 處理 selectedProduct1 資料
  const selectedProduct1 = JSON.parse(localStorage.getItem("selectedProduct1"));
  if (selectedProduct1) {
    const productTitleDiv1 = document.querySelector(".normal-product-title");
    const costSpan1 = productTitleDiv1.querySelector(".normal-cost");

    productTitleDiv1.querySelector("h3").textContent = selectedProduct1.name;
    costSpan1.textContent = selectedProduct1.price;

    setupQuantityControls(
      document.querySelector(".normal-increase"),
      document.querySelector(".normal-decrease"),
      quantityDisplayN,
      quantityN
    );
  } else {
    console.error("No data for selectedProduct1.");
  }
};

const navBtn = document.querySelectorAll(".nav-btn");
const btnWrapper = document.querySelectorAll(".btn-wrapper");
const setWrapper = document.querySelector(".set-wrapper");
const mainWrapper = document.querySelector(".main-wrapper");
const drinkWrapper = document.querySelector(".drink-wrapper");

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
