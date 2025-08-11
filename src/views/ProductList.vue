<script>
export default {
  name: "ProductList",
};
</script>

<template>
    <div class="min-h-screen bg-gray-50">
    <!-- Search Bar -->
    <div class="max-w-[1250px] mx-auto px-4 py-6">
        <div class="flex">
        <input
            type="text"
            placeholder="Search products..."
            class="flex-1 border rounded-l px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button class="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600 transition">
            Search
        </button>
        </div>
    </div>

    <!-- Product Grid -->
    <div class="max-w-[1250px] mx-auto px-4 pb-10">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        <div
            v-for="n in 12"
            :key="n"
            class="bg-white rounded shadow hover:shadow-lg transition overflow-hidden"
        >
            <!-- Product Image -->
            <div class="h-40 bg-gray-200 flex items-center justify-center">
            <span class="text-gray-400">Image</span>
            </div>

            <!-- Product Info -->
            <div class="p-4">
            <h3 class="text-sm font-medium text-gray-800 truncate">
                Sample Product Name That Might Be Long
            </h3>
            <p class="text-lg font-bold text-red-500 mt-1">₱1,299</p>

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
                <span>1.2k sold</span>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
</template>


<!-- <div class="max-w-7xl mx-auto p-4">
   
    <header class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">WebsiteName</h1>
        <div class="flex items-center gap-2">
            <span class="font-medium">username</span>
            <button class="text-gray-500 hover:text-red-500">✖</button>
        </div>
    </header>

 
    <div class="mb-8">
        <div class="relative max-w-lg mx-auto">
            <input 
                type="text" 
                placeholder="Search products..." 
                class="w-full border border-gray-300 rounded-full py-2 pl-10 pr-4 shadow-sm focus:outline-none focus:border-blue-500"
            >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
            </svg>
        </div>
    </div>


    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
  
        <div class="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
            <div class="overflow-hidden">
                <img src="https://via.placeholder.com/200" 
                     class="w-full h-48 object-cover transition-transform duration-300 hover:scale-105" 
                     alt="Product Image">
            </div>
            <div class="p-3 flex flex-col justify-between h-36">
                <h3 class="text-sm font-medium leading-tight line-clamp-2">This is a sample product title that is long enough to test ellipsis</h3>
                <div class="mt-1 text-red-500 font-bold">₱1,299</div>
                <div class="flex items-center text-sm text-gray-500">
                    ⭐ 4.8 | Sold 1.2k
                </div>
            </div>
        </div>

    </div>


    <div class="flex justify-center mt-8">
        <nav class="inline-flex -space-x-px">
            <a href="#" class="px-3 py-1 border border-gray-300 bg-white text-gray-500 hover:bg-gray-100">Prev</a>
            <a href="#" class="px-3 py-1 border border-gray-300 bg-blue-500 text-white">1</a>
            <a href="#" class="px-3 py-1 border border-gray-300 bg-white hover:bg-gray-100">2</a>
            <a href="#" class="px-3 py-1 border border-gray-300 bg-white hover:bg-gray-100">3</a>
            <a href="#" class="px-3 py-1 border border-gray-300 bg-white text-gray-500 hover:bg-gray-100">Next</a>
        </nav>
    </div>
</div> -->