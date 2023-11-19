const customers = document.getElementById ("customers");
const cartButton = document.querySelector('.cartButton')

axios.get('https://dummyjson.com/products')
.then(res => {
    db = res.data.products;
    console.log(db);
    db.map((item) => {
        let card = document.createElement('div');
        card.className = "cardBox";
        card.innerHTML = `
            <img src="${item.thumbnail}" alt="">
            <div class="cardTextBox">
                <p>${item.price} $</p>
            </div>
            <button onclick="addToCart(${item.id})"><i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
            <button class="favoritesbtn" style="width: 50px;
            height: 50px;
            border-radius: 10px;
            font-size: 30px;
            position: absolute;
            right: 0;
            top: 0;"><i class="fa-regular fa-heart"></i></button>
        `;
        
        customers.appendChild(card);
    });
});

function addToCart(productIndex) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(db.find(item => item.id === productIndex));
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartCount()
}

function displayCartCount () {
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    cartButton.innerHTML = `<p class="cartCount">${cart.length}</p>`
}

window.onload = () => {
    displayCartCount()
}