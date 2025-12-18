let cart = [];

// Add item to cart
function addItem(btn) {
    const control = btn.parentElement;
    const pro = control.parentElement;
    const name = pro.querySelector('h3').innerText;
    const price = parseInt(pro.querySelector('.price').innerText.replace('₹',''));
    
    const existing = cart.find(item => item.name === name);
    if(existing){
        existing.qty++;
    } else {
        cart.push({name, price, qty:1});
    }

    btn.style.display = "none";
    control.querySelector(".qty-box").style.display = "flex";
    updateQtyDisplay(control, name);
    updateCartStorage();
}

function increase(btn){
    const pro = btn.closest('.cart-control');
    const name = pro.parentElement.querySelector('h3').innerText;
    const item = cart.find(i => i.name === name);
    item.qty++;
    updateQtyDisplay(pro, name);
    updateCartStorage();
}

function decrease(btn){
    const pro = btn.closest('.cart-control');
    const name = pro.parentElement.querySelector('h3').innerText;
    const itemIndex = cart.findIndex(i => i.name === name);
    
    if(cart[itemIndex].qty > 1){
        cart[itemIndex].qty--;
    } else {
        cart.splice(itemIndex,1);
        pro.querySelector('.qty-box').style.display='none';
        pro.querySelector('.add-btn').style.display='inline-block';
    }
    updateQtyDisplay(pro, name);
    updateCartStorage();
}

function updateQtyDisplay(control, name){
    const item = cart.find(i => i.name === name);
    control.querySelector('.qty-value').innerText = item.qty;
}

function updateCartStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart(){
    const stored = JSON.parse(localStorage.getItem('cart'));
    if(stored) cart = stored;
}

