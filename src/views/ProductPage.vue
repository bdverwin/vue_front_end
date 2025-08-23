<script setup>
import { ref, onMounted, watch } from 'vue';
import Product from '../components/Product.vue';
import ProductDetails from '../components/ProductDetails.vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '../stores/product';

const route = useRoute();
const prodStore = useProductStore();
const product = ref({});
const reviewCount = ref(0);
const averageReview = ref(0);
const suggestedProducts = ref(prodStore.products);

const getProduct = async () => {
    try{
        await prodStore.getProduct(route.params.id);
        product.value = prodStore.productSelected;
        await prodStore.getProducts();
        reviewCount.value = product.value.reviews.length;
        suggestedProducts.value = prodStore.products;
        let sum = 0;
        let counter = 0;
        (product.value.reviews).forEach(element => {
            sum += element.rating;
            counter++;
        });
        averageReview.value = sum ? Math.round(sum / counter) : 0;
        console.log(
            "sum = " + sum + " counter = "+ counter + " average = " + averageReview.value
        );
    }
    catch(err){
        console.log(err);
    }
}

watch(()=> route.params.id, (newVal, oldVal) => {
    if(newVal !== oldVal){
        getProduct(route.params.id);
    }
})


onMounted(() => {
    getProduct();
})

const quantity = ref(1);

const reviews = ref([
  { id: 1, content: 'Great product!', user: 'Alice' },
  { id: 2, content: 'Satisfied with my purchase', user: 'Bob' },
  { id: 3, content: 'Will buy again', user: 'Charlie' },
]);


const addToCart = () => {
  console.log('Added to cart', quantity.value);
};

const buyNow = () => {
  console.log('Buying now', quantity.value);
};

const prevPage = () => {
  console.log('Prev page');
};

const nextPage = () => {
  console.log('Next page');
};
</script>


<template>
    <div class="min-h-screen bg-gray-50 px-4 py-8">
<!-- 
        <div class="max-w-[1250px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 rounded-2xl shadow-md">
        
       
            <div class="border rounded-xl overflow-hidden flex items-center justify-center bg-gray-100">
                <img :src="product.image" alt="Product Image" class="w-full h-full object-contain max-h-[500px]" />
            </div>

            <div class="flex flex-col justify-between">
                <div>
              
                <h1 class="text-3xl font-bold mb-3 text-gray-900">{{ product.name }}</h1>

             
                <div class="flex items-center space-x-6 text-gray-600 mb-5">
                    <span class="flex items-center space-x-1">
                    <span class="font-semibold text-yellow-500" v-if="averageReview">{{ averageReview }}</span>
                    <div class="flex text-yellow-400" v-if="averageReview">
                        <svg v-for="i in averageReview" :key="i" xmlns="http://www.w3.org/2000/svg" 
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
                    <span class="text-sm">{{ reviewCount }} ratings</span>
                    <span class="text-sm">{{ product.sold }} sold</span>
                </div>

              
                <p class="text-4xl font-bold text-blue-600 mb-6">₱{{ product.price }}</p>

               
                <div class="mb-6">
                    <label for="quantity" class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                    <input 
                    type="number" 
                    v-model="quantity" 
                    min="1" 
                    class="w-28 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

             
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
        </div> -->
        <ProductDetails :prod = "product" :aveReview="averageReview" :revCount = "reviewCount" />


        <!-- Product Reviews -->
        <div class="max-w-[1250px] mx-auto mt-10">
        <!-- (kept your cool review design untouched) -->
        <h2 class="text-2xl font-semibold mb-6 text-gray-800">Customer Reviews</h2>

        <div v-for="review in product.reviews" 
            :key="review.id" 
            class="bg-white rounded-2xl shadow-md p-5 mb-5 border border-gray-100">

            <!-- User Info + Rating -->
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-3">
                    <!-- Avatar -->
                    <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                    {{ review.user.email.charAt(0).toUpperCase() }}
                    </div>
                    <div>
                    <p class="text-sm font-medium text-gray-800">{{ review.user.email }}</p>
                    <span class="text-xs text-gray-500">Verified Buyer</span>
                    </div>
                </div>

                <!-- Stars -->
                <div class="flex text-yellow-400">
                    <svg v-for="i in review.rating" :key="i" xmlns="http://www.w3.org/2000/svg" 
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
            </div>

            <!-- Comment -->
            <p class="text-gray-700 leading-relaxed">{{ review.comment }}</p>
        </div>
        <h1 v-if="!averageReview">This product has no reviews yet</h1>

        <!-- Pagination -->
        <div class="flex justify-center mt-6 space-x-2">
            <button class="px-4 py-2 text-sm border rounded-lg bg-white hover:bg-gray-50 shadow-sm">
            Prev
            </button>
            <button class="px-4 py-2 text-sm border rounded-lg bg-white hover:bg-gray-50 shadow-sm">
            Next
            </button>
        </div>
        </div>

        <!-- You May Also Like -->
        <div class="max-w-[1250px] mx-auto mt-12">
        <h2 class="text-xl font-semibold mb-5 text-gray-800">You May Also Like</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            <Product v-for="item in suggestedProducts" :key="item.id" :product="item" />
        </div>
        </div>
    </div>
</template>



