
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import Dashboard from '../views/Dashboard.vue';
import { useAuthStore } from '../stores/auth';
import ProductList from '../views/ProductList.vue';
import Home from '../views/Home.vue';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: LoginPage,
        meta: { guestOnly: true }
    },
    { 
        path: '/register',
        name: 'Register',
        component: RegisterPage,
        meta: { guestOnly: true }
    },
    { 
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }, // 🔒 Protect this route
    },
    { 
        path: '/profile',
        name: 'Profile',
        component: RegisterPage,
        meta: { requiresAuth: true }, // 🔒 Protect this route
    },
    { 
        path: '/product',
        name: 'Product',
        component: ProductList,
        meta: { requiresAuth: true }, // 🔒 Protect this route
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true }, // 🔒 Protect this route
    },
    { 
        path: '/',
        redirect: '/dashboard'
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, _, next) => {
    const auth = useAuthStore();
  
    // Try to get user if not already fetched
    if (auth.user === null) {
      await auth.getUser();
    }

    if (to.meta.requiresAuth && !auth.user) {
      return next('/login'); // Redirect to login if not authenticated
    } else if(to.meta.guestOnly && auth.isAuthenticated){
        return next('/dashboard');
    }else{
        next();
    }
  });

export default router;
