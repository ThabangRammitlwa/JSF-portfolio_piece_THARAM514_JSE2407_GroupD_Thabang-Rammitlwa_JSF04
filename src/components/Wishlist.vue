<template>
  <div class="wishlist">
    <h1>Your Wishlist</h1>
    <div v-if="sortedAndFilteredWishlistItems.length === 0">Your wishlist is empty</div>
    <div v-else>
      <div v-for="item in sortedAndFilteredWishlistItems" :key="item.productId" class="wishlist-item">
        <img v-if="item.image" :src="item.image" :alt="item.title" />
        <div class="details">
          <h2>{{ item.title || 'Unknown Product' }}</h2>
          <p v-if="item.price">Price: ${{ item.price }}</p>
          <p v-if="item.description">{{ item.description }}</p>
          <button @click="removeFromWishlist(item.id)">Remove from Wishlist</button>
          <button @click="moveToCart(item.id)">Move to Cart</button>
        </div>
      </div>
      <div class="wishlist-summary">
        <p>Total Items: {{ wishlistItemCount }}</p>
        <button @click="clearWishlist">Clear Wishlist</button>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  
  export default {
    computed: {
      ...mapGetters('wishlist', ['wishlistItems', 'wishlistItemCount', 'isInWishlist']),
      sortedAndFilteredWishlistItems() {
        return this.wishlistItems.slice().sort((a, b) => {
        }).filter(item => {
          return item.price > 0;

        });
    }
    },
    methods: {
      ...mapActions('wishlist', ['removeFromWishlist', 'addToCart', 'clearWishlist', 'addToWishlist']),
      
    /*  removeFromWishlistHandler(productId) {
        this.removeFromWishlist(productId); // Calls the Vuex action, not the local method
      },
      clearWishlistHandler() {
      this.clearWishlist();
    },*/
      
      moveToCart(item) {
        this.addToCart({ product: item, quantity: 1 });
        this.removeFromWishlist(item.id); // Using the correct method here
      },
      
      toggleWishlist(item) {
        if (this.isInWishlist(item.Id)) {
          this.removeFromWishlist(item.Id); // Using the correct method here
        } else {
          this.addToWishlist(item);
        }
      },
    },
  };
  </script>
  

  <style scoped>
  :root {
    --card-background: #ffffff;
    --text-color: #000000;
    --icon-color: #666666;
    --button-primary-background: #007bff;
    --button-primary-hover: #0056b3;
    --button-danger-background: #dc3545;
    --button-danger-hover: #c82333;
    --wishlist-background: #f9f9f9;
    --border-color: #ddd;
  }
  
  body.dark-mode {
    --card-background: #1e1e1e;
    --text-color: #ffffff;
    --icon-color: #aaaaaa;
    --button-primary-background: #0056b3;
    --button-primary-hover: #003d80;
    --button-danger-background: #e74c3c;
    --button-danger-hover: #c82333;
    --wishlist-background: #2e2e2e;
    --border-color: #444;
  }
  
  .wishlist {
    padding: 20px;
    background-color: var(--wishlist-background);
    border-radius: 8px;
  }
  
  .wishlist-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    background-color: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 10px;
  }
  
  .wishlist-item img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 20px;
  }
  
  .details {
    flex: 1;
  }
  
  .details h2 {
    font-size: 18px;
    margin: 0;
    color: var(--text-color);
  }
  
  .details p {
    font-size: 16px;
    color: var(--text-color);
  }
  
  .wishlist-item button {
    margin-right: 10px;
    background-color: var(--button-primary-background);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 12px;
    cursor: pointer;
  }
  
  .wishlist-item button:hover {
    background-color: var(--button-primary-hover);
  }
  
  .wishlist-summary {
    margin-top: 20px;
  }
  
  .wishlist-summary p {
    font-size: 16px;
    font-weight: bold;
    color: var(--text-color);
  }
  
  .wishlist-summary button {
    background-color: var(--button-danger-background);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 12px;
    cursor: pointer;
  }
  
  .wishlist-summary button:hover {
    background-color: var(--button-danger-hover);
  }
  
  .red-heart {
    color: #e74c3c;
    cursor: pointer;
    font-size: 24px;
    margin-left: 10px;
  }
  
  .wishlist-added {
    color: #e74c3c;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .wishlist-item {
      flex-direction: column;
      align-items: flex-start;
    }
  
    .wishlist-item img {
      width: 80px;
      height: 80px;
      margin-right: 0;
      margin-bottom: 10px;
    }
  
    .wishlist-item button {
      margin-top: 10px;
      width: 100%;
    }
  
    .details h2 {
      font-size: 16px;
    }
  
    .details p {
      font-size: 14px;
    }
  }
  
  @media (max-width: 480px) {
    .wishlist-item {
      padding: 10px;
    }
  
    .wishlist-item img {
      width: 60px;
      height: 60px;
    }
  
    .wishlist-summary p {
      font-size: 14px;
    }
  
    .wishlist-summary button {
      width: 100%;
      padding: 10px;
    }
  
    .red-heart {
      font-size: 20px;
    }
  }
  </style>
  
