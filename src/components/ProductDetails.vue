<script setup>
import { defineProps, ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { useProductStore } from '../stores/product';
import { useAuthStore } from '../stores/auth'; 

defineProps({
    prod: ({
        type: Object,
        required: true,
    }),
    aveReview: ({
        type: Number,
        required: true
    }),
    revCount: ({
        type: Number,
        required: true
    })
});

const quantity = ref(1);
const productStore = useProductStore();
const user = useAuthStore();

const addToCart = async () => {
    const status = await productStore.addToCart(quantity.value, user.user.id);
    console.log(user.user);
    
    if(status === 200){
        Swal.fire({
            icon: "success",
            title: "Added to cart!",
            showConfirmButton: false,
            timer: 1500
        });
    }else{
        Swal.fire({
            icon: "error",
            title: "May error gagi pre",
            showConfirmButton: true,
        });
    }
    
}


</script>

<template>
    <div class="max-w-[1250px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 rounded-2xl shadow-md">
        
    <!-- Product Image -->
        <div class="border rounded-xl overflow-hidden flex items-center justify-center bg-gray-100">
            <img :src="prod.image" alt="Product Image" class="w-full h-full object-contain max-h-[500px]" />
        </div>

        <!-- Product Details -->
        <div class="flex flex-col justify-between">
            <div>
            <!-- Title -->
            <h1 class="text-3xl font-bold mb-3 text-gray-900">{{ prod.name }}</h1>

            <!-- Rating / Sold -->
            <div class="flex items-center space-x-6 text-gray-600 mb-5">
                <span class="flex items-center space-x-1">
                <span class="font-semibold text-yellow-500" v-if="aveReview">{{ aveReview }}</span>
                <div class="flex text-yellow-400" v-if="aveReview">
                    <svg v-for="i in aveReview" :key="i" xmlns="http://www.w3.org/2000/svg" 
                        class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 
                            3.292a1 1 0 00.95.69h3.462c.969 0 
                            1.371 1.24.588 1.81l-2.8 2.034a1 
                            1 0 00-.364 1.118l1.07 3.292c.3.921-.755 
                            1.688-1.54 1.118l-2.8-2.034a1 1 
                            0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 
                            1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 
                            1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                </div>
                </span>
                <span class="text-sm">{{ revCount }} ratings</span>
                <span class="text-sm">{{ prod.sold }} sold</span>
            </div>

            <!-- Price -->
            <p class="text-4xl font-bold text-blue-600 mb-6">₱{{ prod.price }}</p>

            <!-- Quantity -->
            <div class="mb-6">
                <label for="quantity" class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <input 
                type="number" 
                v-model="quantity" 
                min="1"
                class="w-28 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <!-- Buttons -->
            <div class="flex space-x-4">
                <button 
                class="flex-1 bg-gray-800 text-white py-3 rounded-xl font-medium hover:bg-gray-700 transition"
                @click="addToCart"
                >
                Add to cart
                </button>
                <button 
                class="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-500 transition"
                @click="buyNow"
                >
                Buy now
                </button>
            </div>
            </div>
        </div>
    </div>
</template>