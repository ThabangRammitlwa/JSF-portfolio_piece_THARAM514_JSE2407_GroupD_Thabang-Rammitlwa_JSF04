<template>
  <div class="discount-carousel">
    <Carousel :itemsToShow="itemsToShow" :loop="true" :autoplay="3000">
      <Slide v-for="product in discountedProducts" :key="product.id">
        <div class="product-card" @click="goToProduct(product.id)">
          <img :src="product.image" :alt="product.title">
          <h3>{{ product.title }}</h3>
          <p class="discount">{{ product.discountPercentage }}% OFF</p>
          <p class="price">
            <span class="discounted">${{ product.discountedPrice.toFixed(2) }}</span>
            <span class="original">${{ product.originalPrice.toFixed(2) }}</span>
          </p>
        </div>
      </Slide>
    </Carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.es'; // Import styles
import { mapState } from 'vuex';

export default {
  name: 'DiscountCarousel',
  components: { Carousel, Slide },
  data() {
    return {
      itemsToShow: 1,
      breakpoints: {
        640: {
          itemsToShow: 2,
        },
        1024: {
          itemsToShow: 3,
        },
      },
    };
  },
  computed: {
    ...mapState('product', ['discountedProducts']),
    carouselSettings() {
      let itemsToShow = this.itemsToShow;
      if (window.innerWidth >= 1024) {
        itemsToShow = this.breakpoints[1024].itemsToShow;
      } else if (window.innerWidth >= 640) {
        itemsToShow = this.breakpoints[640].itemsToShow;
      }
      return { itemsToShow };
    },
  },
  methods: {
    goToProduct(productId) {
      this.$router.push(`/product/${productId}`);
    },
    updateItemsToShow() {
      this.itemsToShow = this.carouselSettings.itemsToShow;
    },
  },
  mounted() {
    if (this.discountedProducts.length === 0) {
      this.$store.dispatch('product/fetchDiscountedProducts');
    }
    window.addEventListener('resize', this.updateItemsToShow);
    this.updateItemsToShow();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateItemsToShow);
  },
};
</script>

<style>
.discount-carousel {
 color: blue;
}
.product-card {
  color: brown;
}
</style>

