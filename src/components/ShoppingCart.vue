<template>
    <div class="cart">
      <h1>Your Shopping Cart</h1>
      <div v-if="cartItems.length === 0">Your cart is empty</div>
      <div v-else>
        <div v-for="item in cartItems" :key="item.productId" class="cart-item">
          <img :src="item.image" :alt="item.title" />
          <div class="details">
            <h2>{{ item.title }}</h2>
            <p>Price: ${{ item.price }}</p>
            <input type="number" v-model.number="item.quantity" @change="updateItemQuantity(item)" min="1" />
            <button @click="removeItem(item.productId)">Remove</button>
          </div>
        </div>
        <div class="cart-summary">
          <p>Total: ${{ cartTotal }}</p>
          <button @click="clearCart">Clear Cart</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters(['cartItems', 'cartTotal']),
    },
    methods: {
      ...mapActions(['removeFromCart', 'updateQuantity', 'clearCart']),
      updateItemQuantity(item) {
        this.updateQuantity({ productId: item.productId, quantity: item.quantity });
      },
      removeItem(productId) {
        this.removeFromCart(productId);
      }
    }
  };
  </script>
  
  <style scoped>
  .cart-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .details {
    flex: 1;
    padding-left: 20px;
  }
  
  .cart-summary {
    margin-top: 20px;
  }
  </style>
  