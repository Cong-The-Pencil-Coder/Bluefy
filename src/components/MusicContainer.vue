<template>
  <div class="music-container" id="music-container" :class="[isPlaying ? 'play' : 'pause']">
    <div class="music-info">
      <h4 id="title">{{ currentTitle }}</h4>
      <!-- <div class="progress-container" id="progress-container">
        <div class="progress" id="progress"></div>
      </div> -->
    </div>

    <audio
      :src="require(`../assets/music/${currentAudio}.mp3`)"
      ref="audio"
    ></audio>

    <div class="img-container">
      <img
        :src="require(`../assets/images/${currentPhoto}.jpg`)"
        alt="music-cover"
        id="cover"
      />
    </div>
    <div class="navigation" >
      <button id="prev" class="action-btn">
        <i class="fas fa-backward"></i>
      </button>
      <button @click="togglePlay" id="play" class="action-btn action-btn-big">
        <i class="fas" :class="[isPlaying ? 'fa-pause' : 'fa-play']"></i>
      </button>
      <button id="next" class="action-btn">
        <i class="fas fa-forward"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "music-container",
  methods: {
    togglePlay() {
      this.$store.commit("togglePlay");
      if (this.isPlaying) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
      return;
    },
  },
  computed: {
    isPlaying() {
      return this.$store.state.isPlaying;
    },
    currentTitle() {
      return this.$store.state.currentTitle;
    },
    currentAudio() {
      return this.$store.state.currentAudio;
    },
    currentPhoto() {
      return this.$store.state.currentPhoto;
    },
  },
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css");

.music-container {
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 20px 20px 0 #4949c0;
  display: flex;
  padding: 20px 30px;
  position: relative;
  margin: 100px 0;
  z-index: 10;
}

.img-container {
  position: relative;
  width: 110px;
}

.img-container::after {
  content: "";
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  bottom: 100%;
  left: 50%;
  width: 20px;
  height: 20px;
  transform: translate(-50%, 50%);
}

.img-container img {
  border-radius: 50%;
  object-fit: cover;
  height: 110px;
  width: inherit;
  position: absolute;
  bottom: 0;
  left: 0;
  animation: rotate 3s linear infinite;

  animation-play-state: paused;
}

.music-container.play .img-container img {
  animation-play-state: running;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.action-btn {
  background-color: #fff;
  border: 0;
  color: #dfdbdf;
  font-size: 20px;
  cursor: pointer;
  padding: 10px;
  margin: 0 20px;
}

.action-btn.action-btn-big {
  color: #cdc2d0;
  font-size: 30px;
}

.action-btn:focus {
  outline: 0;
}

.music-info {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 15px 15px 0 0;
  position: absolute;
  top: 0;
  left: 20px;
  width: calc(100% - 40px);
  padding: 10px 10px 10px 150px;
  opacity: 0;
  transform: translateY(0%);
  transition: transform 0.3s ease-in, opacity 0.3s ease-in;
  z-index: 0;
}

.music-container.play .music-info {
  opacity: 1;
  transform: translateY(-100%);
}

.music-info h4 {
  margin: 0;
}

.progress-container {
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 0;
  height: 4px;
  width: 100%;
}

.progress {
  background-color: #fe8daa;
  border-radius: 5px;
  height: 100%;
  width: 0%;
  transition: width 0.1s linear;
}
</style>