<template>
  <header class="header">
    <div class="container flex flex-center">
      <h1 class="logo">1.Stop-Store</h1>
      <nav>
        <ul class="nav-list flex">
          <input v-model="searchQuery" @keyup.enter="searchProducts" placeholder="Search..." />
          <button @click="searchProducts">Search</button>
          <router-link to="/" title="Home">
            <i class="fas fa-home"></i>
          </router-link>
          <router-link to="/products" title="Shop">
            <i class="fas fa-store"></i>
          </router-link>
          <router-link to="/wishlist" title="Wishlist">
            <i class="fas fa-heart"></i>
            ({{ wishlistItemCount }})
          </router-link>
          <router-link to="/cart" class="Cart-icon">
            <i class="fas fa-shopping-cart"></i>
            ({{ cartItemCount }})
          </router-link>
          <router-link to="/comparison" title="Comparison">
            <i class="fas fa-exchange-alt"></i>
            ({{ comparisonItemCount }})
          </router-link>
          <li v-if="isAuthenticated">
            <a href="#" @click.prevent="logout">Logout</a>
          </li>
          <li v-else>
            <a href="#" @click.prevent="showLoginModal">Login</a>
          </li>
        </ul>
      </nav>
    </div>
    <LoginModal v-if="showLogin" @close="showLogin = false" />
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LoginModal from '../components/LoginModal.vue';

export default {
  name: 'Header',
  components: {
    LoginModal,
  },
  data() {
    return {
      searchQuery: '',
      showLogin: false,
    };
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    ...mapGetters('cart', ['cartItemCount']),
    ...mapGetters('wishlist', ['wishlistItemCount']),
    ...mapGetters('comparison', ['comparisonItemCount']),
  },
  methods: {
    ...mapActions('auth', ['logout']), // Namespace 'auth' for logout
    searchProducts() {
      if (this.searchQuery.trim()) {
        this.$router.push({ name: 'Products', query: { search: this.searchQuery } });
      }
    },
    showLoginModal() {
      this.showLogin = true;
    },
  },
};
</script>

  <style scoped>
 header {
  background-color: #000;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}
.header-left,
.header-right {
  display: flex;
  align-items: center;
}
.header-left,
.header-right {
  display: flex;
  align-items: center;
}

.header-right button {
  background-color: #fff;
  color: #000;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
  
nav {
  background-color: #f9f9f9;
  border-bottom: 1px solid #ddd;
  padding: 10px 20px;
}
  
nav ul {
  list-style-type: none;
  display: flex;
  margin: 0;
  padding: 0;
}
  
nav li {
  margin-right: 20px;
}
nav a {
  color: #333;
  text-decoration: none;
}
  
  /*.Cart-icon {
    display: flex;
    align-items: center;
  }
  
  input[type="text"] {
    padding: 5px;
    margin-right: 10px;
  }
  
  button {
    padding: 5px 10px;
    cursor: pointer;
  }
  
 /* body {
  margin: 0; 
  padding: 0;
  box-sizing: border-box; 
  }
  main {
  padding-top: 80px; 
}*/
  </style>
  