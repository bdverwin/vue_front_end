<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const auth = useAuthStore();
const errors = ref('');
const hasUser = auth.user ? true : false;
const userInfo = hasUser ? auth.user.user_info : '';

const form = reactive(hasUser ?
{
    first_name: userInfo.first_name,
    last_name: userInfo.last_name,
    email: auth.user.email,
    gender: userInfo.gender,
    birth_date: userInfo.birth_date,
    address: userInfo.address,
    password: '',
    password_confirmation: '',
    contact_num: userInfo.contact_num,
}
:
{
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    birth_date: '',
    address: '',
    password: '',
    password_confirmation: '',
    contact_num: '',
}

);

const handleRegister = async () => {

    console.log('Registering with data:', form);
    const test = await auth.register(form);

    if(test.status == 200){
        router.push('/dashboard');
    }else{
        console.log(test.response.data.errors);
        errors.value = test.response.data.errors;
    }
    
};

const handleUpdate = async () => {
    console.log('Updating with data: ', form);
    const response = await auth.update(form);

    if(response.status === 200){
        window.alert(response.data.message);
    }else{
        console.log(response.response.data.errors);
        errors.value = response.response.data.errors;
    }
}
</script>

<template>
    <div class="flex min-h-screen bg-gray-100">
        <!-- Registration Panel -->
        <div class="w-full max-w-lg m-auto bg-white rounded shadow-md p-8">
            <h2 class="text-2xl font-bold text-center mb-6">{{ !hasUser ? 'Create an Account' : 'Profile Details' }}</h2>
    
            <form @submit.prevent="!hasUser ? handleRegister() : handleUpdate()" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-gray-700 mb-1" for="firstName">First Name</label>
                    <input
                        id="firstName"
                        v-model="form.first_name"
                        type="text"
                        required
                        class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <p v-if="errors.first_name" class="text-sm text-red-500 mt-1">
                        {{ errors.first_name[0] }}
                    </p>
                </div>
    
                <div>
                    <label class="block text-gray-700 mb-1" for="lastName">Last Name</label>
                    <input
                        id="lastName"
                        v-model="form.last_name"
                        type="text"
                        required
                        class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <p v-if="errors.last_name" class="text-sm text-red-500 mt-1">
                        {{ errors.last_name[0] }}
                    </p>
                </div>
            </div>
    
            <div>
                <label class="block text-gray-700 mb-1" for="email">Email</label>
                <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <p v-if="errors.email" class="text-sm text-red-500 mt-1">
                    {{ errors.email[0] }}
                </p>
            </div>
    
            <div>
                <label class="block text-gray-700 mb-1" for="gender">Gender</label>
                <select
                id="gender"
                v-model="form.gender"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                <option value="" disabled>Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                </select>
                <p v-if="errors.gender" class="text-sm text-red-500 mt-1">
                    {{ errors.gender[0] }}
                </p>
            </div>

            <div>
                <label class="block text-gray-700 mb-1" for="address">Birth date</label>
                <input
                id="birthdate"
                v-model="form.birth_date"
                type="date"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <p v-if="errors.birth_date" class="text-sm text-red-500 mt-1">
                    {{ errors.birth_date[0] }}
                </p>
            </div>
    
            <div>
                <label class="block text-gray-700 mb-1" for="address">Address</label>
                <input
                id="address"
                v-model="form.address"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <p v-if="errors.address" class="text-sm text-red-500 mt-1">
                    {{ errors.address[0] }}
                </p>
            </div>

            <div>
                <label class="block text-gray-700 mb-1" for="address">Contact Number</label>
                <input
                id="address"
                v-model="form.contact_num"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                @input="form.contact_num = form.contact_num.replace(/[^0-9]/g, '')"
                />
                <p v-if="errors.contact_num" class="text-sm text-red-500 mt-1">
                    {{ errors.contact_num[0] }}
                </p>
            </div>
    
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4" v-if="!hasUser">
                <div>
                    <label class="block text-gray-700 mb-1" for="password">Password</label>
                    <input
                        id="password"
                        v-model="form.password"
                        type="password"
                        required
                        class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <p v-if="errors.password" class="text-sm text-red-500 mt-1">
                        {{ errors.password[0] }}
                    </p>
                </div>
    
                <div>
                    <label class="block text-gray-700 mb-1" for="confirmPassword">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        v-model="form.password_confirmation"
                        type="password"
                        required
                        class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                </div>
                
            </div>
    
            <button
                type="submit"
                class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition block"
            >
                {{ !hasUser ? 'Register' : 'Update' }}
            </button>
            </form>
    
            <p class="text-center text-gray-600 mt-4" v-if="!hasUser">
            Already have an account?
            <router-link to="/" class="text-blue-500 hover:underline">Login</router-link>
            </p>

            <div class="flex p-2">
                <router-link 
                    to="/" 
                    class="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 transition-colors px-4 py-1 rounded-lg shadow text-gray-700 font-medium mx-auto"
                >
                    <span class="text-lg">←</span>
                    Go Back
                </router-link>
            </div>

        </div>
    </div>
</template>
  
  