<template>
  <div class="songList">
    <div class="player">
      <div class="playerBox">
        <div class="player_cover_img" v-if="songList.topInfo">
          <img :src="songList.topInfo.picAlbum" alt="cover图片" />
        </div>
      </div>
      <div class="playerInfo" v-if="songList.topInfo">
        <h2>{{ songList.topInfo.listName }}</h2>
        <p>更新时间：{{ songList.updateTime }}</p>
      </div>
      <div class="playerBtn"></div>
    </div>
    <div class="songContent">
      <div class="contentLine">排行榜 共{{ songList.totalSongNum }}首</div>
      <div class="content" ref="divList">
        <ul>
          <li
            v-on:click="goToSong(song, index)"
            v-for="(song, index) in songList.songList"
            v-bind:key="index"
          >
            <span class="listNumber">{{ index + 1 }}</span>
            <div class="songBox">
              <h2 class="songName">{{ song.songName }}</h2>
              <p class="singerName">
                <span v-for="(singer, index) in song.singer" v-bind:key="index"
                  >{{ singer.singerName }}
                </span>
              </p>
            </div>
            <span class="ic_musichal"></span>
          </li>
        </ul>
      </div>
    </div>
    <div class="loading" v-show="showLoading">
      <Loading />
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Loading from "../components/loading/Loading";
import { GET_ALBUM_ID, IN_THIS_SONG } from "@/store/mutations-types";
export default {
  name: "songList",
  components: {
    Loading
  },
  data() {
    return {
      songList: {},
      showLoading: true
    };
  },
  methods: {
    async getSongList(songListID) {
      let res = await this.$http(`/songList/${songListID}`);
      this.songList = res.data.data;
      console.log(this.songList);
      this.$nextTick(() => {
        this.getBScroll();
        this.showLoading = false;
      });
    },
    goToSong(song, index) {
      let obj = {
        songList: this.songList,
        issong: song,
        theIndex: index
      };
      this.$store.commit(IN_THIS_SONG, obj);
      console.log(this.$store.state.insong);
      this.$router.push({
        path: "/inSong",
        query: obj.issong
      });
    },
    getBScroll() {
      if (this.betterScroll) {
        this.betterScroll.refresh();
      } else {
        this.betterScroll = new BScroll(this.$refs.divList, {
          click: true
        });
      }
    }
  },
  created() {
    let { id } = this.$route.query;
    if (id != this.$store.state.albumID) {
      this.$store.commit(GET_ALBUM_ID, id);
    }
    this.getSongList(this.$store.state.albumID);
  },
  beforeDestroy() {
    this.betterScroll.destroy();
    this.betterScroll = null;
  },
  beforeCreate() {
    this.showLoading = true;
  }
};
</script>

<style lang="scss" scoped>
.songList {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  bottom: 0px;
  overflow: hidden;
}
.player {
  margin: 30px 0 15px;
}
.playerBox {
  margin: 0 auto 25px;
  width: 190px;
  height: 190px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 18px;
  }
}
.playerInfo {
  margin-bottom: 12px;
  text-align: center;

  h2 {
    margin-bottom: 12px;
    font-size: 18px;
    color: #121212;
  }
  p {
    font-size: 14px;
    color: grey;
  }
}

.contentLine {
  margin: 0 16px;
}

.content {
  margin: 0 7px;
  overflow: hidden;

  li {
    padding: 10px 0;
    display: flex;
    height: 60px;

    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3) {
      .listNumber {
        color: #f56273;
      }
    }

    .listNumber {
      flex: 0 0 50px;
      width: 50px;
      font-size: 14px;
      font-weight: 400;
      text-align: center;
      line-height: 40px;
    }

    .songBox {
      flex: 1;

      .songName {
        margin: 0;
        font-size: 14px;
        color: #000;
        font-weight: 400;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .singerName {
        margin: 0;
        overflow: hidden;
        span {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.4);
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }

    .ic_musichal {
      display: block;
      width: 40px;
      height: 40px;
      @include bg-img("/image/my_musichal", 20px 20px);
      background-position: 10px 10px;
    }
  }
}
.content {
  position: absolute;
  top: 341px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
.loading {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>