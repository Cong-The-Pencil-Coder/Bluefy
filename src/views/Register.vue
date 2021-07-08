<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Already have an account ?
        <router-link class="router-link" :to="{ name: 'Login' }"
          >Login</router-link
        >
      </p>
      <h2>Create your FireBlogs Account</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Fist Name" v-model="firstName" />
          <UserIcon class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Last Name" v-model="lastName" />
          <UserIcon class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="username" v-model="username" />
          <UserIcon class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <EmailIcon class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
          <PasswordIcon class="icon" />
        </div>
        <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>
      <button class="router-button" @click.prevent="register">Sign Up</button>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import EmailIcon from "../assets/Icons/envelope-regular.svg";
import PasswordIcon from "../assets/Icons/lock-alt-solid.svg";
import UserIcon from "../assets/Icons/user-alt-light.svg";
import db from "../firebase/firebaseInit";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Register",
  components: { EmailIcon, PasswordIcon, UserIcon },
  data() {
    return {
      firstName: null,
      lastName: null,
      username: null,
      email: null,
      password: null,
      error: null,
      errorMsg: "",
    };
  },
  methods: {
    async register() {
      if (
        this.firstName !== "" &&
        this.lastName !== "" &&
        this.username !== "" &&
        this.email !== "" &&
        this.password !== ""
      ) {
        this.error = false;
        this.errorMsg = "";
        const firebaseAuth = await firebase.auth();
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );
        const result = await createUser;
        // reach out to the firebase collection:
        const dataBase = db.collection("users").doc(result.user.uid);
        await dataBase.set({
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
        });
        // Set the user to our homepage:
        this.$router.push({ name: "Home" });

        return;
      }
      this.error = true;
      this.errorMsg = "Please fill out all the fields";
      return;
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
    color: #fff;
  }
}
</style>