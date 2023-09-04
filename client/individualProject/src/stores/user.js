import { defineStore } from 'pinia'
import axios from "axios"
const baseUrl = `http://localhost:3000`
import Swal from 'sweetalert2'

export const useUserStore = defineStore('user', {
    state: () => ({
        isLogin: localStorage.getItem('access_token') ? true : false,
        isSubscribe: false
    }),
    actions: {
        async handleLogin(email, password) {
            try {
                const { data } = await axios({
                    method: 'POST',
                    url: `${baseUrl}/login`,
                    data: {
                        email,
                        password
                    }
                })
                console.log(data)
                localStorage.setItem("access_token", data.access_token)
                localStorage.setItem("username", data.username)
                Swal.fire({
                    icon: "success",
                    title: "SUCCESS",
                    text: `Success to login`,
                });
                this.isLogin = true
                this.router.push('/')
            } catch (err) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${err.response.data.message}`,
                });
            }
        },
        async handleGoogleSignIn(response) {
            try {
                const { data } = await axios({
                    method: "POST",
                    url: `${baseUrl}/auth/google-sign-in`,
                    headers: {
                        google_token: response.credential,
                    },
                });
                console.log(data)
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("username", data.username)
                Swal.fire({
                    icon: "success",
                    title: "SUCCESS",
                    text: `Success to login through Google Sign-In`,
                });
                this.isLogin = true
                this.router.push('/')
            } catch (err) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${err.response.data.message}`,
                });
            }
        },
        async handleRegister(username, email, password) {
            try {
                const { data } = await axios({
                    method: 'POST',
                    url: `${baseUrl}/register`,
                    data: {
                        username,
                        email,
                        password
                    }
                })
                Swal.fire({
                    icon: "success",
                    title: "SUCCESS",
                    text: `Success to register`,
                });
                this.router.push('/login')
            } catch (err) {
                console.log(err)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${err.response.data}`,
                });
            }
        },
        handleLogout() {
            localStorage.clear()
            this.isLogin = false
            Swal.fire({
                icon: "success",
                title: "SUCCESS",
                text: `Success to logout`,
            });
        },
        async handleSubscription() {
            try {
                const { data } = await axios({
                    method: 'PATCH',
                    url: `${baseUrl}/subscription`,
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    },
                })
                this.fetchUserId()
            } catch (err) {
                console.log(err)
            }
        },
        async handleSubscribe() {
            try {
                const { data } = await axios({
                    method: 'POST',
                    url: `${baseUrl}/generate-midtrans-token`,
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    },
                })
                const cb = this.handleSubscription
                window.snap.pay(data.token, {
                    onSuccess: function (result) {
                        /* You may add your own implementation here */
                        cb()
                    }
                })
            } catch (err) {
                console.log(err)
            }
        },
        async fetchUserId() {
            try {
                const { data } = await axios({
                    method: 'GET',
                    url: `${baseUrl}/listUser`,
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    }
                })
                this.isSubscribe = data.isSubscribed
            } catch (err) {
                console.log(err)
            }
        }
    }
})