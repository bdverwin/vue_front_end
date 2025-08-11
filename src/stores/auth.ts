import { defineStore } from 'pinia';
import {api} from '../lib/axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as null,
        isAuthenticated: false,
    }),

    actions: {
        async getUser() {
            try {
                const res = await api.get('/auth/getUser');
                this.user = res.data.user;
                this.isAuthenticated = true;
            } catch (err) {
                this.user = null;
                this.isAuthenticated = false;
            }
        },

        async login(credentials: { email: string; password: string }) {
            try {
                const res = await api.post('/auth/login', credentials);
        
                const token = res.data.data.token;
                localStorage.setItem('auth_token', token);
                await this.getUser(); // now sends token in Authorization header
                return res;
            } catch (err) {
                this.user = null;
                this.isAuthenticated = false;
                return err;
            }
        },

        async register(data: Record<string, any>) {
            try {
                const res = await api.post('/auth/register', data);

                const token = res.data.data.token;
                localStorage.setItem('auth_token', token);
                await this.getUser();
                return res;
            } catch (error) {
                console.log(error);
                return error;
            }
            
            // await this.getUser();
        },

        async update(data: Record<string, any>){
            try {
                const res = await api.post('/auth/update_user', data);

                await this.getUser();
                console.log(res.data);
                return res;
            } catch (error) {
                return error;
            }
        },

        async logout() {
            localStorage.removeItem('auth_token');
            this.user = null;
            this.isAuthenticated = false;
        },
    },
});
