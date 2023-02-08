<template>
  <v-container>
    <v-row class="flex-column">
        <v-col cols="2">
            <h1 class="text-left">Sign in</h1>
        </v-col>
        <v-col>
            <v-form
              v-model="form"
              @submit.prevent="onSubmit"
            >
              <v-text-field
                v-model="user.email"
                :readonly="loading"
                :rules="[validation.emailValidation]"
                class="mb-2"
                clearable
                label="Email"
              ></v-text-field>
      
              <v-text-field
                v-model="user.password"
                type="password"
                :readonly="loading"
                :rules="[validation.required]"
                clearable
                label="Password"
                placeholder="Enter your password"
              ></v-text-field>
      
              <br>
      
              <v-btn
                :loading="loading"
                block
                color="success"
                size="large"
                type="submit"
                variant="elevated"
              >
                Sign in
              </v-btn>
            </v-form>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import User from '@/models/User';
import { emailValidation } from "../../services/Validation/FormValidations";

export default {
    data: () => ({
      form: false,
      email: null,
      password: null,
      loading: false,
      user: new User(),
      validation: {
        emailValidation,
        required: (v) => {
        return !!v || 'Field is required'
      },
      },

    }),

    methods: {
      onSubmit () {
        if (!this.form) return

        this.loading = true

        this.$store.dispatch("auth/login", this.user)
        .then(
          () => {
            this.$router.push("/");
          }
        )
      },
      
    },
  }
</script>

<style>

</style>