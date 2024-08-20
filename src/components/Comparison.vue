<template>
  <div class="comparison">
    <h1>Product Comparison</h1>
    <div v-if="comparisonItems.length === 0">Your comparison list is empty</div>
    <div v-else>
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Product</th>
            <th v-for="item in comparisonItems" :key="item.id">
              <h2>{{ item.title }}</h2>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Image</td>
            <td v-for="item in comparisonItems" :key="item.id">
              <img :src="item.image" :alt="item.title" />
            </td>
          </tr>
          <tr>
            <td>Description</td>
            <td v-for="item in comparisonItems" :key="item.id">
              <p>{{ item.description }}</p>
            </td>
          </tr>
          <tr>
            <td>Price</td>
            <td v-for="item in comparisonItems" :key="item.id">
              <p>${{ item.price }}</p>
            </td>
          </tr>
          <tr>
            <td>Rating</td>
            <td v-for="item in comparisonItems" :key="item.id">
              <p>{{ item.rating.rate }} / 5 ({{ item.rating.count }} reviews)</p>
            </td>
          </tr>
          <tr>
            <td>Actions</td>
            <td v-for="item in comparisonItems" :key="item.id">
              <button @click="removeFromComparison(item.id)">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button class="clear-comparison" @click="clearComparison">Clear Comparison</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('comparison', ['comparisonItems']),
  },
  methods: {
    ...mapActions('comparison', ['removeFromComparison', 'clearComparison']),
  },
};
</script>

<style scoped>
.comparison {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1rem;
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.comparison-table th,
.comparison-table td {
  text-align: center;
  padding: 15px;
  border: 1px solid #ddd;
  background-color: #fff;
}

.comparison-table th {
  background-color: #f1f1f1;
  font-weight: bold;
  color: #333;
}

.comparison-table img {
  max-width: 100px;
  height: auto;
  border-radius: 4px;
}

.comparison-table p {
  font-size: 0.9rem;
  color: #555;
}

.clear-comparison {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: center;
}

.clear-comparison:hover {
  background-color: #c82333;
}

/* Responsive Design */
@media (max-width: 768px) {
  .comparison-table th,
  .comparison-table td {
    padding: 10px;
  }

  .comparison-table img {
    max-width: 80px;
  }

  .comparison-table p {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .comparison-table {
    font-size: 0.8rem;
  }

  .comparison-table img {
    max-width: 60px;
  }
}
</style>


  