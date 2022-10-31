const Router = require('koa-router');

const { search, hotSearch, suggestSearch, mobileSearch } = require('./search');
const { song, getsong } = require('./song');
const { top, topCategory } = require('./top');
const { lyric } = require('./lyric');
const { playlist_tagCategory, playlist_Tag, playlist_Info, playlist_list } = require('./playlist');
const { setcookie, getcookie } = require('./cookie');

// 新建 咪咕 路由
const kugou = new Router();

// add get method

kugou.get('/search', search);
kugou.get('/hotSearch', hotSearch);
kugou.get('/suggestSearch', suggestSearch);
kugou.get('/mobileSearch', mobileSearch);

kugou.get('/song', song);
kugou.get('/getsong', getsong);
// kugou.get('/songInfo', songInfo);

kugou.get('/lyric', lyric);

kugou.get('/top', top);
kugou.get('/topCategory', topCategory);

// kugou.get('/singer/info', singer_Info);
// kugou.get('/singer/songList', singer_songList);

kugou.get('/playlist/tagCategory', playlist_tagCategory);
kugou.get('/playlist/tag', playlist_Tag);
kugou.get('/playlist/info', playlist_Info);
kugou.get('/playlist/list', playlist_list);

kugou.get('/getcookie', getcookie);
// // add post method
kugou.post('/setcookie', setcookie);

module.exports = kugou;