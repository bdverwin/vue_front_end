<script setup lang="ts">
import Header from './components/Header.vue';
import { useAuthStore } from './stores/auth';

const auth = useAuthStore();
</script>

<template>
        <!-- <nav>
            <router-link to="/">Login</router-link> |
            <router-link to="/register">Register</router-link>
        </nav> -->
        <Header v-if="auth.user" />
        <router-view />
</template>
