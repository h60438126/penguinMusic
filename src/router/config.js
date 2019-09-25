import Home from "../views/Home";
import Recommend from "../views/Recommend";
import RankingList from "../views/RankingList";
import SongList from "../views/SongList";
import InSong from "../views/InSong";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      { path: "/", name: "recommend", component: Recommend },
      { path: "rankingList", name: "rankingList", component: RankingList },
      {
        path: "search",
        name: "search",
        component: () => import("../views/Search.vue")
      }
    ]
  },

  { path: "/songList", name: "songList", component: SongList },
  { path: "/inSong", name: "inSong", component: InSong },
  {
    path: "/likeSong",
    name: "likeSong",
    component: () => import("../views/LikeSong")
  }
];

export default {
  routes,
  linkActiveClass: "classActive",
  linkExactActiveClass: "classExactActive"
};
