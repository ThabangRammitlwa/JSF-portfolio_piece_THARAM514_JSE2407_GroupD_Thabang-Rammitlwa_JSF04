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
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

/**
 * ProductDetails component
 * Displays detailed information about a specific product
 * @vue-component
 */
export default {
  name: 'ProductDetails',
  props: {
    /**
     * The ID of the product to display
     * @type {string|number}
     */
    id: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    /**
     * Maps Vuex state to component properties
     * @returns {Object} Mapped state properties
     * @property {boolean} loading - Indicates if product details are being fetched
     * @property {string|null} error - Error message, if any
     * @property {Object|null} productDetail - Detailed information about the product
     */
    ...mapState(['loading', 'error', 'productDetail'])
  },
  methods: {
    /**
     * Maps Vuex actions to component methods
     * @property {Function} fetchProductDetail - Action to fetch product details
     */
    ...mapActions(['fetchProductDetail']),

    /**
     * Navigates back to the product list page
     */
    goBack() {
      this.$router.push('/');
    }
  },
  /**
   * Lifecycle hook called after the component is mounted
   * Fetches the product details using the provided ID
   */
  mounted() {
    this.fetchProductDetail(this.id);
  }
};
</script>

<style scoped>
.container{
  background-color: rgb(227, 236, 236); ;
}

.back {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px;
}

.product-detail {
  border-radius: 20px solid;
  display: flex;
  align-items: flex-start;
  padding: 50px;
  gap: 50px;
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
}

p {
  margin-bottom: 1rem;
  max-width: 600px;
}

p:nth-of-type(2) {
  color: green;
  font-size: 20px;
}

p:nth-of-type(4) {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

button {
  background-color: #02283f;
  color: white;
  border: solid;
  border-radius: 5px;
  font-size: medium;
  padding: 10px 20px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .back {
    justify-content: center;
    margin-bottom: 10px;
  }
}
</style>