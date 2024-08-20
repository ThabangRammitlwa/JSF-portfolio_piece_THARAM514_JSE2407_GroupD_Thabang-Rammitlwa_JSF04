import { createStore } from 'vuex';
import { getProducts, getProduct, getCategories } from '../services/api';
import auth from '../modules/auth';
import product from '../modules/product';
import cart from '../modules/cart';
import comparison from '../modules/comparison';
import wishlist from '../modules/wishlist';

export default createStore({
  state: {
    products: [],
    categories: [],
    loading: false,
    error: null,
    activeCategory: 'all',
    activeSort: 'default',
    productDetail: null,
    userId:null,
  },
  modules: {
    auth,
    cart,
    comparison,
    wishlist,
    product
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_ACTIVE_CATEGORY(state, category) {
      state.activeCategory = category;
    },
    SET_ACTIVE_SORT(state, sort) {
      state.activeSort = sort;
    },
    SET_PRODUCT_DETAIL(state, product) {
      state.productDetail = product;
    },
    SET_USER_ID(state, token) {
      const decoded = jwtDecode(token);
      state.userId = decoded.userId;
    },
    CLEAR_USER_ID(state) {
      state.userId = null;
    },

  },
  actions: {
    async fetchProducts({ commit }) {
      commit('SET_LOADING', true);
      try {
        const { data } = await getProducts();
        commit('SET_PRODUCTS', data);
      } catch (error) {
        commit('SET_ERROR', 'Error fetching products');
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async fetchCategories({ commit }) {
      commit('SET_LOADING', true);
      try {
        const { data } = await getCategories();
        commit('SET_CATEGORIES', data);
      } catch (error) {
        commit('SET_ERROR', 'Error fetching categories');
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async fetchProductDetail({ commit }, productId) {
      commit('SET_LOADING', true);
      try {
        const { data } = await getProduct(productId);
        commit('SET_PRODUCT_DETAIL', data);
      } catch (error) {
        commit('SET_ERROR', 'Error fetching product details');
      } finally {
        commit('SET_LOADING', false);
      }
    },
    setActiveCategory({ commit }, category) {
      commit('SET_ACTIVE_CATEGORY', category);
    },
    setActiveSort({ commit }, sort) {
      commit('SET_ACTIVE_SORT', sort);
    },

    setUserId({ commit }, token) {
      commit('SET_USER_ID', token);
    },

    logout({ commit }) {
      localStorage.removeItem('token');
      commit('CLEAR_USER_ID');
      this.$router.push('/');
    },
  },
  getters: {
    filteredAndSortedProducts: (state) => {
      let result = [...state.products];
      if (state.activeCategory && state.activeCategory !== 'all') {
        result = result.filter(product => product.category === state.activeCategory);
      }
      if (state.activeSort === 'lowest') {
        result.sort((a, b) => a.price - b.price);
      } else if (state.activeSort === 'highest') {
        result.sort((a, b) => b.price - a.price);
      }
      return result;
    },
  },
});

