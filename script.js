// main.js

// ----------------------
// Smooth scroll for navigation links
// ----------------------
document.querySelectorAll('.nav-bar a').forEach(link => {
  link.addEventListener('click', function(e) {
    // Skip cart link (we want it to toggle dropdown instead)
    if (this.id === 'cart-link') return;

    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ----------------------
// Highlight active section in nav bar
// ----------------------
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-bar a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});

// ----------------------
// Example: simple contact alert
// ----------------------
const contactSection = document.querySelector('.contact');
if (contactSection) {
  contactSection.addEventListener('click', () => {
    alert('Thanks for reaching out to Piquant Chilli Sauce!');
  });
}

// ----------------------
// Cart Functionality
// ----------------------
let cart = [];
let total = 0;

function addToCart(name, price, image) {
  cart.push({ name, price, image });
  total += price;
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById('cart-items');
  cartList.innerHTML = '';

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${item.image}" class="cart-thumb" alt="${item.name}">
      <span class="cart-name">${item.name}</span>
      <span class="cart-price">R${item.price}.00</span>
      <button class="remove-btn" onclick="removeFromCart(${index})">×</button>
    `;
    cartList.appendChild(li);
  });

  // Update cart counter and total
  document.getElementById('cart-count').textContent = cart.length;
  document.querySelector('.cart-total').textContent = `Total: R${total}.00`;
}

function removeFromCart(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  updateCart();
}

// ----------------------
// Toggle dropdown when clicking cart link
// ----------------------
document.addEventListener('DOMContentLoaded', () => {
  const cartLink = document.getElementById('cart-link');
  const dropdown = document.getElementById('cart-dropdown');

  cartLink.addEventListener('click', function(e) {
    e.preventDefault();
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  });

  // Close dropdown if clicking outside
  document.addEventListener('click', function(event) {
    if (!cartLink.contains(event.target) && !dropdown.contains(event.target)) {
      dropdown.style.display = 'none';
    }
  });
});

// ----------------------
// Checkout via WhatsApp
// ----------------------
function checkoutWhatsApp() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Build message with items
  const itemsMessage = cart
    .map(item => `${item.name} (R${item.price}.00)`)
    .join(", ");

  // Add total at the end
  const message = `Hi, I'd like to order: ${itemsMessage}. Total: R${total}.00`;

  // WhatsApp link (international format, no +)
  const whatsappUrl = "https://wa.me/27693237625?text=" + encodeURIComponent(message);
  window.open(whatsappUrl, "_blank");
}function updateCart() {
  const cartList = document.getElementById('cart-items');
  cartList.innerHTML = '';

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${item.image}" class="cart-thumb" alt="${item.name}">
      <span class="cart-name">${item.name}</span>
      <span class="cart-price">R${item.price}.00</span>
      <button class="remove-btn" onclick="removeFromCart(${index}, event)">×</button>
    `;
    cartList.appendChild(li);
  });

  document.getElementById('cart-count').textContent = cart.length;
  document.querySelector('.cart-total').textContent = `Total: R${total}.00`;
}

function removeFromCart(index, e) {
  e.stopPropagation(); // ✅ prevents dropdown from closing
  total -= cart[index].price;
  cart.splice(index, 1);
  updateCart();
}