<template>
  <div class="likeSong">
    <div class="header">
      <span class="back" v-on:click="backFun"></span>
      喜欢/收藏
    </div>
    <div class="likeSongList">
      <ul>
        <li v-for="(like, index) in likeSongList" v-bind:key="index">
          <span class="ic_music"></span>
          <div class="likeMusicBox" v-on:click="inSongFun(like,index)">
            <h6>{{ like.songName }}</h6>
            <span v-for="songs in like.singer" v-bind:key="songs.number"
              >{{ songs.singerName }}
            </span>
          </div>
          <div class="delect">
            <span class="del"></span>
            <span class="endel" v-on:click="delLikeSong(index)">删除</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="nullBox" v-show="likeSongList.length == 0">
      <span>什么都没有哟，喜欢的话快去收藏吧~</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "likeSong",
  data() {
    return {
      likeSongList: []
    };
  },
  methods: {
    backFun() {
      this.$router.go(-1);
    },
    //删除喜欢
    delLikeSong(index) {
      if (this.likeSongList) {
        let isDel = this.likeSongList[index];
        console.log(isDel);
        this.$store.commit("LIKE_SONG", isDel);
      }
      console.log(this.$store.state.songLikeList);
    },
    //进入听歌
    inSongFun(like,index) {
      let obj = {
        songList: this.likeSongList,
        issong: like,
        theIndex: index
      };
      this.$store.commit("IN_THIS_SONG", obj);
      console.log(this.$store.state.insong);
      this.$router.push({
        path: "/inSong",
        query: obj.issong
      });
    }
  },
  created() {
    let { songLikeList } = this.$store.state;
    this.likeSongList = songLikeList;
    console.log(this.likeSongList);
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  height: 50px;
  background: $theme-green;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  color: #fff;
  padding: 0 10px;

  .back {
    display: block;
    position: absolute;
    top: 50%;
    left: 10px;
    width: 40px;
    height: 36px;
    transform: translateY(-50%);

    @include bg-img("/image/ic_back", 40px 36px);
  }
}
.likeSongList {
  margin-top: 10px;
  ul {
    li {
      display: flex;
      height: 50px;
      border-bottom: 1px solid #dfdddd;
      .ic_music {
        flex: 0 0 40px;
        display: inline-block;
        margin: 5px;
        width: 40px;
        height: 40px;
        @include bg-img("/image/my_musichal", 40px 40px);
      }
      .likeMusicBox {
        flex: 1;
        h6 {
          margin-bottom: 5px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        span {
          display: inline-block;
          color: grey;
        }
      }
      .delect {
        position: relative;
        margin: 5px;
        flex: 0 0 40px;
        .del {
          //   display: inline-block;
          display: none;
          margin: 5px;
          width: 40px;
          height: 40px;
          @include bg-img("/image/action_delete_with_bg", 40px 40px);
        }
        .endel {
          display: inline-block;
          width: 40px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          color: #fff;
          background: tomato;
          font-size: 18px;
          font-weight: 500;
        }
      }
    }
  }
}
.nullBox {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -10;
  span {
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
  }
}
</style>