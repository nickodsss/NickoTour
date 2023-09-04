<script>
import Card from '../components/Card.vue'
import { mapActions, mapState } from 'pinia'
import { useCartStore } from '../stores/cart'
import { useUserStore } from '../stores/user'

export default {
    name: 'CartPage',
    components: { Card },
    data() {
        return {
            isCart: true
        }
    },
    methods: {
        ...mapActions(useCartStore, ["handleListCart"]),
        ...mapActions(useUserStore, ["fetchUserId"])
    },
    async created() {
        await this.handleListCart()
        await this.fetchUserId()
    },
    computed: {
        ...mapState(useCartStore, ["carts"]),
        ...mapState(useUserStore, ["isSubscribe"])
    }
}

</script>
<template>
    <h2 v-if="!isSubscribe" class="text-center">You need to subscribe to set total person!</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card v-for="cart in carts" :isCart="isCart" :dataEntity="cart.Tour" :dataCart="cart" :isSubscribe="isSubscribe" />
    </div>
</template>
<style scoped></style>