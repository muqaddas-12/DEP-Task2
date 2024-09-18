document.addEventListener('DOMContentLoaded', function () {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountDisplay = document.getElementById('cart-count');
    const productList = document.getElementById('product-list');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const pageNumberDisplay = document.getElementById('page-number');

    // Array of products with descriptions
    const products = [
        {
            name: 'Huda Beauty Liquid Lipstick',
            price: 15,
            img: 'pictures/picture 1.jpg',
            description: 'A long-lasting, smooth, and non-drying liquid lipstick perfect for all-day wear.'
        },
        {
            name: 'Maybelline NewYork Fit me Matte',
            price: 25,
            img: 'pictures/pic2.jpg',
            description: 'A matte foundation that provides a natural finish and controls oil for a flawless look.'
        },
        {
            name: 'Huda Beauty Dusk Palette',
            price: 20,
            img: 'pictures/picture3.jpg',
            description: 'A versatile eyeshadow palette with a range of neutral and bold shades for every occasion.'
        },
        {
            name: 'Fenty Beauty Highlighter',
            price: 30,
            img: 'pictures/picture 4.jpg',
            description: 'A luminous highlighter that adds a radiant glow to your complexion.'
        },
        {
            name: 'MAC Studio Fix Powder',
            price: 35,
            img: 'pictures/picture 5.jpg',
            description: 'A lightweight powder foundation that offers full coverage and a natural matte finish.'
        },
        {
            name: 'Tarte Shape Tape Concealer',
            price: 27,
            img: 'pictures/picture6.jpg',
            description: 'A full-coverage concealer that smooths, brightens, and blurs imperfections for a flawless finish.'
        }
    ];

    let currentPage = 1;
    const productsPerPage = 3;
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Load products for the current page
    function loadProducts() {
        productList.innerHTML = '';
        const start = (currentPage - 1) * productsPerPage;
        const end = start + productsPerPage;
        const pageProducts = products.slice(start, end);

        pageProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p class="description">${product.description}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-product="${product.name}" data-price="${product.price}">Add to Cart</button>
            `;
            productList.appendChild(productDiv);
        });

        updateCartCount();
        setupAddToCartButtons();
        updatePagination();
    }

    // Add product to cart
    function setupAddToCartButtons() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function () {
                const productName = this.getAttribute('data-product');
                const productPrice = parseFloat(this.getAttribute('data-price'));
                addToCart(productName, productPrice);
                alert(`${productName} has been added to your cart for $${productPrice.toFixed(2)}`);
                updateCartCount();
            });
        });
    }

    function addToCart(product, price) {
        cart.push({ product, price });
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Update cart count
    function updateCartCount() {
        cartCountDisplay.textContent = cart.length;
    }

    // Update pagination buttons
    function updatePagination() {
        pageNumberDisplay.textContent = currentPage;
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === totalPages;
    }

    // Event listeners for pagination buttons
    prevPageButton.addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--;
            loadProducts();
        }
    });

    nextPageButton.addEventListener('click', function () {
        if (currentPage < totalPages) {
            currentPage++;
            loadProducts();
        }
    });

    // Initial load
    loadProducts();
});
