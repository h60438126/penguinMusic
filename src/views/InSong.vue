<template>
  <div class="inSong">
    <audio ref="audio" :src="songUrl[getTheIndex]" autoplay />
    <div
      class="bgImg"
      :style="
        `background-image: url('${coverHeader.albumImgUrl}'); opacity: 1;`
      "
    >
      <!-- <img :src="coverHeader.albumImgUrl" alt="背景图" /> -->
      <div class="blackbg"></div>
    </div>
    <div class="header" v-if="isSongData.insong.singer">
      <span class="leftIcon" v-on:click="backoff"></span>
      <h1 class="songName">{{ isSongData.insong.songName }}</h1>
      <h2 class="singerName">{{ isSongData.insong.singer[0].singerName }}</h2>
    </div>
    <div class="imgdiv">
      <div v-show="true" class="imgBox" ref="imgBox">
        <img v-lazy="coverHeader.albumImgUrl" alt="播放图片" />
      </div>
    </div>
    <div class="playLine">
      <span class="currentPlay">{{ currentPlay | getduration }}</span>
      <div class="lineBar">
        <div class="line" ref="line">
          <span class="spot"></span>
        </div>
      </div>
      <span class="totalPlay">{{ totalPlay | getduration }}</span>
    </div>
    <div class="btnBox">
      <div class="isPattern">
        <span
          v-on:click="btnPattern('order')"
          v-show="pattern.order"
          class="play_normal"
        ></span>
        <span
          v-on:click="btnPattern('circulation')"
          v-show="pattern.circulation"
          class="play_single"
        ></span>
      </div>
      <div>
        <span class="playPre" v-on:click="lastSong(getTheIndex)"></span>
      </div>
      <div>
        <span
          v-bind:class="{ stop: nowPlay }"
          class="playBtn"
          v-on:click="btnPlayFun"
        ></span>
      </div>
      <div>
        <span class="playNext" v-on:click="nextSong(getTheIndex)"></span>
      </div>
      <div>
        <span
          v-on:click="likeFun"
          class="likeSong"
          v-bind:class="{ likeActive: likeShow }"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import Lyric from "lyric-parser";
import { mapGetters } from "vuex";
import { getduration } from "../js/round";
export default {
  name: "inSong",
  data() {
    return {
      coverHeader: [],
      isSongData: [],
      songUrl: [],
      theIndex: 0,
      currentPlay: 0,
      totalPlay: 0,
      nowPlay: true,
      percentage: 0,
      deg: 0,
      pattern: { order: true, circulation: false },
      //歌词解析
      currentLyric: null,
      currentLineNum: 0,
      playingLyric: "",
      likeShow: false,
      showLoading: true
    };
  },
  filters: {
    getduration
  },
  computed: {
    ...mapGetters(["getTheIndex", "getTheLikeSong"])
  },
  methods: {
    //返回
    backoff() {
      this.$router.go(-1);
    },
    //请求接口
    async getCover() {
      this.isSongData = this.$store.state;
      let { albumMid, singer, songMid } = this.$store.state.insong;
      console.log(singer);
      if (singer) {
        let res = await this.$http(
          `/albumImg/${albumMid}/${singer[0].singerMid}`
        );
        this.coverHeader = res.data.data;
      }
      if (this.coverHeader.length == 0) {
        this.$router.go(-1);
      }
      //判断喜欢收藏
      for (let i = 0; i < this.isSongData.songLikeList.length; i++) {
        if (this.isSongData.songLikeList[i].songMid === songMid) {
          return (this.likeShow = true);
        } else {
          this.likeShow = false;
        }
      }
    },
    async getSong() {
      let resUrl = await this.$http(
        `/songUrllist/${this.$store.state.onlySongList}`
      );
      this.songUrl = resUrl.data.data;
      this.theIndex = this.getTheIndex;
    },
    //播放
    btnPlayFun() {
      if (this.nowPlay) {
        this.$refs.audio.pause();
        this.nowPlay = false;
        setTimeout(() => {
          this.$refs.imgBox.classList.add("imgStop");
        }, 200);
      } else {
        this.$refs.audio.play();
        this.nowPlay = true;
        setTimeout(() => {
          this.$refs.imgBox.classList.remove("imgStop");
          this.$refs.imgBox.classList.add("imgStart");
        }, 200);
      }
    },
    //播放时长
    time() {
      this.$refs.audio.addEventListener("timeupdate", this.updateTime);
    },
    updateTime() {
      if (this.$refs.audio) {
        this.totalPlay = this.$refs.audio.duration;
        if (String(this.totalPlay) == "NaN") {
          this.totalPlay = 0;
        }
        this.currentPlay = this.$refs.audio.currentTime;
        console.log(this.totalPlay, this.currentPlay);
        this.percentage = parseInt(this.currentPlay) / parseInt(this.totalPlay);
        this.$refs.line.style.width = `${this.percentage * 100}%`;

        //动画停止
        if (!this.nowPlay) {
          this.$refs.audio.pause();
          this.$refs.imgBox.classList.add("imgStop");
        }
        //播放结束
        if (this.$refs.audio.ended) {
          console.log("end");
          this.nextSong(this.getTheIndex);
        }
      }
    },
    //上下一首
    nextSong(index) {
      this.$store.commit("NEXTSONG", index);
      this.getCover();
      this.nowPlay = false;
      this.$refs.imgBox.classList.remove("imgStart");
      setTimeout(() => {
        this.btnPlayFun();
      }, 500);
    },
    lastSong(index) {
      if (index) {
        this.$store.commit("LASTSONG", index);
        this.getCover();
        this.nowPlay = false;
        this.$refs.imgBox.classList.remove("imgStart");
        setTimeout(() => {
          this.btnPlayFun();
        }, 500);
      } else {
        alert("已经是第一首了");
      }
    },
    //选择模式
    btnPattern(index) {
      if (index === "order") {
        this.pattern.order = false;
        this.pattern.circulation = true;
      }
      if (index === "circulation") {
        this.pattern.order = true;
        this.pattern.circulation = false;
      }
      if (this.pattern.circulation) {
        this.$refs.audio.loop = true;
      } else {
        this.$refs.audio.loop = false;
      }
    },
    //自动播放
    autoPlayback() {
      this.$refs.audio.play();
      if (this.$refs.audio.play) {
        this.nowPlay = true;
        setTimeout(() => {
          this.$refs.imgBox.classList.remove("imgStop");
          this.$refs.imgBox.classList.add("imgStart");
        }, 500);
      }
    },
    //喜欢
    likeFun() {
      if (this.isSongData) {
        let insong = this.isSongData.insong;
        this.$store.commit("LIKE_SONG", insong);
        this.likeShow = !this.likeShow;
      }
      console.log(this.likeShow, this.$store.state.songLikeList);
    },
    //歌词解析
    async getLyric() {
      let id = this.$store.state.insong.songId;
      let res = await this.$http(`/lrc/${id}`);
      res = res.data.data.lyric;
      this.currentLyric = new Lyric(res);
      console.log(this.currentLyric);
    }
  },
  created() {
    this.getCover();
    this.getSong();
    this.getLyric();
  },
  mounted() {
    this.$nextTick(() => {
      this.autoPlayback();
      this.time();
    });
  },
  beforeCreate() {
    this.showLoading = true;
  }
};
</script>

