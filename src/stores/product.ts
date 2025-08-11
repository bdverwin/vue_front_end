import { defineStore } from "pinia";
import {api} from '../lib/axios';


export const useProductStore = defineStore('product', {
    state: () => ({
        products: []
    }),

    actions:{
        async getProducts(){
            try {
                const res = await api.get('/product/all');
                console.log(res.data);
                this.products = res.data;
            } catch (err) {
                console.log(err);
            }
            console.log('test');
        }
    }
})