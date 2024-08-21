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
:root {
  --home-background: #0e1a27;
  --text-primary: #E2E8F0;
  --text-secondary: #CBD5E0;
  --logo-filter: grayscale(1);
  --bounce-animation: bounce 2s infinite ease-in-out alternate;
  --shopping-background: aliceblue;
  --shopping-text: blue;
}

body.dark-mode {
  --home-background: #1e1e1e;
  --text-primary: #ffffff;
  --text-secondary: #aaaaaa;
  --logo-filter: grayscale(0);
  --shopping-background: #333;
  --shopping-text: #f5f5f5;
}

.home {
  text-align: center;
  padding: 2rem;
  background-color: var(--home-background);
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
  animation: var(--bounce-animation);
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
  filter: var(--logo-filter);
}

h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-top: -10px;
}

p {
  font-size: 1.2rem;
  color: var(--text-secondary);
}

.shopping {
  background-color: var(--shopping-background);
  font-style: normal;
  font-weight: 800;
  color: var(--shopping-text);
}

/* Responsive Design */
@media (max-width: 768px) {
  .home {
    padding: 1.5rem;
  }

  .animated-container {
    height: 70vh;
  }

  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .home {
    padding: 1rem;
    height: 75vh;
  }

  .animated-container {
    height: 60vh;
  }

  .logo {
    max-width: 70%;
  }

  h1 {
    font-size: 1.5rem;
  }

  p {
    font-size: 0.9rem;
  }
}
</style>


  