class Lyric {
  constructor(lrc) {
    this.lrc = lrc;
    this.lyric = this._parseLyric(lrc?.lrc?.lyric || '');
    this.tlyric = this._parseLyric(lrc?.tlyric?.lyric || '');
    this.lyricuser = lrc.lyricUser;
    this.transuser = lrc.transUser;
    this.lyricWithTranslation = this._getLWT();
  }

  // 给一个时间，返回 歌词 的 索引
  seek(startTime = 0) {
    let index = this._findCurNum(startTime) - 1;
    return index < 0 ? 0 : index;
  }

  // 查找索引
  _findCurNum(time) {
    for (let i = 0; i < this.lyric.length; i++) {
      if (time < this.lyric[i].time) {
        return i;
      }
    }
    return this.lyric.length;
  }

  // 解析歌词
  _parseLyric(lrc) {
    const timeReg = /\[(\d*):(\d*)\.(\d*)\]/g;
    const lyrics = lrc.split('\n');
    let lrcObj = [];
    for (let i = 0; i < lyrics.length; i++) {
      const lyric = decodeURIComponent(lyrics[i]);
      const timeRegExpArr = timeReg.exec(lyric);
      timeReg.lastIndex = 0;
      if (!timeRegExpArr) continue;
      const content = lyric.replace(timeReg, '').trim();
      const min = timeRegExpArr[1] * 60;
      const sec = timeRegExpArr[2] * 1;
      const ms = timeRegExpArr[3] / 1000;
      if (content !== '') {
        lrcObj.push({ time: min + sec + ms, rawTime: timeRegExpArr[0], content });
      }
    }
    lrcObj.sort((a, b) => a.time - b.time);
    return lrcObj;
  }

  //
  _getLWT() {
    let ret = [];
    // 空内容的去除
    const lyricFiltered = this.lyric.filter(({ content }) => Boolean(content));
    // content统一转换数组形式
    if (lyricFiltered.length) {
      lyricFiltered.forEach((l) => {
        const { rawTime, time, content } = l;
        const lyricItem = { time, content, contents: [content] };
        const sameTimeTLyric = this.tlyric.find(
          ({ rawTime: tLyricRawTime }) => tLyricRawTime === rawTime
        );
        if (sameTimeTLyric) {
          const { content: tLyricContent } = sameTimeTLyric;
          if (content) {
            lyricItem.contents.push(tLyricContent);
          }
        }
        ret.push(lyricItem);
      });
    } else {
      ret = lyricFiltered.map(({ time, content }) => ({
        time,
        content,
        contents: [content],
      }));
    }
    return ret;
  }
}
export default Lyric;
