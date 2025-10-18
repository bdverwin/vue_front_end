<script setup>
import { defineProps, ref } from 'vue';
import { useProductStore } from '../stores/product';

const props = defineProps({
    prod: {
        type:Object,
        required:true,
    },
    refresh: {
        type:Function,
        required:true,
    }
});

const prodStore = useProductStore();
const quantity = ref(props.prod.quantity);

function debounce(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

function updateCartQuantity(newQty) {
    let toMerge = newQty * props.prod.price;

    // if no actual change in subtotal, stop
    if (toMerge === props.prod.subtotal) {
        return;
    }
    prodStore.updateCart(props.prod.id, toMerge, newQty);
    props.refresh();
    
}

const debouncedUpdate = debounce(updateCartQuantity, 500);

const handleQtyChange = (e) => {
    debouncedUpdate(e.target.value);
}

</script>

<template>
    <div class="bg-white rounded shadow hover:shadow-lg transition overflow-hidden p-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center max-h-[590px] mt-3">
        <!-- Left Section (Image + Name) -->
        <div class="flex items-center gap-3">
            <input type="checkbox" class="h-4 w-4" />

            <div class="w-20 h-20 flex items-center justify-center border rounded-xl overflow-hidden bg-gray-100">
                <img 
                    src="https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Product Image" 
                    class="w-full h-full object-contain" 
                />
            </div>

            <h3 class="text-sm md:text-base font-medium text-gray-800 truncate">
                {{ prod.products.name }}
            </h3>
        </div>

        <!-- Right Section (Price, Quantity, Total, Actions) -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 items-center justify-items-center md:justify-end text-sm">
            
            <!-- Unit Price -->
            <div class="font-medium text-gray-700">
                ₱{{ prod.price }}
            </div>

            <!-- Quantity -->
            <div>
                <input 
                    type="number" 
                    v-model="quantity" 
                    min="1"
                    class="w-20 border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                    @input="handleQtyChange"
                />
            </div>

            <!-- Total Price -->
            <div class="font-semibold text-gray-800">
                ₱{{prod.subtotal}}
            </div>

            <!-- Delete -->
            <div>
                <button 
                    class="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                >
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>