import { defineStore } from "pinia";
import {api} from '../lib/axios';


export const useProductStore = defineStore('product', {
    state: () => ({
        products: [],
        productSelected: {}
    }),

    actions:{
        async getProducts(){
            try {
                const res = await api.get('/product/all');
                this.products = res.data.data;
            } catch (err) {
                console.log(err);
            }
        },

        async searchProducts(request: string){
            try {
                const res = await api.get('/product/search', { params: {keyword : request} });
                this.products = res.data.data;
                console.log(this.products);
            } catch (err) {
                console.log(err);
            }
        },

        async getProduct(id: number){
            try {
                const res = await api.get(`/product/get-product/${id}`);
                this.productSelected = res.data.data;
            } catch (err) {
                console.log(err);
            }
        }
    }
})