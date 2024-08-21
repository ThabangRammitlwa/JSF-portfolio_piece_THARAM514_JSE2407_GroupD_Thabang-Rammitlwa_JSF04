<template>
  <header class="header">
    <div class="container flex-center">
      <h1 class="logo">1.Stop-Store</h1>
      <div class="search-bar">
        <input v-model="searchQuery" @keyup.enter="searchProducts" placeholder="Search..." />
        <button @click="searchProducts">Search</button>
      </div>
      <nav>
        <ul class="nav-list flex">
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
          <router-link to="/cart" title="Cart" class="Cart-icon">
            <i class="fas fa-shopping-cart"></i>
            ({{ cartItemCount }})
          </router-link>
          <router-link to="/comparison" title="Comparison List">
            <i class="fas fa-exchange-alt"></i>
            ({{ comparisonItemCount }})
          </router-link>
          <router-link to="/Login" title="Login">
            <i class="fas fa-user"></i>
          </router-link>
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
    ...mapActions('auth', ['logout']), 
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
  padding: 10px 20px;
}
.top-bar {
  background-color: #000;
  color: #fff;
  padding: 5px 0;
}
.top-bar .top-link {
  margin-right: 20px;
  font-size: 12px;
}
.highlight {
  color: #ff4444;
  font-weight: bold;
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  font-size: 24px;
  font-weight: bold;
}
.search-bar {
  flex-grow: 1;
  max-width: 400px;
  margin: 0 20px;
  display: flex;
}
.search-bar input {
  width: 100%;
  padding: 5px;
}
.search-bar button {
  padding: 5px 10px;
  background-color: #ff4444;
  color: #fff;
  border: none;
  cursor: pointer;
}
.nav-list {
  list-style: none;
  display: flex;
  align-items: center;
}
.nav-list a {
  color: #fff;
  margin-left: 20px;
  position: relative;
}
.Cart-icon .fas, .nav-list i {
  font-size: 18px;
}
</style>

  