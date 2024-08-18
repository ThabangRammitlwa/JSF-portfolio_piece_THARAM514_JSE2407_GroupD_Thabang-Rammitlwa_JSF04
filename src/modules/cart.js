// store/modules/cart.js
import jwtDecode from 'vue-jwt-decode';

const state = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
};

const mutations = {
  ADD_TO_CART(state, { product, quantity }) {
    const item = state.cart.find(p => p.productId === product.id);
    if (item) {
      item.quantity += quantity;
    } else {
      state.cart.push({ ...product, quantity });
    }
    localStorage.setItem('cart', JSON.stringify(state.cart));
  },
  REMOVE_FROM_CART(state, productId) {
    state.cart = state.cart.filter(p => p.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(state.cart));
  },
  UPDATE_QUANTITY(state, { productId, quantity }) {
    const item = state.cart.find(p => p.productId === productId);
    if (item) {
      item.quantity = quantity;
      localStorage.setItem('cart', JSON.stringify(state.cart));
    }
  },
  CLEAR_CART(state) {
    state.cart = [];
    localStorage.removeItem('cart');
  },
};

const actions = {
  addToCart({ commit }, payload) {
    commit('ADD_TO_CART', payload);
  },
  removeFromCart({ commit }, productId) {
    commit('REMOVE_FROM_CART', productId);
  },
  updateQuantity({ commit }, payload) {
    commit('UPDATE_QUANTITY', payload);
  },
  clearCart({ commit }) {
    commit('CLEAR_CART');
  },
};

const getters = {
  cartItems: state => state.cart,
  cartItemCount: state => state.cart.reduce((count, item) => count + item.quantity, 0),
  cartTotal: state => state.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2),
};

export default {
  state,
  mutations,
  actions,
  getters,
};
