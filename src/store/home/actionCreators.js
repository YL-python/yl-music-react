// 引入常量
import * as actionTypes from './constants';

// 引入请求方法
import { getRecommendList } from '@/service/playlist';

// 真正的 action   指明类型  指明修改的数据
const changeRecommendListAction = (recommendList) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  recommendList,
});

export const getRecommendListAction = (limit) => {
  return (dispatch) => {
    getRecommendList(limit).then((res) => {
      dispatch(changeRecommendListAction(res.result));
    });
  };
};
