import dayjs from 'dayjs';

export function getPlayCount(count) {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + '万';
  } else {
    return Math.floor(count / 10000000) / 10 + '亿';
  }
}
export function getSizeImage(imgUrl, size = 256) {
  return `${imgUrl}?param=${size}x${size}`;
}
export function getSongArtists(ar) {
  return ar.map((a) => a.name).join(', ');
}

export function formatDate(time, fmt = 'YYYY年MM月DD日') {
  return dayjs(time).format(fmt);
}

export function formatMonthDay(time) {
  return formatDate(time, 'MM月dd日');
}

export function formatMinuteSecond(time) {
  return formatDate(time, 'mm:ss');
}

export function parseUrl(url) {
  const res = {};
  if (!url) return res;
  url
    .substr(url.indexOf('?') + 1)
    .split('&')
    .map((item) => {
      const [key, value] = item.split('=');
      res[key] = decodeURIComponent(value);
      return '';
    });
  return res;
}
