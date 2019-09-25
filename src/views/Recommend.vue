<template>
  <div class="recommend">
    <a-carousel autoplay>
      <div v-for="(slider, index) in sliders" v-bind:key="index">
        <img :src="slider" alt="图片" />
      </div>
    </a-carousel>
    <div class="radioStation">
      <h2 class="text">电台</h2>
      <div class="radioBox">
        <a-card
          hoverable
          v-for="(radioList, index) in radioLists"
          v-bind:key="index"
          class="card"
          v-on:click="btncard(index)"
        >
          <span class="ic_play"></span>
          <img alt="example" v-lazy="radioList.picUrl" slot="cover" />
          <a-card-meta :title="radioList.title"></a-card-meta>
        </a-card>
      </div>
    </div>
    <div class="Popular">
      <h2 class="text">热门歌单</h2>
      <ul class="hotsong">
        <li
          class="hotsongImg"
          v-for="rankingList in rankingLists"
          v-bind:key="rankingList.id"
          v-on:click="btnHotSong(rankingList.id)"
        >
          <div>
            <span class="ic_play"></span>
            <img v-lazy="rankingList.picUrl" />
          </div>
          <div class="textBox">
            <span>{{ rankingList.title }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "recommend",
  data() {
    return {
      sliders: {},
      radioLists: [],
      rankingLists: []
    };
  },
  methods: {
    async getRecommend() {
      let res = await this.$http("/recommend");
      this.sliders = res.data.data.slider;
      this.radioLists = res.data.data.radioList;
      console.log(this.sliders);
      console.log(this.radioLists);
    },
    async getRankingList() {
      let res = await this.$http("/toplist");
      this.rankingLists = res.data.data;
      console.log(this.rankingLists);
    },
    btncard(index) {
      if (index === 0) {
        this.$router.push({
          path: "/songList",
          query: {
            id: 26
          }
        });
      }
      if (index === 1) {
        this.$router.push({
          path: "/songList",
          query: {
            id: 29
          }
        });
      }
    },
    btnHotSong(index) {
      this.$router.push({
        path: "/songList",
        query: {
          id: index
        }
      });
    }
  },
  created() {
    this.getRecommend();
    this.getRankingList();
  }
};
</script>

<style scoped>
/* For demo */
.ant-carousel >>> .slick-slide {
  overflow: hidden;
}

.ant-carousel >>> .slick-slide img {
  width: 100%;
  height: 150px;
}

.recommend {
  background-color: #f4f4f4;
}

.radioStation {
  padding: 5px 10px;
}
.text {
  font-size: 16px;
  color: #000;
  margin-bottom: 11px;
  font-weight: 400;
}
.radioBox {
  display: flex;
  height: 235px;
}
.card {
  flex: 1;
  margin-right: 8px;
}
.card:last-child {
  margin-right: 0px;
}
.ant-card-body {
  padding: 5px;
}
</style>
<style lang="scss" scoped>
.card {
  position: relative;
  .ic_play {
    display: block;
    position: absolute;
    height: 24px;
    bottom: 70px;
    right: 10px;
    width: 24px;
    z-index: 100;

    @include bg-img("/image/btn_play", 24px 24px);
  }
}
.Popular {
  padding: 5px 10px;
  .hotsong {
    display: flex;
    flex-wrap: wrap;
    .hotsongImg {
      width: 50%;
      padding: 0 4px;
      background: #fff;
      margin-bottom: 10px;
      img {
        width: 100%;
        height: 100%;
      }
      .textBox {
        padding: 24px;
      }
    }
  }
}
</style>