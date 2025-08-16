<script setup>
import Product from '../components/Product.vue';
import { useProductStore } from '../stores/product';
import { ref, onMounted } from 'vue';

const products = ref([]);
const prod = useProductStore();
const searchKey = ref('');

const getProducts = async () => {
    await prod.getProducts();
    products.value = prod.products;
}

const searchProducts = async () => {
    await prod.searchProducts(searchKey.value);
    products.value = prod.products;
}

onMounted(()=>{
    getProducts();
})
</script>

<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Search Bar -->
        <div class="px-4 py-6">
            <div class="relative max-w-lg mx-auto flex">
                <!-- Input -->
                <div class="relative flex-1">
                <input 
                    v-model="searchKey"
                    type="text" 
                    placeholder="Search products..." 
                    class="w-full border border-gray-300 rounded-l-full py-2 pl-10 pr-4 shadow-sm focus:outline-none focus:border-blue-500"
                >
                <!-- Search Icon inside input -->
                <svg xmlns="http://www.w3.org/2000/svg" 
                    class="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
                </svg>
                </div>

                <!-- Button -->
                <button 
                    @click="searchProducts"
                    class="bg-gray-800 text-white px-5 rounded-r-full hover:bg-gray-700 transition"
                    >
                    Search
                </button>
            </div>
        </div>
    
        <!-- Product Grid -->
        <div class="max-w-[1250px] mx-auto px-4 pb-10">
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                <Product v-for="item in products" :key="item.id" :product="item" />
            </div>
        </div>
    </div>
</template>