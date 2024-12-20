window.onload = function() {
  // 获取所有带有 'card' 类的 <a> 标签
  const cards = document.querySelectorAll('.button.button-8.card');
    
  // 遍历每个卡片并为每个卡片添加点击事件
  cards.forEach(card => {
    card.addEventListener('click', function(event) {
      // 获取当前点击卡片的名称和价格
      const productName = this.querySelector('.name') ? this.querySelector('.name').textContent.trim() : this.querySelector('.btn-txt-wrapper').textContent.trim();
      const price = this.querySelector('.price') ? this.querySelector('.price').textContent.trim() : this.querySelector('span').textContent.trim();
      
      // 将产品信息保存到 localStorage 或 sessionStorage 中
      const productData = { name: productName, price: price };
      localStorage.setItem('selectedProduct', JSON.stringify(productData)); // 或者使用 sessionStorage 一個記憶機制，確保頁面刷新十資料還在

      // 跳转到 old-page-5.html
      window.location.href = './old-page-5.html';
    });
  });

  //以下在page-4中會出現錯誤訊息
  // 从 localStorage 或 sessionStorage 获取保存的产品数据
  const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct')); // 或者使用 sessionStorage

  // 如果数据存在，更新页面内容
  if (selectedProduct) {
    const productTitleDiv = document.querySelector('.product-title');
    const costSpan = productTitleDiv.querySelector('.cost');
    
    // 更新页面的标题和价格
    productTitleDiv.querySelector('h3').textContent = selectedProduct.name;
    costSpan.textContent = selectedProduct.price;
  } else {
    console.error('no data');
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
});

document.querySelector(".decrease").addEventListener("click", () => {
  if (quantity > 1) quantity--;
  quantityDisplay.textContent = quantity;
});

// 記憶先前連結
