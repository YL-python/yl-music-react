// 引入常量
import * as actionTypes from './constants';

// 引入请求方法
import { getRecommendList } from '@/service/playlist';

// 真正的 action   指明类型  指明修改的数据
const changeCategoriesAction = (categories) => ({
  type: actionTypes.CHANGE_CATEGORIES,
  categories,
});

export const toggleCategorys = (name) => {
  return (dispatch, getState) => {
    let categories = getState().getIn(['explore', 'categories']);
    let cat = categories.find((c) => c.name === name);
    cat.enable = !cat.enable;
    categories = categories.map((c) => {
      if (c.name === name) return cat;
      return c;
    });
    dispatch(changeCategoriesAction(categories));
  };
};
