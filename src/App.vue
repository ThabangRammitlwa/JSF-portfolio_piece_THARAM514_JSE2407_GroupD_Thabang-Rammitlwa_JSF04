<template>
  <div id="app">
    <Header />
    <ThemeToggle />
    <router-view />
</div>
  </template>
  
  <script>
import Header from './components/Header.vue';
import ThemeToggle from './components/ThemeToggle.vue';
  //import Login from './components/Login.vue'
  
  export default {
    name: 'App',
    components: {
        Header,
      ThemeToggle
    }
  };
  </script>
