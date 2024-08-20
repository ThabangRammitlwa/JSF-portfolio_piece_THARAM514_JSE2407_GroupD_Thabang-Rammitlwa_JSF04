export default {
  namespaced: true,
  state: {
    comparisonItems: JSON.parse(localStorage.getItem('comparisonItems')) || [],
  },
  getters: {
    comparisonItems: (state) => state.comparisonItems || [],
    comparisonItemCount: (state) => state.comparisonItems.length,
    isInComparison: (state) => (productId) => {
      return state.comparisonItems.some(item => item.id === productId);
    },
  },
  mutations: {
    ADD_TO_COMPARISON(state, { product }) {
      const existingItem = state.comparisonItems.find(p => p.id === product.id);
      if (!existingItem) {
        state.comparisonItems.push({ ...product });
        localStorage.setItem('comparisonItems', JSON.stringify(state.comparisonItems));
      }
    },
    REMOVE_FROM_COMPARISON(state, productId) {
      state.comparisonItems = state.comparisonItems.filter(item => item.id !== productId);
      localStorage.setItem('comparisonItems', JSON.stringify(state.comparisonItems));
    },
    CLEAR_COMPARISON(state) {
      state.comparisonItems = [];
      localStorage.setItem('comparisonItems', JSON.stringify(state.comparisonItems));
    },
  },
  actions: {
    addToComparison({ commit }, product) {
      commit('ADD_TO_COMPARISON', { product });
    },
    removeFromComparison({ commit }, productId) {
      commit('REMOVE_FROM_COMPARISON', productId);
    },
    clearComparison({ commit }) {
      commit('CLEAR_COMPARISON');
    }
  }
};

  