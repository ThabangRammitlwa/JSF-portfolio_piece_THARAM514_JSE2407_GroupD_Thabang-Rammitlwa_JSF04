<template>
  <div class="cart">
    <h1>Your Cart</h1>
    <div v-if="cartItems.length === 0">Your cart is empty</div>
    <div v-else>
      <div v-for="item in cartItems" :key="item.productId" class="cart-item">
        <img v-if="item.image" :src="item.image" :alt="item.title" />
        <div class="details">
          <h2>{{ item.title || 'Unknown Product' }}</h2>
          <p v-if="item.price">Price: ${{ item.price }}</p>
          <button @click="removeFromCartHandler(item.productId)">Remove from Cart</button>
          <button @click="updateItemQuantity({productId: item.productId, quantity: item.quantity - 1})">-</button>
          <span class="mx-2">{{ item.quantity }}</span>
          <button @click="updateItemQuantity({productId: item.productId, quantity: item.quantity + 1})">+</button>
          <button @click="moveToWishlist(item)">Move to Wishlist</button>
          <button @click="moveToComparison(item)">Move to Comparison</button>
        </div>
      </div>
      <div class="cart-summary">
        <p>Total: ${{ totalCost }}</p>
        <button @click="clearCart">Clear Cart</button>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('cart', ['cartItems', 'cartItemCount', 'isInCart', 'totalCost']),
  },
  methods: {
    ...mapActions('cart', ['removeFromCart', 'addToWishlist', 'addToComparison', 'clearCart', 'addToCart', 'updateQuantity']),

   removeFromCartHandler(productId) {
      this.removeFromCart(productId);
    },

    moveToWishlist(item) {
      this.addToWishlist(item);
      this.removeFromCartHandler(item.productId);
    },

    moveToComparison(item) {
      this.addToComparison(item);
      this.removeFromCartHandler(item.productId);
    },

    updateItemQuantity({ productId, quantity }) {
      if (quantity > 0) {
        this.updateQuantity({ productId, quantity });
      } else {
        this.removeFromCartHandler(productId);
      }
    },

    toggleCart(item) {
      if (this.isInCart(item.productId)) {
        this.removeFromCart(item.productId);
      } else {
        this.addToCart({ product: item, quantity: 1 });
      }
    },
  },
};
</script>


  
<style scoped>

:root {
  --card-background: #ffffff;
  --text-color: #000000;
  --icon-color: #666666;
}

body.dark-mode {
  --card-background: #1e1e1e;
  --text-color: #ffffff;
  --icon-color: #aaaaaa;
}

.cart {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--card-background);
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
  color: var(--text-color);
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--card-background);
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.cart-item img {
  width: 80px;
  height: auto;
  border-radius: 4px;
  object-fit: cover;
}

.details {
  flex: 1;
  padding-left: 20px;
}

.details h2 {
  font-size: 1.2rem;
  margin: 0;
  color: var(--text-color);
}

.details p {
  margin: 5px 0;
  color: var(--icon-color);
  font-size: 1rem;
}

.details button {
  margin-right: 10px;
  padding: 8px 12px;
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  transition: background-color 0.3s ease;
}

.details button:hover {
  background-color: #0056b3;
}

.cart-summary {
  margin-top: 30px;
  text-align: center;
}

.cart-summary p {
  font-size: 1.1rem;
  color: var(--text-color);
}

.cart-summary button {
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #dc3545;
  color: #fff;
  transition: background-color 0.3s ease;
}

.cart-summary button:hover {
  background-color: #c82333;
}

/* Responsive Styles */
@media (max-width: 600px) {
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .cart-item img {
    margin-bottom: 10px;
  }

  .details {
    padding-left: 0;
  }

  .details h2 {
    font-size: 1rem;
  }

  .details button {
    margin-bottom: 5px;
  }
}
</style>

  