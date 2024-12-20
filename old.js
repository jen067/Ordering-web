window.onload = function () {
  const cards = document.querySelectorAll(".card");
  const quantityDisplay = document.querySelector(".quantity");
  let quantity = 1;

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

  // 處理 selectedProduct 資料
  const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
  if (selectedProduct) {
    const productTitleDiv = document.querySelector(".product-title");
    if (productTitleDiv) {
      const costSpan = productTitleDiv.querySelector(".cost");
      const cancel = document.querySelector(".cancel");
      if (costSpan && cancel) {
        productTitleDiv.querySelector("h3").textContent = selectedProduct.name;
        costSpan.textContent = selectedProduct.price;
        cancel.href = selectedProduct.fromPage;
      }
    }
    const increaseBtn = document.querySelector(".increase");
    const decreaseBtn = document.querySelector(".decrease");
    if (increaseBtn && decreaseBtn) {
      setupQuantityControls(
        increaseBtn,
        decreaseBtn,
        quantityDisplay,
        quantity
      );
    } else {
      console.warn("Quantity controls not found on this page.");
    }
  } else {
    console.error("No data for selectedProduct.");
  }
};