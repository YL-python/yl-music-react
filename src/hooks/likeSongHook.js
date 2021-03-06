import { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { changeLikeSongListAction } from '@/store/user/actionCreators';

function useLikeSong(song) {
  const [isLikeSong, setIsLikeSong] = useState(false);
  const dispatch = useDispatch();
  const { likeSongList } = useSelector((state) => state.user, shallowEqual);

  useEffect(() => {
    setIsLikeSong(likeSongList.map((like) => like.id).includes(song.id));
  }, [likeSongList, song]);

  function toggleIsLikeSong(song, e) {
    e.stopPropagation() && e.preventDefault();
    let list = [];
    if (isLikeSong) {
      likeSongList.forEach((like) => {
        if (like.id !== song.id) list.push(like);
      });
    } else {
      list = [song, ...likeSongList];
    }
    dispatch(changeLikeSongListAction(list));
    setIsLikeSong(!isLikeSong);
  }
  return [isLikeSong, toggleIsLikeSong];
}

export default useLikeSong;
