import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

export default ({app}, inject) => {
  inject('momentAgo', (date) => {
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo('en-US');
    date = new Date(date);
    return timeAgo.format(date);
  });
};
