// products.js
const products = [
  {
    id: 1,
    name: "Artisan Wool Scarf",
    price: "$49.99",
    description:
      "Hand-knitted with 100% natural wool. Our signature scarf combines traditional craftsmanship with modern design.",
    image: "assets/img/tulip.jpg",
    colors: ["Natural", "Gray", "Brown"],
    sizes: ["S", "M", "L"],
    category: "scarves",
    inStock: true,
  },
  {
    id: 2,
    name: "Luxury Wool Blanket",
    price: "$129.99",
    description: "Extra large chunky knit blanket perfect for cozy evenings.",
    image: "assets/img/blanket.jpg",
    colors: ["Natural", "Gray", "Brown"],
    sizes: ["Standard", "Large"],
    category: "blankets",
    inStock: true,
  },
  // Add more products as needed
];

// Function to render products
function renderProducts() {
  const productsGrid = document.querySelector(".products-grid");
  productsGrid.innerHTML = ""; // Clear existing content

  products.forEach((product) => {
    const productCard = `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image" style="background-image: url('${
                  product.image
                }')">
                    <div class="product-overlay">
                        <button class="btn-quickview" data-product-id="${
                          product.id
                        }">
                            Quick View
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">${product.price}</p>
                    <p class="product-description">${product.description}</p>
                    <div class="product-controls">
                        <select class="color-select">
                            ${product.colors
                              .map(
                                (color) =>
                                  `<option value="${color}">${color}</option>`
                              )
                              .join("")}
                        </select>
                        <select class="size-select">
                            ${product.sizes
                              .map(
                                (size) =>
                                  `<option value="${size}">${size}</option>`
                              )
                              .join("")}
                        </select>
                    </div>
                    <button class="btn btn-primary view-details" data-product-id="${
                      product.id
                    }">
                        View Details
                    </button>
                </div>
            </div>
        `;
    productsGrid.innerHTML += productCard;
  });

  // Add event listeners after rendering
  addProductEventListeners();
}

// Function to add event listeners to product elements
function addProductEventListeners() {
  // Quick view buttons
  document.querySelectorAll(".btn-quickview").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = parseInt(e.target.dataset.productId);
      showProductQuickView(getProductById(productId));
    });
  });

  // View details buttons
  document.querySelectorAll(".view-details").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = parseInt(e.target.dataset.productId);
      showProductDetails(getProductById(productId));
    });
  });
}

// Function to get product by ID
function getProductById(id) {
  return products.find((product) => product.id === id);
}

// Function to show product quick view
function showProductQuickView(product) {
  const popup = document.querySelector(".popup-overlay");
  const popupContent = popup.querySelector(".popup-content");

  popupContent.innerHTML = `
        <button class="popup-close">&times;</button>
        <div class="popup-image" style="background-image: url('${
          product.image
        }')"></div>
        <div class="popup-details">
            <h2>${product.name}</h2>
            <p class="popup-price">${product.price}</p>
            <p class="popup-description">${product.description}</p>
            <div class="popup-options">
                <select class="color-select">
                    ${product.colors
                      .map(
                        (color) => `<option value="${color}">${color}</option>`
                      )
                      .join("")}
                </select>
                <select class="size-select">
                    ${product.sizes
                      .map((size) => `<option value="${size}">${size}</option>`)
                      .join("")}
                </select>
            </div>
            <button class="btn btn-primary add-to-cart" data-product-id="${
              product.id
            }">
                Add to Cart
            </button>
        </div>
    `;

  popup.classList.add("active");

  // Add close functionality
  const closeBtn = popupContent.querySelector(".popup-close");
  closeBtn.addEventListener("click", () => {
    popup.classList.remove("active");
  });
}

// Initialize the products display
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});
