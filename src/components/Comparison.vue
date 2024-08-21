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
:root {
  --card-background: #ffffff;
  --text-color: #000000;
  --icon-color: #666666;
  --table-header-background: #f1f1f1;
  --table-border-color: #ddd;
  --button-background: #dc3545;
  --button-hover-background: #c82333;
}

body.dark-mode {
  --card-background: #1e1e1e;
  --text-color: #ffffff;
  --icon-color: #aaaaaa;
  --table-header-background: #2e2e2e;
  --table-border-color: #444;
  --button-background: #e74c3c;
  --button-hover-background: #c82333;
}

.comparison {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--card-background);
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.5rem; /* Adjusted font size */
  text-align: center;
  color: var(--text-color);
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
  border: 1px solid var(--table-border-color);
  background-color: var(--card-background);
}

.comparison-table th {
  background-color: var(--table-header-background);
  font-weight: bold;
  color: var(--text-color);
}

.comparison-table img {
  max-width: 100px;
  height: auto;
  border-radius: 4px;
}

.comparison-table p {
  font-size: 0.9rem;
  color: var(--text-color);
}

.clear-comparison {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  background-color: var(--button-background);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: center;
}

.clear-comparison:hover {
  background-color: var(--button-hover-background);
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



  