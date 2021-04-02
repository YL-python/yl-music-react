import { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { changeLikePlaylistAction } from '@/store/user/actionCreators';

function useLikePlaylist(playlist) {
  const [isLikePlaylist, setIsLikePlaylist] = useState(false);
  const dispatch = useDispatch();
  const { likePlaylist } = useSelector((state) => state.user, shallowEqual);

  useEffect(() => {
    setIsLikePlaylist(likePlaylist.map((like) => like.id).includes(playlist.id));
  }, [likePlaylist, playlist]);

  function toggleIsLikePlaylist(playlist, e) {
    e.stopPropagation() && e.preventDefault();
    let list = [];
    if (isLikePlaylist) {
      likePlaylist.forEach((like) => {
        if (like.id !== playlist.id) list.push(like);
      });
    } else {
      list = [playlist, ...likePlaylist];
    }
    dispatch(changeLikePlaylistAction(list));
    setIsLikePlaylist(!isLikePlaylist);
  }

  return [isLikePlaylist, toggleIsLikePlaylist];
}

export default useLikePlaylist;
