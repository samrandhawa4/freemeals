<template>
<v-layout row wrap>
  <v-flex xs3 sm2 v-for="(image, index) in ph" v-bind:key="index">
    <div class="img-wrapper">
      <v-btn absolute dark right error icon @click.native.stop="remove(index)">
        <v-icon>delete</v-icon>
      </v-btn>
      <div class="img-circle">
        <img :src="getPhoto(image)" :alt="image"/>
      </div>
    </div>
  </v-flex>
  <v-flex xs3 sm2 v-for="(photo, index) in photos" v-bind:key="index">
    <div v-if="photo">
      <v-progress-circular
          v-bind:size="80"
          v-bind:width="15"
          v-bind:rotate="360"
          v-bind:value="value"
          class="teal--text"
        >
          <v-btn absolute dark error top icon @click.native.stop="remove(index)">
            <v-icon>delete</v-icon>
          </v-btn>
          <div class="img-container">
            <img :src="photo" :alt="photo"/>
          </div>
        </v-progress-circular>
      </div>
    </v-flex>
    <v-flex xs12 sm12>
      <v-btn flat icon primary class="btn-lg">
        <v-icon>camera_enhance</v-icon>
        <input type="file" multiple accept="image/*" @change="onFileChange" class="file"/>
      </v-btn>
      <small>You can upload upto 4 photos</small>
    </v-flex>
</v-layout>
</template>
<style scoped>
 .img-container{
  height: 60px;
  width: 60px;
  overflow: hidden;
  border-radius: 80%;
 }
 .img-container img, .img-circle img{
    height: 100px;
  }
  .btn-lg{
   width: 42px;
   height: auto;
   overflow: hidden;
  }
  .btn-lg .icon{
    font-size:40px;
  }
  .file{
   position: absolute;
   left: 0;
   opacity: 0;
  }
  .btn-bottom{
   top: 12px;
  }
  .img-wrapper{
    position: relative
  }
  .img-wrapper .btn{
   z-index: 2;
   top: 1px;
  }
  .img-circle{
   border: 10px solid #e2e2e2;
   height: 80px;
   position: relative;
   width: 80px;
   overflow: hidden;
   border-radius: 80%;
  }
</style>
<script>
export default{
  props: ['url', 'progress', 'ph'],
  data () {
    return {
      URL: this.url,
      photos: []
    }
  },
  computed: {
    value () {
      return this.progress
    }
  },
  methods: {
    onFileChange (e) {
      if (window.FileReader) {
        this.photos = []
        let files = e.target.files || e.dataTransfer.files
        let fileCount = files.length
        if (!files.length) {
          return
        }
        if (this.ph.length > 0) {
          fileCount = 4 - this.ph.length
        }
        for (var i = 0; i < fileCount; i++) {
          if (i !== 4) {
            let file = files[i]
            this.createImage(file)
          }
        }
      }
    },
    getPhoto (photo) {
      if (photo) {
        let image = 'http://127.0.0.1:8000/gallery/posts/thumbs/' + photo.photo
        return image
      }
    },
    createImage (file) {
      let reader = new FileReader()
      let vm = this
      if (file && file.type.match('image.*')) {
        reader.readAsDataURL(file)
      }
      reader.onload = (e) => {
        vm.photo = e.target.result
        vm.photos.push(e.target.result)
        this.$emit('onUpload', vm.photos)
      }
    },
    upload () {
      let vm = this
      this.$http.post(this.URL + 'photo/create', { photo: this.photo }, {
        progress (e) {
          if (e.lengthComputable) {
            vm.value = (e.loaded / e.total * 100)
          }
        }
      })
      .then(
        (response) => {
          console.log(response)
        }
      )
      .catch(
          (error) => {
            console.log(error)
          }
      )
    },
    remove (index) {
      this.photos.splice(index, 1)
    }
  }
}
</script>
