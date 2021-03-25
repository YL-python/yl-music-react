export function isTrackPlayable(track) {
  let result = {
    playable: true,
    reason: '',
  };
  if (track.fee === 1 || track.privilege?.fee === 1) {
    result.playable = false;
    result.reason = 'VIP Only';
  } else if (track.fee === 4 || track.privilege?.fee === 4) {
    result.playable = false;
    result.reason = '付费专辑';
  } else if (track.noCopyrightRcmd !== null && track.noCopyrightRcmd !== undefined) {
    result.playable = false;
    result.reason = '无版权';
  }
  return result;
}

export function mapTrackPlayableStatus(tracks, privileges = []) {
  return tracks.map((t) => {
    const privilege = privileges.find((item) => item.id === t.id) || {};
    if (t.privilege) {
      Object.assign(t.privilege, privilege);
    } else {
      t.privilege = privilege;
    }
    let result = isTrackPlayable(t);
    t.playable = result.playable;
    t.reason = result.reason;
    return t;
  });
}
