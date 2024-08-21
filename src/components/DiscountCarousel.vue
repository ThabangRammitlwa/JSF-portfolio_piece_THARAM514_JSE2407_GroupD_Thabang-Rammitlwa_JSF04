<template>
  <div class="discount-carousel">
    <div class="carousel-wrapper">
      <div class="carousel-content">
        <div 
          v-for="product in discountedProducts" 
          :key="product.id" 
          class="product-card" 
          @click="goToProduct(product.id)"
        >
          <img class="circular-image" :src="product.image" :alt="product.title">
          <h3>{{ product.title }}</h3>
          <p class="discount">{{ product.discountPercentage }}% OFF</p>
          <p class="price">
            <span class="discounted">${{ product.discountedPrice.toFixed(2) }}</span>
            <span class="original">${{ product.price.toFixed(2) }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
import { mapState } from 'vuex';

export default {
  name: 'DiscountCarousel',
  data() {
    return {
      itemsToShow: 1,
      autoplayInterval: null,
      scrollAmount: 100, 
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
    startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        const container = this.$el.querySelector('.carousel-wrapper');
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        if (container.scrollLeft + this.scrollAmount >= maxScrollLeft) {
          container.scrollTo({ left: 0, behavior: 'smooth' }); 
        } else {
          container.scrollBy({ left: this.scrollAmount, behavior: 'smooth' });
        }
      }, 1000);
    },
    stopAutoplay() {
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval);
      }
    }
  },
  mounted() {
    if (this.discountedProducts.length === 0) {
      this.$store.dispatch('product/fetchDiscountedProducts');
    }
    window.addEventListener('resize', this.updateItemsToShow);
    this.updateItemsToShow();
    this.startAutoplay();
  },
  beforeUnmount() {
    this.stopAutoplay();
    window.removeEventListener('resize', this.updateItemsToShow);
  },
};
</script>




<style scoped>
.discount-carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.carousel-wrapper {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.carousel-content {
  display: flex;
  gap: 10px; 
}

.product-card {
  background-color:var(--card-background);
  color:var(--text-color);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  flex-shrink: 0;
  margin: 10px;
  overflow: hidden;
  padding: 12px; 
  text-align: center;
  width: 150px; 
}

.circular-image {
  border-radius: 50%;
  height: 80px; 
  object-fit: cover;
  width: 80px;
}

h3 {
  font-size: 14px; 
  font-weight: 600;
  margin-top: 8px;
  color: var(--card-background);
}

.discount {
  color: #f44336;
  font-weight: 600;
  margin-top: 6px;
}

.price {
  margin-top: 6px;
}

.discounted {
  color: #f44336;
  font-weight: 600;
  margin-right: 8px;
}

.original {
  color: #888;
  text-decoration: line-through;
}

:root {
    --card-background: #ffffff;
    --text-color: #000000;
    --icon-color: #666666;
  }
  
  body.dark-mode :root {
    --card-background: #1e1e1e;
    --text-color: #ffffff;
    --icon-color: #aaaaaa;
  }
</style>
