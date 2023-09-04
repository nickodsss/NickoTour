import { defineStore } from 'pinia'
import axios from "axios"
const baseUrl = `http://localhost:3000`
import Swal from 'sweetalert2'

export const useCartStore = defineStore('cart', {
    state: () => ({
        carts: [],
        totalCart: 0
    }),
    actions: {
        async handleListCart() {
            try {
                const { data } = await axios({
                    method: 'GET',
                    url: `${baseUrl}/cart`,
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    },
                })
                this.carts = data
                this.totalCart = data.length
            } catch (err) {
                console.log(err)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${err.response.data.message}`,
                });
            }
        },
        async handleAddCart(id) {
            try {
                const { data } = await axios({
                    method: 'POST',
                    url: `${baseUrl}/cart/${id}`,
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    },
                })
                Swal.fire({
                    icon: "success",
                    title: "SUCCESS",
                    text: `Success add to my cart`,
                });
                this.handleListCart()
            } catch (err) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${err.response.data.message}`,
                });
            }
        },
        async handleDeleteCart(id) {
            try {
                const { data } = await axios({
                    method: 'DELETE',
                    url: `${baseUrl}/cart/${id}`,
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    },
                })
                Swal.fire({
                    icon: "success",
                    title: "SUCCESS",
                    text: `Success delete item`,
                });
                this.handleListCart()
            } catch (err) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${err.response.data.message}`,
                });
            }
        },
        async handleEditCart(id, totalPerson) {
            try {
                const { data } = await axios({
                    method: 'PATCH',
                    url: `${baseUrl}/cart/${id}`,
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    },
                    data: {
                        totalPerson
                    }
                })
                Swal.fire({
                    icon: "success",
                    title: "SUCCESS",
                    text: `Success edit total person`,
                });
                this.handleListCart()
            } catch (err) {
                console.log(err)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${err.response.data.message}`,
                });
            }
        }
    }
})