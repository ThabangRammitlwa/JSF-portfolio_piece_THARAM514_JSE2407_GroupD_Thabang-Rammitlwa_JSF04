
<template>
    <header class="header">
        <div class="container flex flex-center">
          <h1 class="logo">1.Stop-Store</h1>
          <nav>
          <ul class="nav-list flex">
            <input v-model="searchQuery" @keyup.enter="search" placeholder="Search...">
            <button @click="search">Search</button>
            <router-link to="/" title="Home">
              <i class="fas fa-home"></i>
            </router-link>
            <router-link to="/products" title="Shop">
              <i class="fas fa-store"></i>
            </router-link>
            <router-link to="/cart" class="Cart-icon">
              <i class="fas fa-shopping-cart"></i>
            ({{ cartItemCount }})
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

export default {
    name: 'Header',
    data() {
        return {
            searchQuery: '',
        };
    },
    computed: {
        cartItemCount() {

        }
    },

    methods: {
        searchProducts() {
            console.log(this.searchQuery);
        }

    }
};
</script>

<style scoped>

header{
    background-color: #000;
    color: #fff;
    padding: 10px 0;
  
}
.logo{
    font-size: 1.5rem;
    margin-right: auto;
}

.nav-list {
    list-style-type: none;
    padding: 0;
    display: flex;
    align-items: center;
  }

  .nav-list li {
    margin: 0 15px;
  }

  .nav-list a {
    color: #f3f8f4;
    font-size: 1.5em;
    text-decoration: none;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
  }

  .nav-list a:hover {
  color: #007bff;
}

.cart-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #ff4444;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.7em;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: center;
  }

}

</style>