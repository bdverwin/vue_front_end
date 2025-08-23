<script setup>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useProductStore } from '../stores/product';

const auth = useAuthStore();
const router = useRouter();
const userOption = ref(false);
const cartCount = ref(0);
const product = useProductStore();

async function refresh(){
    await auth.getUser();
}

refresh();

const handleProfile = () => {
    userOption.value = false;
    router.push('/profile');
}

const handleLogout = async () => {
    await auth.logout();
    userOption.value = false;
    router.push('/login');
}

const handleOption = (event) => {
     event.stopPropagation();
    userOption.value ? userOption.value = false : userOption.value = true;
}

const handleLogo = () => {
    userOption.value = false;
    router.push('/');
}

// Close dropdown when clicking anywhere
const handleClickOutside = () => {
  userOption.value = false;
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
    <!-- Navbar -->
    <header class="bg-white">
        <div class="max-w-[1250px] h-[50px] mx-auto px-4 flex justify-between items-center">
            <h1 class="text-xl font-bold" @click="handleLogo">RoastLab</h1>
            <div class="flex items-center justify-center user relative" v-if="auth.user">
                <!-- User name -->
                <span class="text-gray-600 mr-4" @click="handleOption">
                    {{ auth.user ? auth.user.user_info.first_name : ''  }}
                </span>

                <!-- 🛒 Cart -->
                <div class="relative cursor-pointer mr-4" @click="handleCart" v-if="!auth.user.is_admin">
                    <!-- Heroicon Cart -->
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
                        stroke="currentColor" class="w-6 h-6 text-gray-700 hover:text-black">
                        <path stroke-linecap="round" stroke-linejoin="round" 
                            d="M2.25 2.25h1.5l1.5 12.75h13.5l1.5-9H6.75M9 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm10.5 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>

                    <!-- Badge (optional: cart count) -->
                    <span 
                        v-if="product.cart.length > 0" 
                        class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
                        {{ product.cart.length }}
                    </span>
                </div>

                <!-- Dropdown -->
                <div class="absolute user-option bg-white shadow" v-if="userOption">
                    <ul>
                        <li class="py-2 px-5 hover:bg-gray-100" @click="handleProfile">Profile</li>
                        <li class="py-2 px-5 hover:bg-gray-100" @click="handleLogout">Logout</li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
</template>


<style>
div.user{
    cursor:pointer;
    height:100%;
}
div.user-option{
    left:-37px;
    bottom:-80px;
    z-index: 99;
}
h1{
    cursor: pointer;
}
</style>
