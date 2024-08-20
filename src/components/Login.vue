<template>
  <div class="login">
    <h1>Sign in</h1>
    <form @submit.prevent="loginUser">
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

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        this.$store.dispatch('auth/setUserId', data.token);

      
        const redirectTo = this.$route.query.redirect || '/';
        this.$router.push(redirectTo);
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
.error {
  color: red;
}
.loading {
  color: blue;
}
</style>

  