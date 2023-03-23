<template>
    <v-row>
        <v-col>
            <v-card title="Account Details">
                <VCardText class="d-flex">
                    <!-- 👉 Avatar -->
                    <VAvatar rounded="lg" size="100" class="me-6" :image="null" />

                    <!-- 👉 Upload Photo -->
                    <form ref="refForm" class="d-flex flex-column justify-center gap-5">
                        <div class="d-flex flex-wrap gap-2">
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
                                v-model="user.name" 
                                label="Name" />
                            </VCol>

                            <!-- 👉 Last Name -->
                            <VCol md="6" cols="12">
                                <VTextField
                                v-model="user.surname"
                                label="Surname" />
                            </VCol>

                            <!-- 👉 Email -->
                            <VCol cols="12" md="6">
                                <VTextField
                                v-model="user.email"
                                disabled
                                label="E-mail" type="email" />
                            </VCol>

                            <!-- 👉 Organization -->
                            <VCol cols="12" md="6">
                                <VTextField
                                v-model="user.companyName"
                                label="Company name" />
                            </VCol>

                            <!-- 👉 Form Actions -->
                            <VCol cols="12" class="d-flex flex-wrap gap-4">
                                <VBtn
                                @click="HandleUpdateUser"
                                >Save changes</VBtn>

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
import UserService from '@/services/User/UserService'
import { mapMutations } from 'vuex'

export default {

    data: () => ({
        user: {
            email: "@mail.ru",
            name: null,
            surname: null,
            companyName: null
        }
    }),
    mounted() {
        UserService.GetUser().then(result => {
            console.log(result)
            this.user = result.data
        })
    },
    methods: {
        HandleUpdateUser() {
            UserService.UpdateUser(this.user).then(() => {
                this.addNotification("Profile info updated!");
            })
        },

        ...mapMutations({
            addNotification: "signalr/setNotificationMessage"
        })
    }

}
</script>

<style scoped>

</style>