<script>
import { mapActions } from 'pinia'
import { useUserStore } from '../stores/user'

export default {
    name: 'RegisterPage',
    data() {
        return {
            username: "",
            email: '',
            password: ''
        }
    },
    methods: {
        ...mapActions(useUserStore, ['handleRegister']),
        handleRegisterOnSubmit() {
            this.handleRegister(this.username, this.email, this.password)
        }
    }
}
</script>
<template>
    <body class="bg-black">
        <div class="flex items-center justify-center h-screen">
            <div class="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 class="text-2xl font-bold mb-4 text-center">Register</h2>
                <form @submit.prevent="handleRegisterOnSubmit">
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700">Username</label>
                        <label class="text-danger text-end fw-bold text-rose-700">*</label>
                        <input type="text"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            required v-model="username">
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700">Email</label>
                        <label class="text-danger text-end fw-bold text-rose-700">*</label>
                        <input type="email"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            required v-model="email">
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700">Password</label>
                        <label class="text-danger text-end fw-bold text-rose-700">*</label>
                        <input type="password"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            required v-model="password">
                    </div>
                    <div class="flex items-center justify-between">
                        <button type="submit"
                            class="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">Register</button>
                    </div>
                </form>
                <p class="mt-4 text-center text-gray-500">Already have an account? <RouterLink to="/login"
                        class="text-indigo-500">Login here</RouterLink>
                </p>
            </div>
        </div>
    </body>
</template>
<style scoped></style>