<template>
  <div class="app-wrapper">
    <Navigation v-if="!navigation" />
    <div class="app">
      <router-view />
    </div>
    <MusicContainer v-if="!navigation & !createPostRoute" class="music-container" />
    <Footer v-if="!navigation" />
  </div>
</template>

<script>
import Navigation from "./components/Navigation";
import MusicContainer from "./components/MusicContainer";
import Footer from "./components/Footer";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "app",
  components: { Navigation, Footer, MusicContainer },
  data() {
    return {
      navigation: null,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(async (user) => {
      this.$store.commit("updateUser", user);
      if (user) {
        console.log(firebase.auth().currentUser.uid);
        this.$store.dispatch("getCurrentUser", user);
      }
    });
    this.checkRoute();
    //this.$store.dispatch("getPost");
  },
  mounted() {},
  methods: {
    checkRoute() {
      if (
        this.$route.name === "Login" ||
        this.$route.name === "Register" ||
        this.$route.name === "ForgotPassword"
      ) {
        this.navigation = true;
      } else {
        this.navigation = false;
      }

      if (this.$route.name === "CreateSong") {
        this.createPostRoute = true;
      } else {
        this.createPostRoute = false;
      }
      return;
    },
  },
  watch: {
    $route() {
      this.checkRoute();
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.app-wrapper {
  height: 100%;
  width: 100%;
  margin: 0;
  background-color: #2a2a72;
  background-image: linear-gradient(0deg, #009ffd 23.8%, #2a2a72 92%);
  display: flex;
  flex-direction: column;

  .app {
    display: flex;
    flex-direction: column;
    min-height: 60vh;
  }

  .music-container {
    width: 470px;
    top: -50px;
    margin: 0 auto;
  }

  .link {
    cursor: pointer;
    text-decoration: none;
    text-transform: uppercase;
    color: black;
  }

  .link-light {
    color: #fff;
  }

  .arrow {
    margin-left: 8px;
    width: 12px;
    path {
      fill: #000;
    }
  }

  .arrow-light {
    path {
      fill: #fff;
    }
  }

  .router-button {
    transition: 500ms ease all;
    cursor: pointer;
    margin-top: 24px;
    padding: 12px 24px;
    background-color: #303030;
    color: #fff;
    border-radius: 20px;
    border: none;
    text-transform: uppercase;

    &:focus {
      outline: none;
    }

    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }

  .button-ghost {
    color: #000;
    padding: 0;
    border-radius: 0;
    margin-top: 50px;
    font-size: 15px;
    font-weight: 500;
    background-color: transparent;
    @media (min-width: 700px) {
      margin-top: 0;
      margin-left: auto;
    }

    i {
      margin-left: 8px;
    }
  }

  .button-light {
    background-color: transparent;
    border: 2px solid #fff;
    color: #fff;
  }

  .button-inactive {
    pointer-events: none !important;
    cursor: none !important;
    background-color: rgba(128, 128, 128, 0.5) !important;
  }

  .error {
    text-align: center;
    font-size: 12px;
    color: red;
  }

  .blog-card-wrap {
    position: relative;
    padding: 80px 16px;
    @media (min-width: 500px) {
      padding: 100px 16px;
    }

    .blog-cards {
      display: grid;
      gap: 32px;
      grid-template-columns: 1fr;

      @media (min-width: 500px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 900px) {
        grid-template-columns: repeat(3, 1fr);
      }
      @media (min-width: 1200px) {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
}
</style>