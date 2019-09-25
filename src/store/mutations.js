import * as types from "./mutations-types";
export default {
  [types.GET_ALBUM_ID](state, albumID) {
    state.albumID = albumID;
  },
  //主逻辑，传入正在播放的歌曲信息，对应InSong路由
  [types.IN_THIS_SONG](state, inthissong) {
    let { songList, issong, theIndex } = inthissong;
    state.insong = issong;
    state.songList = songList;
    state.theIndex = theIndex;
    let onlySong = [];
    if (songList.songList) {
      songList.songList.forEach(item => {
        onlySong.push(item.songMid);
      });
    } else {
      songList.forEach(item => {
        onlySong.push(item.songMid);
      });
    }
    state.onlySongList = onlySong.join(",");
  },
  //下一首
  [types.NEXTSONG](state, index) {
    state.theIndex = index + 1;
    console.log(state.theIndex);
    let issong = state.songList.songList[index + 1];
    state.insong = issong;
    console.log(state.insong);
  },
  //上一首
  [types.LASTSONG](state, index) {
    state.theIndex = index - 1;
    console.log(state.theIndex);
    let issong = state.songList.songList[index - 1];
    state.insong = issong;
    console.log(state.insong);
  },
  //喜欢
  [types.LIKE_SONG](state, inlikesong) {
    let count = 0;
    let { songMid } = inlikesong;
    if (state.songLikeList.length > 0) {
      for (let i = 0; i < state.songLikeList.length; i++) {
        if (state.songLikeList[i].songMid === songMid) {
          state.songLikeList.splice(i, 1);
          console.log("count", count);
          return (count = 0);
        } else {
          count = 1;
          console.log("count", count);
        }
      }
      if (count === 1) {
        state.songLikeList.push(inlikesong);
      }
    }
    if (state.songLikeList.length === 0) {
      state.songLikeList.push(inlikesong);
    }
    console.log(state.songLikeList);
  }
};
