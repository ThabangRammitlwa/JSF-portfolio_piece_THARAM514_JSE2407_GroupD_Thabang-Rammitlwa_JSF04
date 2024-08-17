import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../components/ProductList.vue';
import ProductDetails from '../components/ProductDetail.vue'

const routes = [
  { path: '/', component: ProductList },
  { path: '/product/:id', component: ProductDetails, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
