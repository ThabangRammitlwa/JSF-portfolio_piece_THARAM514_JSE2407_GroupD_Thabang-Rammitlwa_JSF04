// product.js
import { getRandomFutureDate } from '../utils/dateHelpers';

export default {
  namespaced: true,
  state: {
    products: [],
    discountedProducts: [],
    productDetail: null,
    loading: false,
    error: null,
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_DISCOUNTED_PRODUCTS(state, products) {
      state.discountedProducts = products;
    },
    SET_PRODUCT_DETAIL(state, product) {
      state.productDetail = product;
    },
    SET_LOADING(state, isLoading) {
      state.loading = isLoading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchDiscountedProducts({ commit, dispatch }) {
      commit('SET_LOADING', true);
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const products = await response.json();
        commit('SET_PRODUCTS', products);
        dispatch('selectDiscountedProducts');
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    selectDiscountedProducts({ state, commit }) {
      const allProducts = [...state.products];
      const discountedProducts = [];
      
      for (let i = 0; i < 5 && allProducts.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * allProducts.length);
        const product = allProducts.splice(randomIndex, 1)[0];
        
        const discountPercentage = Math.floor(Math.random() * 50) + 10; // 10% to 60% discount
        const discountedPrice = product.price * (1 - discountPercentage / 100);
        const saleEndDate = getRandomFutureDate();
        
        discountedProducts.push({
          ...product,
          discountPercentage,
          discountedPrice,
          saleEndDate,
        });
      }
      
      commit('SET_DISCOUNTED_PRODUCTS', discountedProducts);
    },
  },
  getters: {},
};

