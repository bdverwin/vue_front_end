<script setup lang="ts">
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
    await auth.logout();
    router.push('/login');
};
</script>
<template>
    <div class="flex min-h-screen bg-gray-100">
      <!-- Sidebar -->
      <aside class="w-64 bg-white shadow-md p-6">
        <h2 class="text-2xl font-bold mb-8">MyApp</h2>
        <nav class="space-y-4">
          <router-link
            to="/dashboard"
            class="block px-4 py-2 rounded hover:bg-blue-100 text-gray-700"
          >
            Dashboard
          </router-link>
          <router-link
            to="/profile"
            class="block px-4 py-2 rounded hover:bg-blue-100 text-gray-700"
          >
            Profile
          </router-link>
          <router-link
            to="/settings"
            class="block px-4 py-2 rounded hover:bg-blue-100 text-gray-700"
          >
            Settings
          </router-link>
        </nav>
      </aside>
  
      <!-- Main Content -->
      <div class="flex-1 p-6">
        <header class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold">Dashboard</h1>
          <button
            @click="handleLogout"
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </header>
  
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-white p-4 rounded shadow">
            <h2 class="text-lg font-semibold">Users</h2>
            <p class="mt-2 text-gray-600">1,230 active users</p>
          </div>
          <div class="bg-white p-4 rounded shadow">
            <h2 class="text-lg font-semibold">Revenue</h2>
            <p class="mt-2 text-gray-600">$25,000 this month</p>
          </div>
          <div class="bg-white p-4 rounded shadow">
            <h2 class="text-lg font-semibold">Tasks</h2>
            <p class="mt-2 text-gray-600">34 tasks pending</p>
          </div>
        </section>
      </div>
    </div>
  </template>