<style lang="scss" scoped>
.inSong {
  .bgImg {
    position: fixed;
    top: -30px;
    bottom: -30px;
    left: -30px;
    right: -30px;
    filter: blur(30px);
    .blackbg {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
    }
  }
  .btnBox {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
    display: flex;
    div {
      flex: 1;
      display: inline-block;
      width: 66px;
      height: 55px;

      .playPre {
        display: inline-block;
        width: 100%;
        height: 100%;

        @include bg-img("/image/player_btn_pre", 66px 55px);
      }
      .playBtn {
        display: inline-block;
        width: 100%;
        height: 100%;

        @include bg-img("/image/ic_action_bar_play", 66px 55px);

        &.stop {
          @include bg-img("/image/ic_action_bar__pause", 66px 55px);
        }
      }
      .playNext {
        display: inline-block;
        width: 100%;
        height: 100%;

        @include bg-img("/image/player_btn_next", 66px 55px);
      }
      .likeSong {
        display: inline-block;
        width: 100%;
        height: 100%;

        @include bg-img("/image/action_disable", 55px 55px);

        &.likeActive {
          @include bg-img("/image/action_normal", 55px 55px);
        }
      }
    }
  }
}
.header {
  padding: 20px;
  position: relative;
  .leftIcon {
    position: absolute;
    top: 30px;
    left: 20px;
    display: inline-block;
    transform: rotateZ(45deg);
    width: 22px;
    height: 22px;
    @include bg-img("/image/ic_zuoxia", 22px 22px);
  }
  .songName {
    font-weight: 300;
    font-size: 18px;
    text-align: center;
    color: #22d59c;
    font-size: 20px;
    font-weight: 400;
    margin: 0;
  }
  .singerName {
    margin: 2px 0;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
    color: #eee;
  }
}
.imgdiv {
  margin: 10px 0;
  overflow: hidden;
  .imgBox {
    &.imgStart {
      animation: animgBox 20s linear infinite;
    }
    &.imgStop {
      animation-play-state: paused;
    }

    img {
      display: block;
      max-width: 300px;
      max-height: 300px;
      margin: 0 auto;
      border-radius: 50%;
    }
    //动画
    @keyframes animgBox {
      from {
        transform: rotateZ(0deg);
      }
      to {
        transform: rotateZ(360deg);
      }
    }
  }
}
.playLine {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 100px;
  padding: 0 10px;
  display: flex;
  height: 24px;
  .currentPlay {
    flex: 0 0 38px;
    display: block;
    width: 38px;
    font-size: 16px;
    margin-right: 15px;
    color: #eee;
    line-height: 24px;
  }
  .lineBar {
    flex: 1;
    height: 2px;
    background-color: #eee;
    margin: 11px 0;
    .line {
      position: relative;
      width: 0%;
      height: 100%;
      background-color: #30c27c;
      .spot {
        position: absolute;
        right: -7.5px;
        top: -7.5px;
        display: block;
        width: 15px;
        height: 15px;
        background-color: #fff;
        border-radius: 50%;
      }
    }
  }
  .totalPlay {
    flex: 0 0 38px;
    display: block;
    width: 38px;
    font-size: 16px;
    margin-left: 15px;
    color: #eee;
    line-height: 24px;
  }
}
.isPattern {
  span {
    display: inline-block;
    width: 72px;
    height: 60px;

    &.play_normal {
      @include bg-img("/image/play_normal", 66px 55px);
    }
    &.play_single {
      @include bg-img("/image/play_single", 66px 55px);
    }
  }
}
</style>