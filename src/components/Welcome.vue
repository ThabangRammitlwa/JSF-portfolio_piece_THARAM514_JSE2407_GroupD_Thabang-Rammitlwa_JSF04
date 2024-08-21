<template>
  <div class="home">
      <div class="animated-container">
          <img src="../assets/s.png" alt="1.Stop-Store Logo" class="logo">
      </div>
      <h1>Welcome to Our Store</h1>
      <p>Discover amazing products at great prices!</p>
      <router-link to="/products" class="shopping">
        Start Shopping
      </router-link>
  </div>
  
  </template>
  
  <script>
  export default {
      name: 'WelcomePage'
  }
  
  </script>
  
  <style scoped>
  .home {
    text-align: center;
    padding: 2rem;
    background-color: #0e1a27;
    height: 85vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .animated-container {
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: bounce 2s infinite ease-in-out alternate;
  }
  @keyframes bounce {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(20px);
    }
  }
  
  .logo {
    background-color: inherit;
    max-width: 50%;
    height: auto;
    object-fit: contain;
    filter: grayscale(1); 
  }
  
  h1 {
    font-size: 2.5rem;
    font-weight: 800; 
    color: #E2E8F0; 
    margin-top: -10px;
  }
  p {
    font-size: 1.2rem;
    color: #CBD5E0; 
  }
  
  .shopping{
  
      background-color: aliceblue;
      font-style:normal;
      font-weight: 800;
      color: blue;
  }
  </style>

  