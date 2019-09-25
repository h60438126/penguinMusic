<template>
  <div class="search">
    <div class="searchBar">
      <div class="searchBarCont">
        <span class="ic_search"></span>
        <a-select
          showSearch
          :value="value"
          placeholder="搜索歌曲、歌单、专辑"
          :defaultActiveFirstOption="false"
          :showArrow="false"
          :filterOption="false"
          @search="handleSearch"
          @change="handleChange"
          :notFoundContent="null"
          class="ant_search"
        >
          <a-select-option
            v-for="(d, index) in data"
            :key="d.songMid"
            v-on:click="goToSong(d, index)"
          >
            {{ d.songName }}
          </a-select-option>
        </a-select>
        <span class="ic_cancel">取消</span>
      </div>
    </div>
    <div class="hotSearch">
      <h3 class="title">热门搜索</h3>
      <div class="hotBox">
        <div
          v-on:click="onHot(hot)"
          class="hotSearchSong"
          v-for="(hot, index) in hotSongList"
          v-bind:key="index"
        >
          <span>{{ hot }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { IN_THIS_SONG } from "@/store/mutations-types";
export default {
  name: "search",
  data() {
    return {
      hotSongList: [],
      songList: {},
      data: [],
      value: undefined
    };
  },
  methods: {
    //请求搜索
    async getSearch(inp) {
      let res = await this.$http(`/search/${inp}`);
      res = res.data;
      this.data = res.data.songList;
      console.log(this.data);
    },
    //三方库搜索传值
    handleSearch(value) {
      if (value.length > 0) {
        this.getSearch(value);
      }
    },
    //三方库搜索结果展示
    handleChange(num) {
      console.log(num);
    },
    //点击跳转
    goToSong(d, index) {
      this.songList.songList = this.data;
      let obj = {
        songList: this.songList,
        issong: d,
        theIndex: index
      };
      console.log(obj);
      this.$store.commit(IN_THIS_SONG, obj);
      console.log(this.$store.state.insong);
      this.$router.push({
        path: "/inSong",
        query: obj.issong
      });
    },
    //点击热门
    onHot(value) {
      this.getSearch(value);
      // this.$nextTick(()=>{
      //   let d = this.data[0];
      //   this.goToSong(d,0)
      // })
      setTimeout(() => {
        let d = this.data[0];
        this.goToSong(d, 0);
      }, 700);
    }
  },
  created() {
    this.hotSongList = this.$store.state.hotSongList;
  }
};
</script>

<style lang="scss" scoped>
.searchBar {
  background: #f4f4f4;
  padding: 10px;
  .searchBarCont {
    display: flex;
    border-radius: 3px;
    background: #fff;
    .ic_search {
      flex: 0 0 38px;
      width: 38px;
      height: 38px;
      display: inline-block;

      @include bg-img("/image/search_icon", 38px 38px);
    }
    .ic_cancel {
      flex: 0 0 38px;
      width: 38px;
      height: 38px;
      display: inline-block;
      text-align: center;
      line-height: 38px;
      background: #f4f4f4;
    }
  }
}
.hotSearch {
  padding: 15px;
  .title {
    margin-bottom: 10px;
    color: #555;
    font-size: 14px;
  }
  .hotSearchSong {
    display: inline-block;
    padding: 0 10px;
    margin-bottom: 10px;
    margin-right: 14px;
    height: 30px;
    line-height: 30px;
    border-radius: 30px;
    border: 1px solid rgba(0, 0, 0, 0.6);
    font-size: 14px;
    color: #000;

    &:first-child {
      color: #fc4524;
      border-color: #fc4524;
    }
  }
}
</style>

<style>
.ant_search {
  flex: 1;
  padding: 3px 0;
  color: rgba(0, 0, 0, 0.3);
  border: 0;
  outline: none;
}
</style>