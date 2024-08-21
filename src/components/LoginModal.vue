<template>
  <div class="login-modal">
    <form @submit.prevent="loginUser">
      <!-- form fields for username and password -->
      <div>
        <label for="username">Username</label>
        <input
          v-model="username"
          id="username"
          type="text"
          placeholder="Enter your username"
        />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          v-model="password"
          :type="passwordVisible ? 'text' : 'password'"
          id="password"
          placeholder="Enter your password"
        />
        <button type="button" @click="togglePasswordVisibility">
          {{ passwordVisible ? 'Hide' : 'Show' }}
        </button>
      </div>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      <div v-if="loading" class="loading">Logging in...</div>
      <button type="submit" :disabled="!formValid">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      passwordVisible: false,
      loading: false,
      errorMessage: '',
    };
  },
  computed: {
    formValid() {
      return this.username.trim() !== '' && this.password.trim() !== '';
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    async loginUser() {
      if (!this.formValid) return;

      this.loading = true;
      this.errorMessage = '';

      try {
        const response = await fetch('https://fakestoreapi.com/auth/login', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        if (response.status === 401) {
          throw new Error('Invalid username or password');
        }

        if (!response.ok) {
          throw new Error('Login failed. Please try again later.');
        }

        const data = await response.json();
        const user = { id: data.userId, name: this.username };
        localStorage.setItem('token', data.token);
        this.$store.commit('auth/SET_AUTH', { token: data.token, user });
        this.$emit('login-success');
      } catch (error) {
        this.errorMessage = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    max-width: 80%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 20px;
    text-align: left;
  }
  
  .password-container {
    display: flex;
    align-items: center;
  }
  
  button[type="button"] {
    margin-left: 10px;
    padding: 5px 10px;
    background-color: #ddd;
    border: none;
    cursor: pointer;
  }
  
  button[type="submit"] {
    width: 100%;
    padding: 10px;
    background-color: #0288d1;
    color: white;
    border: none;
    cursor: pointer;
    margin-top: 20px;
  }
  
  .close-button {
    margin-top: 20px;
    padding: 5px 10px;
    background-color: #f44336;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>
  