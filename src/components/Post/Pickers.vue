<template>
<div>
<v-menu
  lazy
  :close-on-content-click="false"
  v-model="menu"
  transition="scale-transition"
  offset-y
  full-width
  :nudge-left="40"
  max-width="290px"
>
  <v-text-field
   slot="activator"
   label="Pickup date"
   v-model="dt"
   prepend-icon="event"
   :error-messages="errorDate"
   hint="On what date people can pickup"
   readonly
   persistent-hint
 ></v-text-field>
 <v-date-picker v-model="dt" :allowed-dates="allowedDates" no-title scrollable actions>
    <template scope="{ save, cancel }">
      <v-card-actions>
        <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
        <v-btn flat primary @click.native="save()">Save</v-btn>
      </v-card-actions>
    </template>
  </v-date-picker>
</v-menu>
<v-menu
  lazy
  :close-on-content-click="false"
  v-model="menu2"
  transition="scale-transition"
  offset-y
  full-width
  :nudge-left="40"
  max-width="290px"
>
  <v-text-field
   slot="activator"
   label="Pickup time"
   v-model="tm"
   prepend-icon="access_time"
   readonly
   persistent-hint
   :error-messages="errorTime"
   hint="Till then what time someone can pickup the food"
 ></v-text-field>
 <v-time-picker v-model="tm" no-title scrollable actions format="24hr">
    <template scope="{ save, cancel }">
      <v-card-actions>
        <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
        <v-btn flat primary @click.native="save()">Save</v-btn>
      </v-card-actions>
    </template>
  </v-time-picker>
</v-menu>
</div>
</template>
<script>
export default {
  props: ['date', 'time', 'errorDate', 'errorTime'],
  data () {
    return {
      menu: false,
      menu2: false,
      dt: this.date,
      tm: this.time,
      allowedDates: null,
      lastFiveDays: {
        min: null,
        max: null
      }
    }
  },
  mounted () {
    const d = new Date()
    const date = new Date()
    date.setDate(date.getDate() + 14)
    this.lastFiveDays.min = d
    this.lastFiveDays.max = date
    this.allowedDates = this.lastFiveDays
  },
  watch: {
    date (val) {
      this.dt = val
    },
    time (val) {
      this.tm = val
    }
  },
  updated () {
    if (this.dt !== this.date) {
      this.$emit('saveDate', this.dt)
    }
    if (this.tm !== this.time) {
      this.$emit('saveTime', this.tm)
    }
  }
}
</script>
