document.addEventListener('DOMContentLoaded', function () {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemList = document.getElementById('cart-item-list');
    const cartTotalDisplay = document.getElementById('cart-total');
    const cartCountDisplay = document.getElementById('cart-count');

    displayCartItems();

    document.getElementById('clear-cart').addEventListener('click', function () {
        if (confirm('Are you sure you want to clear your cart?')) {
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItems();
            updateCartTotal();
            updateCartCount();
        }
    });

    function displayCartItems() {
        cartItemList.innerHTML = '';
        if (cart.length === 0) {
            cartItemList.innerHTML = '<li>Your cart is empty.</li>';
            cartTotalDisplay.textContent = '0.00';
            return;
        }

        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.product} - $${item.price.toFixed(2)}</span>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItemList.appendChild(li);
        });

        // Add event listeners to remove buttons
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', function () {
                const index = parseInt(this.getAttribute('data-index'));
                removeFromCart(index);
            });
        });

        updateCartTotal();
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateCartCount();
    }

    function updateCartTotal() {
        const total = cart.reduce((acc, item) => acc + item.price, 0);
        cartTotalDisplay.textContent = total.toFixed(2);
    }

    function updateCartCount() {
        cartCountDisplay.textContent = cart.length;
    }
});
