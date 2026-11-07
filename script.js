const products=[
  {id:1,name:"Carabao Mango",price:120,unit:"/kg",cat:"Fruits",img:"https://images.unsplash.com/photo-1553279768-865429fa0078?w=400",desc:"Sweet, juicy, locally sourced. Perfect for desserts and smoothies.",stock:24,rating:"4.8 (120)"},
  {id:2,name:"Lakatan Banana",price:80,unit:"/kg",cat:"Fruits",img:"https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400",desc:"Fresh lakatan, perfect for merienda.",stock:30,rating:"4.6 (98)"},
  {id:3,name:"Queen Pineapple",price:95,unit:"/pc",cat:"Fruits",img:"https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400",desc:"Sweet queen pineapple from Laguna.",stock:15,rating:"4.7 (80)"},
  {id:4,name:"Fresh Pechay",price:60,unit:"/bundle",cat:"Vegetables",img:"https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400",desc:"Fresh pechay, perfect for sinigang.",stock:40,rating:"4.9 (150)"},
  {id:5,name:"Organic Lettuce",price:110,unit:"/kg",cat:"Organic",img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",desc:"Crisp organic lettuce, no pesticides.",stock:20,rating:"4.8 (90)"},
  {id:6,name:"Roma Tomatoes",price:90,unit:"/kg",cat:"Vegetables",img:"https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400",desc:"Ripe roma tomatoes for cooking.",stock:35,rating:"4.5 (70)"},
];

let currentCat='all';
let cart=JSON.parse(localStorage.getItem('fh_cart')||'[]');
function filterCat(cat,btn){
  currentCat=cat;
  document.querySelectorAll('.btn-outline').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  render();
}

function render(){
  const q=(document.getElementById('searchInput').value||'').toLowerCase();
  const sort=document.getElementById('sortSelect').value;
  let list=products.filter(p=>(currentCat==='all'||p.cat===currentCat)&&p.name.toLowerCase().includes(q));
  if(sort==='low') list.sort((a,b)=>a.price-b.price);
  if(sort==='high') list.sort((a,b)=>b.price-a.price);
  if(sort==='name') list.sort((a,b)=>a.name.localeCompare(b.name));
  document.getElementById('noResult').classList.toggle('hidden',list.length>0);
  document.getElementById('productGrid').innerHTML=list.map(p=>`
    <article class="card">
      <img src="${p.img}" alt="${p.name}">
      <div class="card-body"><h3>${p.name}</h3><p>⭐ ${p.rating} • ${p.cat}</p>
      <p class="price">₱${p.price}${p.unit}</p>
      <button class="add" onclick="addToCart(${p.id})">Add to Cart</button>
      <button class="add" style="background:#fff;color:#1A5D1A;border:1px solid #1A5D1A;margin-top:6px" onclick="openPDP(${p.id})">View Details</button></div>
    </article>`).join('');
  document.getElementById('alsoLike').innerHTML=products.slice(0,2).map(p=>`<article class="card"><img src="${p.img}" alt="${p.name}"><div class="card-body"><h3>${p.name}</h3><p class="price">₱${p.price}${p.unit}</p><button <button style="background-color:#2e7d32;color:white;border:none;padding:14px 20px;border-radius:25px;font-size:16px;font-weight:bold;width:100%;cursor:pointer;" class="add" onclick="addToCart(${p.id})">Add to Cart</button></div></article>`).join('');
}

function openPDP(id){
  const p=products.find(x=>x.id===id);
  document.getElementById('pdpName').textContent=p.name;
  document.getElementById('pdpContent').innerHTML=`
    <img src="${p.img}" alt="${p.name}"><h2 style="margin-top:12px">${p.name}</h2><p>⭐ ${p.rating}</p>
    <p style="margin:8px 0">${p.desc}</p><p>Delivery: 1-2 days • Metro Manila</p><p style="color:green">In stock: ${p.stock} available</p>
    <p class="price" style="font-size:22px">₱${p.price}${p.unit}</p>
    <div class="qty"><button onclick="changeQty(-1)">-</button><span id="pdpQty">1</span><button onclick="changeQty(1)">+</button></div>
    <button class="btn" onclick="addToCart(${p.id}, parseInt(document.getElementById('pdpQty').textContent))">Add to Cart</button>`;
  showSection('pdp');
}

let pdpQty=1;
function changeQty(d){ pdpQty=Math.max(1,pdpQty+d); document.getElementById('pdpQty').textContent=pdpQty; }
function addToCart(id,qty=1){
  const found=cart.find(i=>i.id===id);
  if(found) found.qty+=qty; else cart.push({id,qty});
  localStorage.setItem('fh_cart',JSON.stringify(cart));
  renderCart(); showToast('Added to cart!');
}

function renderCart(){
  let sub=0, html='';
  if(cart.length===0) html='<p>Your cart is empty. Add some fresh produce!</p>';
  cart.forEach(item=>{
    const p=products.find(x=>x.id===item.id);
    const line=p.price*item.qty; sub+=line;
    html+=`<div class="cart-item"><img src="${p.img}" alt="${p.name}"><div style="flex:1"><strong>${p.name}</strong><br>₱${p.price}${p.unit}<br><button onclick="updateQty(${p.id},-1)">-</button> ${item.qty} <button onclick="updateQty(${p.id},1)">+</button></div><strong>₱${line}</strong><button onclick="removeItem(${p.id})" aria-label="Remove ${p.name}">🗑️</button></div>`;
  });

  document.getElementById('cartList').innerHTML=html;
  document.getElementById('subtotal').textContent=sub;
  document.getElementById('total').textContent=sub+ (cart.length?50:0);
  const count=cart.reduce((s,i)=>s+i.qty,0);
  document.getElementById('cartCount').textContent=count;
  document.getElementById('cartCount2').textContent=count;
  document.getElementById('cartTitleCount').textContent=count;
}

function updateQty(id,d){
  const it=cart.find(i=>i.id===id); it.qty+=d;
  if(it.qty<=0) cart=cart.filter(i=>i.id!==id);
  localStorage.setItem('fh_cart',JSON.stringify(cart)); renderCart();
}

function removeItem(id){ cart=cart.filter(i=>i.id!==id); localStorage.setItem('fh_cart',JSON.stringify(cart)); renderCart(); }
function showSection(id){
  if(id==='pdp'){ document.getElementById('pdp').classList.remove('hidden'); window.scrollTo(0,0); }
  if(id==='cart'){ document.getElementById('cart').scrollIntoView(); }
  if(id==='shop'){ document.getElementById('shop').scrollIntoView(); }
  if(id==='home'){ window.scrollTo(0,0); }
}

function showToast(msg){
  const t=document.createElement('div'); t.className='toast'; t.textContent=msg; document.body.appendChild(t);
  setTimeout(()=>t.remove(),1800);
}

document.getElementById('checkoutForm').addEventListener('submit',e=>{
  e.preventDefault();
  const name=document.getElementById('fName').value.trim();
  const email=document.getElementById('fEmail').value.trim();
  const addr=document.getElementById('fAddress').value.trim();
  let ok=true;
  document.getElementById('eName').style.display=name?'none':'block'; if(!name) ok=false;
  document.getElementById('eEmail').style.display=email.includes('@')?'none':'block'; if(!email.includes('@')) ok=false;
  document.getElementById('eAddress').style.display=addr?'none':'block'; if(!addr) ok=false;
  if(!ok) return;
  if(cart.length===0){ alert('Your cart is empty!'); return; }
  alert('Order placed! Thank you, '+name+'. Total: ₱'+document.getElementById('total').textContent);
  cart=[]; localStorage.removeItem('fh_cart'); renderCart(); e.target.reset();
});
render(); renderCart();
