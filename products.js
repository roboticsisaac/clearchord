document.addEventListener("DOMContentLoaded", function () {
    let cart = [];

    function addToCart(productId, productName, productPrice) {
        const priceRegex = /Rs\.(\d+(\.\d{1,2})?)/;
        const match = productPrice.match(priceRegex);
        const price = match ? parseFloat(match[1]) : 0;

        const product = {
            id: productId,
            name: productName,
            price: price,
        };

        cart.push(product);

        // Log to the console for debugging
        console.log("Product added to cart:", product);
        console.log("Cart after adding product:", cart);

        // Update the cart display
        updateCartDisplay();

        // Show a green alert
        showGreenAlert("Added to Cart!");
    }

    function updateCartDisplay() {
        const cartCounter = document.getElementById("cart-counter");
        const cartTotal = document.getElementById("cart-total-value");
        const cartItemsContainer = document.getElementById("cart-items");

        console.log("Updating cart display...");

        if (cartCounter && cartTotal) {
            cartCounter.textContent = cart.length;
            const totalValue = calculateTotalCartValue().toFixed(2);
            cartTotal.textContent = `Total Value: Rs.${totalValue}`;
        }

        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = "";

            cart.forEach((product) => {
                const cartItem = document.createElement("div");
                cartItem.className = "cart-item";
                cartItem.innerHTML = `
                    <p>${product.name}</p>
                    <p>Price: Rs.${product.price.toFixed(2)}</p>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
        }

        // Log to the console for debugging
        console.log("Cart after updating display:", cart);
    }

    function calculateTotalCartValue() {
        const totalValue = cart.reduce((total, product) => total + product.price, 0);
        console.log("Calculated Total Value:", totalValue);
        return totalValue;
    }

    function showGreenAlert(message) {
        const alertContainer = document.createElement("div");
        alertContainer.className = "custom-alert";
        alertContainer.textContent = message;

        document.body.appendChild(alertContainer);

        setTimeout(() => {
            document.body.removeChild(alertContainer);
        }, 3000);
    }

    for (let i = 1; i <= 12; i++) {
        const button = document.getElementById(`add-to-cart-${i}`);
        if (button) {
            button.addEventListener("click", function () {
                const productName = document.querySelector(`#product-${i} h2`).textContent;
                const productPrice = document.querySelector(`#product-${i} .price`).textContent;
                addToCart(i, productName, productPrice);
            });
        }
    }

    const cartIcon = document.getElementById("cart-icon");
    if (cartIcon) {
        cartIcon.addEventListener("click", function () {
            updateCartDisplay();
            showCartDetails();
        });
    }

    const closeCartButton = document.getElementById("close-cart");
    if (closeCartButton) {
        closeCartButton.addEventListener("click", function () {
            closeCartDetails();
        });
    }

    function showCartDetails() {
        const cartModal = document.getElementById("cart-modal");
        if (cartModal) {
            cartModal.style.display = "block";
        }
    }

    function closeCartDetails() {
        const cartModal = document.getElementById("cart-modal");
        if (cartModal) {
            cartModal.style.display = "none";
        }
    
        // Update the cart display after closing
        updateCartDisplay();
    }
    

    window.addEventListener("click", function (event) {
        const cartModal = document.getElementById("cart-modal");
        if (event.target === cartModal) {
            cartModal.style.display = "none";
        }
    });
});
