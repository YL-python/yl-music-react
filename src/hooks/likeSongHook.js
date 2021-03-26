import { useState } from 'react';

function useLikeSong() {
  const [isLikeSong, setIsLikeSong] = useState(false);
  function toggleIsLikeSong(e) {
    e.stopPropagation();
    setIsLikeSong(!isLikeSong);
  }
  return [isLikeSong, toggleIsLikeSong];
}

export default useLikeSong;
