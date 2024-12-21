window.onload = function () {
  const cardsN = document.querySelectorAll(".card1");
  const quantityDisplayN = document.querySelector(".normal-quantity");
  let quantityN = 1;

  // 通用函數：保存商品數據並跳轉頁面
  function saveProductData(
    card,
    nameSelector,
    priceSelector,
    imgSelector,
    storageKey,
    targetPage
  ) {
    const productName = card.querySelector(nameSelector).textContent.trim();
    const price = card.querySelector(priceSelector).textContent.trim();
    const image = card.querySelector(imgSelector).src.trim();
    const currentPage = window.location.pathname;
    const productData = {
      name: productName,
      price: price,
      image: image,
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

  cardsN.forEach((card) => {
    card.addEventListener("click", function () {
      saveProductData(
        card,
        ".name1",
        ".price1",
        "img",
        "selectedProduct1",
        "./normal-1.html"
      );
    });
  });

  // 處理 selectedProduct1 資料
  const selectedProduct1 = JSON.parse(localStorage.getItem("selectedProduct1"));
  if (selectedProduct1) {
    // 確認 normal-product-title 是否存在
    const productTitleDiv1 = document.querySelector(".normal-product-title");
    if (productTitleDiv1) {
      const costSpan1 = productTitleDiv1.querySelector(".normal-cost");
      const normalAdd = document.querySelector(".normalAdd");
      const imagesrc = document.querySelector(".image");
      if (costSpan1 && normalAdd && imagesrc) {
        productTitleDiv1.querySelector("h3").textContent =
          selectedProduct1.name;
        costSpan1.textContent = selectedProduct1.price;
        imagesrc.src = selectedProduct1.image;
        normalAdd.href = selectedProduct1.fromPage;

        normalAdd.addEventListener("click", () => {
          // 設置標記，用於目標頁面顯示 success
          localStorage.setItem("showSuccess", "true");
          // 跳轉到 fromPage
          window.location.href = selectedProduct1.fromPage;
        });
      } else {
        console.error("Required elements (costSpan1 or normalAdd) not found.");
      }
    } else {
      console.warn(".normal-product-title not found on this page.");
    }

    // 處理 showSuccess 狀態
    const showSuccess = localStorage.getItem("showSuccess");
    if (showSuccess === "true") {
      const success = document.querySelector(".success");

      if (success) {
        success.classList.add("pop-up");
      } else {
        console.error(".success element not found on this page.");
      }

      // 清除標記，避免下次進入該頁面時仍然顯示
      localStorage.removeItem("showSuccess");
    }

    // 設置數量控制（僅在需要的頁面設置）
    const increaseBtn = document.querySelector(".normal-increase");
    const decreaseBtn = document.querySelector(".normal-decrease");
    if (increaseBtn && decreaseBtn) {
      setupQuantityControls(
        increaseBtn,
        decreaseBtn,
        quantityDisplayN,
        quantityN
      );
    } else {
      console.warn("Quantity controls not found on this page.");
    }
  } else {
    console.error("No data for selectedProduct1.");
  }
};

const navBtn = document.querySelectorAll(".nav-btn");
const btnWrapper = document.querySelectorAll(".btn-wrapper");
const setWrapper = document.querySelector(".set-wrapper");
const mainWrapper = document.querySelector(".main-wrapper");
const drinkWrapper = document.querySelector(".drink-wrapper");
const normalAdd = document.querySelector(".normalAdd");

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
