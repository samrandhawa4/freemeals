<template>
    <app-form></app-form>
</template>
<script>
import Form from './Form'
export default {
  components: {
    'app-form': Form
  },
  data () {
    return {
      dialog: true
    }
  },
  methods: {
    closeDialog () {
      this.dialog = false
    }
  }
}
</script>
