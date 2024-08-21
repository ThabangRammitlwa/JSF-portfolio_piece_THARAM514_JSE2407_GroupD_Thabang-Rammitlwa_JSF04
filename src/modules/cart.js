import jwtDecode from 'vue-jwt-decode';

export default {
  namespaced: true,
  state: {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    userId: null,
    totalCost: 0,
  },
  getters: {
    cartItems: state => state.cart || [],
    cartItemCount: state => state.cart.length,
    totalCost: state => {
      return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    },
  },
  mutations: {
    SET_USER_ID(state, token) {
      const decodedToken = jwtDecode(token);
      state.userId = decodedtoken.userId;
    },
    ADD_TO_CART(state, { product, quantity }) {
      const existingItem = state.cart.find(item => item.productId === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cart.push({ ...product, quantity });
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(p => p.productId !== productId);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    UPDATE_ITEM_QUANTITY(state, { productId, quantity }) {
      const item = state.cartItems.find((item) => item.productId === productId);
      if (item) {
        item.quantity = quantity;
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    CLEAR_CART(state) {
      state.cart = [];
      localStorage.removeItem('cart');
    },
  },
  actions: {
    setUserId({ commit }, token) {
      commit('SET_USER_ID', token);
    },
    addToCart({ commit, state }, { product, quantity }) {
      commit('ADD_TO_CART', { product, quantity });
    },
    removeFromCart({ commit }, productId) {
      commit('REMOVE_FROM_CART', productId);
    },
    updateQuantity({ commit }, { productId, quantity }) {
      commit('UPDATE_CART_QUANTITY', { productId, quantity });
    },
    clearCart({ commit }) {
      commit('CLEAR_CART');
    },
  },
};



  
