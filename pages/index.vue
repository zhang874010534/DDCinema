<template>
  <div>
    <div class="content">
      <div class="video-item" v-for="(item, index) in mediaList" :key="index">
        <video
            :src="`/media/${item.name}`"
            @click="openVideo(`/media/${item.name}`)"
        ></video>
        <div class="video-text">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {getLocal} from '~/utils/util'
export default {
  name: 'IndexPage',
  data () {
    return {
      mediaList: {},
    }
  },
  methods: {
    openVideo (url) {
      this.$router.push({
        path: 'media/detail',
        query: {
          url
        }
      })
    }
  },
  async asyncData(context) {
    const local = getLocal()
    const response = await fetch(`http://${local.ip}:${local.port}/api/media/list`);
    const data = await response.json();
    return {
      mediaList: data
    }
  }
}
</script>
<style scoped>
.content {
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr))
}
.video-item {
}
video {
  width: 100%;
  border-radius: 20px;
  cursor: pointer;
  border: 1px solid transparent;
  background-color: #000;
}
.video-text {
  text-align: center;
}
video:hover {
  border: 1px solid #000;
}
</style>
