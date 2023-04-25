<template>
    <v-row>
        <v-col>
            <v-btn class="mb-2" @click="this.$router.go(-1)">Back</v-btn>
            <v-card title="Product Details">
                <v-overlay scroll-strategy="block" v-model="isOffered" class="align-center justify-center">
                    <v-card width="700" title="Create offer">
                        <v-card-text>
                            <v-row>
                                <v-col>
                                    <p>Please, enter the message you want to send for
                                        <b class="font-weight-black">{{ user.email }}</b>:
                                    </p>

                                    <v-textarea v-model="message" class="mt-3" label="Message" variant="solo"></v-textarea>
                                    <v-btn color="green" class="mt-5" @click="HandleOfferSend">Send offer</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-overlay>
                <VCardText class="d-flex">
                    <!-- 👉 Avatar -->
                    <v-row class="justify-start">
                        <v-col cols="3">
                            <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" width="600"></v-img>
                        </v-col>

                        <v-col cols="3">
                            <VRow class="flex-column h-100">
                                <!-- 👉 First Name -->
                                <VCol>
                                    <h1>{{ product.name }}</h1>
                                </VCol>

                                <!-- 👉 Last Name -->
                                <VCol>
                                    <p class="text-body-1">{{ product.description }}</p>
                                </VCol>

                                <VCol>
                                    <v-row class="justify-start align-center">
                                        <v-col cols="5">
                                            Rating:
                                            <v-rating :model-value="product.rating" color="amber" density="compact"
                                                half-increments readonly size="small"></v-rating>
                                        </v-col>
                                    </v-row>
                                </VCol>

                                <!-- 👉 Form Actions -->
                                <VCol class="d-flex flex-row-reverse gap">
                                    <VBtn v-if="product.isOfferMade == false" class="mt-auto" color="green" @click="isOffered = !isOffered">Make an offer</VBtn>
                                    <VBtn v-if="product.isOfferMade" disabled class="mt-auto" color="green" @click="isOffered = !isOffered">Offer was sent</VBtn>
                                </VCol>
                            </VRow>
                        </v-col>
                    </v-row>
                </VCardText>

                <VDivider />

                <VCardText>
                    <v-row class="flex-column">
                        <v-col>
                            <p>Manufacturer Name: {{ user.name }}</p>
                        </v-col>
                        <v-col>
                            <p>Manufacturer Email: {{ user.email }}</p>
                        </v-col>
                        <v-col>
                            <p>Manufacturer Company name: {{ user.companyName || "None" }}</p>
                        </v-col>
                    </v-row>
                </VCardText>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import DistributorProductService from "@/services/Distributor/Product/DistributorProductService"
import DistributorOfferService from "@/services/Distributor/Offer/DistributorOfferService"
import { mapMutations } from 'vuex'
import UserService from '@/services/User/UserService';

export default {

    data: () => ({
        product: {},
        search: "",
        user: {},
        isOffered: false,
        message: ""
    }),
    mounted() {
        DistributorProductService.GetProduct(this.$route.params.id).then(result => {
            this.product = result.data;
            UserService.GetUserByEmail(this.product.createdBy).then(result => {
                this.user = result.data;
            })
        })

    },
    methods: {

        ...mapMutations({
            addNotification: "signalr/setNotificationMessage"
        }),

        HandleOfferSend() {
            var offer = {
                message: this.message,
                manufacturerEmail: this.user.email,
                productId: this.product.id 
            }
            DistributorOfferService.CreateOffer(offer).then(() => {
                this.addNotification("Your offer was successfully sent to manufacturer!")
                this.$router.push("/products-search")
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