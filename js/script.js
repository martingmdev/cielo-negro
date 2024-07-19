// Función para añadir producto al carrito
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex((item) => item.title === product.title);

  if (index !== -1) {
    cart[index].quantity += 1; // Incrementa la cantidad si el producto ya está en el carrito
  } else {
    cart.push({ ...product, quantity: 1 }); // Agrega el producto con cantidad inicial 1 si no está en el carrito
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Producto añadido al carrito");
  updateCartDropdown();
}

// Función para actualizar el contenido del carrito desplegable
function updateCartDropdown() {
  const cartDropdown = document.getElementById("cart-dropdown");
  cartDropdown.innerHTML = "";
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartDropdown.innerHTML = "<p>Carrito vacío</p>";
  } else {
    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");

      const itemDetails = document.createElement("div");
      itemDetails.classList.add("cart-item-details");

      const title = document.createElement("p");
      title.textContent = item.title;

      const quantityContainer = document.createElement("div");
      quantityContainer.classList.add("cart-item-quantity");

      const image = document.createElement("img");
      image.src = item.image; // Agrega la imagen del producto
      image.alt = item.title;
      image.style.width = "75px"; // Estilo opcional para el tamaño de la imagen
      image.style.borderRadius = "8px";
      image.style.marginLeft = "10px";

      const minusBtn = document.createElement("button");
      minusBtn.textContent = "-";
      minusBtn.classList.add("quantity-btn");
      minusBtn.addEventListener("click", function () {
        adjustQuantity(item, -1);
      });

      const quantityLabel = document.createElement("span");
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

      itemDetails.appendChild(image); // Agrega la imagen al detalle del producto
      itemDetails.appendChild(title);
      itemDetails.appendChild(quantityContainer);

      cartItem.appendChild(itemDetails);

      cartDropdown.appendChild(cartItem);
    });

    const viewCartBtn = document.createElement("button");
    viewCartBtn.textContent = "Ver carrito completo";
    viewCartBtn.classList.add("cart-btn");
    viewCartBtn.style.marginTop.borderRadius = "8px";
    viewCartBtn.addEventListener("click", function () {
      window.location.href = "cart.html";
    });

    cartDropdown.appendChild(viewCartBtn);
  }
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
    if (cart[index].quantity === 0) {
      cart.splice(index, 1); // Elimina el producto si la cantidad es cero
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDropdown();
}

// Mostrar u ocultar el carrito desplegable al hacer clic en el botón
function toggleCart() {
  const cartDropdown = document.getElementById("cart-dropdown");
  if (cartDropdown.style.display === "block") {
    cartDropdown.style.display = "none";
  } else {
    cartDropdown.style.display = "block";
    updateCartDropdown();
  }
}

// Función para obtener y mostrar productos desde la API
async function fetchProducts() {
  const productList = document.getElementById("product-list");

  try {
    const response = await fetch("https://api.sampleapis.com/coffee/hot");
    const data = await response.json();

    data.forEach((product) => {
      const productCard = createProductCard(product);
      productList.appendChild(productCard);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Función para crear tarjeta de producto
function createProductCard(product) {
  const { title, description, image } = product;

  const productCard = document.createElement("div");
  productCard.classList.add("product");

  const titleElement = document.createElement("h3");
  titleElement.textContent = title;

  const imageElement = document.createElement("img");
  imageElement.src = image;
  imageElement.alt = title;
  imageElement.style.width = "100%";
  imageElement.style.borderRadius = "8px";
  imageElement.style.marginBottom = "10px";

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = description;

  const addToCartButton = document.createElement("button");
  addToCartButton.textContent = "Añadir al carrito";
  addToCartButton.classList.add("cart");
  addToCartButton.addEventListener("click", function () {
    addToCart(product);
  });

  productCard.appendChild(titleElement);
  productCard.appendChild(imageElement);
  productCard.appendChild(descriptionElement);
  productCard.appendChild(addToCartButton);

  return productCard;
}

// Cargar productos al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  fetchProducts();
});
