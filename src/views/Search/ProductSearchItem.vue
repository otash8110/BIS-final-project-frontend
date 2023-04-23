<template>
    <v-row>
        <v-col>
            <v-btn class="mb-2" @click="this.$router.go(-1)">Back</v-btn>
            <v-card title="Product Details">
                <VCardText class="d-flex">
                    <!-- 👉 Avatar -->
                    <v-row>
                        <v-col>
                            <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"></v-img>
                        </v-col>

                        <v-col>
                            <VRow class="flex-column h-100">
                                <!-- 👉 First Name -->
                                <VCol>
                                    <h1>Product title</h1>
                                </VCol>

                                <!-- 👉 Last Name -->
                                <VCol>
                                    <p class="text-body-1">Product description</p>
                                </VCol>

                                <VCol>
                                    <v-row class="justify-start align-center">
                                        <v-col cols="5">
                                            Rating:
                                            <v-rating :model-value="2" color="amber" density="compact" half-increments
                                                readonly size="small"></v-rating>
                                        </v-col>
                                    </v-row>
                                </VCol>

                                <!-- 👉 Form Actions -->
                                <VCol class="d-flex flex-row-reverse gap">
                                    <VBtn class="mt-auto"  color="green">Make an offer</VBtn>
                                </VCol>
                            </VRow>
                        </v-col>
                    </v-row>
                </VCardText>

                <VDivider />

                <VCardText>
                    <v-row>
                        <v-col>
                            <p>Manufacturer: </p>
                        </v-col>
                    </v-row>
                </VCardText>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import ProductSearch from "@/services/Search/Product";
import { mapMutations } from 'vuex'
import ProductServices from '@/services/Manufacturer/Product/ProductServices';
import UserService from '@/services/User/UserService';

export default {

    data: () => ({
        product: {},
        search: "",
        user: {}
    }),
    mounted() {
        ProductServices.GetProduct(this.$route.params.id).then(result => {
            this.product = result.data;
        })

        UserService.GetUserByEmail()
    },
    methods: {

        ...mapMutations({
            addNotification: "signalr/setNotificationMessage"
        }),

        HandleSearch() {
            ProductSearch.GetProductsByName(this.search).then(result => {
                this.products = result.data;
            })
        }
    }

}
</script>

<style scoped>
.gap {
    gap: 15px;
}
</style>