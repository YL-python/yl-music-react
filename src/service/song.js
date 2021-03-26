import request from './request';
import { mapTrackPlayableStatus } from '@/utils/common';

/**
 * 获取歌曲详情
 * 说明 : 调用此接口 , 传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情(注意:歌曲封面现在需要通过专辑内容接口获取)
 * @param {string} ids - 音乐 id, 例如 ids=405998841,33894312
 */
export function getSongDetail(ids) {
  return request({ url: '/song/detail', method: 'get', params: { ids } }).then((data) => {
    data.songs = mapTrackPlayableStatus(data.songs, data.privileges);
    data.songs.sort((a, b) => b.playable - a.playable);
    return data;
  });
}

/**
 * 获取歌词
 * 说明 : 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
 * @param {number} id - 音乐 id
 */
export function getLyric(id) {
  return request({ url: '/lyric', method: 'get', params: { id } });
}

export function getSongUrl(id) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}
