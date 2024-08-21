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
          <li v-if="isAuthenticated" class="user-menu">
            <router-link to="/Login" title="Login">
              <i class="fas fa-user"></i>
            </router-link>
            <button @click="logout">Logout</button>
          </li>
          <router-link v-else to="/login" title="Login">
            <i class="fas fa-user"></i>
          </router-link>
        </ul>
      </nav>
    </div>
    <LoginModal v-if="showLogin" @close="showLogin = false" @login-success="onLoginSuccess" />
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
    ...mapGetters('auth', ['isAuthenticated', 'userName']),
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
    onLoginSuccess() {
      this.showLogin = false; 
    },
  },
};
</script>

<style scoped>
header {
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  top: 0;
  left:0;
  width: 100%;
  z-index: 1000;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; 
  margin: auto;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px; 
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
  padding: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap; 
}

.nav-list a {
  color: #fff;
  margin-left: 20px;
  text-decoration: none;
}

.Cart-icon .fas, .nav-list i {
  font-size: 18px;
}

.user-menu {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.user-menu span {
  margin-left: 5px;
  font-size: 14px;
}

.user-menu button {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  margin-left: 10px;
}


@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: flex-start;
  }

  .search-bar {
    margin: 10px 0;
  }

  .nav-list {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-list a {
    margin-left: 0;
    margin-bottom: 10px;
  }

  .user-menu {
    margin-top: 10px;
  }
}

@media (max-width: 480px) {
  .logo {
    font-size: 20px;
  }

  .nav-list {
    align-items: center;
  }

  .nav-list a {
    font-size: 16px;
  }

  .Cart-icon .fas, .nav-list i {
    font-size: 16px;
  }

  .user-menu span {
    font-size: 12px;
  }
}
</style>



  