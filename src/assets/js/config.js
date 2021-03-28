// 和项目有关的配置信息

// 播放模式
export const PLAYMODE = {
  sequence: 0, // 顺序
  loop: 1, //单曲循环
  random: 2, // 随机
  getPlayModeText(num) {
    if (num === 1) return '循环模式';
    if (num === 2) return '随机模式';
    return '顺序模式';
  },
};
