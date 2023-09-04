<script>
import { mapState, mapActions } from 'pinia'
import { useTourStore } from '../stores/tour'
import { useUserStore } from '../stores/user'
import { useCartStore } from '../stores/cart'

export default {
    name: 'Navbar',
    data() {
        return {
            title: ""
        }
    },
    methods: {
        ...mapActions(useUserStore, ["handleLogout", "handleSubscribe"]),
        ...mapActions(useTourStore, ["handleFilter"]),
        ...mapActions(useCartStore, ["handleListCart"]),
        searchHandler() {
            const title = this.title;
            this.handleFilter(title);
        }
    },
    computed: {
        ...mapState(useUserStore, ["isLogin", "isSubscribe"]),
        ...mapState(useCartStore, ["totalCart"])
    },
    async created() {
        if (this.isLogin) {
            await this.handleListCart()
        }
    }
}
</script>
<template>
    <header class="bg-stone-950 py-4">
        <div class="container mx-auto px-4 flex items-center justify-between">
            <div>
                <a class="text-2xl font-bold text-neutral-100">Nicko Tour</a>
            </div>
            <div class="flex items-center space-x-4">
                <form @submit.prevent="searchHandler" class="flex">
                    <input type="text" class="px-4 py-2 bg-gray-200 rounded-md focus:outline-none focus:bg-white"
                        placeholder="Search tour title here..." v-model="title">
                    <button type="submit"
                        class="ml-2 p-2 rounded-md bg-gray-700 hover:bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M8 1a7 7 0 015.64 11.36l5.72 5.71a1 1 0 11-1.42 1.42l-5.71-5.72A7 7 0 118 1zm0 2a5 5 0 100 10A5 5 0 008 3z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </form>
                <ul v-if="!isLogin" class="flex space-x-4">
                    <li>
                        <RouterLink to="/" href="#" class="text-stone-200 hover:text-blue-600">Beranda</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/login" class="text-stone-200 hover:text-blue-600">Sign In</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/register" href="#" class="text-stone-200 hover:text-blue-600">Sign Up</RouterLink>
                    </li>
                </ul>
                <ul v-if="isLogin" class="flex space-x-4">
                    <li>
                        <button v-if="!isSubscribe" @click.prevent="handleSubscribe()" href="#"
                            class="text-stone-200 hover:text-blue-600">Subscribe</button>
                    </li>
                    <li>
                        <RouterLink to="/" href="#" class="text-stone-200 hover:text-blue-600">Beranda</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/cart" class="relative">
                            <p class="bg-transparent text-neutral-200 hover:text-blue-600">
                                My Cart
                            </p>
                            <span
                                class="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">{{
                                    totalCart }}</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/" @click="handleLogout()" href="#" class="text-stone-200 hover:text-blue-600">
                            Logout
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>
<style scoped></style>