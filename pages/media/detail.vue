<template>
  <div class="video-wrapper">
    <video
        :src="url"
        controls
        ref="videoRef"
        autoplay
        @touchstart="clickVideo"
        @click="clickVideo"
    ></video>
  </div>
</template>
<script>
export default {
  data () {
    return {
      url: '',
      previousTime: ''
    }
  },
  mounted () {
    this.url = this.$route.query.url
    this.$refs.videoRef.addEventListener('timeupdate', this.timeUpdate)
  },
  beforeDestroy () {
    this.$refs.videoRef.removeEventListener('timeupdate', this.timeUpdate)
  },
  methods: {
    clickVideo () {
      if (this.previousTime) {
        return
      }
      const timeMap = localStorage.getItem('timeMap')
      if (timeMap) {
        try {
          const timeObj = JSON.parse(timeMap)
          const currentConfig = timeObj[this.url]
          if (currentConfig) {
            this.$refs.videoRef.currentTime = currentConfig.currentTime
            this.$message({
              message: '设置历史播放时间',
              type: 'success'
            });
          }
        }catch (e) {
          localStorage.removeItem('timeMap')
          this.initTimeMap()
        }
      } else {
        this.initTimeMap()
      }
    },
    timeUpdate () {
      const currentTime = this.$refs.videoRef.currentTime
      if (currentTime - this.previousTime > 10) {
        this.previousTime = currentTime
        const timeMap = localStorage.getItem('timeMap')
        if (timeMap) {
          const timeObj = JSON.parse(timeMap)
          const currentConfig = timeObj[this.url]
          if (currentConfig) {
            currentConfig.currentTime = currentTime
          } else {
            timeObj[this.url] = {
              currentTime
            }
          }
          this.previousTime = currentTime
          localStorage.setItem('timeMap', JSON.stringify(timeObj))
        }
      }
    },
    initTimeMap () {
      const obj = {}
      obj[this.url] = {}
      localStorage.setItem('timeMap', JSON.stringify(obj))
    }
  }
}
</script>
<style scoped>
.video-wrapper {
  background-color: #000;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  text-align: center;
}
video {
  width: 100%;
  height: 100%;
}
</style>
