<template>
    <v-row>
        <v-col cols="12">
            <v-table theme="dark">
                <thead>
                    <tr>
                        <th class="text-left">
                            Offer ID
                        </th>
                        <th class="text-left">
                            Product ID
                        </th>
                        <th class="text-left">
                            Distributor Email
                        </th>
                        <th class="text-left">
                            Created time
                        </th>
                        <th class="text-left">
                            Message
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in offers" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.productId }}</td>
                        <td>{{ item.distributorEmail }}</td>
                        <td>{{ item.createdTime }}</td>
                        <td>{{ item.message }}</td>
                    </tr>
                </tbody>
            </v-table>
        </v-col>
    </v-row>
</template>

<script>
import ManufacturerOfferService from "@/services/Manufacturer/Offer/ManufacturerOfferService";
import { mapMutations } from 'vuex'

export default {

    data: () => ({
        offers: []
    }),
    mounted() {
        ManufacturerOfferService.GetManufacturerOffers().then(result => {
            console.log(result);
            this.offers = result.data;
        }) 
    },
    methods: {
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