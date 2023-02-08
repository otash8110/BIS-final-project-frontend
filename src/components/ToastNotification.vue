<template>
  <v-snackbar
      v-for="(notification, i) in notifications"
      :key="i"
      v-model="notification.showing"
      :timeout="2000"
      location="top right"
      transition="slide-x-reverse-transition"
    >
      {{ notification.message }}

      <template v-slot:actions>
        <v-btn
          color="pink"
          variant="text"
          @click="notification.showing = false"
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
        snackbar: false,
    }),
    name: "ToastNotification",
    computed: {
      ...mapGetters({
        notifications: 'signalr/GetNotifications',
    })
    }
}
</script>

<style>

</style>