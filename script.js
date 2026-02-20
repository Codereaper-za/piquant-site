// main.js

// Smooth scroll for navigation links
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

// Highlight active section in nav bar
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

// Example: simple contact alert
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

function addToCart(sauceName) {
  cart.push(sauceName);
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById('cart-items');
  cartList.innerHTML = '';

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    cartList.appendChild(li);
  });

  // Update cart counter
  document.getElementById('cart-count').textContent = cart.length;
}

// Toggle dropdown when clicking cart link
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

// Checkout via WhatsApp
function checkoutWhatsApp() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  const message = "Hi, I'd like to order: " + cart.join(", ");
  const whatsappUrl = "https://wa.me/+27648591020?text=" + encodeURIComponent(message);
  window.open(whatsappUrl, "_blank");
}