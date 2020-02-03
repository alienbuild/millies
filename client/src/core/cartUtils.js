// Add item to local storage
export const addItem = (item, next) => {
    let cart = [];
    if (typeof window !== 'undefined'){
        // Check if cart already exists
        if (localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.push({
            ...item,
            count: 1
        });
        // Check for duplicates in cart
        cart = Array.from(new Set( cart.map(p => p._id) )).map( id => {
            return cart.find(p => p._id === id);
        });
        // Set updated cart
        localStorage.setItem('cart', JSON.stringify(cart));
        next();
    }
};

// Cart total number of items
export const cartTotal = () => {
  if (typeof window !== 'undefined'){
      if (localStorage.getItem('cart')){
        return JSON.parse(localStorage.getItem('cart')).length;
      }
  }
  return 0;
};

// Get cart
export const getCart = () => {
    if (typeof window !== 'undefined'){
        if (localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
    return [];
};

// Update item quantity
export const updateItem = (productId, count) => {

    let cart = [];
    if (typeof window !== "undefined"){

        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((product, index) => {
            if (product._id === productId){
                cart[index].count = count;
            }
        });

        localStorage.setItem('cart', JSON.stringify(cart));
    }
};

// Remove item from cart
export const removeItem = (productId) => {

    let cart = [];
    if (typeof window !== "undefined"){

        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((product, index) => {
            if (product._id === productId){
                cart.splice(index, 1);
            }
        });

        localStorage.setItem('cart', JSON.stringify(cart));
    }
    return cart;
};