import { defineStore } from "pinia";
import {api} from '../lib/axios';
import { useAuthStore } from "./auth";


export const useProductStore = defineStore('product', {
    state: () => ({
        products: [],
        productSelected: {},
        cart : {},
        total: 0,
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
                // this.total = 0;
                // this.cart.forEach(element => {
                //     this.total += parseFloat(element.subtotal);
                // });
                // console.log(this.total);
                console.log(this.cart);
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

        modifyTotal(price, action){
            if(action == 1){
                this.total+= price;
            }else{
                this.total-= price;
            }
        },

        async updateCart(id: number, value: number, newQty: number){
            const req = {
                'id' : id,
                'subtotal' : value,
                'quantity' : newQty
            }
            try{
                const res = await api.post(`/product/cart/update`, req);
                console.log(useAuthStore().user.id);
                // await this.getCart(useAuthStore().user.id);
                return res.status;
            } catch (err) {
                console.log(err);
                return err.status;
            }
        },
    }
})