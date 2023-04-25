<template>
    <v-row class="justify-center align-center">
        <v-col>
            <v-form class="d-flex justify-center align-center">
                <v-col cols="7">
                    <v-text-field v-model="search" label="Search for products" hide-details single-line
                        class="flex-grow-1"></v-text-field>
                </v-col>
                <v-col cols="2">
                    <v-btn type="submit" @click="HandleSearch" icon="mdi-magnify" color="blue"></v-btn>
                </v-col>
            </v-form>
        </v-col>
    </v-row>
    <v-card>
        <v-row>
            <v-overlay contained :model-value="isLoading" class="justify-center">
                <v-progress-circular class="mt-10" color="white" width="15" indeterminate size="100"></v-progress-circular>
            </v-overlay>
            <v-col cols="12" sm="6" md="4" lg="2" v-for="(product, index) in fetchedProducts" :key="index">
                <v-card :title="product.name">
                    <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px" cover></v-img>

                    <v-card-title>
                        {{ product.description }}
                    </v-card-title>

                    <v-card-text>
                        <v-row align="center" class="mx-0 mt-1">
                            <v-rating :model-value="product.rating" color="amber" density="compact" half-increments readonly
                                size="small"></v-rating>

                            <div class="text-grey ms-4">
                                4.5 (413)
                            </div>
                        </v-row>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue" variant="text" :to="`/products-search/${product.id}`">
                            View
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import ProductSearch from "@/services/Search/Product";

export default {

    data: () => ({
        products: [],
        search: "",
        isLoading: true
    }),
    mounted() {
        this.isLoading = true;
        ProductSearch.GetAllProducts().then(result => {
            setTimeout(() => {
                this.isLoading = false;
            }, 100);
            this.products = result.data;
            this.isApprovedRegistration = true;
        }).catch(err => {
            if(err.response.status == 403) {
                this.$router.push("/error");
            }
        })
    },

    computed: {
        fetchedProducts() {
            return this.products
        }
    },

    created() {
    },
    methods: {
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