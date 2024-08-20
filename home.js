// Sample product data
const products = [
    { id: 1, name: 'Product 1', price: 10.00, image: 'image1.jpg' },
    { id: 2, name: 'Product 2', price: 20.00, image: 'image2.jpg' },
    { id: 3, name: 'Product 3', price: 30.00, image: 'image3.jpg' },
    { id: 4, name: 'Product 4', price: 20.00, image: 'image4.jpg' },
    { id: 5, name: 'Product 5', price: 40.00, image: 'image5.jpg' },
    { id: 6, name: 'Product 6', price: 50.00, image: 'image6.jpg' },
    { id: 7, name: 'Product 7', price: 20.00, image: 'image7.jpg' },
    { id: 8, name: 'Product 8', price: 60.00, image: 'image8.jpg' },
    { id: 9, name: 'Product 9', price: 50.00, image: 'image9.jpg' },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';

        cartItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
                <button class="remove-from-cart-button" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
             `;

        cartItemsContainer.appendChild(cartItemDiv);

        totalItems += 1;
        totalPrice += item.price;
    });

    document.getElementById('total-items').textContent = totalItems;
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
}

// Handle Checkout
document.getElementById('checkout-button').addEventListener('click', () => {
    alert('Thank you for your purchase!');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
});

// Function to render products
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart-button" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Function to add items to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
    }
}

// Function to update cart item count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

// Function to render cart
function renderCart() {
    const cartSection = document.getElementById('cart');
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)}</p>
            <button class="remove-from-cart-button" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(itemDiv);
    });
}

// Function to remove items from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCart();
}

// Handle Checkout
document.getElementById('checkout-button').addEventListener('click', () => {
    alert('Thank you for your purchase!');
    cart = [];
    updateCartCount();
    renderCart();
});

// Show cart section
document.getElementById('cart-link').addEventListener('click', () => {
    document.getElementById('cart').classList.toggle('hidden');
    renderCart();
});

// Initial render
renderProducts();
