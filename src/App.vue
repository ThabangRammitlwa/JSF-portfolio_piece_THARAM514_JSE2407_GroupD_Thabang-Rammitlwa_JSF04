<template>
  <div id="app">
    <Header />
    <ThemeToggle />
    <DiscountCarousel/>
    <router-view />
</div>
  </template>
  
  <script>
  import Header from './components/Header.vue';
  import DiscountCarousel from './components/DiscountCarousel.vue';
import ThemeToggle from './components/ThemeToggle.vue';

  
  
  export default {
    name: 'App',
    components: {
        Header,
      ThemeToggle,
      DiscountCarousel
    
    }
  };
  </script>
