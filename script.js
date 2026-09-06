const products=[
{id:1,name:"Classic Printed T-Shirt",cat:"Clothes",price:699,icon:"👕"},
{id:2,name:"Oversized Graphic Tee",cat:"Clothes",price:799,icon:"👕"},
{id:3,name:"Custom Street Cap",cat:"Caps",price:499,icon:"🧢"},
{id:4,name:"Signature Print Mug",cat:"Mugs",price:349,icon:"☕"},
{id:5,name:"Printed Hoodie",cat:"More",price:1199,icon:"🧥"},
{id:6,name:"Custom Tote Bag",cat:"More",price:399,icon:"👜"},
{id:7,name:"Printed Phone Case",cat:"More",price:299,icon:"📱"},
{id:8,name:"Wall Art Poster",cat:"More",price:449,icon:"🖼️"}
];
let cart=JSON.parse(localStorage.getItem("rivoCart")||"[]");

function renderProducts(list=products){
 document.getElementById("products").innerHTML=list.map(p=>`<article class="product"><div class="product-img">${p.icon}</div><div class="product-info"><h3>${p.name}</h3><div class="price">₹${p.price.toLocaleString("en-IN")}</div><button class="add" onclick="addToCart(${p.id})">Add to cart</button></div></article>`).join("");
}
function filterProducts(cat){renderProducts(cat==="All"?products:products.filter(p=>p.cat===cat));document.getElementById("shop").scrollIntoView({behavior:"smooth"});}
function addToCart(id){let x=cart.find(i=>i.id===id);x?x.qty++:cart.push({id,qty:1});save();openCart();}
function changeQty(id,n){let x=cart.find(i=>i.id===id);if(!x)return;x.qty+=n;if(x.qty<=0)cart=cart.filter(i=>i.id!==id);save();}
function save(){localStorage.setItem("rivoCart",JSON.stringify(cart));renderCart();}
function renderCart(){
 const items=document.getElementById("cartItems");let total=0,count=0;
 if(!cart.length)items.innerHTML="<p>Your cart is empty.</p>";
 else items.innerHTML=cart.map(i=>{let p=products.find(x=>x.id===i.id);total+=p.price*i.qty;count+=i.qty;return `<div class="cart-line"><div><b>${p.name}</b><br>₹${p.price} × ${i.qty}</div><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button> ${i.qty} <button onclick="changeQty(${p.id},1)">+</button></div></div>`}).join("");
 document.getElementById("cartTotal").textContent="₹"+total.toLocaleString("en-IN");document.getElementById("cartCount").textContent=count;
}
function openCart(){document.getElementById("cart").classList.add("open");document.getElementById("shade").classList.add("open");renderCart()}
function closeCart(){document.getElementById("cart").classList.remove("open");document.getElementById("shade").classList.remove("open")}
function checkout(){if(!cart.length)return alert("Your cart is empty.");alert("Checkout is ready for payment integration. For live orders, connect a payment gateway and backend.");}
renderProducts();renderCart();
