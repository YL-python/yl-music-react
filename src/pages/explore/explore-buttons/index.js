import React, { memo, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { ExploreButtonsWrapper } from './style';
import { toggleCategorys } from '@/store/explore/actionCreators';

export default memo(function ExploreButtons(props) {
  const [showMore, setShowMore] = useState(false);
  const { categories } = useSelector((state) => state.explore, shallowEqual);
  const dispatch = useDispatch();

  function toggleCat(name) {
    dispatch(toggleCategorys(name));
  }

  function goToCategory(category) {
    if (showMore) return;
    props.history.push(`/explore?category=${encodeURIComponent(category)}`);
  }

  const allBigCats = ['语种', '风格', '场景', '情感', '主题'];

  return (
    <ExploreButtonsWrapper>
      <div className="buttons">
        {categories
          .filter((p) => p.enable)
          .map((categories) => (
            <div
              className={[
                'button',
                props.select === categories.name ? 'active' : '',
              ].join(' ')}
              onClick={(e) => goToCategory(categories.name)}
              key={categories.name}
            >
              {categories.name}
            </div>
          ))}
        <div
          className={['button more', showMore ? 'active' : ''].join(' ')}
          onClick={(e) => setShowMore(!showMore)}
        >
          <i className="iconfont icon-gengduo"></i>
        </div>
      </div>
      <div className={['panel', showMore ? 'show' : ''].join(' ')}>
        {allBigCats.map((bigCat) => {
          return (
            <div className="big-cat" key={bigCat}>
              <div className="name">{bigCat}</div>
              <div className="cats">
                {categories
                  .filter((c) => c.bigCat === bigCat)
                  .map((cat) => (
                    <div
                      className={['cat', cat.enable ? 'active' : ''].join(' ')}
                      key={cat.name}
                      onClick={(e) => toggleCat(cat.name)}
                    >
                      <span>{cat.name}</span>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </ExploreButtonsWrapper>
  );
});
