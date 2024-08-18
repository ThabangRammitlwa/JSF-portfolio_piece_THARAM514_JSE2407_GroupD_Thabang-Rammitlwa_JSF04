import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../components/ProductList.vue';
import ProductCard from '../components/ProductCard.vue';
import ProductDetails from '../components/ProductDetail.vue';
import Login from '../components/Login.vue';
import cart from '../modules/cart';
import Comparison from '../components/Comparison.vue'


const routes = [
    { path: '/', component: ProductList },
    { path: '/products', component:ProductCard},
    { path: '/product/:id', component: ProductDetails, props: true },
    { path: '/login', component: Login },
    {path: '/cart',component: cart,beforeEnter: (to, from, next) => {
          if (isLoggedIn()) {
            next();
          } else {
            next('/login'); 
          }
        }
    },
    {
        path: '/comparison',
        name: 'Comparison',
        component: Comparison,
        meta: { requiresAuth: true },
    },
    
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;