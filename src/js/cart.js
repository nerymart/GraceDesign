import { siteData, formatCurrency } from './data.js';

export const cart = [];

export function updateCartUI() {
    const cartCount = document.getElementById("cart-count");
    const mobileCartCount = document.getElementById("mobile-cart-count");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalEl = document.getElementById("cart-total");

    if (cartCount) cartCount.textContent = cart.length;
    if (mobileCartCount) mobileCartCount.textContent = cart.length;
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty-state">
                <ion-icon name="bag-handle-outline"></ion-icon>
                <p>Tu carrito está vacío.</p>
            </div>
        `;
        if (cartTotalEl) cartTotalEl.textContent = formatCurrency(0);
    } else {
        cartItemsContainer.innerHTML = "";
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price;
            const itemEl = document.createElement("div");
            itemEl.className = "cart-item";
            itemEl.innerHTML = `
                <div class="cart-item-info">
                     <span class="cart-item-name">${item.name}</span>
                     <span class="cart-item-price">${formatCurrency(item.price)}</span>
                </div>
                <button class="remove-item" data-index="${index}"><ion-icon name="trash-outline"></ion-icon></button>
            `;
            cartItemsContainer.appendChild(itemEl);
        });
        if (cartTotalEl) cartTotalEl.textContent = formatCurrency(total);

        document.querySelectorAll(".remove-item").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const btnEl = e.target.closest('.remove-item');
                if (!btnEl) return;
                const idx = parseInt(btnEl.dataset.index);
                cart.splice(idx, 1);
                updateCartUI();
            });
        });
    }
}

export function addToCart(product) {
    cart.push(product);
    updateCartUI();
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.style.transform = "scale(1.2)";
        setTimeout(() => cartCount.style.transform = "scale(1)", 200);
    }
}

export function initCartListeners() {
    const cartModal = document.getElementById("cart-modal");
    const openCartBtn = document.getElementById("cart-btn");
    const openMobileCartBtn = document.getElementById("mobile-cart-btn");
    const closeCartBtn = document.getElementById("close-cart-modal");
    const checkoutBtn = document.getElementById("checkout-btn");

    if (openCartBtn) openCartBtn.addEventListener("click", () => cartModal.showModal());
    if (openMobileCartBtn) openMobileCartBtn.addEventListener("click", (e) => { e.preventDefault(); cartModal.showModal(); });
    if (closeCartBtn) closeCartBtn.addEventListener("click", () => cartModal.close());

    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            if (cart.length === 0) return;
            const phone = "50585052032"; // Updated to match user's number
            let message = "Hola, me interesa comprar:\n" + cart.map(i => `- ${i.name} (${formatCurrency(i.price)})`).join("\n");
            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
        });
    }
}
