<script setup>
import { onMounted, ref } from 'vue';
import { useProductStore } from '../stores/product';
import { useAuthStore } from '../stores/auth';
import Cart from '../components/Cart.vue';

const productStore = useProductStore();
const userStore = useAuthStore();
const cart = ref({});

const getCart = async () => {
    await productStore.getCart(userStore.user.id);
    cart.value = productStore.cart;
    console.log(cart.value);
}

onMounted(()=>{
    getCart();
})
</script>


<template>
    <div class="min-h-screen bg-gray-50">
        <div class="max-w-[1250px] mx-auto p-4 relative">
            <div>
                <Cart v-for="item in cart" :prod="item" :refresh="getCart" />
            </div>
            <div class="total-class-container">
                <div class="total-class bg-white w-[1215px] m-w-[1250px] rounded shadow hover:shadow-lg transition overflow-hidden p-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center max-h-[590px] mt-3">
                    test
                </div>
            </div>
        </div>
    </div>
</template>

<style>
/* div.test, div.alright{
    outline:1px dotted red;
} */

.total-class{
    bottom:0px;
}
.total-class-container{
    position:fixed;
    bottom:0px;
    left:0px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>