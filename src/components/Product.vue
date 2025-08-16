<script setup>
import { defineProps } from 'vue';

defineProps({
    product: ({
        type: Object,
        required: true,
    })
})
</script>

<template>
    <div class="bg-white rounded shadow hover:shadow-lg transition overflow-hidden">
        <!-- Product Image -->
        <div class="h-40 bg-gray-200 flex items-center justify-center">
            <img 
                :src="product.image"
                alt="Coffee" 
                class="h-full w-full object-cover"
            />
        </div>

        <!-- Product Info -->
        <div class="p-4">
            <h3 class="text-sm font-medium text-gray-800 truncate">
                {{ product.name }}
            </h3>
            <p class="text-lg font-bold text-red-500 mt-1">₱{{ product.price }}</p>

            <!-- Rating and Sold -->
            <div class="flex items-center text-sm text-gray-500 mt-1">
                <!-- Stars -->
                <div class="flex text-yellow-400">
                    <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1
                                1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8
                                2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755
                                1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175
                                0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1
                                1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1
                                1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                </div>
                <span class="ml-2">4.9</span>
                <span class="mx-2">|</span>
                <span>{{ product.sold }} sold</span>
            </div>
        </div>
    </div>
</template>