<template>
  <v-snackbar
   :timeout="timeout"
   v-model="data.model"
   :success="data.context === 'success'"
   :info="data.context === 'info'"
   :warning="data.context === 'warning'"
   :error="data.context === 'error'"
   :primary="data.context === 'primary'"
  >
  {{data.message}}
   <v-btn flat dark icon @click.native="snackbar = false"><v-icon>close</v-icon></v-btn>
  </v-snackbar>
</template>
<script>
export default {
  props: ['data'],
  data () {
    return {
      timeout: 3000
    }
  }
}
</script>
