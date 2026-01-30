// CART DATA
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ADD TO CART
function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart");
}

// LOAD CART
function loadCart() {
    const cartItems = document.querySelector(".cart-items");
    const totalBox = document.querySelector(".cart-summary");

    if (!cartItems) return;

    cartItems.innerHTML = "";
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.qty;

        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" />
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>₹ ${item.price}</p>
                    <div class="qty">
                        <button onclick="updateQty(${item.id}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button onclick="updateQty(${item.id}, 1)">+</button>
                    </div>
                </div>
            </div>
        `;
    });

    const gst = subtotal * 0.06;
    const total = subtotal + gst;

    totalBox.innerHTML = `
        <h3>Order Summary</h3>
        <p>Subtotal <span>₹ ${subtotal}</span></p>
        <p>GST <span>₹ ${gst.toFixed(2)}</span></p>
        <hr>
        <h4>Total: ₹ ${total.toFixed(2)}</h4>
        <a href="checkout.html" class="btn">Proceed to Checkout</a>
    `;
}

// UPDATE QUANTITY
function updateQty(id, change) {
    cart = cart.map(item => {
        if (item.id === id) {
            item.qty += change;
        }
        return item;
    }).filter(item => item.qty > 0);

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}
