<script>
import { mapActions, mapState } from 'pinia';
import { useTourStore } from '../stores/tour';

export default {
    name: 'TourDetail',
    methods: {
        ...mapActions(useTourStore, ["handleFetchTourId"]),
    },
    computed: {
        ...mapState(useTourStore, ["articleById"])
    },
    async created() {
        await this.handleFetchTourId(this.$route.params.id)
    }
}

</script>
<template>
    <body class="bg-slate-700">
        <div class="container mx-auto p-8">
            <button id="theme-toggle" type="button"
                class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
                <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
                <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        fill-rule="evenodd" clip-rule="evenodd"></path>
                </svg>
            </button>
            <h1 class="text-4xl font-bold text-white mb-8">Tour Detail</h1>
            <div class="bg-white shadow-md rounded-lg flex flex-col md:flex-row">
                <div class="w-full md:w-1/2">
                    <img :src="articleById.imgUrl" alt="Tour Image" class="w-full h-auto">
                </div>
                <div class="p-8 md:w-1/2">
                    <h2 class="text-2xl font-bold mb-4">{{ articleById.title }}</h2>
                    <p class="text-gray-600 mb-4">{{ articleById.itinerary }}</p>
                    <p class="text-gray-600 mb-4">Airlines: {{ articleById.airlines }}</p>
                    <p class="text-gray-600 mb-4">Duration: {{ articleById.duration }} Days</p>
                    <p class="text-gray-600 mb-4">Price: Rp. {{ articleById.price }}/pax</p>
                <p class="text-gray-600 mb-4">Pax: {{ articleById.pax }}</p>
            </div>
        </div>
        <div class="w-48" v-html="articleById.qr"></div>
    </div>
</body></template>
<style scoped></style>