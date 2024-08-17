
<template>
    <div class="product-card" @click="goToDetail">
      <img :src="product.image" :alt="product.title" />
      <h2>{{ product.title }}</h2>
      <p>Price: ${{ product.price }}</p>
      <p>Category: {{ product.category }}</p>
    </div>
  </template>
  
  <script>
  /**
   * @typedef {Object} Product
   * @property {number|string} id - The unique identifier of the product
   * @property {string} title - The title of the product
   * @property {string} [description] - The description of the product
   * @property {number} price - The price of the product
   * @property {string} [image] - The URL of the product image
   */
  
  /**
   * ProductCard component
   * Displays a card with basic information about a product
   * @vue-component
   */
  export default {
    name: 'ProductCard',
    props: {
      /**
       * The product object to display in the card
       * @type {Product}
       */
      product: {
        type: Object,
        required: true
      }
    },
    methods: {
      /**
       * Navigates to the detailed view of the product
       */
      goToDetail() {
        this.$router.push(`/product/${this.product.id}`);
      }
    }
  };
  </script>
  
  <style scoped>
  .product-card {
    background-color: white;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    cursor: pointer;
  }
  
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    margin-bottom: 10px;
  }
  
  h2 {
    font-size:medium;
    margin-bottom: 10px;
  }
  
  p {
    margin: 5px 0;
  }
  </style>
  