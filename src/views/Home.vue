<template>
  <div class="home">
    <transition name="fade">
      <div class="welcome-message">
        <h1>Welcome to Bluefy!</h1>
        <h1>The place where you can relax!</h1>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style lang='scss' scoped>
.home {
  .welcome-message {
    position: relative;
    top: 200px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 30px;

    @media (min-width: 800px) {
      text-align: center;
      gap: 0;
      font-size: 30px;
    }
  }

  .fade-enter-active {
    transition: opacity 2s ease;
  }
  .fade-enter .fade-enter-from {
    opacity: 0;
  }
}
</style>