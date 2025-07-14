// Sample book data
const books = [
  {
    id: 1,
    title: "The God of Small Things",
    author: "Arundhati Roy",
    price: 499,
    image: "https://covers.openlibrary.org/b/id/8231996-L.jpg"
  },
  {
    id: 2,
    title: "Midnight's Children",
    author: "Salman Rushdie",
    price: 599,
    image: "https://covers.openlibrary.org/b/id/8319251-L.jpg"
  },
  {
    id: 3,
    title: "Train to Pakistan",
    author: "Khushwant Singh",
    price: 350,
    image: "https://covers.openlibrary.org/b/id/10523338-L.jpg"
  },
  {
    id: 4,
    title: "The White Tiger",
    author: "Aravind Adiga",
    price: 420,
    image: "https://covers.openlibrary.org/b/id/9259256-L.jpg"
  },
  {
    id: 5,
    title: "A Suitable Boy",
    author: "Vikram Seth",
    price: 799,
    image: "https://covers.openlibrary.org/b/id/10523337-L.jpg"
  },
  {
    id: 6,
    title: "Interpreter of Maladies",
    author: "Jhumpa Lahiri",
    price: 380,
    image: "https://covers.openlibrary.org/b/id/10523339-L.jpg"
  },
  {
    id: 7,
    title: "The Palace of Illusions",
    author: "Chitra Banerjee Divakaruni",
    price: 450,
    image: "https://covers.openlibrary.org/b/id/10523340-L.jpg"
  },
  {
    id: 8,
    title: "The Inheritance of Loss",
    author: "Kiran Desai",
    price: 390,
    image: "https://covers.openlibrary.org/b/id/10523341-L.jpg"
  },
  {
    id: 9,
    title: "Five Point Someone",
    author: "Chetan Bhagat",
    price: 299,
    image: "https://covers.openlibrary.org/b/id/10523342-L.jpg"
  },
  {
    id: 10,
    title: "Malgudi Days",
    author: "R.K. Narayan",
    price: 320,
    image: "https://covers.openlibrary.org/b/id/10523343-L.jpg"
  }
];

let cart = [];

function formatINR(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}

function renderBooks() {
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = '';
  books.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
      <img src="${book.image}" alt="${book.title}">
      <h3>${book.title}</h3>
      <p>by ${book.author}</p>
      <div class="price">${formatINR(book.price)}</div>
      <button onclick="addToCart(${book.id})">Add to Cart</button>
    `;
    bookList.appendChild(card);
  });
}

function addToCart(bookId) {
  const book = books.find(b => b.id === bookId);
  const item = cart.find(i => i.id === bookId);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({ ...book, qty: 1 });
  }
  updateCart();
}

function removeFromCart(bookId) {
  cart = cart.filter(item => item.id !== bookId);
  updateCart();
}

function updateCart() {
  const cartCount = document.getElementById('cart-count');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.title} (x${item.qty})</span>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartItems.appendChild(li);
  });
  cartTotal.textContent = formatINR(total);
}

document.getElementById('cart-btn').onclick = function() {
  document.getElementById('cart-sidebar').classList.remove('hidden');
  document.getElementById('cart-sidebar').classList.add('visible');
};
document.getElementById('close-cart').onclick = function() {
  document.getElementById('cart-sidebar').classList.remove('visible');
  document.getElementById('cart-sidebar').classList.add('hidden');
};

// Initial render
renderBooks();
updateCart(); 