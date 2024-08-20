<template>
  <div class="welcome-page">
    <div class="animated-container">
      <img src="../assets/s.png" alt="1.Stop-Store Logo" class="logo">
    </div>
    <h1>Welcome to 1.Stop-Store</h1>
    <div class="carousel-container">
      <DiscountCarousel :discountedProducts="discountedProducts" />
    </div>
    <p>Your one-stop shop for all your needs.</p>
    <router-link to="/products" class="shop-now-button">Shop Now</router-link>
  </div>
</template>

<script>
import DiscountCarousel from '../components/DiscountCarousel.vue';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Welcome',
  components: {
    DiscountCarousel
  },
  computed: {
    ...mapState('product', ['discountedProducts'])
  },
  methods: {
    ...mapActions('product', ['fetchDiscountedProducts'])
  },
  created() {
    this.fetchDiscountedProducts();
  }
};
</script>

<style scoped>
.welcome-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f4f4f4;
  padding: 20px;
}

.animated-container {
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: bounce 2s infinite ease-in-out alternate;
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(20px);
  }
}

.logo {
  max-width: 50%;
  height: auto;
  object-fit: contain;
  filter: grayscale(1);
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}

.carousel-container {
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
  display:flex;
  justify-content: center;
}

p {
  font-size: 1.2em;
  margin-bottom: 30px;
}

.shop-now-button {
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.shop-now-button:hover {
  background-color: #555;
}
</style>

  