<script>
import Card from '../components/Card.vue'

import { mapActions, mapState } from 'pinia'
import { useTourStore } from '../stores/tour'

export default {
    name: 'TourPage',
    components: { Card },
    data() {
        return {
            isCart: false
        }
    },
    methods: {
        ...mapActions(useTourStore, ["handleFetchTours", "handlePagination", "handleCurrency"])
    },
    async created() {
        await this.handleFetchTours()
        await this.handleCurrency()
    },
    computed: {
        ...mapState(useTourStore, ["articles", "isNotFound", "currency"])
    }
}
</script>
<template>
    <!-- Currency API already expired -->
    <!-- <h2>1 {{ currency[0].symbol }} {{ currency[0].currencyCode }} = Rp 15.000</h2> -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card v-for="article in articles.data" isCart:isCart :dataEntity="article" />
    </div>
    <div v-if="!isNotFound" class="flex flex-row justify-center gap-4">
        <div v-for="pageNumber in articles.pagination.totalPage" :key="pageNumber"
            class="flex justify-center col-span-1 mt-8">
            <a v-if="pageNumber === articles.pagination.currentPage"
                class="px-4 py-2 mr-2 text-white bg-blue-500 rounded-md">{{ pageNumber }}</a>
            <a @click="handlePagination(pageNumber)" v-if="pageNumber !== articles.pagination.currentPage"
                class="px-4 py-2 mr-2 text-white rounded-md bg-slate-500">{{ pageNumber }}</a>
        </div>
    </div>
</template>
<style scoped></style>
