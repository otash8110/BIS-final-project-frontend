<template>
    <v-row>
        <v-col cols="4" v-for="(product, index) in products" :key="index">
            <v-card :title="product.name">
                <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px" cover></v-img>

                <v-card-title>
                    {{product.description}}
                </v-card-title>

                <v-card-actions>
                    <v-btn color="blue-grey" variant="text">
                        View
                    </v-btn>
                    <v-btn color="blue-grey" variant="flat" 
                    :to="`/manufacturer-product-update/${product.id}`">
                        Update
                    </v-btn>

                    <v-btn color="error" variant="flat" >
                        Delete
                    </v-btn>

                    <v-spacer></v-spacer>

                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import ProductServices from "@/services/Manufacturer/Product/ProductServices";
import { mapMutations } from 'vuex'

export default {

    data: () => ({
        products: [{
            name: "test1",
            description: "some huge description,some huge descriptionsome huge description",
            rating: 1
        }, {
            name: "test2",
            description: "some huge descriptionsome huge description",
            rating: 1
        },
        {
            name: "test3",
            description: "some huge descriptionsome huge descriptionsome huge descriptionsome huge descriptionsome huge description",
            rating: 1
        }]
    }),
    mounted() {
        ProductServices.GetProducts().then(result => {
            this.products = result.data;
        })
    },
    methods: {
        HandleCreateProduct() {
            ProductServices.CreateProduct(this.product).then(() => {
                this.addNotification("Product created!");
            })
        },

        ...mapMutations({
            addNotification: "signalr/setNotificationMessage"
        })
    }

}
</script>

<style scoped>
.gap {
    gap: 15px;
}
</style>