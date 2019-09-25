<template>
  <div class="rankingList">
    <div class="container">
      <ul>
        <li
          v-for="ranks in rankingList"
          v-bind:key="ranks.id"
          v-on:click="getAlbumID(ranks.id)"
        >
          <div class="imgBox">
            <img v-lazy="ranks.picUrl" alt="图片" />
          </div>
          <div class="textBox">
            <h2 class="albumName">{{ ranks.title }}</h2>
            <p
              class="topThree"
              v-for="songs in ranks.songList"
              v-bind:key="songs.number"
            >
              <span class="songNum">{{ songs.number }}</span
              ><span class="songName">{{ songs.songName }}</span
              ><span class="singName"> - {{ songs.singerName }}</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import { mapMutations } from "vuex";
import { GET_ALBUM_ID } from "@/store/mutations-types";
export default {
  name: "rankingList",
  data() {
    return {
      rankingList: []
    };
  },
  methods: {
    async getRankingList() {
      let res = await this.$http("/toplist");
      this.rankingList = res.data.data;
      console.log(this.rankingList);
    },
    getAlbumID(id){
      this.$store.commit(GET_ALBUM_ID,id);
      this.$router.push({
        path:"/songList",
        query:{id}
      })
    }
  },
  created() {
    this.getRankingList();
  }
};
</script>

<style lang="scss" scoped>
.rankingList{
  background-color: #f4f4f4;
}
.container {
  padding: 10px;
}
li {
  display: flex;
  margin-bottom: 10px;
  background-color:#fff;
  .imgBox {
    flex: 0 0 100px;
    width: 100px;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .textBox {
    flex: 1;
    height: 100px;
    margin: 0 10px 0 15px;
    padding: 4px 0;
    overflow: hidden;

    .albumName {
      font-size: 16px;
      color: #000;
      font-weight: 400;
      margin-bottom: 5px;
    }

    .topThree {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.5);
      margin: 0;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .songName {
      color: #000;
      margin-left: 8px;
      margin-right: 5px;
    }
  }
}
</style>
