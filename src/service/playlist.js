import request from './request';
import { mapTrackPlayableStatus } from '@/utils/common';
import Album from '@/assets/js/album';
import Playlist from '@/assets/js/playlist.js';

/**
 * 推荐歌单
 * 说明 : 调用此接口 , 可获取推荐歌单
 * - limit: 取出数量 , 默认为 30 (不支持 offset)
 * - 调用例子 : /personalized?limit=1
 */
export function getRecommendList(limit = 40) {
  return request({ url: '/personalized', params: { limit } }).then((res) => {
    res.albums = res.result.map((item) => new Album(item));
    return res;
  });
}

/**
 * 获取歌单详情
 * 说明 : 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id, 可以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)，
 * 但是返回的trackIds是完整的，tracks 则是不完整的，可拿全部 trackIds 请求一次 song/detail 接口
 * 获取所有歌曲的详情 (https://github.com/Binaryify/NeteaseCloudMusicApi/issues/452)
 * - id : 歌单 id
 * - s : 歌单最近的 s 个收藏者, 默认为8
 * @param {number} id
 */
export function getPlaylistDetail(id) {
  let params = { id };
  return request({ url: '/playlist/detail', params })
    .then((data) => {
      data.playlist.tracks = mapTrackPlayableStatus(
        data.playlist.tracks,
        data.privileges || []
      );
      return data;
    })
    .then((data) => {
      data.playlistDetail = new Playlist(data.playlist);
      return data;
    });
}

/**
 * 所有榜单
 * 说明 : 调用此接口,可获取所有榜单 接口地址 : /toplist
 */
export function toplists() {
  return request({ url: '/toplist' }).then((res) => {
    res.albums = res.list.map((item) => new Album(item));
    return res;
  });
}

/**
 * 获取精品歌单
 * 说明 : 调用此接口 , 可获取精品歌单
 * - cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部", 可从精品歌单标签列表接口获取(/playlist/highquality/tags)
 * - limit: 取出歌单数量 , 默认为 20
 * - before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
 * @param {Object} params
 * @param {string} params.cat
 * @param {number=} params.limit
 * @param {number} params.before
 */
export function highQualityPlaylist(params) {
  return request({ url: '/top/playlist/highquality', params }).then((res) => {
    res.albums = res.playlists.map((item) => new Album(item));
    return res;
  });
}

/**
 * 歌单 ( 网友精选碟 )
 * 说明 : 调用此接口 , 可获取网友精选碟歌单
 * - order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
 * - cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
 * - limit: 取出歌单数量 , 默认为 50
 * @param {Object} params
 * @param {string} params.order
 * @param {string} params.cat
 * @param {number=} params.limit
 */
export function topPlaylist(params) {
  return request({ url: '/top/playlist', params: { ...params, limit: 20 } }).then(
    (res) => {
      res.albums = res.playlists.map((item) => new Album(item));
      return res;
    }
  );
}
