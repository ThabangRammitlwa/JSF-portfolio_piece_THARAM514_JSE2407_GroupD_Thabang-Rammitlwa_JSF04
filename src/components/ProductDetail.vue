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

    ...mapActions(['fetchProductDetail']),

 
    goBack() {
      this.$router.push('/');
    }
  },

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