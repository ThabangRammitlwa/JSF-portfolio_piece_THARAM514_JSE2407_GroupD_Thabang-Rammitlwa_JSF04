
<template>
    <div class="product-card" @click="goToDetail">
      <img :src="product.image" :alt="product.title" />
      <h2>{{ product.title }}</h2>
      <p>Price: ${{ product.price }}</p>
      <p>Category: {{ product.category }}</p>
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
    methods: {
     
     
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
  