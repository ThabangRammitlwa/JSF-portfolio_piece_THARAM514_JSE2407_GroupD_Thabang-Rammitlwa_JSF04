
<template>
    <div class="product-card" @click="goToDetail">
      <img :src="product.image" :alt="product.title" />
      <h2>{{ product.title }}</h2>
      <p>Price: ${{ product.price }}</p>
      <p>Category: {{ product.category }}</p>

      <div class="icons">
        <i class="fa fa-heart" @click.stop="addToWishlist":class="{ 'active': isInWishlist }"title="Add to Wishlist"></i>
        <i  class="fa fa-shopping-cart"  @click.stop="addToCart" :class="{ 'active': isInCart }"title="Add to Cart" ></i>

      </div>
    </div>
  </template>
  
  <script>
 
  export default {
    name: 'ProductCard',
    props: {
   
      product: {
        type: Object,
        required: true
      }
    },
    data() {
    return {
      isInWishlist: false,
      isInCart: false
    };
  },

    methods: {
      goToDetail() {
        this.$router.push(`/product/${this.product.id}`);
      },

      addToWishlist() {
      this.isInWishlist = !this.isInWishlist;
      },
      addToCart() {
      this.isInCart = !this.isInCart;
    }
    }
  };
  </script>
  
  <style scoped>
  .product-card {
    background-color: var(--card-background);
    color: var(--text-color);
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .icons {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
  
  .fa {
    cursor: pointer;
    font-size: 20px;
    color: var(--icon-color); /* Use a dynamic icon color */
    transition: color 0.3s;
  }
  
  .fa.active {
    color: var(--active-icon-color); /* Active state color */
  }
  
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    margin-bottom: 10px;
  }
  
  h2 {
    font-size: medium;
    margin-bottom: 10px;
  }
  
  p {
    margin: 5px 0;
  }
  
  /* Define CSS variables for theme support */
  :root {
    --card-background: #ffffff;
    --text-color: #000000;
    --icon-color: #666666;
    --active-icon-color: red;
  }
  
  body.dark-mode :root {
    --card-background: #1e1e1e;
    --text-color: #ffffff;
    --icon-color: #aaaaaa;
    --active-icon-color: #ff6347; /* Example active color for dark mode */
  }
  </style>
  
  