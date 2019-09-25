const getScoreRound = num => {
  let score = Math.round(num * 10) / 10;
  return score;
};

//播放
const getPlayRound = num => {
  if (parseInt(num) > 100000000) {
    let play = Math.round((num / 100000000) * 10) / 10;
    play = `${play}亿`;
    return play;
  }
  if (parseInt(num) > 10000) {
    let play = Math.round((num / 10000) * 10) / 10;
    play = `${play}万`;
    return play;
  }
  if (parseInt(num) < 10000 && parseInt(num) > 0) {
    let play = Math.round(num * 10) / 10;
    return play;
  }
  if (parseInt(num) < 0) {
    let play = 0;
    return play;
  }
};

const getTemplateDate = time => {
  time = parseInt(time) * 1000;
  let date = new Date(time);
  let y = date.getFullYear();
  let M = date.getMonth();
  let d = date.getDate();
  let h = date.getHours();
  let m = date.getMinutes();

  // 给月日十分加零 1 -> 01  10 -> 10
  M = prefixIntrger(M);
  d = prefixIntrger(d);
  h = prefixIntrger(h);
  m = prefixIntrger(m);

  return `${y}-${M}-${d} ${h}:${m}`;
};

const prefixIntrger = n => {
  n = n + "";
  // 1 -> 1        12 -> 2
  // 01 -> 2      012 -> 3
  // 0             1
  n = (0 + n).substr(n.length - 1);
  return n;
};

//播放时长
const getduration = time => {
  let minute = Math.floor(time / 60);
  let second = Math.floor(time % 60);
  if (minute < 10) {
    minute = `0${minute}`;
  }
  if (second < 10) {
    second = `0${second}`;
  }

  return `${minute}:${second}`;
};

export { getScoreRound, getPlayRound, getTemplateDate, getduration };
