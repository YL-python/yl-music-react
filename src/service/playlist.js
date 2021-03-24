import request from './request';

/**
 * 推荐歌单
 * 说明 : 调用此接口 , 可获取推荐歌单
 * - limit: 取出数量 , 默认为 30 (不支持 offset)
 * - 调用例子 : /personalized?limit=1
 */
export function getRecommendList(limit = 20) {
  return request({ url: '/personalized', method: 'get', params: { limit } });
}
