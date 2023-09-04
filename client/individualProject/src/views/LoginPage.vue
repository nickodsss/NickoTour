<script>
import { mapActions } from 'pinia'
import { useUserStore } from '../stores/user'

export default {
    name: 'LoginPage',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        ...mapActions(useUserStore, ['handleLogin']),
        ...mapActions(useUserStore, ['handleGoogleSignIn']),
        handleLoginOnSubmit() {
            this.handleLogin(this.email, this.password)
        },
        callback(response) {
            this.handleGoogleSignIn(response)
        },

    }
}
</script>
<template>
    <body class="bg-black">
        <div class="flex items-center justify-center h-screen">
            <div class="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>
                <form @submit.prevent="handleLoginOnSubmit">
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            v-model="email">
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            v-model="password">
                    </div>
                    <div class="flex items-center justify-between">
                        <button type="submit"
                            class="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">Login</button>
                        <a href="#" class="text-sm text-gray-500">Forgot password?</a>
                    </div>
                </form>
                <p class="mt-4 text-center text-gray-500">Don't have an account? <RouterLink to="/register"
                        class="text-indigo-500">Register here</RouterLink>
                </p>
                <h4 class="text-light p-2 mt-4 text-center">----- OR -----</h4>
                <div class="flex items-center justify-center my-6 space-y-2 w-full">
                    <GoogleLogin :callback="callback" class="google-oath" />
                </div>
            </div>
        </div>
    </body>
</template>
<style scoped></style>