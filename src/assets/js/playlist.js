import { formatDate } from '@/utils/format-utils';

class Playlist {
  constructor(playlist) {
    this.id = '';
    this.name = '';
    this.nickname = '';
    this.updateTime = '';
    this.description = '';
    this.picUrl = '';
    this.trackCount = '';
    this._init(playlist);
  }
  _init(playlist) {
    this.id = playlist.id;
    this.name = playlist.name;
    this.nickname = playlist.creator?.nickname;
    this.updateTime = formatDate(playlist.updateTime);
    this.description = playlist.description;
    this.picUrl = playlist.coverImgUrl;
    this.trackCount = playlist.trackCount;
  }
}
export default Playlist;
