<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else-if="productDetail">
    <div class="container">
    <div class="back">
      <button @click="goBack">Back to Products</button>
    </div>
    
    <div class="product-detail">
      <div class="image-container">
        <img :src="productDetail.image" :alt="productDetail.title" />
      </div>
      <div class="content-container">
        <h2>{{ productDetail.title }}</h2>
        <p>Description: {{ productDetail.description }}</p>
        <p>Price: ${{ productDetail.price }}</p>
        <p>Category: {{ productDetail.category }}</p>
        <p>Rating: {{ productDetail.rating.rate }} ({{ productDetail.rating.count }} reviews)</p>
        <button @click="addToCart">Add to Cart</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ProductDetails',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    ...mapState(['loading', 'error', 'productDetail'])
  },
  methods: {
    ...mapActions('cart', ['addItemToCart']),
    async addToCart() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: 'login' });
      } else {
        await this.addItemToCart(this.product);
      }
    },

    ...mapActions(['fetchProductDetail']),

    goBack() {
      this.$router.push('/products');
    }
  },
  
  mounted() {
    this.fetchProductDetail(this.id);
  }
};
</script>


<style scoped>
:root {
  --container-background: #ffffff;
  --product-detail-background: #f9f9f9;
  --text-color: #333333;
  --heading-color: #000000;
  --highlight-color: #ff4444;
  --button-background: #007bff;
  --button-text-color: #ffffff;
  --button-border-color: #007bff;
}

body.dark-mode {
  --container-background: #1e1e1e;
  --product-detail-background: #2e2e2e;
  --text-color: #ffffff;
  --heading-color: #ffffff;
  --highlight-color: #ff6f61;
  --button-background: #0056b3;
  --button-text-color: #ffffff;
  --button-border-color: #0056b3;
}

.container {
  background-color: var(--container-background);
  padding: 20px;
}

.back {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px;
}

.product-detail {
  border-radius: 20px;
  display: flex;
  align-items: flex-start;
  padding: 50px;
  gap: 50px;
  background-color: var(--product-detail-background);
  color: var(--text-color);
}

.image-container {
  flex: 0 0 auto;
}

.content-container {
  flex: 1 1 auto;
  text-align: left;
}

img {
  height: 300px;
  max-width: 100%;
  object-fit: contain;
}

h2 {
  margin-top: 0;
  color: var(--heading-color);
}

p {
  margin-bottom: 1rem;
  max-width: 600px;
  color: var(--text-color);
}

p:nth-of-type(2) {
  color: var(--highlight-color);
  font-size: 20px;
}

p:nth-of-type(4) {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

button {
  background-color: var(--button-background);
  color: var(--button-text-color);
  border: solid;
  border-color: var(--button-border-color);
  border-radius: 5px;
  font-size: medium;
  padding: 10px 20px;
  cursor: pointer;
}

.price-section {
  margin-bottom: 10px;
}

.discount {
  color: #e74c3c;
  font-weight: bold;
}

.discounted-price {
  font-size: 1.2em;
  font-weight: bold;
  color: #e74c3c;
  margin-right: 10px;
}

.original-price {
  text-decoration: line-through;
  color: #7f8c8d;
}

.sale-end {
  font-style: italic;
  color: #e74c3c;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .product-detail {
    padding: 30px;
    gap: 30px;
  }
  
  img {
    height: 250px;
  }
}

@media (max-width: 768px) {
  .product-detail {
    flex-direction: column;
    align-items: center;
    padding: 20px;
    gap: 20px;
  }
  
  .image-container,
  .content-container {
    width: 100%;
  }
  
  img {
    height: 200px;
  }
  
  h2 {
    font-size: 1.5rem;
  }
  
  p {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .product-detail {
    padding: 10px;
    gap: 15px;
  }
  
  img {
    height: 150px;
  }
  
  h2 {
    font-size: 1.2rem;
  }
  
  p {
    font-size: 12px;
  }
}
</style>

