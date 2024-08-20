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
          <button @click="removeFromWishlist(item.Id)">Remove from Wishlist</button>
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
    },
      
      moveToCart(item) {
        this.addToCart({ product: item, quantity: 1 });
        this.removeFromWishlistHandler(item.productId); // Using the correct method here
      },*/
      
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
  .wishlist {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .wishlist-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
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
  }
  
  .details p {
    font-size: 16px;
    color: #333;
  }
  
  .wishlist-item button {
    margin-right: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 12px;
    cursor: pointer;
  }
  
  .wishlist-item button:hover {
    background-color: #0056b3;
  }
  
  .wishlist-summary {
    margin-top: 20px;
  }
  
  .wishlist-summary p {
    font-size: 16px;
    font-weight: bold;
  }
  
  .wishlist-summary button {
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 12px;
    cursor: pointer;
  }
  
  .wishlist-summary button:hover {
    background-color: #c82333;
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
</style>