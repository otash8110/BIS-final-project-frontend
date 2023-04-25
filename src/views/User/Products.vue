<template>
    <v-row>
        <v-col cols="12" md="4" v-for="(product, index) in products" :key="index">
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
        products: []
    }),
    mounted() {
        ProductServices.GetProducts().then(result => {
            this.products = result.data;
        }).catch(err => {
            if (err.response.status == 403) {
                this.$router.push("/error");
            }
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