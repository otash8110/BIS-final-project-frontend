<template>
  <div class="home">
  </div>
  <div class="home__main pa-6 text-center">
    <h1>Welcome to UzExpoMarket!</h1>
    <v-row class="pt-7 gap">
      <v-col>
        <h2>For distributors</h2>
        <p class="card-paragraph">If you're interested in purchasing products produced in Uzbekistan, have a look to our catalog of local manufacturers and their products!</p>
        <v-container>
          <v-row>
            <v-col>
              <v-btn class="text-h6" color="green" to="/products-search">
                Search for products
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col>
        <h2>For manufacturers</h2>
        <p class="card-paragraph">If you're a local manufacturer and are looking into increasing your goods promotion channel and new customers for your products, have a look into our distributors catalog</p>
        <v-container>
          <v-row>
            <v-col>
              <v-btn class="text-h6" color="green">
                Search for distributors
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
  }
}
</script>

<style scoped>
.home {
  background-image: url("../../public/Tashkent.jpg");
  background-position: center;
  filter: blur(2px);
  background-size: cover;
  width: 100%;
  height: 91vh;
}

.home__main {
  color: white;
  background: rgba(12, 133, 203, 0.95);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.card-paragraph {
  min-height: 40%;
}
</style>
