import { getSongArtists } from '@/utils/format-utils';
class Song {
  constructor(song) {
    this.id = '';
    this.playable = '';
    this.reason = '';
    this.picUrl = '';
    this.name = '';
    this.artists = '';
    this.album = '';
    this.dt = 0;
    this._init(song);
  }
  _init(song) {
    this.id = song.id;
    this.playable = song.playable;
    this.reason = song.reason;
    this.name = song.name;
    this.dt = song.dt;
    this.artists = getSongArtists(song.ar);
    this.album = song.al?.name;
    this.picUrl = song.al?.picUrl;
  }
}
export default Song;
