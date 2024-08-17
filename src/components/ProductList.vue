<template>
  <div class="container">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div>
      <FilterSort :categories="categories" @filterSort="applyFilterSort"/>
    </div>
    <div class="product-grid">
      <ProductCard v-for="product in filteredAndSortedProducts" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import ProductCard from '../components/ProductCard.vue';
import FilterSort from '../components/FilterSort.vue';

export default {
  name: 'ProductList',
  components: {
    ProductCard,
    FilterSort
  },
  computed: {
    ...mapState(['loading', 'error', 'categories']),
    ...mapGetters(['filteredAndSortedProducts']),
  },
  methods: {
    ...mapActions(['fetchProducts', 'fetchCategories']),
    
    /**
     * Applies the filter and sort options to the product list.
     * @param {Object} filterSortOptions - The filter and sort options.
     * @param {string} filterSortOptions.category - The selected category to filter by.
     * @param {string} filterSortOptions.sort - The selected sort option.
     */
    applyFilterSort({ category, sort }) {
      this.$store.commit('setActiveCategory', category);
      this.$store.commit('setActiveSort', sort);
    }
  },
  mounted() {
    this.fetchProducts();
    this.fetchCategories();
  }
};
</script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  padding: 20px;
}

select {
  margin: 10px;
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>


<style scoped>
.container{
  background-color: rgb(227, 236, 236);
}


.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  padding: 20px;
}

select {
  margin: 10px;
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}

</style>
