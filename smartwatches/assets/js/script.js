// This shows references to elements by id
const navMenu = document.getElementById('nav-menu2'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

//This shows the menu when the button is clicked
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

//This hides the menu when the button is clicked
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}


// This removes mobile menu when navigation link is clicked
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))



// This function hadnles showing and hiding a scroll-to-top button
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
	//When the scroll postions exceeds 350 viewport height units, apply the "show-scroll" class to the anchor tag with "scrollup" class.
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

//This shows the cart when "cart-shop" is clicked
const cart = document.getElementById('cart'),
      cartShop = document.getElementById('cart-shop'),
      cartClose = document.getElementById('cart-close')

if(cartShop){
    cartShop.addEventListener('click', () =>{
        cart.classList.add('show-cart')
    })
}

// This hides the cart when close button is clicked
if(cartClose){
    cartClose.addEventListener('click', () =>{
        cart.classList.remove('show-cart')
    })
}

// Shows the highlight of active section in navigation menu when you scroll
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)



// This function adds smoother scroll to navigation links
navLink.forEach(n => n.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1); // Get the target section's ID
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
        // This fucntion closes the menu if it's open
        navMenu.classList.remove('show-menu');
    }
}));

// Sample cart items array
let cartItems = [
  
];

// This fucntion adds an item to the cart
function addToCart(productName, price) {
  const existingItem = cartItems.find(item => item.productName === productName);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ productName, price, quantity: 1 });
  }

  updateCartUI();
}

// This function removes items from the cart
function removeFromCart(productName) {
  cartItems = cartItems.filter(item => item.productName !== productName);
  updateCartUI();
}

// This shows a fucntion that update the cart UI
function updateCartUI() {
  const cart = document.getElementById('cart');
  cart.innerHTML = '<i class="x bx-x cart__close" id="cart-close"></i><h2 class="cart__center-title">MY CART</h2>';
  const cartClose = document.getElementById('cart-close')
  let total = 0;
  let count = 0;
 
  
  // This function clears the cart container
  cartItems.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <span class="cart-item__name">${item.productName}</span>
      <span class="cart-item__price">$${item.price.toFixed(2)}</span>
      <button class="cart-item__remove" data-product="${item.productName}">Remove</button>
      <div class="cart-item__quantity">
        <button class="cart-quantity__decrease" data-product="${item.productName}">-</button>
        <span class="cart-quantity__value">${item.quantity}</span>
        <button class="cart-quantity__increase" data-product="${item.productName}">+</button>
      </div>
    `;

    
    // This function adds event listners for quantity accommodation and removal
    const decreaseButton = cartItem.querySelector('.cart-quantity__decrease');
    const increaseButton = cartItem.querySelector('.cart-quantity__increase');
    const removeButton = cartItem.querySelector('.cart-item__remove');


    increaseButton.addEventListener('click', () => {
      item.quantity++;
      updateCartUI();
    });

    decreaseButton.addEventListener('click', () => {
      if (item.quantity > 1) {
        item.quantity--;
        updateCartUI();
      }
    });

  
    removeButton.addEventListener('click', () =>{
      removeFromCart(item.productName);
    });

    cartClose.addEventListener('click', () => {
      cart.classList.remove('show-cart');
    });

    
    cart.appendChild(cartItem);
    total += item.price * item.quantity;
    count += item.quantity
  });

  const TotalDiv = document.createElement ('div');
  TotalDiv.setAttribute("class", "cart__values");



  const CountSpan = document.createElement('span');
  CountSpan.setAttribute("class","cart__values-item");
  CountSpan.textContent = 'Count: '+count;
  TotalDiv.appendChild(CountSpan);
  

  const TotalSpan = document.createElement('span');
  TotalSpan.setAttribute("class","cart__values-item");
  TotalSpan.textContent = `Total: $${total.toFixed(2)}`;
  TotalDiv.appendChild(TotalSpan);

  
  cart.appendChild(TotalDiv);

}

//This function updates the cart UI
updateCartUI();

// This fucntion adds event listners to the "Add to cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productName = button.getAttribute('data-product');
    const productPrice = parseFloat(button.getAttribute('data-price'));
    addToCart(productName, productPrice);
  });
});

// Function to remove an item from the cart
/*function removeFromCart(productName) {
  // Find the index of the item to be removed
  const index = cartItems.findIndex(item => item.productName === productName);

  if (index !== -1) {
    const item = cartItems[index];

    // If the item's quantity is greater than 1, decrease the quantity
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      // If the quantity is 1 or less, remove the item from the cart
      cartItems.splice(index, 1);
    }

    // Update the cart UI
    updateCartUI();
  }
}*/












