document.addEventListener("DOMContentLoaded", function () {
  const cartItems = document.getElementById("cart-items");

  // Cargar y mostrar los productos del carrito
  function loadCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      cartItems.innerHTML = "<p>Carrito vacío</p>";
    } else {
      cartItems.innerHTML = "";
      cart.forEach((item) => {
        const cartItem = createCartItem(item);
        cartItems.appendChild(cartItem);
      });
    }
  }

  // Crear elemento HTML para un producto en el carrito
  function createCartItem(item) {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    const itemDetails = document.createElement("div");
    itemDetails.classList.add("item-details");

    const title = document.createElement("p");
    title.classList.add("item-title");
    title.textContent = item.title;

    const quantityContainer = document.createElement("div");
    quantityContainer.classList.add("item-quantity");

    const image = document.createElement("img");
    image.src = item.image; // Agrega la imagen del producto
    image.alt = item.title;
    image.style.width = "200px"; // Estilo opcional para el tamaño de la imagen
    image.style.margin = "20px";

    const minusBtn = document.createElement("button");
    minusBtn.textContent = "-";
    minusBtn.classList.add("quantity-btn");
    minusBtn.addEventListener("click", function () {
      adjustQuantity(item, -1);
    });

    const quantityLabel = document.createElement("span");
    quantityLabel.classList.add("quantity-label");
    quantityLabel.textContent = item.quantity;

    const plusBtn = document.createElement("button");
    plusBtn.textContent = "+";
    plusBtn.classList.add("quantity-btn");
    plusBtn.addEventListener("click", function () {
      adjustQuantity(item, 1);
    });

    quantityContainer.appendChild(minusBtn);
    quantityContainer.appendChild(quantityLabel);
    quantityContainer.appendChild(plusBtn);

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Eliminar";
    removeBtn.classList.add("quantity-btn");
    removeBtn.style.backgroundColor = "#f44336"; // Rojo para indicar eliminar
    removeBtn.addEventListener("click", function () {
      removeItem(item);
    });

    itemDetails.appendChild(image); // Agrega la imagen al detalle del producto
    itemDetails.appendChild(title);
    itemDetails.appendChild(quantityContainer);
    itemDetails.appendChild(removeBtn);

    cartItem.appendChild(itemDetails);

    return cartItem;
  }

  // Función para ajustar la cantidad de un producto en el carrito
  function adjustQuantity(item, amount) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex((cartItem) => cartItem.title === item.title);

    if (index !== -1) {
      cart[index].quantity += amount;
      if (cart[index].quantity < 0) {
        cart[index].quantity = 0;
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartItems();
  }

  // Función para eliminar un producto del carrito
  function removeItem(item) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((cartItem) => cartItem.title !== item.title);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartItems();
  }

  // Cargar productos del carrito al cargar la página
  loadCartItems();
});
