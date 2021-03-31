class Album {
  constructor(album) {
    this.id = '';
    this.name = '';
    this.copywriter = '';
    this.picUrl = '';
    this.updateTime = '';
    this.playCount = 0;
    this._init(album);
  }
  _init(album) {
    this.id = album.id;
    this.picUrl = album?.picUrl || album?.coverImgUrl;
    this.playCount = album?.playCount;
    this.copywriter = album?.copywriter || album?.description;
    this.name = album.name;
    this.updateFrequency = album?.updateFrequency;
    this.updateTime = album?.updateTime;
  }
}
export default Album;
