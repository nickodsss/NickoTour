import { defineStore } from 'pinia'
import axios from "axios"
const baseUrl = `http://localhost:3000`
import Swal from 'sweetalert2'

export const useTourStore = defineStore('tour', {
    state: () => ({
        isLogin: localStorage.getItem('access_token') ? true : false,
        articles: {
            data: [],
            pagination: {
                totalPage: 0,
                perPage: 3,
            },
        },
        articleById: [],
        currency: [],
        isNotFound: false
    }),
    actions: {
        async handleFetchTours(page, title) {
            try {
                const { data } = await axios({
                    method: 'GET',
                    url: `${baseUrl}/tours`,
                    params: {
                        perPage: 9,
                        page,
                        title
                    },
                })
                this.articles = data
            } catch (err) {
                console.log(err)
                this.isNotFound = true
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${err.response.data.message}`,
                });
            }
        },
        async handlePagination(page) {
            this.handleFetchTours(page, {});
        },
        handleChangePage(page) {
            this.router.push(page)
        },
        async handleFilter(title) {
            await this.handleFetchTours(1, title);
        },
        async handleFetchTourId(id) {
            try {
                const { data } = await axios({
                    method: 'GET',
                    url: `${baseUrl}/tours/${id}`,
                })
                this.articleById = data
            } catch (err) {
                console.log(err)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${err.response.data.message}`,
                });
            }
        },

        async handleCurrency() {
            try {
                const { data } = await axios({
                    method: 'GET',
                    url: `${baseUrl}/currency`
                })
                this.currency = data
            } catch (err) {
                console.log(err)
            }
        }
    }
})