<script setup>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const auth = useAuthStore();
const router = useRouter();
const userOption = ref(false);

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
                <span class="text-gray-600" @click="handleOption">{{ auth.user ? auth.user.user_info.first_name : ''  }}</span>
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
}
h1{
    cursor: pointer;
}
</style>
