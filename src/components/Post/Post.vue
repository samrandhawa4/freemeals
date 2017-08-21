<template>
  <v-list-tile avatar>
    <v-list-tile-avatar>
      <v-icon grey class="grey grey lighten-1 white--text" v-if="!post.photos">folder</v-icon>
      <img v-bind:src="getPhoto(post.photos)" v-bind:alt="post.title" v-if="post.photos" />
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title>
        {{ post.title }}
      </v-list-tile-title>
      <v-list-tile-sub-title>{{ post.place }}</v-list-tile-sub-title>
    </v-list-tile-content>
    <v-list-tile-action>
        <post-actions
         @deletePost="deletePost($event)"
         @openDialog="openDialog($event)"
        :postID="post.id"
        ></post-actions>
    </v-list-tile-action>
  </v-list-tile>
</template>
<script>
  import Actions from './Actions'
  export default {
    props: ['post'],
    components: {
      'post-actions': Actions
    },
    data () {
      return {
        posts: [],
        photo: ''
      }
    },
    methods: {
      openDialog () {
        this.$emit('openDialog')
      },
      openEditDialog () {
        this.$emit('openEditDialog', this.post)
      },
      deletePost () {
        this.$emit('deletePost', this.post.id)
      },
      getPhoto (photo) {
        if (photo) {
          return 'http://codedegg.com/gallery/posts/thumbs/' + photo[0].photo
        }
      }
    }
  }
</script>
