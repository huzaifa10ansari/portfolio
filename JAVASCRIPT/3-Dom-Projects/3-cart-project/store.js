//Define Dom Variables
const shopItemButtons = document.getElementsByClassName("shop-item-button");
const purchaseBtn = document.getElementsByClassName("btn-purchase")[0];
const cartItems = document.getElementsByClassName("cart-items")[0];
const cartTotalPrice = document.querySelector(".cart-total-price");

// console.log(document.readyState);

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  if (shopItemButtons.length > 0) {
    for (let index = 0; index < shopItemButtons.length; index++) {
      const element = shopItemButtons[index];
      element.addEventListener("click", addToCartBtn);
    }
  }

  purchaseBtn.addEventListener("click", purchasedBtn);
}

function addToCartBtn(event) {
  const currentElement = event.target;
  const shopItem = currentElement.parentElement.parentElement;
  const title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  const imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  const tempPrice =
    shopItem.getElementsByClassName("shop-item-price")[0].innerText;

  const price = parseFloat(tempPrice.replace("$", ""));

  //check if cart item already exist
  const cartItemsNames = document.getElementsByClassName("cart-item-title");
  if (cartItemsNames.length > 0) {
    for (let index = 0; index < cartItemsNames.length; index++) {
      const cartName = cartItemsNames[index].innerText;
      if (cartName == title) {
        alert("this item is already exist in cart item");
        return;
      }
    }
  }
  //check if cart item already exist

  addItemToCart(title, imageSrc, price); //call
}

function addItemToCart(title, imageSrc, price) {
  const cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  cartRow.classList.add("cart-items-row");
  const cartRowContent = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">$ ${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>
  `;
  cartRow.innerHTML = cartRowContent;

  cartItems.append(cartRow);

  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);

  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", cartQuantityUpdate);

  updateCartTotal();
}

function updateCartTotal() {
  const cartRows = document.querySelectorAll(".cart-items-row");

  let total = 0;
  cartRows.forEach(function (singleCartRow, index) {
    const tempPrice =
      singleCartRow.getElementsByClassName("cart-price")[0].innerText;
    const price = parseFloat(tempPrice.replace("$ ", ""));

    const quantity = parseInt(
      singleCartRow.getElementsByClassName("cart-quantity-input")[0].value
    );
    total += new Number((price * quantity).toFixed(2));
  });
  // console.log(total);
  cartTotalPrice.innerText = `$ ${total}`;
}

function cartQuantityUpdate(event) {
  let currentInputElement = event.target;
  if (currentInputElement.value <= 0) {
    currentInputElement.value = 1;
  }
  updateCartTotal();
}

function removeCartItem(event) {
  const cartRow = event.target.parentElement.parentElement;
  if (confirm("Are you sure ?")) {
    cartRow.remove();
    updateCartTotal();
  }
}
function purchasedBtn() {
  alert("Thanks for Purchasing");
  cartItems.innerHTML = "";
  updateCartTotal();
}
