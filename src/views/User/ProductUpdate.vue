<template>
    <v-row>
        <v-col>
            <v-card title="Product Details">
                <VCardText class="d-flex">
                    <!-- 👉 Avatar -->
                    <VAvatar rounded="lg" size="100" class="me-6" :image="null" />

                    <!-- 👉 Upload Photo -->
                    <form ref="refForm" class="d-flex flex-column justify-center gap">
                        <div class="d-flex flex-wrap gap">
                            <VBtn color="primary" @click="refInputEl?.click()">
                                <VIcon icon="mdi-cloud-upload-outline" class="d-sm-none" />
                                <span class="d-none d-sm-block">Upload new photo</span>
                            </VBtn>

                            <input ref="refInputEl" type="file" name="file" accept=".jpeg,.png,.jpg,GIF" hidden
                                @input="changeAvatar">

                            <VBtn type="reset" color="error" variant="tonal" @click="resetAvatar">
                                <span class="d-none d-sm-block">Reset</span>
                                <VIcon icon="mdi-refresh" class="d-sm-none" />
                            </VBtn>
                        </div>

                        <p class="text-body-1 mb-0">
                            Allowed JPG, GIF or PNG. Max size of 800K
                        </p>
                    </form>
                </VCardText>

                <VDivider />

                <VCardText>
                    <!-- 👉 Form -->
                    <VForm class="mt-6">
                        <VRow>
                            <!-- 👉 First Name -->
                            <VCol md="6" cols="12">
                                <VTextField 
                                v-model="product.name" 
                                label="Product Name" />
                            </VCol>

                            <!-- 👉 Last Name -->
                            <VCol md="6" cols="12">
                                <VTextarea
                                v-model="product.description"
                                label="Product Description" />
                            </VCol>

                            <!-- 👉 Form Actions -->
                            <VCol cols="12" class="d-flex flex-wrap gap">
                                <VBtn
                                @click="HandleUpdateProduct"
                                >Update Product</VBtn>

                                <VBtn color="secondary" variant="tonal" type="reset">
                                    Reset
                                </VBtn>
                            </VCol>
                        </VRow>
                    </VForm>
                </VCardText>
            </v-card>
        </v-col>
    </v-row>

</template>

<script>
import ProductServices from "@/services/Manufacturer/Product/ProductServices";
import { mapMutations } from 'vuex'

export default {

    data: () => ({
        product: {
            id: "",
            name: "",
            description: "",
            rating: ""
        }
    }),
    mounted() {
        let id = this.$route.params.id;
        ProductServices.GetProduct(id).then((result) => {
            this.product = result.data;
        })
    },
    methods: {
        HandleUpdateProduct() {
            ProductServices.UpdateProduct(this.product).then(() => {
                this.addNotification("Product updated!");
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