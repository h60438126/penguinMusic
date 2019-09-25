<template>
  <div class="loading">
    <div class="img"></div>
  </div>
</template>

<script>
export default {
  name: "loading"
};
</script>

<style lang="scss" scoped>
.loading {
  width: 100%;
  height: 100%;
  .img {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -45px;
    margin-left: -45px;
    width: 90px;
    height: 90px;

    @include bg-img("/image/common_loading", 90px 90px);

    animation: loadingTime 2s linear infinite;
  }
  @keyframes loadingTime {
    from {
      transform: rotateZ(0deg);
    }
    to {
      transform: rotateZ(360deg);
    }
  }
}
</style>