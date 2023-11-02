function createCard(card) {
  let cardHTML = document.createElement('article');
  cardHTML.classList.add('product-card');
  cardHTML.setAttribute('data-id', card.productID); //Add the ID as an attribute

  const price = Intl.NumberFormat(`en-US`, {
    currency: `USD`,
    style: "currency",
  }).format(card.price);

  const innerHTML = `
        <div class="sku">${card.productSku}</div> 
        <div class="price">${price}</div> 
        <div class="product-name action" data-id ="${card.productID}">${card.name}</div> 
        <div class="product-image"><img src="${card.imageName}"></div> 
        <div class="cart"><i class = "fa-solid fa-cart-plus icon action" title="Add item to cart"></i></div>
        `;
  cardHTML.innerHTML = innerHTML;

  //adding nav popup message 
  const messageWindow = document.getElementById('message-window');
  const messageText = document.getElementById('message-text');

  //adding the click listener for the item's description
  const productElements = document.querySelectorAll('.product-name');
  productElements.forEach(productElement => {
    productElement.addEventListener('click', function () {
      const productName = productElement.textContent;
      const product = productService.allProducts.find(product => product.name === productName);
      if (product){
        messageText.textContent = product.description;
        messageWindow.style.display = 'flex';
      }
    });
  });


  //adding the click listener for adding an item to the cart
  const cartItems = cardHTML.querySelectorAll('.fa-cart-plus');
  cartItems.forEach(cartItem => {
    cartItem.addEventListener('click', function () {
      messageText.textContent = 'Item has been added to the cart!'
      messageWindow.style.display = 'flex';
    })
  });

  return cardHTML; 
}

function displayCards(searchTerm) {
  let products = productService.searchProducts(searchTerm); //modified from getProducts()
  let cardContainer = document.getElementById('product-cards');
  cardContainer.innerHTML = '';
  products.forEach(p => {
    let card = createCard(p);
    cardContainer.appendChild(card);
  })
}
document.addEventListener("DOMContentLoaded", () => {
  displayCards();
  //adding the keyup listener for search bar
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("keyup", function () {
    const searchTerm = searchInput.value;
    displayCards(searchTerm);
  });
});