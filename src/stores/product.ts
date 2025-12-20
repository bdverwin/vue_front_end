import { defineStore } from "pinia";
import {api} from '../lib/axios';
import { useAuthStore } from "./auth";


export const useProductStore = defineStore('product', {
    state: () => ({
        products: [],
        productSelected: {},
        cart : {},
        total: 0,
        selected: {}
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

        modifyTotal(price, action, item) {
            if (action === 1) {
                // Add / update item
                if (this.selected.hasOwnProperty(item.id)) {
                    const oldSubtotal = this.selected[item.id].subtotal;
                    const newSubtotal = item.subtotal;

                    if (oldSubtotal !== newSubtotal) {
                        const diff = newSubtotal - oldSubtotal;
                        this.total = Math.round((this.total + diff) * 100) / 100;
                    }

                    this.selected[item.id].subtotal = newSubtotal;
                } else {
                    this.total = Math.round((this.total + price) * 100) / 100;
                    this.selected[item.id] = item;
                }
            } else {
                // Remove item
                this.total = Math.round((this.total - price) * 100) / 100;

                // Delete item from selected
                if (this.selected.hasOwnProperty(item.id)) {
                    delete this.selected[item.id];
                    console.log(this.selected);
                }
            }
        },

        async updateCart(id: number, value: number, newQty: number, checked: boolean){
            const req = {
                'id' : id,
                'subtotal' : value,
                'quantity' : newQty
            }
            try{
                if(checked){
                    this.modifyTotal(newQty, 1, req);
                }
                const res = await api.post(`/product/cart/update`, req);
                return res.status;
            } catch (err) {
                console.log(err);
                return err.status;
            }
        },

        async removeCart(id: number){
            try {
                const res = await api.delete(`/product/cart/delete/${id}`);
                console.log();
            } catch (error) {
                console.log();
            }
        },
    }
});