import { defineStore } from "pinia";
import {api} from '../lib/axios';
import { useAuthStore } from "./auth";


export const useProductStore = defineStore('product', {
    state: () => ({
        products: [],
        productSelected: {},
        cart : {},
    }),

    actions:{
        async getProducts(){
            try {
                const res = await api.get('/product/all');
                this.products = res.data.data;
                await this.getCart(useAuthStore().user.id);
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
        },

        async getCart(userId: number){
            try{
                const res = await api.get(`/product/cart/${userId}`);
                this.cart = res.data.data;
            } catch (err) {
                console.log(err);
            }
        },

        async addToCart(qty: number, userId: number){
            const req = {
                "user_id" : userId,
                "product_id" : this.productSelected.id,
                "quantity" : qty,
                "price" : parseFloat(this.productSelected.price),
                "subtotal" : this.productSelected.price * qty,
            };
            try{
                const res = await api.post(`/product/cart/add`, req);
                this.getCart(userId);
                return res.status;
            } catch (err) {
                console.log(err);
                return err.status;
            }
        },
    }
})