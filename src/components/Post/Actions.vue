<template>
<v-speed-dial
    v-model="fab"
    :bottom="bottom"
    :right="right"
    :direction="direction"
    :transition="transition"
    >
     <v-btn icon fab ripple small class="grey lighten-2" slot="activator" v-model="fab">
        <v-icon>more_horiz</v-icon>
        <v-icon class="action-close-btn">close</v-icon>
      </v-btn>
      </v-btn>
      <v-btn
        fab
        dark
        small
        :to="`/post/edit/${postID}`"
        class="green action-btn"
      >
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        @click.native.stop="createPost"
        class="indigo action-btn"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        @click.native.stop="deletePost"
        class="red action-btn"
      >
        <v-icon>delete</v-icon>
      </v-btn>
    </v-speed-dial>
  </template>
  <script>
  export default {
    props: ['postID'],
    data () {
      return {
        direction: 'left',
        fab: false,
        right: true,
        bottom: true,
        transition: 'slide-y-reverse-transition'
      }
    },
    methods: {
      createPost () {
        this.$emit('openDialog')
      },
      editPost () {
        this.$emit('openEditDialog')
      },
      deletePost () {
        this.$emit('deletePost')
      }
    }
  }
</script>
<style>
.action-close-btn{
 left: calc(50% - 9px) !important;
 top: calc(50% - 9px) !important;
}
.action-btn{
  margin-left:1px !important;
}
.speed-dial__list{
 margin-right: 10px;
}
</style>
