<template>
  <v-snackbar
      v-model="snackbar"
      :timeout="2000"
      location="top right"
      transition="slide-x-reverse-transition"
      :absolute="true"
    >
      {{ notification }}

      <template v-slot:actions>
        <v-btn
          color="pink"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    data: () => ({
        text: "null",
        snackbar: false
    }),
    name: "ToastNotification",
    computed: {
      ...mapGetters([
        'signalr/notification'
      ])
    }
}
</script>

<style>

</style>