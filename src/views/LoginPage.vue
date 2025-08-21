<script lang="ts" setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useAuthStore } from '../stores/auth';

    const email = ref('');
    const errors = ref('');
    const password = ref('');
    const router = useRouter();
    const auth = useAuthStore();

    const handleLogin = async () => {

        const resp = await auth.login({ email: email.value, password: password.value });
        console.log(resp);
        if(resp.status == 200){
            auth.user.is_admin ? router.push('/dashboard') : router.push('/home');
        }else if(resp.status == 422){
            errors.value = resp.response.data;
        }
        else{
            errors.value = resp.response.data.errors;
        }

    };
</script>

<template>
    <div class="flex min-h-screen bg-gray-100">
    <!-- Login Panel -->
    <div class="w-full max-w-md m-auto bg-white rounded shadow-md p-8">
        <h2 class="text-2xl font-bold text-center mb-6">LOGIN</h2>

        <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
            <label class="block text-gray-700 mb-1" for="email">Email</label>
            <input
            type="email"
            id="email"
            v-model="email"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <p v-if="errors.email" class="text-sm text-red-500 mt-1">
                {{ errors.email[0] }}
            </p>
        </div>

        <div>
            <label class="block text-gray-700 mb-1" for="password">Password</label>
            <input
            type="password"
            id="password"
            v-model="password"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <p v-if="errors.password" class="text-sm text-red-500 mt-1">
                {{ errors.password[0] }}
            </p>
            <p v-if="errors.message" class="text-sm text-red-500 mt-1">
                {{ errors.message }}
            </p>
        </div>

        <button
            type="submit"
            class="w-full bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
            Login
        </button>
        </form>

        <p class="text-center text-gray-600 mt-4">
        Don’t have an account?
        <router-link to="/register" class="text-blue-500 hover:underline text-gray-800">Register</router-link>
        </p>
    </div>
    </div>
</template>

<style>
button{
    cursor: pointer;
}
</style>
  
  
  