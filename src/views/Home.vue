<template>
  <div>
    <div class="top_box">
      <img
        class="logo_img"
        src="//y.gtimg.cn/mediastyle/mod/mobile/img/logo_ch.svg?max_age=2592000"
        alt="logo"
      />
      <span class="download" v-on:click="inLikeSong">喜欢收藏</span>
    </div>
    <div class="nav">
      <router-link to="/" tag="div">推荐</router-link>
      <router-link to="/rankingList" tag="div">排行榜</router-link>
      <router-link to="/search" tag="div">搜索</router-link>
    </div>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    inLikeSong() {
      this.$router.push({
        path: "/likeSong"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  display: flex;
  & > div {
    flex: 1;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.6);

    &.classExactActive {
      color: $theme_green;
      border-bottom: 2px solid $theme_green;
    }
  }
}
.top_box {
  position: relative;
  padding: 0 10px;
  height: 80px;

  .logo_img {
    display: inline-block;
    width: 126px;
    height: 35px;
    margin-top: 22.5px;
  }
  .download {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    min-width: 40px;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    text-align: center;
    font-size: 18px;
    color: $theme_green;
    border: solid 1px $theme_green;
    border-radius: 25px;
    list-style: none;
  }
}
</style>