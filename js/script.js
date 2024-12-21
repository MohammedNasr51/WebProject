    const cartSidebar = document.getElementById('cart-sidebar');
    const cartIcon = document.querySelector('.fa-cart-plus');
    const closeCartButton = document.getElementById('close-cart');
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.querySelector('.zero');

    // Load cart items from localStorage on page load
    document.addEventListener('DOMContentLoaded', () => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        updateCartUI(savedCart);
    });

    // Show the sidebar when the cart icon is clicked
    cartIcon.addEventListener('click', () => {
        cartSidebar.style.right = '0';
    });

    // Close the sidebar when the close button is clicked
    closeCartButton.addEventListener('click', () => {
        cartSidebar.style.right = '-300px';
    });

    // Add to cart logic
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const name = event.target.getAttribute('data-name');
            const price = event.target.getAttribute('data-price');

            // Get current cart from localStorage
            const cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Check if the item already exists in the cart
            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            // Save updated cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Update the cart UI
            updateCartUI(cart);
        });
    });

    // Update the cart UI
    function updateCartUI(cart) {
        // Clear current cart UI
        cartItems.innerHTML = '';
        let totalCount = 0;

        // Add items to the cart UI
        cart.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<p>
                ${item.name} - $${item.price} <span class="quantity">x${item.quantity}</span></p>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItems.appendChild(listItem);
            totalCount += item.quantity;
        });

        // Update cart count
        cartCount.textContent = totalCount;

        // Add event listeners for remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                removeItemFromCart(index);
            });
        });
    }

    // Remove item from cart
    function removeItemFromCart(index) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1); // Remove the item at the given index
        localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
        updateCartUI(cart); // Update the cart UI
    }
