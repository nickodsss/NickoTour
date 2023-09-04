<script>
import { mapState, mapActions } from 'pinia'
import { useTourStore } from '../stores/tour';
import { useUserStore } from '../stores/user'
import { useCartStore } from '../stores/cart'

export default {
    name: 'Card',
    props: ['dataEntity', 'isCart', 'dataCart', 'isSubscribe'],
    data() {
        return {
            totalPerson: ""
        }
    },
    computed: {
        ...mapState(useUserStore, ["isLogin"]),
    },
    methods: {
        ...mapActions(useTourStore, ["handleChangePage"]),
        ...mapActions(useCartStore, ["handleAddCart", "handleDeleteCart", "handleEditCart"]),
        handleOnClickEdit() {
            this.handleEditCart(this.dataEntity.id, this.totalPerson)
        }
    }
}

</script>
<template>
    <div class="container mx-auto p-8">
        <!-- Tour Item 1 -->
        <div class="bg-white shadow-md rounded-lg flex flex-col justify-between">
            <img :src=dataEntity.imgUrl alt="Tour 1" class="w-full h-40 object-cover rounded-t-lg" />
            <div class="p-4">
                <span class="bg-gray-300 px-2 py-1 text-sm text-gray-700 rounded-full">{{ dataEntity.category }}</span>
                <h2 class="text-lg font-bold mt-2">{{ dataEntity.title }}</h2>
                <p class="text-gray-600">Price: Rp.{{ dataEntity.price }}/pax</p>
                <p class="text-gray-600">Pax: {{ dataEntity.pax }}</p>
                <p v-if="isCart" class="text-gray-600">Total Person: {{ dataCart.totalPerson }}</p>
                <div class="flex">
                    <button @click.prevent="handleDeleteCart(dataEntity.id)" v-if="isCart"
                        class="bg-red-700 text-white py-2 w-24 px-4 rounded-md">Delete</button>
                </div>
            </div>
            <button @click.prevent="handleChangePage(`/tourdetail/${dataEntity.id}`)"
                class="bg-gray-600 text-white py-2 px-4 ">Detail Tour</button>
            <div v-if="isCart && isSubscribe" class="flex items-center mt-2">
                <input type="number" :placeholder="dataCart.totalPerson" v-model="totalPerson" min="1"
                    class="text-center w-12 bg-white">
                <button @click="handleOnClickEdit" class="bg-black text-white py-1 px-2 ml-2 rounded-md">Set</button>
            </div>
            <button v-if="!isCart && isLogin" @click.prevent="handleAddCart(dataEntity.id)"
                class="bg-stone-800 text-white py-2 px-4">
                Add to My Cart
            </button>
        </div>
    </div>
</template>
<style scoped></style>