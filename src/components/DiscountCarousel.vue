<template>
  <div class="discount-carousel">
    <Carousel 
      :itemsToShow="carouselSettings.itemsToShow" 
      :loop="true" 
      :autoplay="3000"  
      :pauseAutoplayOnHover="false"
      :snap-align="'start'"      class="carousel-horizontal"
      >

      <Slide v-for="product in discountedProducts" :key="product.id">
        <div class="product-card" @click="goToProduct(product.id)">
          <img class="circular-image" :src="product.image" :alt="product.title">
          <h3>{{ product.title }}</h3>
          <p class="discount">{{ product.discountPercentage }}% OFF</p>
          <p class="price">
            <span class="discounted">${{ product.discountedPrice.toFixed(2) }}</span>
            <span class="original">${{ product.price.toFixed(2) }}</span>
          </p>
        </div>
      </Slide>
    </Carousel>
  </div>
</template>


<script>
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.es'; 
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
      return {
        itemsToShow: this.getItemsToShow(),
      };
    },
  },
  methods: {
    goToProduct(productId) {
      this.$router.push(`/product/${productId}`);
    },
    getItemsToShow() {
      if (window.innerWidth >= 1024) {
        return this.breakpoints[1024].itemsToShow;
      } else if (window.innerWidth >= 640) {
        return this.breakpoints[640].itemsToShow;
      } else {
        return this.itemsToShow;
      }
    },
    updateItemsToShow() {
      this.itemsToShow = this.getItemsToShow();
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

<style scoped>
.discount-carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.carousel-horizontal {
  display: flex;
  align-items: center;
  overflow-x: scroll; /* Enable horizontal scrolling if necessary */
}

.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  margin: 0 15px; /* Add space between carousel items */
}

.circular-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

h3 {
  font-size: 16px;
  margin: 5px 0;
}

.discount {
  color: #ff0000;
  font-weight: bold;
}

.price {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.discounted {
  font-size: 18px;
  color: #333;
  font-weight: bold;
}

.original {
  font-size: 14px;
  color: #aaa;
  text-decoration: line-through;
}

@media (min-width: 640px) {
  .circular-image {
    width: 120px;
    height: 120px;
  }

  h3 {
    font-size: 18px;
  }
}

@media (min-width: 1024px) {
  .circular-image {
    width: 140px;
    height: 140px;
  }

  h3 {
    font-size: 20px;
  }
}


</style>


